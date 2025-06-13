// src/components/chat/ChatContainer.jsx
import React from 'react'

export default function ChatContainer({ header, children }) {
  return (
    <div className="chat-container">
      {header}
      {children}
    </div>
  )
}
