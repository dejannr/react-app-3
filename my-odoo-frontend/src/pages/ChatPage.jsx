import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { usePost }      from '../hooks/usePost.jsx'
import useSearchRead    from '../hooks/useSearchRead.jsx'

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

  /* ───── Filters UI ───── */
  const [showFilters, setShowFilters] = useState(false)

  /* ───── Chat list (left sidebar) ───── */
  const {
    data:    chatList,
    loading: loadingChatList,
    error:   errorChatList,
  } = useSearchRead(
    'lu.report',
    [['usage_mode', '=', 'chat']],
    ['id', 'name'],
  )

  /* ───── Chat history (lu.chatresult) ───── */
  const {
    data:    chatResults,
    loading: loadingChatResults,          // ← flag we’ll pass down
    error:   errorChatResults,
  } = useSearchRead(
    'lu.chatresult',
    [['report_id', '=', chatId]],
    ['name', 'chat_result', 'datetime_created'],
  )

  /* ───── Build message array once results arrive ───── */
  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    if (!chatResults) return          // keep old msgs while new history loads

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

  /* ───── Chat POST hook ───── */
  const {
    data:    bot,
    loading: bLoading,
    error:   bError,
    postData,
    cancel,
  } = usePost('/chat')

  const ignoreNextReply = useRef(false)

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

  useEffect(() => {
    if (bot?.reply && !ignoreNextReply.current) {
      setMsgs(prev => [...prev, { from: 'bot', text: bot.reply }])
    }
  }, [bot])

  /* ───── Render ───── */
  if (loadingChatList)               // only the very first time
    return <p>Loading…</p>
  if (errorChatList)
    return <p style={{ color: 'crimson' }}>Error: {errorChatList.message}</p>
  if (errorChatResults)
    return <p style={{ color: 'crimson' }}>Error: {errorChatResults.message}</p>

  return (
    <ChatWrapper>
      <ChatSidepanel chats={chatList || []} />

      <ChatFilters
        open={showFilters}
        onClose={() => setShowFilters(false)}
      />

      <ChatMain
        chatId={chatId}
        messages={msgs}
        loading={bLoading}
        historyLoading={loadingChatResults}
        error={bError}
        onSend={handleSend}
        onCancel={handleCancel}
        onOpenFilters={() => setShowFilters(true)}
      />
    </ChatWrapper>
  )
}
