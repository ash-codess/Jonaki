import { useEffect, useState } from 'react'
import { bengaliVoiceAvailable, onVoiceChange, speak, ttsAvailable } from '../game/speech.js'

// Tracks whether a Bengali TTS voice is installed (re-checks as voices load).
export function useBengaliVoice() {
  const [ok, setOk] = useState(bengaliVoiceAvailable())
  useEffect(() => onVoiceChange(() => setOk(bengaliVoiceAvailable())), [])
  return ok
}

// Shown when no Bengali voice is available, explaining why audio is silent.
export function AudioBanner() {
  const ok = useBengaliVoice()
  const [dismissed, setDismissed] = useState(false)
  if (ok || dismissed || !ttsAvailable()) return null
  return (
    <div className="audio-banner">
      <span className="ab-ic">🔇</span>
      <div className="ab-body">
        <strong>No Bengali voice found on this device.</strong>
        <p>
          Audio uses your system’s text-to-speech, and no <em>Bangla</em> voice is
          installed — so pronunciation is silent. Every exercise still shows romanized
          pronunciation. To hear Bengali: <b>Windows Settings → Time &amp; Language →
          Language &amp; region → Add a language → বাংলা (Bangla)</b>, then reload. (Chrome
          or Edge work best.)
        </p>
        <button className="ab-test" onClick={() => speak('নমস্কার')}>🔊 Test sound</button>
      </div>
      <button className="ab-x" onClick={() => setDismissed(true)} aria-label="Dismiss">✕</button>
    </div>
  )
}


const FACES = {
  idle: '🦚',
  happy: '😄',
  cheer: '🤩',
  sad: '🥺',
  wave: '👋',
}

// Moyna the peacock — our encouraging guide.
export function Mascot({ mood = 'idle', size = 64 }) {
  return (
    <div
      className={`mascot ${mood === 'happy' || mood === 'cheer' ? 'happy' : ''}`}
      style={{ '--m': `${size}px` }}
      aria-hidden
    >
      {FACES[mood] || FACES.idle}
    </div>
  )
}

export function MascotSays({ mood = 'idle', children, size = 60 }) {
  return (
    <div className="speech-row">
      <Mascot mood={mood} size={size} />
      <div className="speech-bubble">{children}</div>
    </div>
  )
}

export function ProgressBar({ pct }) {
  return (
    <div className="bar">
      <i style={{ width: `${Math.max(4, pct)}%` }} />
    </div>
  )
}

const CONFETTI_COLORS = ['#bf5a3b', '#cf971f', '#2f6f6a', '#4f8c5b', '#3a566f', '#b5524e']

export function Confetti({ count = 90 }) {
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      dur: 1.6 + Math.random() * 1.6,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rot: Math.random() * 360,
    })),
  )
  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p, i) => (
        <i
          key={i}
          style={{
            left: `${p.left}%`,
            background: p.color,
            transform: `rotate(${p.rot}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  )
}

export function Toast({ message }) {
  if (!message) return null
  return <div className="toast">{message}</div>
}

export function useTransientToast() {
  const [msg, setMsg] = useState(null)
  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(null), 2200)
    return () => clearTimeout(t)
  }, [msg])
  return [msg, setMsg]
}
