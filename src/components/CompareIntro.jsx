export default function CompareIntro() {
  const items = [
    ['₩', '월 렌탈료', '월 납부 조건'],
    ['⌛', '약정 기간', '의무 사용 기간'],
    ['✦', '관리 방식', '방문·자가 관리'],
    ['▣', '제품 기능', '필요한 옵션 확인'],
    ['✓', '설치 가능일', '입주일 맞춤 설치'],
  ]

  return (
    <section className="bg-[#f5f7f9]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-center text-xs font-extrabold tracking-[0.16em] text-[#2f6ea9]">CHECKLIST</p>
        <h2 className="mt-2 text-center text-2xl font-black tracking-[-0.045em] text-deep-navy md:text-3xl">놓치기 쉬운 렌탈 조건까지 비교해요</h2>
        <p className="mt-3 text-center text-sm text-muted">같은 제품군이어도 계약 조건과 관리 방식은 달라질 수 있습니다.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {items.map(([icon, title, desc]) => (
            <div key={title} className="rounded-2xl border border-white bg-white p-4 text-center shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf2fb] text-lg font-black text-[#2f6ea9]">{icon}</div>
              <div className="mt-3 text-sm font-extrabold text-deep-navy">{title}</div>
              <div className="mt-1 text-xs text-muted">{desc}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-muted">상담 신청만으로 계약이 확정되지 않습니다.</p>
      </div>
    </section>
  )
}
