import { createClient } from '@supabase/supabase-js'
import productsData from '../../public/data/products.json'

const url = process.env.VITE_SUPABASE_URL || 'https://svohcuyxnovcgakfvxms.supabase.co'
const key = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_i6nElHWjlgfcZemVMdMZhw_LVZptJ9W'
const supabase = createClient(url, key)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { error } = await supabase.from('products').insert(
      productsData.map((p) => ({
        name: p.name,
        brand: p.brand || null,
        category: p.category || null,
        model_name: p.model_name || null,
        min_monthly_fee: p.min_monthly_fee || null,
        contract: p.contract || null,
        management_type: p.management_type || null,
        thumbnail: p.thumbnail || null,
        description: p.description || null,
        features: Array.isArray(p.features) ? p.features : [],
        selling_points: typeof p.selling_points === 'object' ? p.selling_points : {},
        active: true,
      }))
    )
    if (error) throw error
    return res.status(201).json({ ok: true, count: productsData.length })
  } catch (err) {
    return res.status(500).json({ message: err.message || '상품 데이터 삽입 실패' })
  }
}
