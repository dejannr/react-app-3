// src/pages/ExamplePage.jsx
import React, { useEffect } from 'react'
import { useFetch }         from '../hooks/useFetch.jsx'
import FetchForm           from '../components/FetchForm.jsx'

export default function ExamplePage() {
  // 1) Fetch current user on mount
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetch('/get_username', {}, true)

  // 2) Fetch chat data on mount
  const {
    data: chatData,
    loading: chatLoading,
    error: chatError,
  } = useFetch('/chat_page', {}, true)

  // 3) Log chatData whenever it arrives
  useEffect(() => {
    if (chatData) {
      console.log('Chat page data:', chatData)
    }
    if (chatError) {
      console.error('Error fetching chat page:', chatError)
    }
  }, [chatData, chatError])

  // 4) While either user or chat is loading
  if (userLoading || chatLoading) {
    return <p>Loading…</p>
  }

  // 5) If user fetch failed or no login, require login
  if (userError || !userData?.login) {
    return (
      <div style={{ padding: '1rem', color: 'crimson' }}>
        You need to log in to your Odoo server first.
      </div>
    )
  }

  // 6) Otherwise render the form only
  return (
    <div style={{ padding: '1rem' }}>
      <p>
        Logged in as <strong>{userData.name} ({userData.login})</strong>
      </p>

      <hr style={{ margin: '2rem 0' }}/>

      {/* Hello‐form */}
      <FetchForm
        endpoint="/submit_form"
        title="✉️ Send Hello Form"
        schema={{
          id: 'hello_form',
          fields: [
            {
              name: 'name',
              label: 'Your Name',
              widget: 'text',
              required: true,
              placeholder: 'e.g. Alice',
            },
            {
              name: 'age',
              label: 'Your Age',
              widget: 'number',
            },
            {
              name: 'gender',
              label: 'Gender',
              widget: 'select',
              required: true,
              options: [
                { label: 'Male',   value: 'male'   },
                { label: 'Female', value: 'female' },
                { label: 'Other',  value: 'other'  },
              ],
              placeholder: 'Select gender',
            },
          ],
        }}
      />
    </div>
  )
}
