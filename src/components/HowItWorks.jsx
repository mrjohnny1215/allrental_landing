const STEPS = [
  {
    num: '01',
    title: '우리 집 조건 입력',
    desc: '가족 구성, 예산, 원하는 기능 등\n간단한 정보를 입력해 주세요.',
  },
  {
    num: '02',
    title: '맞춤 제품 TOP3 비교',
    desc: '입력하신 조건을 바탕으로\n최적의 제품 3가지를 추천해 드립니다.',
  },
  {
    num: '03',
    title: '상담 후 원하는 제품 선택',
    desc: '전문 상담사와 상담 후\n마음에 드는 제품을 선택하세요.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center text-xl font-bold text-deep-navy md:text-2xl">
          어떤 제품을 골라야 할지 모르겠다면?
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          간단 3단계로 원하는 제품을 쉽게 찾을 수 있습니다.
        </p>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-start md:gap-4">
          {STEPS.map((step, idx) => (
            <div key={step.num} className="flex-1 text-center">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-deep-navy text-lg font-bold text-gold">
                  {step.num}
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="mt-6 hidden h-px w-full flex-1 bg-gray-300 md:block" />
                )}
              </div>
              <div className="mt-4 text-base font-semibold text-deep-navy whitespace-pre-line">
                {step.title}
              </div>
              <div className="mt-2 text-sm text-muted whitespace-pre-line">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
