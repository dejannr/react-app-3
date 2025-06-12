import React, { useState, useEffect, useRef } from 'react'
import { useFetch }      from '../hooks/useFetch.jsx'
import { usePost }       from '../hooks/usePost.jsx'
import '../styles/chat.css'  // create this for simple styling

export default function ChatPage() {
  // 1) ensure user is logged in
  const { data: user, loading: uLoading, error: uError } = useFetch('/get_username', {}, true)

  // 2) chat hook
  const { data: bot, loading: bLoading, error: bError, postData } = usePost('/chat')

  // local message list
  const [msgs, setMsgs] = useState([])
  const inputRef = useRef()

  // when bot responds, append to msgs
  useEffect(() => {
    if (bot && bot.reply) {
      setMsgs(prev => [...prev, { from: 'bot', text: bot.reply }])
    }
  }, [bot])

  // send handler
  const send = () => {
    const txt = inputRef.current.value.trim()
    if (!txt) return
    setMsgs(prev => [...prev, { from: 'user', text: txt }])
    postData({ message: txt })
    inputRef.current.value = ''
  }

  if (uLoading) return <p>Checking login…</p>
  if (uError || !user?.login) {
    return <p style={{ color: 'crimson' }}>Please log in to Odoo first.</p>
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        Chat as <strong>{user.name}</strong>
      </header>
      <div className="chat-window">
        {msgs.map((m, i) => (
          <div key={i} className={`chat-msg ${m.from}`}>
            {m.text}
          </div>
        ))}
        {(bLoading) && <div className="chat-msg bot">…</div>}
        {(bError)   && <div className="chat-msg bot error">Error: {bError.message}</div>}
      </div>
      <div className="chat-input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message…"
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  )
}
