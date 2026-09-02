const BUNDLES = [
  {
    id: 'water-bidet',
    title: '정수기 + 비데',
    desc: '필수 가전을 한 번에 편리하게',
  },
  {
    id: 'water-purifier',
    title: '정수기 + 공기청정기',
    desc: '깨끗한 물과 공기를 동시에',
  },
  {
    id: 'water-bidet-mattress',
    title: '정수기 + 비데 + 매트리스',
    desc: '생활 필수품을 스마트하게',
  },
]

export default function MultiProductConsultation() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center text-xl font-bold text-deep-navy md:text-2xl">
          입주민이라면 여러 제품을 한 번에 상담하세요
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          여러 제품을 한 번에 비교하고 혜택까지 받아보세요.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex h-32 items-center justify-center rounded-xl bg-surface">
                <span className="text-sm font-semibold text-deep-navy">{bundle.title}</span>
              </div>
              <div className="mt-4 text-base font-semibold text-deep-navy">{bundle.title}</div>
              <div className="text-sm text-muted">{bundle.desc}</div>
              <a
                href="#consult"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-deep-navy px-4 py-3 text-sm font-semibold text-deep-navy"
              >
                한 번에 비교상담
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
