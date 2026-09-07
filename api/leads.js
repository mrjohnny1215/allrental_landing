import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL || 'https://fmirayitizchewkfhgxh.supabase.co'
const key = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_j1TVHyct-lpIsP500xPpww_g'
const supabase = createClient(url, key)

const KAKAO_REST_API_KEY = '469483cab1a10473bbd578f3e73a1be7'
// 서버 환경변수나 직접 발급된 토큰을 활용하도록 설정
let KAKAO_ACCESS_TOKEN = process.env.KAKAO_ACCESS_TOKEN || ''

async function sendKakaoAlert(lead) {
  if (!KAKAO_ACCESS_TOKEN) return

  const templateObject = {
    object_type: 'text',
    text: `[신규 렌탈 상담 접수]\n\n` +
          `• 단지: ${lead.apartment_name || '-'}\n` +
          `• 고객명: ${lead.name || '-'}\n` +
          `• 연락처: ${lead.phone || '-'}\n` +
          `• 제품: ${(lead.products || []).join(', ') || '미지정'}\n` +
          `• 접수시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
    link: {
      web_url: 'https://allrental-landing.vercel.app',
      mobile_web_url: 'https://allrental-landing.vercel.app'
    },
    button_title: '상담 리드 확인'
  }

  try {
    await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KAKAO_ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ template_object: JSON.stringify(templateObject) }).toString()
    })
  } catch (err) {
    console.error('카카오톡 전송 에러:', err)
  }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

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
    if (error) throw error

    await sendKakaoAlert(lead)

    return res.status(201).json({ ok: true, id: lead.id, data })
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Lead 저장 실패' })
  }
}
