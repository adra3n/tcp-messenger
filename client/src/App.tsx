import React, { useState } from 'react'
import { Context } from './context/Context'
import MessageSender from './components/MessageSender'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Context.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/message"
            element={loggedIn ? <MessageSender /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </Context.Provider>
  )
}

export default App
