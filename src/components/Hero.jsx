import { KAKAO_CHAT_URL, openKakaoChat } from '../config/kakao'

export default function Hero({ apartment }) {
  const lines = apartment.heroTitle.split('\n')
  const brandAccent = apartment.brandAccent || '#c7a14a'

  return (
    <section className="relative pt-16">
      <div className="absolute inset-0">
        <img
          src={apartment.heroImage}
          alt={apartment.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/20" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="max-w-xl">
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
            >
              {apartment.name} 입주민 전용
            </span>
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: brandAccent, color: '#1b1b1b' }}
            >
              카카오톡 비교견적
            </span>
          </div>
          <h1 className="mt-4 whitespace-pre-line text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {lines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-100 md:text-base">
            월 렌탈료, 약정 기간, 관리 방식, 설치 가능일까지<br className="hidden md:block" /> 카카오톡으로 편하게 비교해보세요.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={KAKAO_CHAT_URL}
              onClick={openKakaoChat}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FEE500] px-5 py-4 text-base font-bold text-[#191919] shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              <span aria-hidden="true">💬</span>
              카카오톡으로 비교견적 받기
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#benefits"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/40 bg-black/10 px-5 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              비교 가능한 제품 보기
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-200">
            <span>여러 브랜드 조건 비교</span>
            <span>입주일 맞춤 설치 안내</span>
            <span>상담 후 결정</span>
          </div>
        </div>
      </div>
    </section>
  )
}
