import React, { useState } from 'react'
import attachIcon from '../../img/attach.png'
import sendIcon   from '../../img/send.png'

/**
 * Bottom input bar for composing and sending messages.
 *
 * Props
 * ──────
 * onSend   (fn)   – called with the trimmed text when user hits Enter or clicks send
 * disabled (bool) – disables input & send button while a request is in flight
 */
export default function ChatComposer({ onSend, disabled = false }) {
  const [text, setText] = useState('')

  const submit = () => {
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText('')
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
          disabled={disabled}
        />

        <div
          className={`send ${disabled ? 'disabled' : ''}`}
          onClick={submit}
          title={disabled ? 'Waiting for reply…' : 'Send'}
        >
          <img src={sendIcon} alt="" />
        </div>
      </div>
    </div>
  )
}
