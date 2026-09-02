import { Routes, Route, useParams } from 'react-router-dom'
import LandingLayout from './pages/LandingLayout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout slug="gangbyeon" />} />
      <Route path="/gangbyeon" element={<LandingLayout slug="gangbyeon" />} />
      <Route path="/mediale" element={<LandingLayout slug="mediale" />} />
      <Route path="/deungchon" element={<LandingLayout slug="deungchon" />} />
      <Route path="/reventus" element={<LandingLayout slug="reventus" />} />
      <Route path="/:slug" element={<LandingPageWrapper />} />
    </Routes>
  )
}

function LandingPageWrapper() {
  const { slug } = useParams()
  return <LandingLayout slug={slug} />
}
