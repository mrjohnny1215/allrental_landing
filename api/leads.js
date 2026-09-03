import { createClient } from '@supabase/supabase-js'
import productsData from '../../public/data/products.json'

const url = process.env.VITE_SUPABASE_URL || 'https://svohcuyxnovcgakfvxms.supabase.co'
const key = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_i6nElHWjlgfcZemVMdMZhw_LVZptJ9W'
const supabase = createClient(url, key)

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  if (req.method === 'GET' && req.query.table === 'products') {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('active', true)
      if (error) throw error
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const body = req.body || {}
    const lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      created_at: new Date().toISOString(),
      apartment_slug: body.apartmentSlug || null,
      apartment_name: body.apartmentName || null,
      name: body.name || null,
      phone: body.phone || null,
      interest: body.interest || null,
      products: Array.isArray(body.products) ? body.products : (body.products ? [body.products] : []),
      move_in_date: body.moveInDate || null,
      message: body.message || null,
      privacy_consent: !!body.privacyConsent,
      utm_source: body.utmSource || null,
      utm_medium: body.utmMedium || null,
      utm_campaign: body.utmCampaign || null,
      utm_content: body.utmContent || null,
      status: 'NEW',
      source: body.source || 'landing',
    }

    const { data, error } = await supabase.from('leads').insert([lead]).select('*').single()
    if (error) throw error
    return res.status(201).json({ ok: true, id: lead.id })
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Lead 저장 실패' })
  }
}
