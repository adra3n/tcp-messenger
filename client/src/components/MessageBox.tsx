import React, { useState, useEffect } from 'react'
import axios from 'axios'

function MessageList() {
  const [message, setMessage] = useState<string>('')

  // get /message
  const getMessage = () => {
    axios
      .get('http://localhost:5000/message')
      .then((response) => {
        if (response.status === 200) {
          console.log('Message received', response.data)
          setMessage(response.data)
        }
      })

      .catch((error) => {
        console.error('error fetching message>>>', error)
      })
  }

  return (
    <div className="mt-8 border-t-2 border-solid border-gray-400">
      <h2 className=" mt-8 font-bold text-lg">Last Received TCP Message:</h2>
      <div className=" h-[3rem] border-gray-300 p-4 rounded-md max-h-60 text-black">
        <div className="mb-2 text-red-600 font-bold">{message}</div>
      </div>
      <button
        onClick={getMessage}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mt-2"
      >
        Get Message
      </button>
    </div>
  )
}

export default MessageList
