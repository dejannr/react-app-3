import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ExamplePage from './pages/ExamplePage'

export default function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/example">Example</Link>
      </nav>
      <hr/>
      <Routes>
        <Route path="/" element={<h2>Welcome to Odoo-React Frontend</h2>} />
        <Route path="/example" element={<ExamplePage />} />
      </Routes>
    </div>
  )
}
