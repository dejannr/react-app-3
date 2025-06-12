// src/components/chat/ChatWindow.jsx
import React, { useRef, useEffect } from 'react'
import '../../styles/chat.css'

export default function ChatWindow({ messages }) {
  const ref = useRef(null)

  // auto-scroll to bottom
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="chat-window" ref={ref}>
      {messages.map((msg, i) => (
        <React.Fragment key={i}>{msg}</React.Fragment>
      ))}
    </div>
  )
}
