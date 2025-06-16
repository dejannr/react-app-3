import { useState, useEffect } from 'react'
import { callKw } from '../utils/odooApi.js'

/**
 * React hook – thin wrapper around Odoo's `search_read`.
 *
 * @param {string}  model        Odoo model name
 * @param {Array}   domain       Odoo domain (e.g. [['field', '=', value]])
 * @param {Array}   fields       Fields to return (optional)
 * @param {Object}  kwargs       Extra kwargs – limit, order, etc. (optional)
 * @param {boolean} auto         If false, nothing is fetched until you manually call `refetch`
 */
export default function useSearchRead(
  model,
  domain = [],
  fields = [],
  kwargs = {},
  auto = true,
) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const doFetch = () => {
    setLoading(true)
    setError(null)

    callKw(model, 'search_read', [domain, fields], kwargs)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  // auto-fetch on mount / dependency change
  useEffect(() => {
    if (auto) doFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, JSON.stringify(domain), JSON.stringify(fields), JSON.stringify(kwargs), auto])

  return { data, loading, error, refetch: doFetch }
}
