import React, { useState } from 'react'
import axios from 'axios'
import FormBuilder from './FormBuilder.jsx'

/**
 * Props:
 *   endpoint (string): Odoo POST route, e.g. "/submit_form"
 *   schema   (obj)   : FormBuilder schema
 *   title    (string): optional header
 */
export default function FetchForm({ endpoint, schema, title }) {
  const [resp, setResp]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleSubmit = async (values) => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post(`/api${endpoint}`, values)
      // auto-unwrap JSON-RPC envelopes if present
      setResp(res.data.result ?? res.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {title && <h4>{title}</h4>}
      <FormBuilder schema={schema} onSubmit={handleSubmit} />
      {loading && <p>Submitting…</p>}
      {error   && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {resp    && (
        <pre style={{ background: '#f0f0f0', padding: '1rem', marginTop: '.5rem' }}>
          {JSON.stringify(resp, null, 2)}
        </pre>
      )}
    </div>
  )
}
