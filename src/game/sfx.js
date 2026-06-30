// Tiny sound-effects engine built on the Web Audio API.
// Fully self-contained — tones are synthesized live, no audio files, no network.

let ctx = null
let muted = false

export function setMuted(m) {
  muted = m
}
export function isMuted() {
  return muted
}

function ac() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext
    if (!C) return null
    ctx = new C()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Call from a user gesture (e.g. "Begin") so the audio context is allowed to start.
export function unlockAudio() {
  ac()
}

// Safety net: browsers keep the audio context suspended until the user interacts.
// Resume (or create) it on the very first interaction anywhere in the app.
if (typeof window !== 'undefined') {
  const kick = () => {
    ac()
    window.removeEventListener('pointerdown', kick)
    window.removeEventListener('keydown', kick)
    window.removeEventListener('touchstart', kick)
  }
  window.addEventListener('pointerdown', kick)
  window.addEventListener('keydown', kick)
  window.addEventListener('touchstart', kick)
}

function tone(c, freq, start, dur, { type = 'sine', gain = 0.16, slideTo = null } = {}) {
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, start)
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, start + dur)
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(gain, start + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  o.connect(g)
  g.connect(c.destination)
  o.start(start)
  o.stop(start + dur + 0.03)
}

// Cheerful rising two-note sparkle.
export function playCorrect() {
  if (muted) return
  const c = ac()
  if (!c) return
  const t = c.currentTime
  tone(c, 659.25, t, 0.12, { type: 'triangle', gain: 0.24 }) // E5
  tone(c, 987.77, t + 0.09, 0.2, { type: 'triangle', gain: 0.24 }) // B5
}

// Soft, gentle "not quite" blip — low and short, never harsh.
export function playWrong() {
  if (muted) return
  const c = ac()
  if (!c) return
  const t = c.currentTime
  tone(c, 233.08, t, 0.24, { type: 'sine', gain: 0.22, slideTo: 155.56 }) // Bb3 → Eb3
}

// Little four-note fanfare for finishing a lesson.
export function playComplete() {
  if (muted) return
  const c = ac()
  if (!c) return
  const t = c.currentTime
  const notes = [523.25, 659.25, 783.99, 1046.5] // C5 E5 G5 C6
  notes.forEach((f, i) => tone(c, f, t + i * 0.11, 0.2, { type: 'triangle', gain: 0.15 }))
}

// Brighter flourish for earning a badge / finishing a level.
export function playLevelUp() {
  if (muted) return
  const c = ac()
  if (!c) return
  const t = c.currentTime
  const notes = [659.25, 880, 1108.73, 1318.51] // E5 A5 C#6 E6
  notes.forEach((f, i) => tone(c, f, t + i * 0.1, 0.24, { type: 'triangle', gain: 0.15 }))
}
