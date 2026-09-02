export default function Hero({ apartment }) {
  const lines = apartment.heroTitle.split('\n')

  return (
    <section className="relative pt-16">
      <div className="absolute inset-0">
        <img
          src={apartment.heroImage}
          alt={apartment.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gold-light">
            [{apartment.name}] {apartment.heroBadge}
          </span>
          <h1 className="mt-4 whitespace-pre-line text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {lines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-200 md:text-base">
            {apartment.heroDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#benefits"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-deep-navy px-5 py-4 text-base font-semibold text-white"
            >
              입주민 전용 혜택 확인하기
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#recommend"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/80 px-5 py-4 text-base font-semibold text-white"
            >
              30초 렌탈 추천 받기
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
