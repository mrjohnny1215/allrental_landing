const PACKAGES = [
  { id: 'water', label: '정수기' },
  { id: 'bidet', label: '비데' },
  { id: 'purifier', label: '공기청정기' },
  { id: 'mattress', label: '매트리스' },
  { id: 'massager', label: '안마의자' },
]

export default function Categories() {
  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-lg px-5 py-8">
        <h2 className="text-center text-lg font-semibold text-deep-navy">렌탈 품목</h2>
        <p className="mt-1 text-center text-sm text-muted">필요한 제품을 선택해 비교 상담해드립니다.</p>
        <div className="mt-5 grid grid-cols-5 gap-2">
          {PACKAGES.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-surface p-2"
            >
              <span className="text-2xl">✔</span>
              <span className="mt-1 text-xs font-medium text-deep-navy">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
