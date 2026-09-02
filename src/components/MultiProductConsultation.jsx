const PACKAGES = [
  { id: 'water', title: '정수기', desc: '필터·유량·관리를 비교해드립니다.' },
  { id: 'bidet', title: '비데', desc: '살균·절수·편의 기능을 비교합니다.' },
  { id: 'purifier', title: '공기청정기', desc: '면적·필터·소음을 비교합니다.' },
  { id: 'mattress', title: '매트리스', desc: '소재·지지력·케어를 비교합니다.' },
  { id: 'massager', title: '안마의자', desc: '코스·소음·관리를 비교합니다.' },
]

export default function MultiProductConsultation() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-lg px-5 py-8">
        <h2 className="text-center text-lg font-semibold text-deep-navy">복수 제품 상담</h2>
        <p className="mt-1 text-center text-sm text-muted">여러 제품을 한 번에 상담 받으실 수 있습니다.</p>
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <a
              key={pkg.id}
              href="#consult"
              className="rounded-2xl border border-gray-100 bg-surface p-4"
            >
              <div className="text-sm font-semibold text-deep-navy">{pkg.title}</div>
              <div className="mt-1 text-xs text-muted">{pkg.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
