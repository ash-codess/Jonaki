import { useState } from 'react'
import { useGame } from '../game/GameContext.jsx'
import { Mascot } from './Bits.jsx'
import { warmUpSpeech } from '../game/speech.js'
import { unlockAudio } from '../game/sfx.js'

export default function Onboarding() {
  const { dispatch } = useGame()
  const [name, setName] = useState('')

  function go() {
    warmUpSpeech() // unlock/preload TTS while we have a user gesture
    unlockAudio() // unlock the sound-effects audio context too
    dispatch({ type: 'SET_NAME', name: name || 'Bondhu' })
  }

  return (
    <div className="center-stage">
      <div className="bn-big">জোনাকি</div>
      <h1>Jonaki</h1>
      <p className="muted" style={{ maxWidth: 360, marginTop: -6 }}>
        <em>“firefly”</em> — light up your Bengali, one playful lesson at a time.
      </p>
      <Mascot mood="wave" size={96} />
      <p style={{ fontWeight: 700, marginBottom: -4 }}>Hi! I’m Moyna 🦚 — what should I call you?</p>
      <input
        className="namefield"
        value={name}
        autoFocus
        placeholder="Your name"
        maxLength={24}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && go()}
      />
      <button className="btn lg" onClick={go}>Let’s begin ▶</button>
      <p className="muted" style={{ fontSize: 12 }}>
        No sign-up · your progress lives in this browser tab for the session.
      </p>
    </div>
  )
}
