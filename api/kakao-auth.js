const CALLBACK_URL = 'https://allrental-landing.vercel.app/api/kakao-auth'

function tokenPage(refreshToken) {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>카카오 알림 연결</title><style>body{margin:0;background:#f7f8fa;color:#122033;font-family:system-ui,sans-serif}.card{max-width:620px;margin:10vh auto;padding:32px;border-radius:20px;background:#fff;box-shadow:0 12px 40px #10204018}h1{margin-top:0}textarea{box-sizing:border-box;width:100%;height:120px;padding:12px;border:1px solid #d8dce5;border-radius:12px;word-break:break-all}code{background:#f2f4f7;padding:2px 5px;border-radius:5px}</style></head><body><main class="card"><h1>카카오 알림 연결 완료</h1><p>아래 값을 Vercel 환경변수 <code>KAKAO_REFRESH_TOKEN</code>에 Production으로 등록하면 새 상담 접수가 내 카카오톡으로 전송됩니다.</p><p><strong>이 값은 외부에 공유하지 마세요.</strong></p><textarea readonly>${refreshToken}</textarea><p>등록 후 이 페이지는 닫아도 됩니다.</p></main></body></html>`
}

export default async function handler(req, res) {
  const clientId = process.env.KAKAO_REST_API_KEY
  if (!clientId) return res.status(503).send('카카오 REST API 키가 설정되지 않았습니다.')

  if (!req.query.code) {
    const authorizeUrl = new URL('https://kauth.kakao.com/oauth/authorize')
    authorizeUrl.searchParams.set('client_id', clientId)
    authorizeUrl.searchParams.set('redirect_uri', CALLBACK_URL)
    authorizeUrl.searchParams.set('response_type', 'code')
    authorizeUrl.searchParams.set('scope', 'talk_message')
    return res.redirect(authorizeUrl.toString())
  }

  try {
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: CALLBACK_URL,
        code: req.query.code,
      }).toString(),
    })
    const token = await tokenResponse.json()
    if (!tokenResponse.ok || !token.refresh_token) throw new Error(token.error_description || '인증 토큰을 발급하지 못했습니다.')

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store, max-age=0')
    return res.status(200).send(tokenPage(token.refresh_token))
  } catch (error) {
    return res.status(400).send(`카카오 인증에 실패했습니다: ${error.message}`)
  }
}
