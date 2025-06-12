// src/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch.jsx'
import { usePost }  from '../hooks/usePost.jsx'
import ChatContainer from '../components/chat/ChatContainer.jsx'
import ChatHeader    from '../components/chat/ChatHeader.jsx'
import ChatWindow    from '../components/chat/ChatWindow.jsx'
import ChatBubble    from '../components/chat/ChatBubble.jsx'
import ChatInput     from '../components/chat/ChatInput.jsx'
import attachIcon from '../img/attach.png'
import sendIcon from '../img/send.png'
import '../styles/resetstyle.css'

export default function ChatPage() {
  // fetch user
  const { data: user, loading: uLoading, error: uError } = useFetch('/get_username', {}, true)
  // chat post
  const { data: bot, loading: bLoading, error: bError, postData } = usePost('/chat')

  const [msgs, setMsgs] = useState([])

  // append bot reply
  useEffect(() => {
    if (bot?.reply) {
      setMsgs(prev => [...prev, { from: 'bot', text: bot.reply }])
    }
  }, [bot])

  const handleSend = (text) => {
    setMsgs(prev => [...prev, { from: 'user', text }])
    postData({ message: text })
  }

  if (uLoading) return <p>Checking login…</p>
  if (uError || !user?.login) {
    return <p style={{ color: 'crimson' }}>Please log in to Odoo first.</p>
  }

  const header = <ChatHeader title={`Chat as ${user.name}`} />

  // return (
  //   <ChatContainer header={header}>
  //     <ChatWindow
  //       messages={msgs.map((m,i) => (
  //         <ChatBubble key={i} from={m.from}>{m.text}</ChatBubble>
  //       ))}
  //     />
  //     <ChatInput onSend={handleSend} disabled={bLoading} />
  //     {bError && <p style={{ color: 'red', textAlign: 'center' }}>Error: {bError.message}</p>}
  //   </ChatContainer>
  // )
  return (
      <>
        <div className="chat-wrapper">
          <div className="chat-sidepanel">
            <div className="logo"></div>
            <div className="bubbles">
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
            </div>
          </div>
          <div className="chat-main">
            <div className="window">
              <div className="content"></div>
            </div>
            <div className="input">
              <div className="content">
                <div className="attach">
                  <img src={attachIcon} alt=""/>
                </div>
                <input type="text" placeholder="Type here..."/>
                <div className="send">
                  <img src={sendIcon} alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}
