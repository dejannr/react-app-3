import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch.jsx'
import { usePost }  from '../hooks/usePost.jsx'

import ChatWrapper   from '../components/chat/ChatWrapper.jsx'
import ChatSidepanel from '../components/chat/ChatSidepanel.jsx'
import ChatFilters   from '../components/chat/ChatFilters.jsx'
import ChatMain      from '../components/chat/ChatMain.jsx'
import '../styles/resetstyle.css'
import '../styles/chat.css'

export default function ChatPage() {
  // ─────── User check ───────
  const { data: user, loading: uLoading, error: uError } =
    useFetch('/get_username', {}, true)

  // ─────── Bot POST hook ───────
  const {
    data: bot,
    loading: bLoading,
    error:  bError,
    postData,
  } = usePost('/chat')

  // ─────── Chat state ───────
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
    { from: 'bot',  text: 'Absolutely! Let’s rock and roll — what’s on the agenda today?' },
    { from: 'user', text: 'Tell me something about excavation.' },
    { from: 'bot',  component: initialBotReply },
  ])

  const [showFilters, setShowFilters] = useState(false)

  // ─────── Append bot reply from hook ───────
  useEffect(() => {
    if (bot?.reply) {
      setMsgs(prev => [...prev, { from: 'bot', text: bot.reply }])
    }
  }, [bot])

  // ─────── Send handler ───────
  const handleSend = (text) => {
    setMsgs(prev => [...prev, { from: 'user', text }])
    postData({ message: text })
  }

  // ─────── Early returns ───────
  if (uLoading) return <p>Checking login…</p>
  if (uError || !user?.login) {
    return <p style={{ color: 'crimson' }}>Please log in to Odoo first.</p>
  }

  // ─────── Dummy chat list (replace with real data later) ───────
  const chatList = [
    { id: 1, title: '2024_42 Disruption log May 22/May 23', active: true },
    { id: 2, title: '2024_42 Disruption log May 24/May 25' },
    { id: 3, title: '2024_42 Disruption log May 26/May 27' },
    { id: 4, title: '2024_42 Disruption log May 28/May 29' },
  ]

  return (
    <ChatWrapper>
      <ChatSidepanel chats={chatList} />

      <ChatFilters open={showFilters} onClose={() => setShowFilters(false)}>
        {/* 👉 put real filter controls here */}
      </ChatFilters>

      <ChatMain
        messages={msgs}
        loading={bLoading}
        onSend={handleSend}
        onOpenFilters={() => setShowFilters(true)}
        error={bError}
      />
    </ChatWrapper>
  )
}
