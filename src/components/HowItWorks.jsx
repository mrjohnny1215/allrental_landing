const STEPS = [
  {
    num: '01',
    title: '제품과 입주 조건 선택',
    desc: '필요한 제품과 입주 예정일을\n간단히 선택해주세요.',
  },
  {
    num: '02',
    title: '맞춤 조건 비교',
    desc: '월 렌탈료·약정·관리 방식을\n한눈에 비교해보세요.',
  },
  {
    num: '03',
    title: '선택 후 설치 일정 확인',
    desc: '제품을 고른 뒤 입주 일정에\n맞춰 설치 가능일을 안내합니다.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center text-xl font-bold text-deep-navy md:text-2xl">
          내 입주 조건으로 비교하면 더 간단합니다
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          필요한 정보만 먼저 확인하고, 원하는 제품만 골라보세요.
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
