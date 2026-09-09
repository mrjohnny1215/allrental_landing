import React from 'react'

const LOGO_STYLES = {
  hillstate: { color: '#d48c4a', font: 'font-extrabold tracking-tight' },
  mediale: { color: '#d48c4a', font: 'font-extrabold tracking-tight' },
  dh: { color: '#7ba7d8', font: 'font-extrabold tracking-tight' },
  raemian: { color: '#b2c49a', font: 'font-extrabold tracking-tight' },
  ipark: { color: '#c7a14a', font: 'font-extrabold tracking-tight' },
  doosan: { color: '#8aa7b8', font: 'font-extrabold tracking-tight' },
  lotte: { color: '#d8a07b', font: 'font-extrabold tracking-tight' },
  hyundai: { color: '#5dade2', font: 'font-extrabold tracking-tight' },
  eco: { color: '#8cc4a8', font: 'font-extrabold tracking-tight' },
  hoban: { color: '#7bc4d8', font: 'font-extrabold tracking-tight' },
  zai: { color: '#8cc49a', font: 'font-extrabold tracking-tight' },
  jeil: { color: '#c4a88c', font: 'font-extrabold tracking-tight' },
  persbiel: { color: '#b8a8d8', font: 'font-extrabold tracking-tight' },
}

function pickLogoStyle(slug, name) {
  const key = String(slug || '').toLowerCase()
  const hit = Object.keys(LOGO_STYLES).find((k) => key.includes(k))
  if (hit) return LOGO_STYLES[hit]
  if (String(name || '').includes('자이')) return LOGO_STYLES.zai
  if (String(name || '').includes('디에이치')) return LOGO_STYLES.dh
  if (String(name || '').includes('래미안')) return LOGO_STYLES.raemian
  if (String(name || '').includes('아이파크')) return LOGO_STYLES.ipark
  if (String(name || '').includes('두산')) return LOGO_STYLES.doosan
  if (String(name || '').includes('롯데')) return LOGO_STYLES.lotte
  if (String(name || '').includes('현대')) return LOGO_STYLES.hyundai
  if (String(name || '').includes('에코델타')) return LOGO_STYLES.eco
  if (String(name || '').includes('호반')) return LOGO_STYLES.hoban
  if (String(name || '').includes('제일풍경채')) return LOGO_STYLES.jeil
  if (String(name || '').includes('퍼스비엘')) return LOGO_STYLES.persbiel
  return { color: '#c7a14a', font: 'font-extrabold tracking-tight' }
}

export default function Header({ apartment }) {
  const brandColor = apartment.brandColor || '#0b1c2e'
  const brandAccent = apartment.brandAccent || '#c7a14a'
  const logo = pickLogoStyle(apartment.slug, apartment.name)
  const brandLabel = String(apartment.name || '').split(' ').slice(0, 2).join(' ')

  return (
    <header
      className="fixed top-0 z-50 w-full"
      style={{ backgroundColor: brandColor, color: '#fff' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`${logo.font} text-base`}
            style={{ color: brandAccent }}
          >
            {brandLabel}
          </div>
          <div
            className="hidden h-4 w-px md:block"
            style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
          />
          <div className="text-xs text-gray-200">입주민 맞춤 렌탈 상담</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-200">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">✔</span>
            여러 브랜드 한 번에 비교
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">✔</span>
            상담 후 결정
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">✔</span>
            간편 상담 신청
          </span>
        </nav>
      </div>
    </header>
  )
}
