import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductComparison from '../components/ProductComparison'

const comparisonPoints = [
  ['01', '설치 공간', '싱크대 위·하부장 공간과 설치 동선을 먼저 확인하세요.'],
  ['02', '사용 패턴', '온수·냉수·정수 중 자주 쓰는 기능을 생각해 보세요.'],
  ['03', '관리 방식', '필터 교체와 방문·자가 관리 조건을 함께 비교하세요.'],
]

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
    <div className="min-h-screen bg-[#f4f7fa] text-deep-navy">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link to="/" className="text-base font-black tracking-tight text-deep-navy">ALL<span className="text-gold">렌탈</span></Link>
          <span className="text-xs font-semibold text-muted">제품 비교 가이드</span>
        </div>
      </header>
      <main>
        <section className="overflow-hidden bg-deep-navy">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 sm:py-14 md:grid-cols-[1.2fr_0.8fr] md:py-16">
            <div className="relative z-10">
              <p className="text-xs font-extrabold tracking-[0.18em] text-gold">WATER PURIFIER RENTAL GUIDE</p>
              <h1 className="mt-4 text-3xl font-black leading-[1.18] tracking-[-0.055em] text-white sm:text-5xl">우리 집에 맞는<br />정수기, 어떻게 고를까요?</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">복잡한 조건은 줄이고, 필요한 제품과 우선순위만 선택해 보세요. 월 렌탈료와 관리 조건을 한눈에 비교할 수 있습니다.</p>
              <a href="#compare-products" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#b38b35]">정수기 비교 시작하기 <span aria-hidden="true">↓</span></a>
            </div>
            <div className="relative mx-auto w-full max-w-sm md:max-w-none">
              <div className="absolute -inset-5 rounded-full bg-gold/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-3 shadow-2xl">
                <img src="/images/products/water.jpg" alt="주방에 설치된 정수기" className="aspect-square w-full rounded-[20px] object-cover" />
                <div className="absolute bottom-7 left-7 rounded-2xl bg-white px-4 py-3 shadow-lg"><p className="text-[11px] font-bold text-[#2f6ea9]">EASY COMPARISON</p><p className="mt-0.5 text-sm font-black text-deep-navy">내 조건에 맞는 추천 3가지</p></div>
              </div>
            </div>
          </div>
        </section>
        <ProductComparison products={products} category={category} onCategoryChange={setCategory} />
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
            <p className="text-center text-xs font-extrabold tracking-[0.16em] text-[#2f6ea9]">BEFORE YOU COMPARE</p>
            <h2 className="mt-2 text-center text-2xl font-black tracking-[-0.045em] text-deep-navy sm:text-3xl">선택 전에 이 세 가지만 확인하세요</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {comparisonPoints.map(([number, title, description]) => <article key={number} className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-6"><span className="text-xs font-black tracking-[0.12em] text-[#2f6ea9]">{number}</span><h3 className="mt-4 text-lg font-black text-deep-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></article>)}
            </div>
            <p className="mt-8 text-center text-xs leading-5 text-muted">표시된 월 렌탈료와 관리 조건은 모델별로 다를 수 있으며, 최종 조건은 공식 안내 및 계약서를 통해 확인해 주세요.</p>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-muted">© {new Date().getFullYear()} 올(All)렌탈</footer>
    </div>
  )
}
