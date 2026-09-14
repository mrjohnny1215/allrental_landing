export default function Footer() {
  return (
    <footer className="bg-deep-navy">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="text-base font-bold text-white">올(All)렌탈</div>
            <p className="mt-1 text-xs text-gray-300">입주민 맞춤 렌탈 상담 서비스</p>
          </div>
          <div className="space-y-2 text-sm text-gray-200">
            <div>입주민 렌탈 상담</div>
            <div>개인정보처리방침</div>
            <div>상담안내</div>
          </div>
        </div>
        <address className="mt-8 not-italic text-xs leading-6 text-gray-300">
          <p>주식회사 올(All)렌탈 | 대표이사: 김성훈 | 사업자등록번호: 764-36-01626</p>
          <p>업태: 서비스업 | 종목: 정수기, 청정기, 비데, 안마의자 렌탈</p>
          <p>301ho, 27, Daejukseo-ro 16beon-gil, Samhyang-eup, Muan-gun, Jeonnam-Gwangju, Republic of Korea</p>
        </address>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} ALL렌탈. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
