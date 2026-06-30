import { useEffect, useMemo, useState } from 'react'
import { THREADS } from '../data/feed.js'

// Seeded PRNG so the curated "From Bengal" picks rotate once per day.
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function shuffleSeeded(arr, seed) {
  const rand = mulberry32(seed)
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const pad = (n) => String(n).padStart(2, '0')

// A curated, hand-written Bengal fact (read-only thread).
function CuratedThread({ thread }) {
  const multi = thread.posts.length > 1
  return (
    <article className="thread">
      <header className="thread-head">
        <div className={`t-avatar av-${thread.author.color}`}>{thread.author.emoji}</div>
        <div className="t-id">
          <span className="t-name">{thread.author.name}</span>
          <span className="t-handle">@{thread.author.handle}</span>
        </div>
        <span className={`t-cat cat-${thread.category}`}>{thread.category}</span>
      </header>
      <div className={`thread-body ${multi ? 'threaded' : ''}`}>
        {thread.posts.map((p, i) => (
          <div className="t-post" key={i}>
            {multi && <span className="t-dot" />}
            <p>{p}</p>
          </div>
        ))}
      </div>
    </article>
  )
}

// A live "On this day in history" item fetched from Wikipedia.
function LiveCard({ item }) {
  const page = item.pages && item.pages[0]
  const thumb = page && page.thumbnail && page.thumbnail.source
  const url =
    page && page.content_urls && (page.content_urls.desktop || page.content_urls.mobile)
  const href = url && url.page
  return (
    <article className="thread">
      <header className="thread-head">
        <div className="t-avatar av-indigo">📅</div>
        <div className="t-id">
          <span className="t-name">On This Day</span>
          <span className="t-handle">via Wikipedia</span>
        </div>
        <span className="t-cat cat-history">{item.year}</span>
      </header>
      <div className="thread-body">
        <div className="t-post">
          <p>{item.text}</p>
        </div>
        {thumb && <img className="t-thumb" src={thumb} alt="" loading="lazy" />}
        {href && (
          <a className="t-link" href={href} target="_blank" rel="noreferrer">
            Read on Wikipedia ↗
          </a>
        )}
      </div>
    </article>
  )
}

export function Feed() {
  const { dateLabel, mm, dd, bengalPicks } = useMemo(() => {
    const now = new Date()
    const daySeed = Math.floor(now.getTime() / 86_400_000)
    return {
      mm: pad(now.getMonth() + 1),
      dd: pad(now.getDate()),
      bengalPicks: shuffleSeeded(THREADS, daySeed).slice(0, 4),
      dateLabel: now.toLocaleDateString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }
  }, [])

  const [live, setLive] = useState({ loading: true, items: [], error: false })

  useEffect(() => {
    let active = true
    const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/selected/${mm}/${dd}`
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('bad status')
        return r.json()
      })
      .then((data) => {
        if (!active) return
        const items = (data.selected || []).filter((x) => x && x.text).slice(0, 8)
        setLive({ loading: false, items, error: items.length === 0 })
      })
      .catch(() => active && setLive({ loading: false, items: [], error: true }))
    return () => {
      active = false
    }
  }, [mm, dd])

  return (
    <div>
      <div className="hero">
        <h1>Bengal Feed</h1>
        <p>Curated Bengal facts, plus a live “on this day” from history.</p>
      </div>

      <div className="feed-date">🗓️ {dateLabel}</div>

      <h2 className="section">From Bengal</h2>
      <div className="feed">
        {bengalPicks.map((t) => (
          <CuratedThread key={t.id} thread={t} />
        ))}
      </div>

      <h2 className="section">On this day in history</h2>
      <p className="feed-note">🔄 Fetched live each day · powered by Wikipedia</p>
      <div className="feed">
        {live.loading && (
          <>
            <div className="thread skeleton" />
            <div className="thread skeleton" />
            <div className="thread skeleton" />
          </>
        )}
        {!live.loading && live.error && (
          <p className="feed-note">
            Couldn’t load today’s live history (you may be offline). The curated Bengal
            facts above are always available.
          </p>
        )}
        {!live.loading &&
          !live.error &&
          live.items.map((item, i) => <LiveCard key={i} item={item} />)}
      </div>
    </div>
  )
}
