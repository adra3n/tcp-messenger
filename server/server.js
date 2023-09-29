const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const users = [
  { id: 1, username: 'sertac', password: '1234' },
  { id: 2, username: 'ahmet', password: '1234' },
]

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password needed' })
    }

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

app.listen(PORT, () => {
  console.log(`server is running port:${PORT}`)
})
