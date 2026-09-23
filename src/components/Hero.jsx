export default function Hero({ apartment }) {
  const lines = apartment.heroTitle.split('\n')
  const brandAccent = apartment.brandAccent || '#c7a14a'

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src={apartment.heroImage}
          alt={apartment.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07131f]/95 via-[#07131f]/76 to-[#07131f]/22" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07131f]/75 via-transparent to-transparent" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="max-w-2xl rounded-[28px] border border-white/10 bg-[#07131f]/48 p-6 shadow-2xl shadow-black/30 backdrop-blur-[2px] md:p-9">
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide text-white"
            >
              {apartment.name} 입주민 전용 비교상담
            </span>
            <span
              className="inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold tracking-wide"
              style={{ backgroundColor: brandAccent, color: '#1b1b1b' }}
            >
              30초 맞춤 견적 신청
            </span>
          </div>
          <h1 className="mt-5 whitespace-pre-line text-4xl font-black leading-[1.18] tracking-[-0.055em] text-white md:text-6xl">
            {lines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/90 md:text-lg">
            월 렌탈료부터 약정·관리 방식·설치 가능일까지,<br className="hidden md:block" /> 우리 집 조건에 맞는 렌탈 구성을 한 번에 비교해보세요.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#consult"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FEE500] px-6 py-4 text-base font-extrabold text-[#191919] shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-[#ffef42]"
            >
              내 입주 조건으로 견적 보기
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#benefits"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/5 px-5 py-4 text-base font-bold text-white transition hover:bg-white/15"
            >
              비교 가능한 제품 보기
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-2 text-xs font-semibold text-white/90">
            <span className="rounded-full bg-white/10 px-3 py-2">여러 브랜드 조건 비교</span>
            <span className="rounded-full bg-white/10 px-3 py-2">입주일 맞춤 설치 안내</span>
            <span className="rounded-full bg-white/10 px-3 py-2">상담 후 결정</span>
          </div>
        </div>
      </div>
    </section>
  )
}
