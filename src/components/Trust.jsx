export default function Trust() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-lg px-5 py-8">
        <h2 className="text-center text-lg font-semibold text-deep-navy">신뢰</h2>
        <div className="mt-5 grid grid-cols-1 gap-3">
          {['조건에 맞는 제품만 비교해드립니다.', '상담 신청만으로 계약이 확정되지 않습니다.', '여러 제품을 비교한 뒤 결정하시면 됩니다.'].map(
            (item, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-4 text-sm text-deep-navy shadow-sm">
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
