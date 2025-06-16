import React, { useEffect, useRef } from 'react'
import filtersIcon   from '../../img/filters.png'
import ChatComposer  from './ChatComposer.jsx'
import ChatLoader    from './ChatLoader.jsx'

export default function ChatMain({
  chatId,
  messages,
  loading,          // waiting for bot reply
  historyLoading,   // waiting for lu.chatresult
  canceled,
  error,
  onSend,
  onCancel,
  onOpenFilters,
}) {
  const waiting = loading && !canceled

  /* ───── Auto-scroll ───── */
  const bottomRef      = useRef(null)
  const firstRenderRef = useRef(true)      // instant scroll on first load
  const prevChatIdRef  = useRef(chatId)

  useEffect(() => {
    // reset rule whenever the user picks a different chat
    if (prevChatIdRef.current !== chatId) {
      firstRenderRef.current = true
      prevChatIdRef.current  = chatId
    }

    if (!bottomRef.current) return
    bottomRef.current.scrollIntoView({
      behavior: firstRenderRef.current ? 'auto' : 'smooth',
    })
    firstRenderRef.current = false
  }, [chatId, messages, waiting])

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
                  ? m.component
                  : m.from === 'bot'
                    ? <div dangerouslySetInnerHTML={{ __html: m.text }} />
                    : <p>{m.text}</p>
                }
              </div>
            ))}

            {waiting && <ChatLoader />}

            {/* — loader overlay while history is loading — */}
            {/*{historyLoading && (*/}
            {/*  <div className="history-loader-overlay">*/}
            {/*    <ChatLoader />*/}
            {/*  </div>*/}
            {/*)}*/}

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
