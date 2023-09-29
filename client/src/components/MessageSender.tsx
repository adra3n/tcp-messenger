import React, { useState } from 'react'

const MessageSender: React.FC = () => {
  const [message, setMessage] = useState('')

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => console.log(message)}>Send</button>
    </div>
  )
}

export default MessageSender
