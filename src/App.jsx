import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingLayout from './pages/LandingLayout'
import HillstateLanding from './pages/HillstateLanding'

export default function App() {
  return (
    <Routes>
      {/* 기본 메인 랜딩 */}
      <Route path="/" element={<LandingLayout />} />

      {/* 힐스테이트 메디알레 랜딩 */}
      <Route path="/mediale" element={<HillstateLanding aptKey="mediale" />} />
      <Route path="/hillstate" element={<HillstateLanding aptKey="hillstate" />} />

      {/* 기타 단지 라우팅 */}
      <Route path="/gangbyeon" element={<LandingLayout aptKey="gangbyeon" />} />
      <Route path="/deungchon" element={<LandingLayout aptKey="deungchon" />} />
      <Route path="/reventus" element={<LandingLayout aptKey="reventus" />} />

      {/* 예외 경로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/hillstate" replace />} />
    </Routes>
  )
}
