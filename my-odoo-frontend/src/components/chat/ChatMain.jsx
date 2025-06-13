import React, { useEffect, useRef } from 'react'
import filtersIcon   from '../../img/filters.png'
import ChatComposer  from './ChatComposer.jsx'
import ChatLoader    from './ChatLoader.jsx'

/**
 * Main chat area: message window + composer.
 *
 * Props
 * ──────
 * messages      – array [{ from: 'user'|'bot', text|component }]
 * loading       – true while waiting for a bot reply
 * error         – error object from request (optional)
 * onSend        – fn(text)  called when user submits a message
 * onOpenFilters – fn()      opens the filters side-panel
 */
export default function ChatMain({
  messages,
  loading,
  error,
  onSend,
  onOpenFilters,
}) {
  /* ─── Auto-scroll to newest message ─── */
  const bottomRef = useRef(null)
  useEffect(() => {
    // smooth scroll only if container exists
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="chat-main">
      {/* ────────── Scrollable message window ────────── */}
      <div className="window">
        <div className="content">
          <div className="options-icon" onClick={onOpenFilters}>
            <img src={filtersIcon} alt="" />
          </div>

          <div className="messages">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>
                {m.component ? m.component : <p>{m.text}</p>}
              </div>
            ))}

            {/* Loader bubble while fetching bot reply */}
            {loading && <ChatLoader />}

            {/* Invisible anchor for auto-scroll */}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* ────────── Composer & error display ────────── */}
      <ChatComposer onSend={onSend} disabled={loading} />

      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>
          Error: {error.message}
        </p>
      )}
    </div>
  )
}
