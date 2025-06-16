// src/pages/ChatPage.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.jsx'
import { usePost  } from '../hooks/usePost.jsx'

import ChatWrapper   from '../components/chat/ChatWrapper.jsx'
import ChatSidepanel from '../components/chat/ChatSidepanel.jsx'
import ChatFilters   from '../components/chat/ChatFilters.jsx'
import ChatMain      from '../components/chat/ChatMain.jsx'

import '../styles/resetstyle.css'
import '../styles/chat.css'

// dummy list of chats; you can fetch this instead if you like
const CHAT_LIST = [
  { id: 1, title: '2024_42 Disruption log May 22/May 23' },
  { id: 2, title: '2024_42 Disruption log May 24/May 25' },
  { id: 3, title: '2024_42 Disruption log May 26/May 27' },
  { id: 4, title: '2024_42 Disruption log May 28/May 29' },
]

export default function ChatPage() {
  const { id } = useParams()
  const chatId = Number(id)

  // find this chat in the list
  const chat = useMemo(() => CHAT_LIST.find(c => c.id === chatId), [chatId])
  // if chat not found you could show a 404 or redirect

  /* ─────────── POST hook with cancel ─────────── */
  const {
    data:    bot,
    loading: bLoading,
    error:   bError,
    postData,
    cancel,
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
      {/* ... */}
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
    postData({ message: text, chatId })
  }

  const handleCancel = () => {
    cancel()
    ignoreNextReply.current = true
    setMsgs(prev => [...prev,
      { from: 'bot', text: 'You canceled the message' },
    ])
  }

  useEffect(() => {
    if (bot?.reply && !ignoreNextReply.current) {
      setMsgs(prev => [...prev, { from: 'bot', text: bot.reply }])
    }
  }, [bot])

  return (
    <ChatWrapper>
      <ChatSidepanel chats={CHAT_LIST} />

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
