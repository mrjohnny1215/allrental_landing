import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

const leads = []

app.post('/api/leads', (req, res) => {
  const lead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
    ...req.body,
  }
  leads.push(lead)
  console.log('NEW LEAD:', JSON.stringify(lead, null, 2))
  res.status(201).json({ ok: true, id: lead.id })
})

app.get('/api/leads', (_req, res) => {
  res.json(leads)
})

app.use(express.static(join(__dirname, 'dist')))

app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.get('/mediale', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})
app.get('/deungchon', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})
app.get('/reventus', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})
app.get('/gangbyeon', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.use((_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 5173
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
