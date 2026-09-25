import { useMemo, useState } from 'react'

const CATEGORIES = ['정수기', '비데', '공기청정기', '매트리스', '안마의자']
const PRIORITIES = [
  { id: 'balanced', label: '추천 모델 우선', description: '조건이 좋은 상위 모델부터 보고 싶어요' },
  { id: 'premium', label: '프리미엄 제품 우선', description: '기능이 좋은 상위 제품을 보고 싶어요' },
  { id: 'care', label: '관리 편의 우선', description: '관리 서비스를 중요하게 보고 싶어요' },
]
const FALLBACK_IMAGES = {
  정수기: '/images/products/water.jpg', 비데: '/images/products/bidet.jpg', 공기청정기: '/images/products/purifier.jpg', 매트리스: '/images/products/mattress.jpg', 안마의자: '/images/products/massager.jpg',
}
const RECOMMENDED_THUMBNAILS = {
  'skmagic-wpu-iac506s': '/images/recommended/skmagic-wpu-iac506s.jpg',
  'cuckoo-cp-acsr1620sw': '/images/recommended/cuckoo-cp-acsr1620sw.jpg',
  'cuckoo-cp-acs1610snw': '/images/recommended/cuckoo-cp-acs1610snw.jpg',
  'chungho-wi-15c7500': '/images/recommended/chungho-wi-15c7500.jpg',
  'coway-chp-700l': '/images/recommended/coway-chp-700l.jpg',
  'coway-bas51-a': '/images/recommended/coway-bas51-a.jpg',
  'coway-bas38-c': '/images/recommended/coway-bas38-c.jpg',
  'coway-bas37-c': '/images/recommended/coway-bas37-c.jpg',
  'wells-bm750': '/images/recommended/wells-bm750.jpg',
  'skmagic-bids51dr15wh': '/images/recommended/skmagic-bids51dr15wh.jpg',
  'hyundai-hqab20340f': '/images/recommended/hyundai-hqab20340f.jpg',
  'lg-as356n-s-g-mam-2': '/images/recommended/lg-as356n-s-g-mam-2.jpg',
  'lg-as356n-s-g-mam': '/images/recommended/lg-as356n-s-g-mam.jpg',
  'lg-as336nslcm-2': '/images/recommended/lg-as336nslcm-2.jpg',
  'coway-cmlk-as05': '/images/recommended/coway-cmlk-as05.jpg',
  'coway-cmk-as05': '/images/recommended/coway-cmk-as05.jpg',
  'coway-cmq-as05': '/images/recommended/coway-cmq-as05.jpg',
  'wells-hn877-2': '/images/recommended/wells-hn877-2.jpg',
  'wells-hn877': '/images/recommended/wells-hn877.jpg',
  'wells-hr768rwa': '/images/recommended/wells-hr768rwa.jpg',
  'coway-mc-sc01': '/images/recommended/coway-mc-sc01.jpg',
}

// 최신 수수료표.xlsx의 모델별 최고 수수료. 추천 순서를 안정적으로 정하는 내부 기준으로만 사용한다.
const COMMISSION_OVERRIDES = {
  'WP-60C90520M': 356400, ACL22C: 268568, 'CHPI-7430N': 440370, 'CHPI-7420N': 465660, 'CHPI-7410N': 453060, 'CPI-7410N': 440370, 'CHPI-7400N': 453060, 'CHPI-7511L': 440370, 'CHPI-7521L': 440370, 'CPI-7400N': 440370, 'CPI-7511L': 427770, 'CPSI-8510L': 453060, 'CHP-7212N': 414990, 'CHP-7220N': 414990, 'CP-7220N': 402390, 'CHP-7211N': 402390, 'CP-7211N': 389790, WP270: 382500, HN877: 1147500, 'CP-AHS101HE': 570542, 'CP-AHS100HE': 545996, 'CP-SS100H': 465802, 'CP-AMS100': 535052, 'CP-ABS100GWH/GP': 463628, PM50SW: 360000, 'HQPM11CW1D/E0C': 351000, 'A-T12DW0B': 324000, 'A-B233W,Z': 279000, 'AS356N(S/G)MAM': 498681, 'AS206N(S/G)HAM': 380863, AS195DWWAM: 298390, AS305DWWAM: 357300, AS235DWSAM: 357300, AS285DWWAM: 351409, 'HY705R(S/G)UAM': 451472, AS336NSLCM: 427990,
}

function monthlyFee(product) { return product.min_monthly_fee || product.pricing_matrix?.[0]?.monthly_fee || 0 }
function commission(product) { return COMMISSION_OVERRIDES[String(product.model_code || '').trim().toUpperCase()] || product.max_commission || 0 }
function productImage(product) { return RECOMMENDED_THUMBNAILS[product.id] || product.thumbnail || product.images?.[0] || FALLBACK_IMAGES[product.category] }
function managementSummary(product) {
  const details = product.pricing_matrix?.[0] || {}
  return [details.mgmt, details.mgmt_cycle].filter(Boolean).join(' · ') || '관리 조건 상담 시 안내'
}
function careScore(product) { return /방문|관리|케어|필터/.test(`${managementSummary(product)} ${product.tags?.join(' ') || ''}`) ? 1 : 0 }
function compareForPriority(priority) {
  if (priority === 'premium') return (a, b) => monthlyFee(b) - monthlyFee(a) || commission(b) - commission(a)
  if (priority === 'care') return (a, b) => careScore(b) - careScore(a) || commission(b) - commission(a) || monthlyFee(a) - monthlyFee(b)
  return (a, b) => commission(b) - commission(a) || monthlyFee(a) - monthlyFee(b)
}

export default function ProductComparison({ products = [], onApply, category = '정수기', onCategoryChange }) {
  const [priority, setPriority] = useState('balanced')
  const [query, setQuery] = useState('')
  const [showComparison, setShowComparison] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const categoryProducts = useMemo(() => products.filter((product) => product.category === category).filter((product) => monthlyFee(product) > 0), [products, category])
  const recommendations = useMemo(() => [...categoryProducts].sort(compareForPriority(priority)).slice(0, 3), [categoryProducts, priority])
  const searchResults = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return []
    return categoryProducts.filter((product) => `${product.brand} ${product.name} ${product.model_code || ''}`.toLowerCase().includes(keyword)).sort(compareForPriority(priority)).slice(0, 6)
  }, [categoryProducts, priority, query])
  const applyProducts = (chosenProducts) => {
    if (!chosenProducts.length) return
    onApply?.(chosenProducts)
    document.getElementById('consult')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const showConsultation = typeof onApply === 'function'

  return <section id="compare-products" className="bg-[#f5f7f9]"><div className="mx-auto max-w-6xl px-5 py-16">
    <div className="max-w-2xl"><p className="text-xs font-extrabold tracking-[0.16em] text-[#2f6ea9]">EASY PRODUCT RECOMMENDATION</p><h2 className="mt-2 text-2xl font-black tracking-[-0.045em] text-deep-navy md:text-3xl">우리 집에 맞는 제품을 간단히 찾아보세요</h2><p className="mt-2 text-sm leading-relaxed text-muted">품목과 우선 조건만 고르면 비교하기 쉬운 추천 3가지를 바로 보여드립니다.</p></div>
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <p className="text-sm font-extrabold text-deep-navy"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-deep-navy text-xs text-white">1</span>어떤 제품이 필요하세요?</p>
      <div className="mt-4 flex flex-wrap gap-2">{CATEGORIES.map((item) => <button key={item} type="button" onClick={() => { onCategoryChange?.(item); setQuery(''); setShowComparison(false) }} className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${category === item ? 'bg-deep-navy text-white' : 'bg-slate-50 text-muted ring-1 ring-slate-200 hover:text-deep-navy'}`}>{item}</button>)}</div>
      <p className="mt-7 text-sm font-extrabold text-deep-navy"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-deep-navy text-xs text-white">2</span>무엇을 가장 중요하게 보세요?</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">{PRIORITIES.map((item) => <button key={item.id} type="button" onClick={() => { setPriority(item.id); setShowComparison(false) }} className={`rounded-2xl border p-4 text-left transition ${priority === item.id ? 'border-[#2f6ea9] bg-[#eaf2fb] ring-2 ring-[#2f6ea9]/15' : 'border-slate-200 hover:border-slate-300'}`}><span className="block text-sm font-extrabold text-deep-navy">{item.label}</span><span className="mt-1 block text-xs leading-relaxed text-muted">{item.description}</span></button>)}</div>
    </div>
    <div className="mt-8 flex items-end justify-between gap-4"><div><h3 className="text-xl font-black text-deep-navy">{category} 추천 3가지</h3><p className="mt-1 text-sm text-muted">월 렌탈료와 관리 조건을 한눈에 확인해 보세요.</p></div><span className="hidden rounded-full bg-[#eaf2fb] px-3 py-1.5 text-xs font-bold text-[#2f6ea9] sm:inline-block">추천 결과</span></div>
    {recommendations.length > 0 ? <>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">{recommendations.map((product, index) => <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#2f6ea9] hover:shadow-md"><button type="button" onClick={() => setSelectedProduct(product)} className="block w-full text-left"><div className="flex items-center gap-4 p-5"><img src={productImage(product)} alt="" className="h-24 w-24 shrink-0 rounded-2xl bg-slate-50 object-contain" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = FALLBACK_IMAGES[product.category] }} /><div className="min-w-0"><span className="inline-flex rounded-full bg-[#eaf2fb] px-2.5 py-1 text-[11px] font-extrabold text-[#2f6ea9]">추천 {index + 1}</span><p className="mt-2 text-xs font-bold text-[#2f6ea9]">{product.brand}</p><h4 className="mt-1 line-clamp-2 text-base font-black text-deep-navy">{product.name}</h4><span className="mt-3 inline-flex text-xs font-extrabold text-[#2f6ea9]">상세 보기 →</span></div></div><div className="border-t border-slate-100 px-5 py-4"><p className="text-xl font-black text-deep-navy">월 {monthlyFee(product).toLocaleString()}원~</p><p className="mt-2 text-xs text-muted">{managementSummary(product)}</p></div></button></article>)}</div>
      <div className={`mt-5 grid gap-3 ${showConsultation ? 'sm:grid-cols-2' : ''}`}><button type="button" onClick={() => setShowComparison((value) => !value)} className="rounded-2xl border border-deep-navy bg-white px-5 py-4 text-sm font-extrabold text-deep-navy transition hover:bg-slate-50">{showComparison ? '추천 비교표 닫기' : '추천 3개 한눈에 비교하기'}</button>{showConsultation && <button type="button" onClick={() => applyProducts(recommendations)} className="rounded-2xl bg-deep-navy px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#173757]">이 추천으로 맞춤 견적 신청하기 →</button>}</div>
      {showComparison && <ComparisonTable products={recommendations} />}
    </> : <p className="mt-4 rounded-2xl bg-white p-5 text-sm text-muted">현재 표시할 수 있는 {category} 상품이 없습니다. 상담을 남겨주시면 맞는 상품을 안내해 드릴게요.</p>}
    <details className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-4"><summary className="cursor-pointer text-sm font-extrabold text-deep-navy">원하는 모델이 있으신가요? 직접 찾아보기</summary><div className="mt-4"><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder={`${category} 모델명 또는 브랜드 검색`} />{query && <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{searchResults.length ? searchResults.map((product) => <button key={product.id} type="button" onClick={() => showConsultation && applyProducts([product])} className="rounded-xl border border-slate-200 p-3 text-left hover:border-[#2f6ea9]"><span className="block text-xs font-bold text-[#2f6ea9]">{product.brand}</span><span className="mt-1 block line-clamp-1 text-sm font-extrabold text-deep-navy">{product.name}</span><span className="mt-1 block text-xs text-muted">월 {monthlyFee(product).toLocaleString()}원~{showConsultation ? ' · 이 모델로 상담하기' : ''}</span></button>) : <p className="text-sm text-muted">검색 결과가 없습니다.</p>}</div>}</div></details>
    {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
  </div></section>
}

function ProductDetail({ product, onClose }) {
  const points = product.selling_points?.points?.slice(0, 6) || product.tags?.slice(0, 6) || []
  const filters = product.selling_points?.filters?.slice(0, 4) || []
  const prices = product.pricing_matrix?.slice(0, 6) || []

  return <div className="fixed inset-0 z-[100] flex items-end bg-slate-950/55 p-0 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} 상세 정보`} onMouseDown={onClose}>
    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]" onMouseDown={(event) => event.stopPropagation()}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7"><p className="text-sm font-black text-deep-navy">제품 상세 정보</p><button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 hover:bg-slate-200" aria-label="상세 정보 닫기">×</button></div>
      <div className="p-5 sm:p-7"><div className="grid gap-6 sm:grid-cols-[190px_1fr]"><div className="flex items-center justify-center rounded-3xl bg-slate-50 p-5"><img src={productImage(product)} alt={product.name} className="max-h-52 w-full object-contain" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = FALLBACK_IMAGES[product.category] }} /></div><div><p className="text-sm font-extrabold text-[#2f6ea9]">{product.brand} · {product.category}</p><h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-deep-navy">{product.name}</h3><p className="mt-1 text-sm text-muted">모델명 {product.model_code || '확인 필요'}</p><div className="mt-4 flex flex-wrap gap-2">{(product.tags || []).slice(0, 5).map((tag) => <span key={tag} className="rounded-full bg-[#eaf2fb] px-3 py-1.5 text-xs font-bold text-[#2f6ea9]">{tag}</span>)}</div><p className="mt-5 text-2xl font-black text-deep-navy">월 {monthlyFee(product).toLocaleString()}원~</p><p className="mt-1 text-xs text-muted">{managementSummary(product)} · 조건에 따라 달라질 수 있습니다.</p></div></div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2"><section><h4 className="text-base font-black text-deep-navy">주요 특징</h4><ul className="mt-3 space-y-2">{points.length ? points.map((point) => <li key={point} className="flex gap-2 text-sm leading-6 text-slate-700"><span className="text-[#2f6ea9]">✓</span>{point}</li>) : <li className="text-sm text-muted">제품 특징은 공식 안내를 통해 확인해 주세요.</li>}</ul></section><section><h4 className="text-base font-black text-deep-navy">제품 사양</h4><dl className="mt-3 space-y-2 text-sm">{product.specs?.capacity && <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs font-bold text-muted">용량·구성</dt><dd className="mt-1 font-semibold text-deep-navy">{product.specs.capacity}</dd></div>}{product.specs?.size && <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs font-bold text-muted">크기</dt><dd className="mt-1 font-semibold text-deep-navy">{product.specs.size}</dd></div>}{filters.length > 0 && <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs font-bold text-muted">필터·관리 정보</dt><dd className="mt-1 space-y-1 text-xs leading-5 text-slate-700">{filters.map((filter) => <div key={filter}>{filter}</div>)}</dd></div>}</dl></section></div>
        {prices.length > 0 && <section className="mt-8"><h4 className="text-base font-black text-deep-navy">렌탈 조건 예시</h4><div className="mt-3 overflow-hidden rounded-2xl border border-slate-200"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs text-muted"><tr><th className="px-4 py-3">약정</th><th className="px-4 py-3">관리</th><th className="px-4 py-3 text-right">월 렌탈료</th></tr></thead><tbody>{prices.map((price, index) => <tr key={`${price.plan_label}-${index}`} className="border-t border-slate-100"><td className="px-4 py-3 font-semibold text-deep-navy">{price.years} · {price.contract}</td><td className="px-4 py-3 text-slate-600">{[price.mgmt, price.mgmt_cycle].filter(Boolean).join(' · ') || '-'}</td><td className="px-4 py-3 text-right font-extrabold text-deep-navy">{Number(price.monthly_fee).toLocaleString()}원</td></tr>)}</tbody></table></div></section>}
        <p className="mt-6 text-xs leading-5 text-muted">표시된 사양과 렌탈 조건은 데이터 기준일 및 선택 조건에 따라 변경될 수 있습니다. 계약 전 공식 안내와 계약서를 확인해 주세요.</p></div>
    </div>
  </div>
}

function ComparisonTable({ products }) {
  return <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h4 className="font-black text-deep-navy">추천 모델 비교</h4><p className="mt-1 text-xs text-muted">최종 렌탈료와 약정·관리 조건은 상담 시 확인해 드립니다.</p></div><div className="overflow-x-auto"><table className="min-w-[620px] w-full text-left text-sm"><thead><tr className="bg-slate-50"><th className="w-28 px-5 py-4 text-xs font-bold text-muted">비교 항목</th>{products.map((product) => <th key={product.id} className="min-w-48 px-4 py-4 align-top"><span className="text-xs text-[#2f6ea9]">{product.brand}</span><span className="mt-1 block font-extrabold text-deep-navy">{product.name}</span></th>)}</tr></thead><tbody><ComparisonRow label="모델명" products={products} render={(product) => product.model_code || '-'} /><ComparisonRow label="월 렌탈료" products={products} emphasis render={(product) => `월 ${monthlyFee(product).toLocaleString()}원~`} /><ComparisonRow label="관리 방식" products={products} render={managementSummary} /><ComparisonRow label="약정 기간" products={products} render={(product) => product.pricing_matrix?.[0]?.years || '상담 시 안내'} /><ComparisonRow label="주요 기능" products={products} render={(product) => product.tags?.slice(0, 3).join(' · ') || product.selling_points?.points?.slice(0, 2).join(' · ') || '상담 시 안내'} /></tbody></table></div></div>
}

function ComparisonRow({ label, products, render, emphasis = false }) {
  return <tr className="border-t border-slate-100"><th className="bg-slate-50/60 px-5 py-4 text-xs font-bold text-muted">{label}</th>{products.map((product) => <td key={product.id} className={`px-4 py-4 text-sm ${emphasis ? 'font-extrabold text-deep-navy' : 'text-slate-700'}`}>{render(product)}</td>)}</tr>
}
