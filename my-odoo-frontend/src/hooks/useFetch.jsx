import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

/**
 * Simple hook for GET requests to your Odoo backend.
 * @param {string} endpoint  - e.g. "/chat_page"
 * @param {object} params    - query params
 * @param {boolean} auto     - if true, fetch immediately on mount/param change
 */
export function useFetch(endpoint, params = {}, auto = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    axios
      .get(`/api${endpoint}`, { params })
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [endpoint, JSON.stringify(params)])

  // automatically fetch when endpoint or params change
  useEffect(() => {
    if (auto) fetchData()
  }, [fetchData, auto])

  return { data, loading, error, refetch: fetchData }
}
