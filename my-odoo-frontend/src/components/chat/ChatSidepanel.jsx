import React from 'react'
import logo from '../../img/logo.png'

export default function ChatSidepanel({ chats }) {
  return (
    <div className="chat-sidepanel">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>

      <h2 className="heading">Chats</h2>

      <div className="bubbles">
        {chats.map(({ id, title, active }) => (
          <div key={id} className={`bubble ${active ? 'active' : ''}`}>
            <h3>{title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
