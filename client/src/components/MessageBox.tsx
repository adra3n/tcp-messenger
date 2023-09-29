import { useState } from 'react'
import axios from 'axios'

function MessageList() {
  const [message, setMessage] = useState<string>('')
  const [intervalId, setIntervalId] = useState<any>(null)
  const [isReceiving, setIsReceiving] = useState<boolean>(false)

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

  //using setInterval with getMessage to get last message every 5 secs
  const startReceiving = () => {
    const id = setInterval(getMessage, 5000)
    setIntervalId(id)
    setIsReceiving(true)
  }

  //clearInterval
  const stopReceiving = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      setIntervalId(null)
      setIsReceiving(false)
    }
  }

  return (
    <div className="mt-8 border-t-2 border-solid border-gray-400">
      <h2 className=" mt-8 font-bold text-lg">Last Received TCP Message:</h2>
      <div className=" h-[3rem] border-gray-300 p-4 rounded-md max-h-60 text-black">
        <div className="mb-2 text-red-600 font-bold">{message}</div>
      </div>
      <div className="w-full">
        <button
          onClick={isReceiving === false ? startReceiving : stopReceiving}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mt-2"
        >
          {isReceiving === false ? 'Start' : 'Stop'}
        </button>
      </div>
    </div>
  )
}

export default MessageList
