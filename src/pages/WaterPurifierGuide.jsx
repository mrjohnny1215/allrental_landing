import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductComparison from '../components/ProductComparison'
import BrandCompare from '../components/BrandCompare'
import CompareIntro from '../components/CompareIntro'

export default function WaterPurifierGuide() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('정수기')

  useEffect(() => {
    document.title = '렌탈 제품 비교 | ALL렌탈'
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', '정수기, 비데, 공기청정기 등 필요한 렌탈 제품을 조건별로 비교해 보세요.')
    fetch('/data/products.json').then((response) => response.json()).then((data) => setProducts(Array.isArray(data) ? data : [])).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-deep-navy">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link to="/" className="text-base font-bold tracking-wide text-deep-navy">ALL렌탈</Link>
          <Link to="/" className="text-sm font-semibold text-gold">목록</Link>
        </div>
      </header>
      <main>
        <section className="bg-deep-navy text-white">
          <div className="mx-auto max-w-6xl px-5 py-10 text-center sm:py-14">
            <p className="text-sm font-bold text-gold">ALL RENTAL</p>
            <h1 className="mt-2 text-2xl font-black sm:text-3xl">우리 집에 맞는 렌탈 제품 비교</h1>
            <p className="mt-3 text-sm text-slate-300">단지 정보 없이, 필요한 제품과 조건만 간단하게 비교해 보세요.</p>
          </div>
        </section>
        <ProductComparison products={products} category={category} onCategoryChange={setCategory} />
        <BrandCompare />
        <CompareIntro />
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-muted">© {new Date().getFullYear()} 올(All)렌탈</footer>
    </div>
  )
}
