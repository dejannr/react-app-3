// src/components/chat/ChatBubble.jsx
import React from 'react'

export default function ChatBubble({ from, children }) {
  // from: 'user' or 'bot'
  return (
    <div className={`chat-msg ${from}`}>
      {children}
    </div>
  )
}
