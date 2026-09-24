import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://fmirayitizchewkfhgxh.supabase.co'
const key = process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_j1TVHyct-lpIsP5OOxPpww_gmX_rRo0'
const supabase = createClient(url, key)
const recentRequests = new Map()

const REST_API_KEY = '469483cab1a10473bbd578f3e73a1be7'
let ACCESS_TOKEN = process.env.KAKAO_ACCESS_TOKEN || 'nmDl6RX3VTuU4BgMjQQKKjlRGNZlU02PAAAAAQoXC9cAAAGgeszLkCEj9baI01p6'
let REFRESH_TOKEN = process.env.KAKAO_REFRESH_TOKEN || 'TaL4sOzSS-sqpI1lXIcffOxMpRX4pDmlAAAAAgoXC9cAAAGgeszLiiEj9baI01p6'

// 토큰 자동 갱신 함수
async function refreshKakaoToken() {
  try {
    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: REST_API_KEY,
        refresh_token: REFRESH_TOKEN
      }).toString()
    })
    const data = await res.json()
    if (data.access_token) {
      ACCESS_TOKEN = data.access_token
      if (data.refresh_token) REFRESH_TOKEN = data.refresh_token
      return true
    }
  } catch (err) {
    console.error('카카오 토큰 갱신 실패:', err)
  }
  return false
}

// 카카오톡 '나에게 보내기' 발송 함수
async function sendKakaoAlert(lead) {
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

  const postMessage = async (token) => {
    return await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ template_object: JSON.stringify(templateObject) }).toString()
    })
  }

  try {
    let res = await postMessage(ACCESS_TOKEN)
    // 401(토큰 만료) 발생 시 자동 갱신 후 재전송
    if (res.status === 401) {
      const refreshed = await refreshKakaoToken()
      if (refreshed) {
        await postMessage(ACCESS_TOKEN)
      }
    }
  } catch (err) {
    console.error('카카오 메시지 전송 예외:', err)
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
    const name = String(body.name || '').trim()
    const phone = String(body.phone || '').replace(/[^0-9]/g, '')
    const clientKey = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown'
    const now = Date.now()

    if (recentRequests.get(clientKey) > now - 60_000) {
      return res.status(429).json({ message: '잠시 후 다시 시도해주세요.' })
    }
    recentRequests.set(clientKey, now)

    if (!name || !/^01[0-9]{8,9}$/.test(phone) || !body.privacyConsent) {
      return res.status(400).json({ message: '이름, 연락처, 개인정보 동의 여부를 확인해주세요.' })
    }

    const lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      created_at: new Date().toISOString(),
      apartment_slug: body.apartmentSlug || body.slug || 'hillstate',
      apartment_name: body.apartmentName || body.apartment || '힐스테이트 메디알레',
      name,
      phone,
      interest: body.interest || null,
      products: Array.isArray(body.products) ? body.products : (body.products ? [body.products] : []),
      move_in_date: body.moveInDate || null,
      message: body.message || body.dongHo || null,
      privacy_consent: !!(body.privacyConsent ?? body.privacy_consent),
      utm_source: body.utmSource || null,
      utm_medium: body.utmMedium || null,
      utm_campaign: body.utmCampaign || null,
      utm_content: body.utmContent || null,
      status: 'NEW',
      source: body.source || 'landing_hillstate',
    }

    const { data, error } = await supabase.from('leads').insert([lead]).select('*').single()
    if (error) throw error

    // 카카오톡 알림 발송
    await sendKakaoAlert(lead)

    return res.status(201).json({ ok: true, id: lead.id, data })
  } catch (err) {
    console.error('Lead 저장 실패:', err)
    return res.status(503).json({ message: '상담 접수 저장 연결을 확인 중입니다. 채팅으로 문의해주세요.' })
  }
}
