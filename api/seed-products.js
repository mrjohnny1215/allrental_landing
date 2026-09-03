import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const productsPath = path.join(__dirname, '../../public/data/products.json')
const productsData = JSON.parse(readFileSync(productsPath, 'utf8'))

const url = process.env.VITE_SUPABASE_URL || 'https://svohcuyxnovcgakfvxms.supabase.co'
const key = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_i6nElHWjlgfcZemVMdMZhw_LVZptJ9W'
const supabase = createClient(url, key)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const payload = productsData.map((p) => ({
      name: p.name || null,
      brand: p.brand || null,
      category: p.category || null,
      model_name: p.model_name || p.model_code || null,
      min_monthly_fee: p.min_monthly_fee || null,
      contract: p.contract || null,
      management_type: p.management_type || null,
      thumbnail: p.thumbnail || null,
      description: p.description || null,
      features: Array.isArray(p.features) ? p.features : [],
      selling_points: typeof p.selling_points === 'object' ? p.selling_points : {},
      active: true,
    }))

    const { data, error } = await supabase.from('products').insert(payload).select('count')
    if (error) throw error
    return res.status(201).json({ ok: true, count: payload.length })
  } catch (err) {
    return res.status(500).json({ message: err.message || '상품 데이터 삽입 실패' })
  }
}
