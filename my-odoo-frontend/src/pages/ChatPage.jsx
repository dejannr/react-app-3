import React, { useEffect, useRef, useState } from 'react'
import { useFetch } from '../hooks/useFetch.jsx'
import { usePost  } from '../hooks/usePost.jsx'     // ← same path, updated file

import ChatWrapper   from '../components/chat/ChatWrapper.jsx'
import ChatSidepanel from '../components/chat/ChatSidepanel.jsx'
import ChatFilters   from '../components/chat/ChatFilters.jsx'
import ChatMain      from '../components/chat/ChatMain.jsx'

import '../styles/resetstyle.css'
import '../styles/chat.css'

export default function ChatPage() {
  /* ─────────── Login check ─────────── */
  const { data: user, loading: uLoading, error: uError } =
    useFetch('/get_username', {}, true)

  /* ─────────── POST hook with cancel ─────────── */
  const {
    data:    bot,
    loading: bLoading,
    error:   bError,
    postData,
    cancel,                      // ← new cancel fn
  } = usePost('/chat')

  /* ───── Dummy starter conversation ───── */
  const initialBotReply = (
    <>
      <h1>Excavation</h1>
      <p>
        Excavation is the process of removing earth, rock or other materials
        from a site to form a cavity, hole or foundation. It’s fundamental in
        fields ranging from construction and mining to archaeology.
      </p>

      <h2>1. Purposes of Excavation</h2>
      <ul>
        <li><strong>Construction:</strong> Foundations, basements, trenches…</li>
        <li><strong>Mining &amp; Quarrying:</strong> Open-pit or underground.</li>
        <li><strong>Archaeology:</strong> Carefully uncovering artifacts.</li>
      </ul>

      <h2>2. Methods &amp; Equipment</h2>
      <ul>
        <li><strong>Manual:</strong> Shovels, picks, trowels.</li>
        <li><strong>Mechanical:</strong> Excavators, backhoes, bulldozers.</li>
        <li><strong>Specialized:</strong> Dewatering, blasting in rock.</li>
      </ul>
    </>
  )

  const [msgs, setMsgs] = useState([
    { from: 'user', text: 'Are you ready to rock and roll?' },
    { from: 'bot',  text: 'Absolutely! Let’s rock and roll—what’s on the agenda today?' },
    { from: 'user', text: 'Tell me something about excavation.' },
    { from: 'bot',  component: initialBotReply },
  ])

  /* ───── UI state ───── */
  const [showFilters, setShowFilters] = useState(false)
  const ignoreNextReply = useRef(false)

  /* ───── Handlers ───── */
  const handleSend = (text) => {
    ignoreNextReply.current = false
    setMsgs(prev => [...prev, { from: 'user', text }])
    postData({ message: text })
  }

  const handleCancel = () => {
    cancel()                                      // ← abort request
    ignoreNextReply.current = true
    setMsgs(prev => [...prev,
      { from: 'bot', text: 'You canceled the message' },
    ])
  }

  /* Append bot reply only if not canceled */
  useEffect(() => {
    if (bot?.reply && !ignoreNextReply.current) {
      setMsgs(prev => [...prev, { from: 'bot', text: bot.reply }])
    }
  }, [bot])

  /* ───── Early returns ───── */
  if (uLoading) return <p>Checking login…</p>
  if (uError || !user?.login) {
    return <p style={{ color: 'crimson' }}>Please log in to Odoo first.</p>
  }

  /* Dummy chat list */
  const chatList = [
    { id: 1, title: '2024_42 Disruption log May 22/May 23', active: true },
    { id: 2, title: '2024_42 Disruption log May 24/May 25' },
    { id: 3, title: '2024_42 Disruption log May 26/May 27' },
    { id: 4, title: '2024_42 Disruption log May 28/May 29' },
  ]

  /* ───── Render ───── */
  return (
    <ChatWrapper>
      <ChatSidepanel chats={chatList} />

      <ChatFilters
        open={showFilters}
        onClose={() => setShowFilters(false)}
      />

      <ChatMain
        messages={msgs}
        loading={bLoading}
        error={bError}
        onSend={handleSend}
        onCancel={handleCancel}
        onOpenFilters={() => setShowFilters(true)}
      />
    </ChatWrapper>
  )
}
