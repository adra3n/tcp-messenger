import React, { useState } from 'react'
import axios from 'axios'

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleLogin = () => {
    if (!username || !password) {
      setMessage('Please check your username and password')
    } else {
      axios
        .post('/login', { username, password })
        .then((response) => {
          console.log('Login succesful')
        })
        .catch((error) => {
          console.error('Error:', error)
          setMessage('An error occurred')
        })
    }
  }
  return (
    <div className="min-h-screen  bg-blue-200 w-full flex flex-col items-center justify-center">
      <div className="bg-gray-50 p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" w-full px-3 py-2 border rounded mb-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" w-full px-3 py-2 border rounded mb-2"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mt-4"
        >
          Login
        </button>
        <div className="text-red-500 h-[1rem] mt-2">
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default Login
