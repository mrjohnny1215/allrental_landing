import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import LandingLayout from './pages/LandingLayout'
import HillstateLanding from './pages/HillstateLanding'
import { getApartmentBySlug, APARTMENTS } from './config'

function Dashboard() {
  const list = Object.values(APARTMENTS)
  return (
    <div className="min-h-screen bg-slate-50">
      <HeaderDefault />
      <main className="mx-auto max-w-4xl px-5 py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-muted">INTERNAL</p>
            <h1 className="mt-1 text-2xl font-black text-deep-navy">단지 상담 페이지</h1>
          </div>
          <span className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-muted ring-1 ring-slate-200">총 {list.length}개</span>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {list.map((apt) => (
            <Link
              key={apt.slug}
              to={`/${apt.slug}`}
              className="group flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 last:border-b-0 transition hover:bg-slate-50 sm:px-5"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: apt.brandAccent }} />
                  <h2 className="truncate text-base font-extrabold text-deep-navy">{apt.name}</h2>
                </div>
                <p className="mt-1 text-xs text-muted">{apt.location} · 입주 {apt.moveInDate} · {apt.households}</p>
              </div>
              <span className="shrink-0 rounded-xl bg-deep-navy px-3 py-2 text-xs font-bold text-white">열기 →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

function HeaderDefault() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <div>
          <div className="text-base font-bold tracking-wide text-deep-navy">ALL렌탈</div>
          <div className="text-xs text-muted">단지 상담 페이지 관리</div>
        </div>
        <Link to="/" className="text-sm font-semibold text-gold">
          목록
        </Link>
      </div>
    </header>
  )
}

function FooterDefault() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-8 text-xs text-muted">
        <div className="text-center">© {new Date().getFullYear()} 올(All)렌탈. 상담 신청만으로 계약이 확정되지 않습니다.</div>
        <address className="mx-auto mt-4 max-w-3xl not-italic text-center leading-6">
          <p>주식회사 올(All)렌탈 | 대표이사: 김성훈 | 사업자등록번호: 764-36-01626</p>
          <p>업태: 서비스업 | 종목: 정수기, 청정기, 비데, 안마의자 렌탈</p>
          <p>301ho, 27, Daejukseo-ro 16beon-gil, Samhyang-eup, Muan-gun, Jeonnam-Gwangju, Republic of Korea</p>
        </address>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <Routes>
      {/* 전체 단지 리스트 대시보드 */}
      <Route path="/" element={<Dashboard />} />

      {/* 힐스테이트 메디알레 전용 랜딩 */}
      <Route path="/mediale" element={<HillstateLanding aptKey="mediale" />} />
      <Route path="/hillstate" element={<HillstateLanding aptKey="hillstate" />} />

      {/* 구글 시트/DB 기반 단지별 공통 랜딩 */}
      <Route path="/:slug" element={<LandingLayout />} />

      {/* 미확인 단지면 루트 대시보드로 이동 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
