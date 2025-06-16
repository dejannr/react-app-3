// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthProvider from './components/AuthProvider.jsx'

import ExamplePage from './pages/ExamplePage.jsx'
import ChatPage    from './pages/ChatPage.jsx'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<h2>Welcome</h2>} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </AuthProvider>
  )
}
