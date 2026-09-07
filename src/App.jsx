import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import LandingLayout from './pages/LandingLayout'
import HillstateLanding from './pages/HillstateLanding'
import { APARTMENTS } from './config'

function Dashboard() {
  const list = Object.values(APARTMENTS)
  return (
    <div className="min-h-screen bg-white">
      <HeaderDefault />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-deep-navy md:text-3xl">입주아파트 렌탈 상담</h1>
          <p className="mt-2 text-sm text-muted">원하는 단지를 선택하시면 맞춤 렌탈 상담 페이지로 이동합니다.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {list.map((apt) => (
            <Link
              key={apt.slug}
              to={`/${apt.slug}`}
              className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gold hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-deep-navy">{apt.name}</h2>
                  <p className="mt-1 text-xs text-muted">{apt.location}</p>
                  <p className="mt-1 text-xs text-muted">입주 {apt.moveInDate} · {apt.households}</p>
                </div>
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                  {apt.heroBadge}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-700 line-clamp-2">{apt.heroDescription}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-gold">상담 페이지 보기 →</span>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-surface p-5 text-sm text-muted">
          <p className="text-center">
            아파트별 맞춤 렌탈 비교 상담을 제공합니다. 상담 신청만으로 계약이 확정되지 않습니다.
          </p>
        </div>
      </main>
      <FooterDefault />
    </div>
  )
}

function HeaderDefault() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <div>
          <div className="text-base font-bold tracking-wide text-deep-navy">ALL렌탈</div>
          <div className="text-xs text-muted">입주아파트 맞춤 렌탈 비교 상담</div>
        </div>
        <Link to="/" className="text-sm font-semibold text-gold">
          단지 선택
        </Link>
      </div>
    </header>
  )
}

function FooterDefault() {
  return (
    <footer className="mt-10 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} ALL렌탈. 상담 신청만으로 계약이 확정되지 않습니다.
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <Routes>
      {/* 전체 단지 리스트 대시보드 */}
      <Route path="/" element={<Dashboard />} />

      {/* 단지별 랜딩 */}
      <Route path="/mediale" element={<HillstateLanding aptKey="mediale" />} />
      <Route path="/hillstate" element={<HillstateLanding aptKey="hillstate" />} />
      <Route path="/gangbyeon" element={<LandingLayout aptKey="gangbyeon" />} />
      <Route path="/deungchon" element={<LandingLayout aptKey="deungchon" />} />
      <Route path="/reventus" element={<LandingLayout aptKey="reventus" />} />

      {/* 미확인 단지면 루트 대시보드로 이동 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
