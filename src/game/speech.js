// Thin wrappers around the browser's built-in Web Speech API.
// No external/content API — everything runs locally in the browser.
// Bengali audio quality depends entirely on a Bengali (bn) voice being
// installed in the OS/browser. We detect that and let the UI adapt.

let voices = []
let bnVoice = null
const listeners = new Set()

function refresh() {
  if (typeof speechSynthesis === 'undefined') return
  voices = speechSynthesis.getVoices() || []
  bnVoice =
    voices.find((v) => /(^|[-_ ])bn\b|bengali|bangla/i.test(`${v.lang} ${v.name}`)) || null
  listeners.forEach((fn) => fn())
}

if (typeof speechSynthesis !== 'undefined') {
  refresh()
  speechSynthesis.onvoiceschanged = refresh
  // Voices populate asynchronously in some browsers — poll a couple of times.
  setTimeout(refresh, 400)
  setTimeout(refresh, 1500)
}

export function ttsAvailable() {
  return typeof speechSynthesis !== 'undefined'
}

export function bengaliVoiceAvailable() {
  return !!bnVoice
}

export function onVoiceChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function speak(text, { rate = 0.8 } = {}) {
  if (typeof speechSynthesis === 'undefined') return false
  try {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    if (bnVoice) {
      u.voice = bnVoice
      u.lang = bnVoice.lang
    } else {
      u.lang = 'bn-BD'
    }
    u.rate = rate
    speechSynthesis.speak(u)
    return true
  } catch {
    return false
  }
}

// Call from a user gesture (e.g. the "Begin" button) to unlock audio and
// trigger voice loading in browsers that gate speech behind interaction.
export function warmUpSpeech() {
  if (typeof speechSynthesis === 'undefined') return
  try {
    const u = new SpeechSynthesisUtterance(' ')
    u.volume = 0
    speechSynthesis.speak(u)
    refresh()
  } catch {
    /* ignore */
  }
}

export function getRecognition() {
  const SR =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
  if (!SR) return null
  const rec = new SR()
  rec.lang = 'bn-BD'
  rec.interimResults = false
  rec.maxAlternatives = 3
  return rec
}

export function recognitionAvailable() {
  return !!(
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
  )
}
