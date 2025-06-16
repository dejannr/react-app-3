import axios from 'axios'

// Generate a unique ID for each JSON-RPC call
const genId = () => Date.now()

/**
 * Call any Odoo model / method via JSON-RPC
 *
 * @param {string} model   – e.g. 'res.partner'
 * @param {string} method  – e.g. 'search_read'
 * @param {array}  args    – positional args for call_kw (e.g. [[domain], fields])
 * @param {object} kwargs  – keyword args (e.g. {limit: 10})
 * @returns {Promise<any>}  – result from Odoo
 */
export async function callKw(model, method, args = [], kwargs = {}) {
  const payload = {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      model,
      method,
      args,
      kwargs,
    },
    id: genId(),
  }
  const { data } = await axios.post('/api/web/dataset/call_kw', payload, {
    withCredentials: true, // send session cookie
  })
  if (data.error) {
    throw new Error(data.error.message || 'Odoo RPC Error')
  }
  return data.result
}
