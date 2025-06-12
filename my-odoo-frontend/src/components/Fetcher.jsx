import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Fetcher({ endpoint, params = {}, children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get(`/api${endpoint}`, { params })
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [endpoint, JSON.stringify(params)])

  return children({ data, loading, error })
}
