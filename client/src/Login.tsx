import React, { useState } from 'react'
import axios from 'axios'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = () => {
    if (!username || !password) {
      setMessage('Please check your username and password')
    } else {
      axios
        .post('/login', { username, password })
        .then((response) => {
          setMessage('Login Successful')
        })
        .catch((error) => {
          console.error('Error:', error)
          setMessage('An error occurred')
        })
    }
  }
  return (
    <div>
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default Login
