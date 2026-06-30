import { LEVELS, FACT_AFTER_LEVEL } from '../data/curriculum.js'
import { FACTS } from '../data/facts.js'
import { useGame } from '../game/GameContext.jsx'
import { ProgressBar, MascotSays, AudioBanner } from './Bits.jsx'

const OFFSETS = [0, 64, 92, 64, 0, -64, -92, -64]

export default function PathMap({ onOpenLesson, onOpenFact }) {
  const game = useGame()
  const { state, overallPct, completedCount, nextLessonId } = game
  const nextId = nextLessonId()
  let nodeIndex = 0

  const resumeLevel = LEVELS.find((lv) => lv.lessons.some((ls) => ls.id === nextId))

  return (
    <div>
      <AudioBanner />
      <div className="hero">
        <MascotSays mood="wave">
          {completedCount === 0
            ? `Nômôshkar, ${state.name}! Tap the glowing node to begin. 🪷`
            : state.finishedAll
              ? `You finished everything, ${state.name}! 🎉 Grab your certificate.`
              : `Welcome back, ${state.name}! Pick up where you left off.`}
        </MascotSays>
        <div className="overall">
          <ProgressBar pct={overallPct} />
          <small>{overallPct}% of the journey · {completedCount} lessons done</small>
        </div>
        {!state.finishedAll && resumeLevel && (
          <button
            className="btn amber lg"
            style={{ marginTop: 12 }}
            onClick={() => {
              const ls = resumeLevel.lessons.find((l) => l.id === nextId)
              if (game.isLessonUnlocked(ls.id)) onOpenLesson(ls, resumeLevel)
            }}
          >
            {completedCount === 0 ? 'Start learning ▶' : 'Continue ▶'}
          </button>
        )}
      </div>

      <div className="path">
        {LEVELS.map((lv) => {
          const prog = game.levelProgress(lv)
          const unlocked = game.isLevelUnlocked(lv)
          const factId = FACT_AFTER_LEVEL[lv.id]
          const fact = factId ? FACTS.find((f) => f.id === factId) : null
          return (
            <div className="levelgroup" key={lv.id}>
              <div className={`level-banner lv-${lv.color}`} style={!unlocked ? { filter: 'grayscale(0.6)', opacity: 0.85 } : undefined}>
                <span className="lvl-ic">{unlocked ? lv.icon : '🔒'}</span>
                <div>
                  <h3>Level {lv.id} · {lv.title}</h3>
                  <span className="bn">{lv.titleBn}</span>
                </div>
                <div className="spacer" />
                <div className="center">
                  <div style={{ fontWeight: 800 }}>{prog.done}/{prog.total}</div>
                  {prog.done === prog.total && <div style={{ fontSize: 20 }}>{lv.badge.emoji}</div>}
                </div>
              </div>

              <div className="nodes">
                {lv.lessons.map((ls) => {
                  const off = OFFSETS[nodeIndex % OFFSETS.length]
                  nodeIndex++
                  const done = !!state.completed[ls.id]
                  const isCurrent = ls.id === nextId
                  const unlockedLesson = game.isLessonUnlocked(ls.id)
                  const cls = done ? 'done' : isCurrent ? 'current' : !unlockedLesson ? 'locked' : 'done'
                  const flip = off < 0
                  return (
                    <div className="node-row" key={ls.id} style={{ transform: `translateX(${off}px)` }}>
                      <div className={`node-row ${flip ? 'flip' : ''}`} style={{ width: 'auto' }}>
                        <button
                          className={`node ${cls}`}
                          disabled={!unlockedLesson}
                          onClick={() => unlockedLesson && onOpenLesson(ls, lv)}
                          aria-label={ls.title}
                        >
                          {isCurrent && <span className="start-pill">{done ? 'REVIEW' : 'START'}</span>}
                          {done ? '★' : isCurrent ? lv.icon : '🔒'}
                          <span className="label">{ls.title}</span>
                        </button>
                      </div>
                    </div>
                  )
                })}

                {fact && unlocked && (
                  <div className="node-row" style={{ transform: 'translateX(0)' }}>
                    <button
                      className="fact-node"
                      onClick={() => onOpenFact(fact)}
                      aria-label="Did you know?"
                      title="Did you know?"
                    >
                      {state.seenFacts[fact.id] ? '💡' : fact.emoji}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
