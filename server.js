import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

const url = process.env.VITE_SUPABASE_URL || 'https://svohcuyxnovcgakfvxms.supabase.co'
const key = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_i6nElHWjlgfcZemVMdMZhw_LVZptJ9W'
const supabase = createClient(url, key)

app.post('/api/leads', async (req, res) => {
  try {
    const body = req.body || {}
    const lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      created_at: new Date().toISOString(),
      apartment_slug: body.apartmentSlug || body.slug || 'hillstate',
      apartment_name: body.apartmentName || body.apartment || '힐스테이트 메디알레',
      name: body.name || null,
      phone: body.phone || null,
      interest: body.interest || null,
      products: Array.isArray(body.products) ? body.products : (body.products ? [body.products] : []),
      move_in_date: body.moveInDate || null,
      message: body.message || body.dongHo || null,
      privacy_consent: !!(body.privacyConsent ?? body.privacy_consent),
      status: 'NEW',
      source: body.source || 'landing_hillstate',
    }

    const { data, error } = await supabase.from('leads').insert([lead]).select('*').single()
    if (error) {
      console.error('Supabase Insert Error:', error)
      return res.status(500).json({ ok: false, error: error.message })
    }
    console.log('NEW LEAD SAVED TO SUPABASE:', lead.id, lead.name, lead.phone)
    res.status(201).json({ ok: true, id: lead.id, data })
  } catch (err) {
    console.error('API Error:', err)
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.get('/api/leads', async (_req, res) => {
  try {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.use(express.static(join(__dirname, 'dist')))

app.get(['/', '/mediale', '/hillstate', '/deungchon', '/reventus', '/gangbyeon'], (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.use((_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 5173
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
