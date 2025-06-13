import React, { useState } from 'react'
import attachIcon from '../../img/attach.png'
import sendIcon   from '../../img/send.png'
import cancelIcon from '../../img/cancel.png'

/**
 * Bottom input bar.
 *
 * Props
 * ──────
 * onSend   – fn(text)     called when user submits
 * onCancel – fn()         called when user clicks cancel
 * waiting  – boolean      true while reply is pending
 */
export default function ChatComposer({ onSend, onCancel, waiting = false }) {
  const [text, setText] = useState('')

  const submit = () => {
    if (!text.trim() || waiting) return
    onSend(text.trim())
    setText('')
  }

  const handleButton = () => {
    if (waiting) onCancel()
    else         submit()
  }

  return (
    <div className="input">
      <div className="content">
        <div className="attach">
          <img src={attachIcon} alt="" />
        </div>

        <input
          type="text"
          placeholder="Type here..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          disabled={waiting}
        />

        <div
          className={`send ${waiting ? 'cancel' : ''}`}
          onClick={handleButton}
          title={waiting ? 'Cancel' : 'Send'}
        >
          <img src={waiting ? cancelIcon : sendIcon} alt="" />
        </div>
      </div>
    </div>
  )
}
