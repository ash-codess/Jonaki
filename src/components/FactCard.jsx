import { Confetti, MascotSays } from './Bits.jsx'

export default function FactCard({ fact, onClose }) {
  return (
    <div className="sheet">
      <Confetti count={40} />
      <div className="sheet-head">
        <button className="iconbtn" onClick={onClose} aria-label="Close">✕</button>
        <div className="lesson-bar" />
      </div>
      <div className="sheet-body center" style={{ justifyContent: 'center' }}>
        <div className="fact-card">
          <span className="tag">Did you know?</span>
          <div className="emoji">{fact.emoji}</div>
          <h2>{fact.title}</h2>
          <p>{fact.body}</p>
        </div>
        <div style={{ marginTop: 18 }}>
          <MascotSays mood="happy">Now back to learning!</MascotSays>
        </div>
        <div className="spacer" />
        <button className="btn block lg" onClick={onClose}>Got it!</button>
      </div>
    </div>
  )
}
