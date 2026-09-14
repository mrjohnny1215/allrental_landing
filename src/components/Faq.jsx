const FAQS = [
  ['여러 브랜드를 정말 비교할 수 있나요?', '네. 코웨이, 청호나이스, 쿠쿠, SK매직, 현대큐밍, LG, 웰스, 세스코의 상담 가능 제품을 비교해 안내드립니다.'],
  ['상담만 받고 계약하지 않아도 되나요?', '네. 상담 신청만으로 계약이 확정되지 않으며, 조건을 확인한 뒤 원하는 제품을 선택하시면 됩니다.'],
  ['입주 전에 미리 상담해도 되나요?', '네. 입주 예정일과 원하는 제품을 남겨주시면 설치 일정까지 함께 안내드립니다.'],
  ['무엇을 비교해 주나요?', '월 렌탈료, 약정 기간, 관리 방식, 제품 기능, 설치 가능 일정을 중심으로 비교해드립니다.'],
]

export default function Faq() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-center text-2xl font-bold text-deep-navy">자주 묻는 질문</h2>
        <div className="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100">
          {FAQS.map(([question, answer]) => (
            <details key={question} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-deep-navy">
                {question}<span className="text-lg text-gold transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
