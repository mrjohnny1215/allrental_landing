export default function Trust({ apartment }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-center text-sm font-semibold text-gold">ALL렌탈 비교견적</p>
        <h2 className="mt-2 text-center text-xl font-bold text-deep-navy md:text-2xl">{apartment.name} 입주 준비를 더 가볍게</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            '여러 브랜드 조건을 한 화면에서 비교합니다.',
            '원하는 시간과 제품을 직접 선택해 상담을 신청하세요.',
            '충분히 비교한 뒤 원하는 제품만 선택하세요.',
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
