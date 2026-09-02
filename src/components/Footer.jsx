export default function Footer({ apartment }) {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-lg px-5 py-6">
        <div className="text-sm font-semibold text-deep-navy">ALL렌탈</div>
        <p className="mt-1 text-xs text-muted">
          {apartment.name} 입주 예정자 비교상담 서비스
        </p>
        <p className="mt-3 text-xs text-gray-400">
          © {new Date().getFullYear()} ALL렌탈. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
