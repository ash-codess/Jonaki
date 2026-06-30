import { useState } from 'react'
import { GameProvider, useGame } from './game/GameContext.jsx'
import Onboarding from './components/Onboarding.jsx'
import PathMap from './components/PathMap.jsx'
import LessonPlayer from './components/LessonPlayer.jsx'
import FactCard from './components/FactCard.jsx'
import { BadgeWall, Certificate } from './components/Screens.jsx'
import { Feed } from './components/Feed.jsx'
import { setMuted, playCorrect, unlockAudio } from './game/sfx.js'

function TopBar() {
  const { state, dispatch, MAX_HEARTS } = useGame()
  return (
    <div className="topbar">
      <div className="brand">
        <span className="logo bn">জ</span> Jonaki
      </div>
      <div className="stat flame" title="Day streak"><span className="ic">🔥</span>{state.streak}</div>
      <div className="stat xp" title="Total XP"><span className="ic">⭐</span>{state.xp}</div>
      <div className="stat hearts" title="Hearts"><span className="ic">❤️</span>{state.hearts}/{MAX_HEARTS}</div>
      <button
        className="stat sound"
        title={state.muted ? 'Sound off' : 'Sound on'}
        onClick={() => {
          const wasMuted = state.muted
          dispatch({ type: 'TOGGLE_SOUND' })
          if (wasMuted) {
            // turning sound ON — unlock + play a confirmation chime right away
            unlockAudio()
            setMuted(false)
            playCorrect()
          }
        }}
      >
        <span className="ic">{state.muted ? '🔇' : '🔊'}</span>
      </button>
    </div>
  )
}

function TabBar({ tab, setTab, canCert }) {
  const tabs = [
    { id: 'learn', ic: '🗺️', label: 'Learn' },
    { id: 'badges', ic: '🏅', label: 'Badges' },
    { id: 'feed', ic: '🧵', label: 'Feed' },
    { id: 'cert', ic: '📜', label: 'Diploma' },
  ]
  return (
    <div className="tabbar">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`tab ${tab === t.id ? 'on' : ''}`}
          onClick={() => setTab(t.id)}
        >
          <span className="ic">{t.ic}</span>
          {t.label}
          {t.id === 'cert' && canCert && <span style={{ position: 'absolute' }} />}
        </button>
      ))}
    </div>
  )
}

function Shell() {
  const { state, dispatch } = useGame()
  const [tab, setTab] = useState('learn')
  const [activeLesson, setActiveLesson] = useState(null) // { lesson, level }
  const [activeFact, setActiveFact] = useState(null)

  if (!state.name) return <Onboarding />

  // overlays take over the screen
  if (activeLesson) {
    return (
      <LessonPlayer
        lesson={activeLesson.lesson}
        levelColor={activeLesson.level.color}
        onExit={() => setActiveLesson(null)}
      />
    )
  }
  if (activeFact) {
    return <FactCard fact={activeFact} onClose={() => setActiveFact(null)} />
  }

  return (
    <div className="app">
      <TopBar />
      {tab === 'learn' && (
        <PathMap
          onOpenLesson={(lesson, level) => setActiveLesson({ lesson, level })}
          onOpenFact={(fact) => {
            dispatch({ type: 'SEE_FACT', factId: fact.id })
            setActiveFact(fact)
          }}
        />
      )}
      {tab === 'badges' && <BadgeWall />}
      {tab === 'feed' && <Feed />}
      {tab === 'cert' &&
        (state.finishedAll ? (
          <Certificate onClose={() => setTab('learn')} />
        ) : (
          <LockedCert />
        ))}
      <TabBar tab={tab} setTab={setTab} canCert={state.finishedAll} />
    </div>
  )
}

function LockedCert() {
  const { overallPct } = useGame()
  return (
    <div className="hero" style={{ marginTop: 40 }}>
      <div style={{ fontSize: 70 }}>📜🔒</div>
      <h1>Your diploma awaits</h1>
      <p className="muted" style={{ maxWidth: 380, margin: '0 auto' }}>
        Finish all 8 levels to unlock a downloadable, shareable certificate with your
        name and a Bengali calligraphy flourish. You’re {overallPct}% there!
      </p>
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <Shell />
    </GameProvider>
  )
}
