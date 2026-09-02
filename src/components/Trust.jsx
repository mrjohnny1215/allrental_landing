export default function Trust() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center text-xl font-bold text-deep-navy md:text-2xl">신뢰할 수 있는 상담</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            '조건에 맞는 제품만 비교해드립니다.',
            '상담 신청만으로 계약이 확정되지 않습니다.',
            '여러 제품을 비교한 뒤 결정하시면 됩니다.',
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-gray-100 bg-surface p-5 text-sm text-deep-navy shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
