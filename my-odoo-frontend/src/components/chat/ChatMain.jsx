// src/pages/ChatMain.jsx
import React, { useEffect, useRef } from 'react'
import filtersIcon   from '../../img/filters.png'
import ChatComposer  from './ChatComposer.jsx'
import ChatLoader    from './ChatLoader.jsx'

/**
 * Main chat area: message window + composer.
 */
export default function ChatMain({
  messages,
  loading,
  canceled,
  error,
  onSend,
  onCancel,
  onOpenFilters,
}) {
  /* Are we waiting for a reply now? */
  const waiting = loading && !canceled

  /* Auto-scroll on new content */
  const bottomRef = useRef(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, waiting])

  return (
    <div className="chat-main">
      {/* ─────── Message window ─────── */}
      <div className="window">
        <div className="content">
          <div className="options-icon" onClick={onOpenFilters}>
            <img src={filtersIcon} alt="" />
          </div>

          <div className="messages">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>
                {m.component
                  ? m.component                                            // custom React element
                  : m.from === 'bot'
                    ? <div dangerouslySetInnerHTML={{ __html: m.text }} /> // render HTML
                    : <p>{m.text}</p>                                      // user plain-text
                }
              </div>
            ))}

            {waiting && <ChatLoader />}

            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* ─────── Composer & errors ─────── */}
      <ChatComposer
        onSend={onSend}
        onCancel={onCancel}
        waiting={waiting}
      />

      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>
          Error: {error.message}
        </p>
      )}
    </div>
  )
}
