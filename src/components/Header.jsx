export default function Header({ apartment }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-lg px-5 h-14 flex items-center justify-between">
        <div className="text-base font-semibold text-deep-navy">ALL렌탈</div>
        <a
          href="#consult"
          className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-white"
        >
          상담 신청
        </a>
      </div>
    </header>
  )
}
