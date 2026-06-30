import { useMemo, useState } from 'react'
import { THREADS, FEED_FILTERS } from '../data/feed.js'

// Tiny seeded PRNG so the daily order is stable within a day but changes each day.
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

function Thread({ thread }) {
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

export function Feed() {
  const [filter, setFilter] = useState('all')

  // Reshuffle once per day (days since the Unix epoch as the seed).
  const { ordered, dateLabel } = useMemo(() => {
    const now = new Date()
    const daySeed = Math.floor(now.getTime() / 86_400_000)
    return {
      ordered: shuffleSeeded(THREADS, daySeed),
      dateLabel: now.toLocaleDateString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }
  }, [])

  const shown = filter === 'all' ? ordered : ordered.filter((t) => t.category === filter)

  return (
    <div>
      <div className="hero">
        <h1>Bengal Feed</h1>
        <p>A reading feed on the history &amp; modern life of Bengal.</p>
      </div>

      <div className="feed-date">🔄 Refreshed daily · {dateLabel}</div>

      <div className="feed-filters">
        {FEED_FILTERS.map((f) => (
          <button
            key={f.id}
            className={`fchip ${filter === f.id ? 'on' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="feed">
        {shown.map((t) => (
          <Thread key={t.id} thread={t} />
        ))}
      </div>
    </div>
  )
}
