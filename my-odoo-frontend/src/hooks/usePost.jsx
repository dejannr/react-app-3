import { useState, useCallback } from 'react'
import axios from 'axios'

export function usePost(endpoint) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const postData = useCallback((payload = {}) => {
    setLoading(true)
    setError(null)
    axios
      .post(`/api${endpoint}`, {
        jsonrpc: "2.0",
        method:  "call",
        params:  payload,
      })
      .then(res => setData(res.data.result))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [endpoint])

  return { data, loading, error, postData }
}