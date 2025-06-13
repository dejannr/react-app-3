import { useState, useCallback, useRef } from 'react'
import axios from 'axios'

/**
 * Simple POST hook with built-in cancellation.
 *
 * Returns:
 *   data, loading, error,
 *   postData(payload) — fire a request
 *   cancel()          — abort the in-flight request
 */
export function usePost(endpoint) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  // keep current AbortController between renders
  const controllerRef = useRef(null)

  const postData = useCallback((payload = {}) => {
    // abort any previous request first
    if (controllerRef.current) controllerRef.current.abort()

    const controller = new AbortController()
    controllerRef.current = controller

    setLoading(true)
    setError(null)

    axios
      .post(
        `/api${endpoint}`,
        {
          jsonrpc: '2.0',
          method:  'call',
          params:  payload,
        },
        { signal: controller.signal }     // ← true cancellation
      )
      .then(res => setData(res.data.result))
      .catch(err => {
        // ignore abort errors
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setError(err)
        }
      })
      .finally(() => setLoading(false))
  }, [endpoint])

  /** Abort the running request, if any */
  const cancel = useCallback(() => {
    if (controllerRef.current) controllerRef.current.abort()
    setLoading(false)
  }, [])

  return { data, loading, error, postData, cancel }
}
