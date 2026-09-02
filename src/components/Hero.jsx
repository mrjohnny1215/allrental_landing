export default function Hero({ apartment }) {
  const lines = apartment.heroTitle.split('\n')

  return (
    <section className="relative bg-deep-navy text-white">
      <div className="mx-auto max-w-lg px-5 pt-14 pb-10">
        <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gold-light">
          {apartment.heroBadge}
        </div>
        <h1 className="mt-4 whitespace-pre-line text-3xl font-bold leading-snug">
          {lines.map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < lines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-200">
          {apartment.heroDescription}
        </p>
        <div className="mt-6">
          <a
            href="#consult"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-gold px-5 py-4 text-center text-base font-semibold text-white"
          >
            30초 맞춤 추천 받기
          </a>
        </div>
      </div>
    </section>
  )
}
