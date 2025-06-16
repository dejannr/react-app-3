// src/components/AuthProvider.jsx
import React from 'react'
import { useFetch } from '../hooks/useFetch.jsx'
import '../styles/loading.css'

export default function AuthProvider({ children }) {
  const { data: user, loading, error } =
    useFetch('/get_username', {}, true)

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="loader">
          <div /><div /><div />
        </div>
      </div>
    )
  }

  if (error || !user?.login) {
    return <p className="auth-error">Please log in to Odoo first.</p>
  }

  return <>{children}</>
}
