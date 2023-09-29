import React, { useState } from 'react'
import axios from 'axios'

const MessageSender: React.FC = () => {
  const [message, setMessage] = useState<string>('')

  const handleMessage = () => {
    axios
      .post('http://localhost:5000/message', { HttpMessage: message })
      .then((response) => {
        if (response.status === 200) {
          console.log('message sent', response.data)
        }
      })
      .catch((error) => {
        console.error('error>>>', error)
      })
  }

  return (
    <div className="min-h-screen  bg-blue-200 w-full flex flex-col items-center justify-center">
      <div className="bg-gray-50 p-8 rounded shadow-md w-96 text-center">
        <h1>Send Your Message with TCP </h1>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="w-full px-3 py-2 border border-gray-600 rounded my-4"
        />
        <button
          onClick={handleMessage}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default MessageSender
