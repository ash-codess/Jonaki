import { createContext, useContext, useEffect, useReducer, useRef } from 'react'
import { LEVELS, TOTAL_LESSONS } from '../data/curriculum.js'
import { setMuted } from './sfx.js'

const GameContext = createContext(null)

const MAX_HEARTS = 5
const HEART_REFILL_MS = 45_000 // a heart trickles back every 45s
const XP_PER_CORRECT = 10
const XP_LESSON_BONUS = 20

// Ordered list of every lesson id, used for "resume" + unlock logic.
const LESSON_ORDER = LEVELS.flatMap((lv) => lv.lessons.map((ls) => ls.id))

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

const initialState = {
  name: null,
  xp: 0,
  streak: 1,
  startedDay: todayKey(),
  hearts: MAX_HEARTS,
  completed: {}, // lessonId -> true
  badges: {}, // levelId -> true
  seenFacts: {}, // factId -> true
  lastLessonId: null, // for "resume"
  finishedAll: false,
  muted: false,
}

function levelComplete(state, level) {
  return level.lessons.every((ls) => state.completed[ls.id])
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.name.trim() || 'Bondhu' }

    case 'ANSWER_CORRECT':
      return { ...state, xp: state.xp + XP_PER_CORRECT }

    case 'ANSWER_WRONG':
      return { ...state, hearts: Math.max(0, state.hearts - 1) }

    case 'REFILL_HEART':
      return state.hearts >= MAX_HEARTS
        ? state
        : { ...state, hearts: state.hearts + 1 }

    case 'PRACTICE_REFILL':
      return { ...state, hearts: MAX_HEARTS }

    case 'COMPLETE_LESSON': {
      const completed = { ...state.completed, [action.lessonId]: true }
      const next = {
        ...state,
        completed,
        xp: state.xp + XP_LESSON_BONUS,
        lastLessonId: action.lessonId,
      }
      // award badges for any now-complete levels
      const badges = { ...state.badges }
      for (const lv of LEVELS) {
        if (lv.lessons.every((ls) => completed[ls.id])) badges[lv.id] = true
      }
      next.badges = badges
      next.finishedAll = LESSON_ORDER.every((id) => completed[id])
      return next
    }

    case 'SEE_FACT':
      return { ...state, seenFacts: { ...state.seenFacts, [action.factId]: true } }

    case 'TOGGLE_SOUND':
      return { ...state, muted: !state.muted }

    case 'RESET':
      return { ...initialState, startedDay: todayKey() }

    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const heartTimer = useRef(null)

  // Keep the sound engine in sync with the mute preference.
  useEffect(() => {
    setMuted(state.muted)
  }, [state.muted])

  // Trickle hearts back over time (session-only, no persistence).
  useEffect(() => {
    if (state.hearts >= MAX_HEARTS) {
      if (heartTimer.current) {
        clearInterval(heartTimer.current)
        heartTimer.current = null
      }
      return
    }
    if (!heartTimer.current) {
      heartTimer.current = setInterval(
        () => dispatch({ type: 'REFILL_HEART' }),
        HEART_REFILL_MS,
      )
    }
    return () => {
      if (heartTimer.current) {
        clearInterval(heartTimer.current)
        heartTimer.current = null
      }
    }
  }, [state.hearts])

  // ── derived selectors ──
  const completedCount = Object.keys(state.completed).length
  const overallPct = Math.round((completedCount / TOTAL_LESSONS) * 100)

  function isLessonUnlocked(lessonId) {
    const idx = LESSON_ORDER.indexOf(lessonId)
    if (idx <= 0) return true
    return !!state.completed[LESSON_ORDER[idx - 1]]
  }

  function isLevelUnlocked(level) {
    return isLessonUnlocked(level.lessons[0].id)
  }

  function levelProgress(level) {
    const done = level.lessons.filter((ls) => state.completed[ls.id]).length
    return { done, total: level.lessons.length, pct: Math.round((done / level.lessons.length) * 100) }
  }

  function nextLessonId() {
    return LESSON_ORDER.find((id) => !state.completed[id]) || null
  }

  const value = {
    state,
    dispatch,
    MAX_HEARTS,
    completedCount,
    overallPct,
    isLessonUnlocked,
    isLevelUnlocked,
    levelProgress,
    levelComplete: (lv) => levelComplete(state, lv),
    nextLessonId,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
