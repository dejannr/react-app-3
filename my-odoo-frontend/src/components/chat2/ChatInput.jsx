// src/components/chat/ChatInput.jsx
import React, { useRef } from 'react'

export default function ChatInput({ onSend, disabled }) {
  const inputRef = useRef()

  const send = () => {
    const text = inputRef.current.value.trim()
    if (text) {
      onSend(text)
      inputRef.current.value = ''
    }
  }

  return (
    <div className="chat-input">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message…"
        onKeyDown={e => e.key === 'Enter' && send()}
        disabled={disabled}
      />
      <button onClick={send} disabled={disabled}>
        Send
      </button>
    </div>
  )
}
