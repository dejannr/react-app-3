import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ExamplePage from './pages/ExamplePage.jsx'
import ChatPage    from './pages/ChatPage.jsx'

export default function App() {
  return (
    <>
      {/*<nav style={{ padding: '1rem', background: '#fafafa' }}>*/}
      {/*  <Link to="/">Home</Link> |{' '}*/}
      {/*  <Link to="/example">Example</Link> |{' '}*/}
      {/*  <Link to="/chat">Chat</Link>*/}
      {/*</nav>*/}
      <Routes>
        <Route path="/" element={<h2>Welcome</h2>} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  )
}
