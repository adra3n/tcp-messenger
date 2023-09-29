const express = require('express')
const net = require('net')
const cors = require('cors')

//usernames and passwords
const users = [
  { id: 1, username: 'sertac', password: '1234' },
  { id: 2, username: 'ahmet', password: '1234' },
]

//PORTS
const HTTPPORT = 5000
const TCPPORT = 8000

//im using this to save the last message
let TCPMessage = ''

/// MWs and server ///
const app = express()

//cors
app.use(cors())

//parsing request body with express
app.use(express.json())

////  CRUD for message and login ////

// get /message
app.get('/message', (req, res) => {
  try {
    //sending TCPMessage here
    res.json(TCPMessage)
  } catch (error) {
    console.error('get error>>', error)
    return res.status(500).json({ error: 'An error occurred' })
  }
})

//post /message
app.post('/message', (req, res) => {
  try {
    const { HttpMessage } = req.body
    //creating TCP connection here
    const client = net.createConnection({ port: TCPPORT }, () => {
      //parsing and sending
      client.write(JSON.stringify(HttpMessage))
      //closing connection
      client.end()
    })
    res.status(200).json({ message: 'Message received', HttpMessage })
  } catch (error) {
    console.error('post error>>', error)
    return res.status(500).json({ error: 'An error occurred' })
  }
})

//post /login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    //simple validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password needed' })
    }

    //im checking user's username and pass within users
    const user = users.find(
      (u) => u.username === username && u.password === password
    )
    console.log(user)

    if (user) {
      return res.status(200).json({ message: 'Login successful' })
    } else {
      res.status(400).json({ message: 'Login failed' })
    }
  } catch (error) {
    console.error('login error >>>', error)
    return res.status(500).json({ error: 'An error occurred' })
  }
})

// creating a TCP server
const tcpServer = net.createServer((socket) => {
  console.log('Client connected to TCP')

  socket.on('data', (data) => {
    //im parsing TCP data to string
    const receivedMessage = data.toString()
    //setting receivedMessage as TCPMessage
    TCPMessage = receivedMessage
    console.log('Received and parsed TCP data:', receivedMessage)
  })

  socket.on('end', () => {
    console.log('Client disconnected from TCP')
  })
})

// listening with TCP server
tcpServer.listen(TCPPORT, () => {
  console.log(`TCP server is listening on port ${TCPPORT}`)
})

//server listening to HTTPPORT
app.listen(HTTPPORT, () => {
  console.log(`server is running port:${HTTPPORT}`)
})
