import { Routes, Route } from 'react-router-dom'
import LandingLayout from './pages/LandingLayout'
import HillstateLanding from './pages/HillstateLanding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout slug="gangbyeon" />} />
      <Route path="/gangbyeon" element={<LandingLayout slug="gangbyeon" />} />
      <Route path="/mediale" element={<LandingLayout slug="mediale" />} />
      <Route path="/deungchon" element={<LandingLayout slug="deungchon" />} />
      <Route path="/reventus" element={<LandingLayout slug="reventus" />} />
      <Route path="/hillstate" element={<HillstateLanding />} />
      <Route path="*" element={<LandingLayout slug="gangbyeon" />} />
    </Routes>
  )
}
