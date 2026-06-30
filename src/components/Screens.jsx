import { useRef, useState } from 'react'
import { LEVELS } from '../data/curriculum.js'
import { useGame } from '../game/GameContext.jsx'
import { Mascot, MascotSays, Confetti } from './Bits.jsx'

// ─────────────────────────────  Badge wall  ───────────────────────────────
export function BadgeWall() {
  const { state } = useGame()
  const earned = Object.keys(state.badges).length
  return (
    <div>
      <div className="hero">
        <h1>Showcase Wall</h1>
        <p>{earned} of {LEVELS.length} badges earned</p>
      </div>
      <div className="grid-cards">
        {LEVELS.map((lv) => {
          const has = !!state.badges[lv.id]
          return (
            <div className={`badge ${has ? '' : 'locked'}`} key={lv.id}>
              <div className="medal">{has ? lv.badge.emoji : '🔒'}</div>
              <h4>{lv.badge.name}</h4>
              <p>{has ? lv.badge.tagline : `Finish Level ${lv.id}`}</p>
            </div>
          )
        })}
      </div>
      {earned === 0 && (
        <div style={{ marginTop: 24 }}>
          <MascotSays mood="idle">Complete a whole level to earn your first badge!</MascotSays>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────  Certificate  ──────────────────────────────
export function Certificate({ onClose }) {
  const { state } = useGame()
  const [toast, setToast] = useState(null)
  const name = state.name || 'Bondhu'
  const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  function drawCanvas() {
    const c = document.createElement('canvas')
    c.width = 1200
    c.height = 850
    const x = c.getContext('2d')
    // background
    x.fillStyle = '#fff7ee'
    x.fillRect(0, 0, 1200, 850)
    // border
    x.strokeStyle = '#e08a1e'
    x.lineWidth = 14
    x.strokeRect(34, 34, 1132, 782)
    x.strokeStyle = '#d96c46'
    x.lineWidth = 4
    x.strokeRect(56, 56, 1088, 738)
    x.textAlign = 'center'
    x.fillStyle = '#b4502e'
    x.font = 'bold 28px "Baloo 2", sans-serif'
    x.fillText('CERTIFICATE OF COMPLETION', 600, 170)
    x.fillStyle = '#0e5f5c'
    x.font = 'bold 70px "Baloo Da 2","Nirmala UI", sans-serif'
    x.fillText('জোনাকি · Jonaki', 600, 270)
    x.fillStyle = '#6c5d4f'
    x.font = '26px "Baloo 2", sans-serif'
    x.fillText('This certifies that', 600, 350)
    x.fillStyle = '#2b2018'
    x.font = 'bold 56px "Baloo 2", sans-serif'
    x.fillText(name, 600, 425)
    x.strokeStyle = '#f4a93c'
    x.lineWidth = 3
    x.beginPath()
    x.moveTo(400, 445)
    x.lineTo(800, 445)
    x.stroke()
    x.fillStyle = '#6c5d4f'
    x.font = '26px "Baloo 2", sans-serif'
    x.fillText('has completed all 8 levels of the Bengali basics course,', 600, 500)
    x.fillText('mastering reading, writing, and speaking foundations.', 600, 540)
    x.fillStyle = '#d96c46'
    x.font = '46px "Baloo Da 2","Nirmala UI", sans-serif'
    x.fillText('— শুভেচ্ছা ও অভিনন্দন —', 600, 630)
    x.fillStyle = '#6c5d4f'
    x.font = '22px "Baloo 2", sans-serif'
    x.fillText(`Awarded ${date}  ·  ${state.xp} XP earned`, 600, 700)
    // seal
    x.beginPath()
    x.arc(1000, 700, 60, 0, Math.PI * 2)
    x.fillStyle = '#d96c46'
    x.fill()
    x.fillStyle = '#fff'
    x.font = '50px serif'
    x.fillText('🪷', 1000, 718)
    return c
  }

  function download() {
    try {
      const c = drawCanvas()
      const url = c.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = `jonaki-certificate-${name.replace(/\s+/g, '-').toLowerCase()}.png`
      a.click()
      setToast('Certificate downloaded! 🎉')
    } catch {
      setToast('Could not download — try a screenshot instead.')
    }
    setTimeout(() => setToast(null), 2500)
  }

  async function share() {
    const text = `I just completed all 8 levels of Bengali on Jonaki! ✨ ${state.xp} XP earned.`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Jonaki', text })
      } else {
        await navigator.clipboard.writeText(text)
        setToast('Copied to clipboard! 📋')
      }
    } catch {
      setToast('Sharing cancelled.')
    }
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="sheet">
      <Confetti />
      <div className="sheet-head">
        {onClose && <button className="iconbtn" onClick={onClose} aria-label="Close">✕</button>}
        <div className="lesson-bar" />
      </div>
      <div className="sheet-body" style={{ maxWidth: 680 }}>
        <div className="center" style={{ marginBottom: 8 }}>
          <Mascot mood="cheer" size={80} />
          <h1 style={{ margin: '8px 0 0' }}>You did it, {name}!</h1>
          <p className="muted">All 8 levels complete. Here is your certificate.</p>
        </div>

        <div className="cert">
          <div className="kicker">CERTIFICATE OF COMPLETION</div>
          <h1 className="bn">জোনাকি · Jonaki</h1>
          <p className="muted">This certifies that</p>
          <div className="name">{name}</div>
          <p className="muted">
            has completed all 8 levels of the Bengali basics course — mastering the
            foundations of reading, writing, and speaking.
          </p>
          <div className="flourish bn">— শুভেচ্ছা ও অভিনন্দন —</div>
          <div className="meta">Awarded {date} · {state.xp} XP earned</div>
          <div className="seal">🪷</div>
        </div>

        <div className="row" style={{ gap: 12, marginTop: 18 }}>
          <button className="btn amber block" onClick={download}>⬇ Download PNG</button>
          <button className="btn ghost block" onClick={share}>🔗 Share</button>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
