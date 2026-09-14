export default function CompareIntro() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center text-xl font-bold text-deep-navy md:text-2xl">제품 비교 안내</h2>
        <p className="mt-2 text-center text-sm text-muted">같은 제품군이라도 계약 조건과 관리 방식이 다를 수 있습니다.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {['월 렌탈료', '약정 기간', '관리 방식', '제품 기능', '설치 가능일'].map((item) => (
            <div key={item} className="rounded-2xl bg-white p-4 text-center text-sm font-semibold text-deep-navy shadow-sm">{item}</div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-muted">상담 신청만으로 계약이 확정되지 않습니다.</p>
      </div>
    </section>
  )
}
