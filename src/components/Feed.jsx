import { useState } from 'react'
import { THREADS, FEED_FILTERS } from '../data/feed.js'

function fmt(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${n}`
}

function Thread({ thread }) {
  const [liked, setLiked] = useState(false)
  const likeCount = thread.likes + (liked ? 1 : 0)
  const multi = thread.posts.length > 1
  return (
    <article className="thread">
      <header className="thread-head">
        <div className={`t-avatar av-${thread.author.color}`}>{thread.author.emoji}</div>
        <div className="t-id">
          <span className="t-name">{thread.author.name}</span>
          <span className="t-handle">@{thread.author.handle} · {thread.time}</span>
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

      <footer className="thread-actions">
        <span className="t-action" title="Replies">💬 {fmt(thread.replies)}</span>
        <span className="t-action" title="Reposts">🔁 {fmt(thread.reposts)}</span>
        <button
          className={`t-action like ${liked ? 'on' : ''}`}
          onClick={() => setLiked((v) => !v)}
          title="Like"
        >
          {liked ? '❤️' : '🤍'} {fmt(likeCount)}
        </button>
        <span className="t-action" title="Share">🔗</span>
      </footer>
    </article>
  )
}

export function Feed() {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? THREADS : THREADS.filter((t) => t.category === filter)
  return (
    <div>
      <div className="hero">
        <h1>Bengal Feed</h1>
        <p>Threads on the history &amp; modern life of Bengal — scroll, learn, tap ❤️.</p>
      </div>

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
