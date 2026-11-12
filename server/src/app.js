const cors = require('cors')
const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'CarRental API' })
})

module.exports = app
