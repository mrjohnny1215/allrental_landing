export default function Header({ apartment }) {
  return (
    <header className="fixed top-0 z-50 w-full bg-deep-navy text-white">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <div>
          <div className="text-base font-bold tracking-wide">ALL렌탈</div>
          <div className="text-xs text-gray-300">{apartment.name} · 입주민 맞춤 렌탈 상담</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-200">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">✔</span>
            여러 브랜드 한 번에 비교
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">✔</span>
            상담 후 결정
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">✔</span>
            간편 상담 신청
          </span>
        </nav>
      </div>
    </header>
  )
}
