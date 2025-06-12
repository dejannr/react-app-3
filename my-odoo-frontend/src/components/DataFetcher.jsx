import React from 'react'
import { useFetch } from '../hooks/useFetch.jsx'

/**
 * Props:
 *   endpoint (string): Odoo route, e.g. "/chat_page"
 *   params   (obj)   : optional query params
 *   auto     (bool)  : fetch on mount? default true
 *   title    (string): optional header
 */
export default function DataFetcher({
  endpoint,
  params = {},
  auto = true,
  title
}) {
  const { data, loading, error, refetch } = useFetch(endpoint, params, auto)

  return (
    <div>
      {title && <h4>{title}</h4>}
      {loading
        ? <p>Loading…</p>
        : error
        ? <p style={{ color: 'red' }}>Error: {error.message}</p>
        : data
        && (
          <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )
      }
      {refetch && (
        <button onClick={refetch} style={{ marginTop: '.5rem' }}>
          Reload
        </button>
      )}
    </div>
  )
}
