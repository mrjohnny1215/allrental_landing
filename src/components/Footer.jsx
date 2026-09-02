export default function Footer({ apartment }) {
  return (
    <footer className="bg-deep-navy">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="text-base font-bold text-white">ALL렌탈</div>
            <p className="mt-1 text-xs text-gray-300">입주민 맞춤 렌탈 상담 서비스</p>
          </div>
          <div className="space-y-2 text-sm text-gray-200">
            <div>입주민 렌탈 상담</div>
            <div>개인정보처리방침</div>
            <div>상담안내</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">상담 문의</div>
            <div className="mt-1 text-sm text-gray-200">{apartment.phone || '1588-0000'}</div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} ALL렌탈. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
