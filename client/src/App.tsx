import React, { useState } from 'react'
import MessageSender from './components/MessageSender'
import Login from './components/Login'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Context } from './context/Context'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Context.Provider value={{ loggedIn, setLoggedIn }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/message"
          element={loggedIn ? <MessageSender /> : <Navigate to="/" />}
        />
      </Routes>
    </Context.Provider>
  )
}

export default App
