// src/pages/ChatPage.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useFetch } from '../hooks/useFetch.jsx'
import { usePost  } from '../hooks/usePost.jsx'
import useSearchRead from '../hooks/useSearchRaad.jsx'   // ← fixed path

import ChatWrapper   from '../components/chat/ChatWrapper.jsx'
import ChatSidepanel from '../components/chat/ChatSidepanel.jsx'
import ChatFilters   from '../components/chat/ChatFilters.jsx'
import ChatMain      from '../components/chat/ChatMain.jsx'

import '../styles/resetstyle.css'
import '../styles/chat.css'

export default function ChatPage() {
  /* ───── URL param ───── */
  const { id } = useParams()
  const chatId = Number(id)

  /* ───── Fetch chat list from Odoo ───── */
  const {
    data:    chatList,          // array of {id, name}
    loading: loadingChatList,
    error:   errorChatList,
  } = useSearchRead(
    'lu.report',
    [['usage_mode', '=', 'chat']],   // domain
    ['id', 'name'],                  // fields
  )

  /* ───── Find selected chat ───── */
  const chat = useMemo(
    () => (chatList || []).find(c => c.id === chatId),
    [chatList, chatId],
  )

  /* ───── POST hook with cancel ───── */
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
    </>
  )

  /* ───── Message state ───── */
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
    setMsgs(prev => [...prev, { from: 'bot', text: 'You canceled the message' }])
  }

  /* ───── Process bot reply ───── */
  useEffect(() => {
    if (bot?.reply && !ignoreNextReply.current) {
      setMsgs(prev => [...prev, { from: 'bot', text: bot.reply }])
    }
  }, [bot])

  /* ───── Render ───── */
  if (loadingChatList) return <p>Loading chats…</p>
  if (errorChatList)   return <p style={{ color: 'crimson' }}>Error: {errorChatList.message}</p>

  return (
    <ChatWrapper>
      <ChatSidepanel chats={chatList || []} />

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
