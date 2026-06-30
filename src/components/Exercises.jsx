import { useEffect, useMemo, useRef, useState } from 'react'
import { speak, ttsAvailable, bengaliVoiceAvailable, getRecognition, recognitionAvailable } from '../game/speech.js'

// ── shared helpers ────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const norm = (s) => (s || '').replace(/\s+/g, ' ').trim()

// Exercises that quietly deduct a heart on a wrong CHECK.
export const GRADED_KINDS = new Set(['mcq', 'listen', 'type', 'build'])

// Can the learner press CHECK yet?
export function canCheck(ex, answer) {
  switch (ex.kind) {
    case 'mcq':
    case 'listen':
      return answer != null
    case 'type':
      return norm(answer).length > 0
    case 'build':
      return Array.isArray(answer) && answer.length === ex.answer.length
    case 'match':
      return answer === 'done'
    case 'trace':
      return answer === 'done'
    case 'speak':
      return answer === 'done'
    default:
      return false
  }
}

export function grade(ex, answer) {
  switch (ex.kind) {
    case 'mcq':
    case 'listen':
      return answer === ex.answer
    case 'type': {
      const got = norm(answer)
      const accepts = [ex.answer, ...(ex.accept || [])].map(norm)
      return accepts.includes(got)
    }
    case 'build':
      return Array.isArray(answer) && answer.join('|') === ex.answer.join('|')
    // practice kinds always pass once attempted
    case 'match':
    case 'trace':
    case 'speak':
      return true
    default:
      return false
  }
}

export function correctText(ex) {
  switch (ex.kind) {
    case 'mcq':
    case 'listen': {
      const o = ex.options[ex.answer]
      return o.bn || o.label
    }
    case 'type':
      return ex.answer
    case 'build':
      return ex.answer.join(' ')
    default:
      return ''
  }
}

// ── the dispatcher ────────────────────────────────────────────────────────
export function Exercise(props) {
  const { ex } = props
  switch (ex.kind) {
    case 'mcq':
      return <Mcq {...props} />
    case 'listen':
      return <Listen {...props} />
    case 'match':
      return <Match {...props} />
    case 'type':
      return <TypeIn {...props} />
    case 'build':
      return <Build {...props} />
    case 'trace':
      return <Trace {...props} />
    case 'speak':
      return <Speak {...props} />
    default:
      return <p>Unknown exercise.</p>
  }
}

// ── MCQ ───────────────────────────────────────────────────────────────────
function Mcq({ ex, answer, setAnswer, graded, correct }) {
  const opts = useMemo(
    () => ex.options.map((o, i) => ({ ...o, i })),
    [ex],
  )
  const allBn = ex.options.every((o) => o.bn && !o.label)
  return (
    <div>
      <p className="q-prompt">{ex.prompt}</p>
      {ex.big && <div className="big-glyph bn">{ex.big}</div>}
      <div className={`opts ${allBn ? 'grid2' : ''}`}>
        {opts.map((o) => {
          let cls = 'opt'
          if (allBn) cls += ' grid-mode bn'
          if (graded) {
            if (o.i === ex.answer) cls += ' right'
            else if (o.i === answer && !correct) cls += ' wrong'
          } else if (o.i === answer) cls += ' sel'
          return (
            <button
              key={o.i}
              className={cls}
              disabled={graded}
              onClick={() => setAnswer(o.i)}
            >
              {o.bn ? (
                allBn ? <span>{o.bn}</span> : <span className="opt-bn bn">{o.bn}</span>
              ) : (
                <span>{o.label}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Listen (audio recognition) ──────────────────────────────────────────
function Listen({ ex, answer, setAnswer, graded, correct }) {
  const noVoice = !bengaliVoiceAvailable()
  useEffect(() => {
    const t = setTimeout(() => speak(ex.say), 350)
    return () => clearTimeout(t)
  }, [ex])
  return (
    <div>
      <p className="q-prompt">{ex.prompt}</p>
      <button className="speaker-btn" onClick={() => speak(ex.say)}>
        <span className="ic">🔊</span> Play again
      </button>
      {noVoice && (
        <p className="kbd-hint">
          No Bengali voice installed — listen cue:{' '}
          <b>“{ex.roman || ex.say}”</b>{' '}
          {ttsAvailable() ? '(audio may be silent)' : '(audio not supported here)'}
        </p>
      )}
      <div className="opts grid2">
        {ex.options.map((o, i) => {
          let cls = 'opt grid-mode bn'
          if (graded) {
            if (i === ex.answer) cls += ' right'
            else if (i === answer && !correct) cls += ' wrong'
          } else if (i === answer) cls += ' sel'
          return (
            <button key={i} className={cls} disabled={graded} onClick={() => setAnswer(i)}>
              {o.bn}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Match ──────────────────────────────────────────────────────────────
function Match({ ex, setAnswer }) {
  const left = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ ...p, i }))), [ex])
  const right = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ ...p, i }))), [ex])
  const [selLeft, setSelLeft] = useState(null)
  const [selRight, setSelRight] = useState(null)
  const [matched, setMatched] = useState({})
  const [miss, setMiss] = useState(null)

  function tryMatch(l, r) {
    if (l == null || r == null) return
    if (l === r) {
      const m = { ...matched, [l]: true }
      setMatched(m)
      setSelLeft(null)
      setSelRight(null)
      if (Object.keys(m).length === ex.pairs.length) setAnswer('done')
    } else {
      setMiss(`${l}-${r}`)
      setTimeout(() => setMiss(null), 420)
      setSelLeft(null)
      setSelRight(null)
    }
  }

  return (
    <div>
      <p className="q-prompt">{ex.prompt}</p>
      <div className="match-cols">
        <div className="col">
          {left.map((p) => {
            let cls = 'chip bn'
            if (matched[p.i]) cls += ' matched'
            else if (selLeft === p.i) cls += ' sel'
            if (miss && Number(miss.split('-')[0]) === p.i) cls += ' miss'
            return (
              <button
                key={'l' + p.i}
                className={cls}
                onClick={() => {
                  const nl = p.i
                  setSelLeft(nl)
                  if (selRight != null) tryMatch(nl, selRight)
                }}
              >
                {p.bn}
              </button>
            )
          })}
        </div>
        <div className="col">
          {right.map((p) => {
            let cls = 'chip'
            if (matched[p.i]) cls += ' matched'
            else if (selRight === p.i) cls += ' sel'
            if (miss && Number(miss.split('-')[1]) === p.i) cls += ' miss'
            return (
              <button
                key={'r' + p.i}
                className={cls}
                onClick={() => {
                  const nr = p.i
                  setSelRight(nr)
                  if (selLeft != null) tryMatch(selLeft, nr)
                }}
              >
                {p.sound}
              </button>
            )
          })}
        </div>
      </div>
      <p className="kbd-hint">Tap a Bengali letter, then its match on the right.</p>
    </div>
  )
}

// ── Type-in ──────────────────────────────────────────────────────────────
const QUICK_KEYS = ['আ', 'ই', 'উ', 'এ', 'ও', 'ক', 'ম', 'ব', 'ল', 'ত', 'ন', 'র', 'া', 'ি', 'ে', 'ো']

function TypeIn({ ex, answer, setAnswer, graded, correct }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current && !graded) ref.current.focus()
  }, [ex, graded])
  const value = answer || ''
  return (
    <div>
      <p className="q-prompt">{ex.prompt}</p>
      {ex.big && <div className="big-glyph">{ex.big}</div>}
      <input
        ref={ref}
        className="typein bn"
        value={value}
        disabled={graded}
        placeholder="…"
        onChange={(e) => setAnswer(e.target.value)}
        style={
          graded
            ? { borderColor: correct ? 'var(--good)' : 'var(--bad)' }
            : undefined
        }
      />
      {graded && !correct && (
        <p className="kbd-hint">
          Answer: <span className="bn">{correctText(ex)}</span>
        </p>
      )}
      {!graded && (
        <>
          <p className="kbd-hint">No Bengali keyboard? Tap to insert letters:</p>
          <div className="kbd-keys">
            {QUICK_KEYS.map((k) => (
              <button key={k} className="bn" onClick={() => setAnswer(value + k)}>
                {k}
              </button>
            ))}
            <button onClick={() => setAnswer(value.slice(0, -1))}>⌫</button>
          </div>
        </>
      )}
    </div>
  )
}

// ── Sentence builder ──────────────────────────────────────────────────────
function Build({ ex, answer, setAnswer, graded }) {
  const chosen = answer || []
  const pool = useMemo(() => shuffle(ex.pool || ex.answer), [ex])
  // count how many of each token are already placed (handles duplicates)
  function placedCount(word) {
    return chosen.filter((w) => w === word).length
  }
  function poolUsed(word, idxInPool) {
    // mark the nth occurrence used if n copies are chosen
    const before = pool.slice(0, idxInPool).filter((w) => w === word).length
    return before < placedCount(word)
  }
  return (
    <div>
      <p className="q-prompt">{ex.prompt}</p>
      <p className="muted" style={{ marginTop: -10 }}>{ex.translation}</p>
      <div className="build-answer">
        {chosen.map((w, i) => (
          <button
            key={i}
            className="word bn"
            disabled={graded}
            onClick={() => setAnswer(chosen.filter((_, j) => j !== i))}
          >
            {w}
          </button>
        ))}
      </div>
      <div className="build-pool">
        {pool.map((w, i) => (
          <button
            key={i}
            className={`word bn ${poolUsed(w, i) ? 'used' : ''}`}
            disabled={graded || poolUsed(w, i)}
            onClick={() => setAnswer([...chosen, w])}
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Trace the letter ──────────────────────────────────────────────────────
function Trace({ ex, setAnswer }) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const drawn = useRef(false)
  const [done, setDone] = useState(false)

  function pos(e) {
    const c = canvasRef.current
    const rect = c.getBoundingClientRect()
    const p = e.touches ? e.touches[0] : e
    return { x: p.clientX - rect.left, y: p.clientY - rect.top }
  }
  function start(e) {
    e.preventDefault()
    drawing.current = true
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = pos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
  function move(e) {
    if (!drawing.current) return
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = pos(e)
    ctx.lineWidth = 14
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#2f6f6a'
    ctx.lineTo(x, y)
    ctx.stroke()
    drawn.current = true
  }
  function end() {
    drawing.current = false
    if (drawn.current && !done) {
      setDone(true)
      setAnswer('done')
    }
  }
  function clear() {
    const c = canvasRef.current
    c.getContext('2d').clearRect(0, 0, c.width, c.height)
    drawn.current = false
    setDone(false)
    setAnswer(null)
  }

  return (
    <div className="trace-wrap">
      <p className="q-prompt center">Trace the letter with your finger or mouse</p>
      <div className="row">
        <span className="bn" style={{ fontSize: 40, color: 'var(--teal-deep)' }}>{ex.char}</span>
        <span className="muted">“{ex.romanization}”</span>
        <button className="speaker-btn" style={{ margin: 0 }} onClick={() => speak(ex.char)}>
          <span className="ic">🔊</span>
        </button>
      </div>
      <div className="trace-stage">
        <div className="trace-ghost bn">{ex.char}</div>
        <canvas
          ref={canvasRef}
          className="trace-canvas"
          width={260}
          height={260}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
      </div>
      <p className="trace-note">{ex.note}</p>
      <button className="btn ghost" onClick={clear}>Clear ↺</button>
    </div>
  )
}

// ── Speaking practice ──────────────────────────────────────────────────────
function Speak({ ex, answer, setAnswer }) {
  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState('')
  const [verdict, setVerdict] = useState(null) // 'great' | 'try'
  const recRef = useRef(null)
  const supported = recognitionAvailable()

  function startListen() {
    const rec = getRecognition()
    if (!rec) return
    recRef.current = rec
    setHeard('')
    setVerdict(null)
    setListening(true)
    rec.onresult = (e) => {
      const alts = Array.from(e.results[0]).map((r) => r.transcript)
      setHeard(alts[0])
      const target = ex.target.replace(/\s+/g, '')
      const ok = alts.some((a) => {
        const x = a.replace(/\s+/g, '')
        return x.includes(target) || target.includes(x) || x === target
      })
      setVerdict(ok ? 'great' : 'try')
      setAnswer('done') // either way, allow continuing — speaking is practice
    }
    rec.onerror = () => {
      setListening(false)
      setVerdict('try')
      setAnswer('done')
    }
    rec.onend = () => setListening(false)
    rec.start()
  }

  return (
    <div className="speak-wrap">
      <p className="q-prompt center">{ex.prompt}</p>
      <div className="speak-target bn">{ex.target}</div>
      <div className="muted">
        “{ex.romanization}”{ex.translation ? ` · ${ex.translation}` : ''}
      </div>
      <button className="speaker-btn" onClick={() => speak(ex.target)}>
        <span className="ic">🔊</span> Hear it
      </button>

      {supported ? (
        <>
          <button
            className={`mic ${listening ? 'live' : ''}`}
            onClick={startListen}
            aria-label="Tap to speak"
          >
            🎤
          </button>
          <div className="heard">
            {listening ? 'Listening…' : heard ? <>You said: <span className="bn">{heard}</span></> : 'Tap the mic and say it aloud'}
          </div>
          {verdict === 'great' && <div className="feedback ok">Beautiful pronunciation! ✨</div>}
          {verdict === 'try' && (
            <div className="muted">Close! Tap continue, or try the mic again.</div>
          )}
        </>
      ) : (
        <>
          <p className="muted center">
            Your browser can’t listen, but say it aloud anyway — then continue.
          </p>
          <button className="btn amber" onClick={() => setAnswer('done')}>
            I said it ✓
          </button>
        </>
      )}
      {supported && answer !== 'done' && (
        <button className="btn ghost" onClick={() => setAnswer('done')}>
          Skip speaking
        </button>
      )}
    </div>
  )
}
