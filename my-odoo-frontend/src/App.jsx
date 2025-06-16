// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider from './components/AuthProvider.jsx'

import ExamplePage from './pages/ExamplePage.jsx'
import ChatPage    from './pages/ChatPage.jsx'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<h2>Welcome</h2>} />
        <Route path="/example" element={<ExamplePage />} />

        {/* redirect bare /chat to the first chat */}
        <Route path="/chat" element={<Navigate to="/chat/1" replace />} />
        <Route path="/chat/:id" element={<ChatPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </AuthProvider>
  )
}
