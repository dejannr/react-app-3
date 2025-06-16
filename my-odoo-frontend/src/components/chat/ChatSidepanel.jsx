// src/components/chat/ChatSidepanel.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../img/logo.png'

export default function ChatSidepanel({ chats }) {
  return (
    <div className="chat-sidepanel">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>

      <h2 className="heading">Chats</h2>

      <div className="bubbles">
        {chats.map(({ id, name }) => (
          <NavLink
            key={id}
            to={`/chat/${id}`}
            className={({ isActive }) => `bubble ${isActive ? 'active' : ''}`}
          >
            <h3>{name}</h3>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
