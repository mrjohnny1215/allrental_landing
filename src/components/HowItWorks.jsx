const STEPS = [
  { title: '원하는 제품 선택', desc: '정수기·비데·공기청정기·매트리스 중 원하는 제품을 선택해주세요.' },
  { title: '간단 조건 입력', desc: '가족 구성, 예산, 입주 예정일 등 30초 만에 입력합니다.' },
  { title: '제품 비교 상담', desc: '조건에 맞는 제품을 3개만 추려 상담을 도와드립니다.' },
]

export default function HowItWorks() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-lg px-5 py-8">
        <h2 className="text-center text-lg font-semibold text-deep-navy">이용 방법</h2>
        <p className="mt-1 text-center text-sm text-muted">간단 3단계로 비교 상담을 신청하세요.</p>
        <div className="mt-5 space-y-3">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-navy text-sm font-bold text-gold">
                {idx + 1}
              </div>
              <div>
                <div className="text-sm font-semibold text-deep-navy">{step.title}</div>
                <div className="mt-1 text-xs text-muted">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
