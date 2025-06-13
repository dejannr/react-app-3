import React from 'react'
import closeIcon from '../../img/close.png'

export default function ChatFilters({ open, onClose, children }) {
  return (
    <div className={`chat-filters ${open ? 'open' : 'hidden'}`}>
      <div className="overlay" onClick={onClose} />
      <div className="content">
        <div className="close" onClick={onClose}>
          <img src={closeIcon} alt="" />
        </div>
        {children}
      </div>
    </div>
  )
}
