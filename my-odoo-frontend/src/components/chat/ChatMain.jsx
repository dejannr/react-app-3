// src/components/chat/ChatMain.jsx

import React, { useLayoutEffect, useRef } from 'react'
import filtersIcon   from '../../img/filters.png'
import ChatComposer  from './ChatComposer.jsx'
import ChatLoader    from './ChatLoader.jsx'

export default function ChatMain({
  chatId,
  messages,
  loading,
  canceled,
  error,
  onSend,
  onCancel,
  onOpenFilters,
}) {
  const messagesRef  = useRef(null)
  const bottomRef    = useRef(null)
  const prevChatId   = useRef(chatId)
  const prevLen      = useRef(0)

  useLayoutEffect(() => {
    if (!messagesRef.current || !bottomRef.current) return

    const len = messages.length
    let behavior = 'smooth'

    // Chat switched or first load → instant
    if (prevChatId.current !== chatId || prevLen.current === 0) {
      behavior = 'auto'
    }

    // Temporarily override the container’s scroll-behavior
    const container = messagesRef.current
    const prevScrollBehavior = container.style.scrollBehavior
    container.style.scrollBehavior = behavior

    // Jump to bottom
    bottomRef.current.scrollIntoView()

    // Restore whatever was there before
    container.style.scrollBehavior = prevScrollBehavior

    // Update refs
    prevChatId.current = chatId
    prevLen.current    = len
  }, [chatId, messages])

  return (
    <div className="chat-main">
      <div className="window">
        <div className="content">
          <div className="options-icon" onClick={onOpenFilters}>
            <img src={filtersIcon} alt="" />
          </div>

          <div
            className="messages"
            ref={messagesRef}
            style={{ overflowY: 'auto', height: '100%' }}
          >
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>
                {m.from === 'bot'
                  ? <div dangerouslySetInnerHTML={{ __html: m.text }} />
                  : <p>{m.text}</p>
                }
              </div>
            ))}

            {loading && <ChatLoader />}

            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      <ChatComposer
        onSend={onSend}
        onCancel={onCancel}
        waiting={loading && !canceled}
      />

      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>
          Error: {error.message}
        </p>
      )}
    </div>
  )
}
