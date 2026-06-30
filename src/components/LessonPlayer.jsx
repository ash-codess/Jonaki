import { useState } from 'react'
import { useGame } from '../game/GameContext.jsx'
import { Exercise, canCheck, grade, correctText, GRADED_KINDS } from './Exercises.jsx'
import { Confetti, Mascot, MascotSays, ProgressBar } from './Bits.jsx'
import { speak } from '../game/speech.js'
import { playCorrect, playWrong, playComplete } from '../game/sfx.js'

const PRAISE = ['Darun! (Excellent!)', 'Besh! (Great!)', 'Bahh! (Lovely!)', 'Khub bhalo! (Very good!)', 'Egiye chôlo! (Keep going!)']

export default function LessonPlayer({ lesson, levelColor, onExit }) {
  const { state, dispatch, MAX_HEARTS } = useGame()
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [graded, setGraded] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [finished, setFinished] = useState(false)
  const [outOfHearts, setOutOfHearts] = useState(false)

  const exercises = lesson.exercises
  const ex = exercises[idx]
  const total = exercises.length

  function check() {
    const ok = grade(ex, answer)
    setCorrect(ok)
    setGraded(true)
    if (ok) {
      playCorrect()
      dispatch({ type: 'ANSWER_CORRECT' })
      if (ex.kind === 'mcq' && ex.options[ex.answer]?.bn) speak(ex.options[ex.answer].bn)
    } else {
      playWrong()
      setMistakes((m) => m + 1)
      if (GRADED_KINDS.has(ex.kind)) {
        dispatch({ type: 'ANSWER_WRONG' })
        if (state.hearts - 1 <= 0) setOutOfHearts(true)
      }
    }
  }

  function next() {
    if (idx + 1 >= total) {
      dispatch({ type: 'COMPLETE_LESSON', lessonId: lesson.id })
      playComplete()
      setFinished(true)
      return
    }
    setIdx(idx + 1)
    setAnswer(null)
    setGraded(false)
    setCorrect(false)
  }

  // ── celebration screen ──
  if (finished) {
    const earned = total * 10 + 20 - 0
    return (
      <div className="sheet">
        <Confetti />
        <div className="sheet-body center" style={{ justifyContent: 'center' }}>
          <div style={{ marginTop: 'auto' }} />
          <div className="pop"><Mascot mood="cheer" size={110} /></div>
          <h1 style={{ fontSize: 34, margin: '12px 0 4px' }}>Lesson complete!</h1>
          <p className="muted">“{lesson.title}”</p>
          <div className="row center" style={{ justifyContent: 'center', gap: 24, margin: '18px 0' }}>
            <Stat ic="⭐" label="XP" value={`+${earned}`} color="var(--marigold-deep)" />
            <Stat ic="🎯" label="Accuracy" value={`${Math.round(((total - mistakes) / total) * 100)}%`} color="var(--teal-deep)" />
            <Stat ic="🔥" label="Streak" value={state.streak} color="var(--terracotta-deep)" />
          </div>
          <div style={{ marginTop: 'auto' }} />
          <button className="btn block lg" onClick={() => onExit(true)}>Continue</button>
        </div>
      </div>
    )
  }

  // ── out of hearts ──
  if (outOfHearts) {
    return (
      <div className="sheet">
        <div className="sheet-body center" style={{ justifyContent: 'center' }}>
          <Mascot mood="sad" size={100} />
          <h1 style={{ fontSize: 30 }}>Out of hearts!</h1>
          <p className="muted">Hearts slowly refill over time — or do a quick practice refill to keep your momentum.</p>
          <div className="stack" style={{ width: '100%', maxWidth: 320, marginTop: 16 }}>
            <button
              className="btn amber block"
              onClick={() => {
                dispatch({ type: 'PRACTICE_REFILL' })
                setOutOfHearts(false)
                setGraded(false)
                setAnswer(null)
              }}
            >
              ❤️ Refill hearts & keep going
            </button>
            <button className="btn ghost block" onClick={() => onExit(false)}>Leave lesson</button>
          </div>
        </div>
      </div>
    )
  }

  const ready = canCheck(ex, answer)

  return (
    <div className="sheet">
      <div className="sheet-head">
        <button className="iconbtn" onClick={() => onExit(false)} aria-label="Close">✕</button>
        <div className="lesson-bar"><ProgressBar pct={Math.round((idx / total) * 100)} /></div>
        <div className="stat hearts"><span className="ic">❤️</span>{state.hearts}</div>
      </div>

      <div className="sheet-body">
        <Exercise
          ex={ex}
          answer={answer}
          setAnswer={setAnswer}
          graded={graded}
          correct={correct}
        />
        <div className="spacer" />
      </div>

      <div className={`checkbar ${graded ? (correct ? 'ok' : 'no') : ''}`}>
        <div className="checkbar-inner">
          {graded ? (
            <>
              <div className={`feedback ${correct ? 'ok' : 'no'}`}>
                {correct ? (
                  <><Mascot mood="happy" size={40} /> {PRAISE[idx % PRAISE.length]}</>
                ) : (
                  <><Mascot mood="sad" size={40} /> Answer: <span className="bn">{correctText(ex) || '—'}</span></>
                )}
              </div>
              <button className={`btn ${correct ? '' : 'terra'}`} onClick={next}>
                {idx + 1 >= total ? 'Finish' : 'Continue'}
              </button>
            </>
          ) : (
            <button className="btn block" disabled={!ready} onClick={check}>
              Check
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Stat({ ic, label, value, color }) {
  return (
    <div className="center">
      <div style={{ fontSize: 30 }}>{ic}</div>
      <div style={{ fontWeight: 800, fontSize: 22, color }}>{value}</div>
      <div className="muted" style={{ fontSize: 13 }}>{label}</div>
    </div>
  )
}
