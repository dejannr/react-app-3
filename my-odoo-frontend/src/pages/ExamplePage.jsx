// src/pages/ExamplePage.jsx
import React from 'react'
import { useFetch } from '../hooks/useFetch.jsx'
import DataFetcher from '../components/DataFetcher.jsx'
import FetchForm   from '../components/FetchForm.jsx'

export default function ExamplePage() {
  // 1) Fetch current user on mount
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    // no need for refetch here
  } = useFetch('/get_username', {}, true)

  // 2) While loading user info
  if (userLoading) {
    return <p>Loading user info…</p>
  }

  // 3) If error or no login, ask to log in
  if (userError || !userData?.login) {
    return (
      <div style={{ padding: '1rem', color: 'crimson' }}>
        You need to log in to your Odoo server first.
      </div>
    )
  }

  // 4) At this point userData.login & userData.name are available
  return (
    <div style={{ padding: '1rem' }}>
      <p>
        Logged in as <strong>{userData.name} ({userData.login})</strong>
      </p>

      <hr style={{ margin: '2rem 0' }}/>

      {/* Chat data auto-fetched */}
      <DataFetcher
        endpoint="/chat_page"
        params={{}}
        auto={true}
        title="🔄 Chat Page Data"
      />

      <hr style={{ margin: '2rem 0' }}/>

      {/* Hello-form */}
      <FetchForm
        endpoint="/submit_form"
        schema={{
          id: 'hello_form',
          fields: [
            { name: 'name',   label: 'Your Name', widget: 'text', required: true, placeholder: 'e.g. Alice' },
            { name: 'age',    label: 'Your Age',  widget: 'number' },
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
        title="✉️ Send Hello Form"
      />
    </div>
  )
}
