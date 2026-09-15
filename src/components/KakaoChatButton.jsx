import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { KAKAO_CHANNEL_URL, KAKAO_CHAT_URL, KAKAO_SEARCH_ID, openKakaoChat } from '../config/kakao'

export default function KakaoChatButton() {
  const [isGuideOpen, setIsGuideOpen] = useState(false)

  useEffect(() => {
    const showGuide = () => setIsGuideOpen(true)
    window.addEventListener('allrental:open-kakao-guide', showGuide)
    return () => window.removeEventListener('allrental:open-kakao-guide', showGuide)
  }, [])

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}>
        <a
          href={KAKAO_CHAT_URL}
          onClick={openKakaoChat}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#FEE500',
            color: '#191919',
            padding: '15px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '15px',
            transition: 'transform 0.2s'
          }}
        >
          <span style={{ fontSize: '18px' }}>💬</span>
          카카오톡으로 비교견적 받기
        </a>
      </div>

      {isGuideOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-5 py-8" role="dialog" aria-modal="true" aria-labelledby="kakao-guide-title">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl md:p-8">
            <button type="button" onClick={() => setIsGuideOpen(false)} className="absolute right-4 top-4 h-9 w-9 rounded-full bg-gray-100 text-xl text-gray-500" aria-label="안내창 닫기">×</button>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEE500] text-xl">💬</div>
            <p className="mt-4 text-sm font-semibold text-[#6e5510]">PC에서 카카오톡 상담하기</p>
            <h2 id="kakao-guide-title" className="mt-1 text-2xl font-bold text-deep-navy">휴대폰으로 QR을 찍어주세요</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">카카오톡에서 바로 채널을 열고<br />비교견적을 받아볼 수 있습니다.</p>
            <div className="mx-auto mt-6 w-fit rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <QRCodeSVG value={KAKAO_CHANNEL_URL} size={172} bgColor="#ffffff" fgColor="#191919" level="M" includeMargin />
            </div>
            <div className="mt-6 rounded-2xl bg-surface px-4 py-3 text-sm text-deep-navy">
              카카오톡 검색에서 <strong className="font-bold">{KAKAO_SEARCH_ID}</strong>를 찾아주세요
            </div>
            <a href={KAKAO_CHAT_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#FEE500] px-4 py-4 text-sm font-bold text-[#191919]">
              카카오톡 채널 열기
            </a>
            <button type="button" onClick={() => setIsGuideOpen(false)} className="mt-3 text-sm text-muted underline">나중에 하기</button>
          </div>
        </div>
      )}
    </>
  )
}
