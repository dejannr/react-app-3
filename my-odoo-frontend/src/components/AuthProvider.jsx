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
        <div className="loader"><div/><div/><div/></div>
        <p className="loading-text">Verifying login credentials</p>
      </div>
    )
  }

  if (error || !user?.login) {
    return (
      <div className="auth-error-container">
        <p className="auth-error-text">Please log in to Lupa first.</p>
      </div>
    )
  }

  return <>{children}</>
}
