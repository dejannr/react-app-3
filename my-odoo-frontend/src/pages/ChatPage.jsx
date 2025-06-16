// src/pages/ChatPage.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useFetch }      from '../hooks/useFetch.jsx'
import { usePost }       from '../hooks/usePost.jsx'
import useSearchRead     from '../hooks/useSearchRead.jsx'   // ← fixed path

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

  /* ───── Filters UI state ───── */
  const [showFilters, setShowFilters] = useState(false)

  /* ───── Fetch chat list ───── */
  const {
    data:    chatList,          // [{ id, name }, …]
    loading: loadingChatList,
    error:   errorChatList,
  } = useSearchRead(
    'lu.report',
    [['usage_mode', '=', 'chat']],
    ['id', 'name'],
  )

  /* ───── Fetch chat history ───── */
  const {
    data:    chatResults,       // [{ name, chat_result, datetime_created }, …]
    loading: loadingChatResults,
    error:   errorChatResults,
  } = useSearchRead(
    'lu.chatresult',
    [['report_id', '=', chatId]],
    ['name', 'chat_result', 'datetime_created'],
  )

  /* ───── Selected chat ───── */
  const chat = useMemo(
    () => (chatList || []).find(c => c.id === chatId),
    [chatList, chatId],
  )

  /* ───── Assemble message array from history ───── */
  const [msgs, setMsgs] = useState([])
  useEffect(() => {
    if (!chatResults) return

    // sort by creation time (oldest → newest)
    const sorted = [...chatResults].sort(
      (a, b) => new Date(a.datetime_created) - new Date(b.datetime_created),
    )

    const history = []
    sorted.forEach(r => {
      history.push({ from: 'user', text: r.name })
      history.push({ from: 'bot',  text: r.chat_result })
    })

    setMsgs(history)
  }, [chatResults])

  /* ───── POST hook with cancel ───── */
  const {
    data:    bot,
    loading: bLoading,
    error:   bError,
    postData,
    cancel,
  } = usePost('/chat')

  /* ───── Ignore-next-reply flag ───── */
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

  /* ───── Append bot reply ───── */
  useEffect(() => {
    if (bot?.reply && !ignoreNextReply.current) {
      setMsgs(prev => [...prev, { from: 'bot', text: bot.reply }])
    }
  }, [bot])

  /* ───── Render ───── */
  if (loadingChatList || loadingChatResults) return <p>Loading…</p>
  if (errorChatList)    return <p style={{ color: 'crimson' }}>Error: {errorChatList.message}</p>
  if (errorChatResults) return <p style={{ color: 'crimson' }}>Error: {errorChatResults.message}</p>

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
