import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import LandingLayout from './pages/LandingLayout'
import HillstateLanding from './pages/HillstateLanding'
import { getApartmentBySlug, APARTMENTS } from './config'

function Dashboard() {
  const list = Object.values(APARTMENTS)
  return (
    <div className="min-h-screen bg-white">
      <HeaderDefault />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
            입주아파트별 렌탈 특화 서비스
          </div>
          <h1 className="mt-4 text-3xl font-bold text-deep-navy md:text-4xl">
            입주 전 렌탈,<br className="md:hidden" /> 복잡하게 찾지 마세요.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            단지별 맞춤 비교 상담으로 정수기·비데·공기청정기·매트리스까지
            <br className="hidden md:block" />
            우리 집에 맞는 제품을 한 번에 정리해드립니다.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {list.map((apt) => (
            <Link
              key={apt.slug}
              to={`/${apt.slug}`}
              className="group block rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-gray-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: apt.brandAccent }}
                    />
                    <h2 className="text-lg font-bold text-deep-navy">{apt.name}</h2>
                  </div>
                  <p className="mt-1.5 text-xs text-muted">{apt.location}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                    <span className="rounded-lg bg-surface px-2 py-1">
                      입주 {apt.moveInDate}
                    </span>
                    <span className="rounded-lg bg-surface px-2 py-1">
                      {apt.households}
                    </span>
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-2xl px-3 py-1.5 text-xs font-semibold"
                  style={{
                    backgroundColor: `${apt.brandAccent}18`,
                    color: apt.brandColor,
                  }}
                >
                  {apt.heroBadge}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700 line-clamp-2">
                {apt.heroDescription.replace(/\n/g, ' ')}
              </p>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface px-4 py-3">
                <span className="text-xs font-semibold text-muted">
                  상담 페이지로 이동
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: apt.brandColor }}
                >
                  보러가기 →
                </span>
              </div>
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
    <footer className="border-t border-gray-100 bg-white">
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
