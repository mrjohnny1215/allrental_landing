import { useMemo, useState } from 'react'

const CATEGORIES = ['정수기', '비데', '공기청정기', '매트리스', '안마의자']
const FALLBACK_IMAGES = {
  정수기: '/images/products/water.jpg',
  비데: '/images/products/bidet.jpg',
  공기청정기: '/images/products/purifier.jpg',
  매트리스: '/images/products/mattress.jpg',
  안마의자: '/images/products/massager.jpg',
}

// 최신 수수료표.xlsx의 모델별 최고 수수료. 카탈로그 값과 다를 때만 엑셀 값을 우선한다.
const COMMISSION_OVERRIDES = {
  'WP-60C90520M': 356400, ACL22C: 268568, 'CHPI-7430N': 440370,
  'CHPI-7420N': 465660, 'CHPI-7410N': 453060, 'CPI-7410N': 440370,
  'CHPI-7400N': 453060, 'CHPI-7511L': 440370, 'CHPI-7521L': 440370,
  'CPI-7400N': 440370, 'CPI-7511L': 427770, 'CPSI-8510L': 453060,
  'CHP-7212N': 414990, 'CHP-7220N': 414990, 'CP-7220N': 402390,
  'CHP-7211N': 402390, 'CP-7211N': 389790, WP270: 382500, HN877: 1147500,
  'CP-AHS101HE': 570542, 'CP-AHS100HE': 545996, 'CP-SS100H': 465802,
  'CP-AMS100': 535052, 'CP-ABS100GWH/GP': 463628, PM50SW: 360000,
  'HQPM11CW1D/E0C': 351000, 'A-T12DW0B': 324000, 'A-B233W,Z': 279000,
  'AS356N(S/G)MAM': 498681, 'AS206N(S/G)HAM': 380863, AS195DWWAM: 298390,
  AS305DWWAM: 357300, AS235DWSAM: 357300, AS285DWWAM: 351409,
  'HY705R(S/G)UAM': 451472, AS336NSLCM: 427990,
}

function monthlyFee(product) {
  return product.min_monthly_fee || product.pricing_matrix?.[0]?.monthly_fee || 0
}

function commission(product) {
  const modelCode = String(product.model_code || '').trim().toUpperCase()
  return COMMISSION_OVERRIDES[modelCode] || product.max_commission || 0
}

function productImage(product) {
  return product.thumbnail || product.images?.[0] || FALLBACK_IMAGES[product.category]
}

export default function ProductComparison({ products = [], onApply }) {
  const [category, setCategory] = useState('정수기')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])

  const candidates = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return products
      .filter((product) => product.category === category)
      .filter((product) => monthlyFee(product) > 0)
      .filter((product) => !keyword || `${product.brand} ${product.name} ${product.model_code || ''}`.toLowerCase().includes(keyword))
      .sort((a, b) => commission(b) - commission(a) || monthlyFee(a) - monthlyFee(b))
      .slice(0, 12)
  }, [products, category, query])

  const toggleProduct = (product) => {
    setSelected((previous) => {
      if (previous.some((item) => item.id === product.id)) return previous.filter((item) => item.id !== product.id)
      if (previous.length >= 3) return previous
      return [...previous, product]
    })
  }

  const applyComparison = () => {
    if (!selected.length) return
    onApply?.(selected)
    document.getElementById('consult')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="compare-products" className="bg-[#f5f7f9]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold tracking-[0.16em] text-[#2f6ea9]">PRODUCT COMPARISON</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.045em] text-deep-navy md:text-3xl">상품을 골라 직접 비교해보세요</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">같은 제품군에서 최대 3개 모델의 월 렌탈료·약정·관리 조건을 비교할 수 있습니다.</p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button key={item} type="button" onClick={() => { setCategory(item); setSelected([]) }} className={`rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? 'bg-deep-navy text-white' : 'bg-white text-muted ring-1 ring-slate-200 hover:text-deep-navy'}`}>
                {item}
              </button>
            ))}
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm" placeholder={`${category} 모델명 또는 브랜드 검색`} />
        </div>

        <p className="mt-4 text-xs font-semibold text-muted">각 카테고리 상품은 수수료 높은 순으로 표시됩니다. 모델을 최대 3개까지 선택하세요. ({selected.length}/3)</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map((product) => {
            const isSelected = selected.some((item) => item.id === product.id)
            return (
              <button key={product.id} type="button" onClick={() => toggleProduct(product)} className={`flex min-h-28 items-center gap-3 rounded-2xl border p-3 text-left transition ${isSelected ? 'border-[#2f6ea9] bg-[#eaf2fb] ring-2 ring-[#2f6ea9]/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                <img src={productImage(product)} alt="" className="h-20 w-20 shrink-0 rounded-xl bg-slate-50 object-contain" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = FALLBACK_IMAGES[product.category] }} />
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-[#2f6ea9]">{product.brand}</span>
                  <span className="mt-1 block line-clamp-2 text-sm font-extrabold text-deep-navy">{product.name}</span>
                  <span className="mt-1 block text-xs text-muted">월 {monthlyFee(product).toLocaleString()}원~</span>
                </span>
              </button>
            )
          })}
        </div>

        {selected.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div><h3 className="font-black text-deep-navy">선택 모델 비교</h3><p className="mt-1 text-xs text-muted">실제 렌탈료는 선택 약정·관리 조건에 따라 달라질 수 있습니다.</p></div>
              <button type="button" onClick={() => setSelected([])} className="text-xs font-bold text-muted underline">선택 초기화</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[620px] w-full text-left text-sm">
                <thead><tr className="bg-slate-50"><th className="w-32 px-5 py-4 text-xs font-bold text-muted">비교 항목</th>{selected.map((product) => <th key={product.id} className="min-w-48 px-4 py-4 align-top"><div className="text-xs text-[#2f6ea9]">{product.brand}</div><div className="mt-1 font-extrabold text-deep-navy">{product.name}</div></th>)}</tr></thead>
                <tbody>
                  <ComparisonRow label="모델명" products={selected} render={(product) => product.model_code || '-'} />
                  <ComparisonRow label="월 렌탈료" products={selected} emphasis render={(product) => `월 ${monthlyFee(product).toLocaleString()}원~`} />
                  <ComparisonRow label="관리 방식" products={selected} render={(product) => product.pricing_matrix?.[0]?.mgmt || '-'} />
                  <ComparisonRow label="약정 기간" products={selected} render={(product) => product.pricing_matrix?.[0]?.years || '-'} />
                  <ComparisonRow label="관리 주기" products={selected} render={(product) => product.pricing_matrix?.[0]?.mgmt_cycle || '-'} />
                  <ComparisonRow label="주요 기능" products={selected} render={(product) => product.tags?.slice(0, 4).join(' · ') || product.selling_points?.points?.slice(0, 2).join(' · ') || '-'} />
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-100 px-5 py-4"><button type="button" onClick={applyComparison} className="w-full rounded-2xl bg-deep-navy px-5 py-4 text-base font-extrabold text-white transition hover:bg-[#173757]">선택한 모델로 맞춤 견적 신청하기 →</button></div>
          </div>
        )}
      </div>
    </section>
  )
}

function ComparisonRow({ label, products, render, emphasis = false }) {
  return <tr className="border-t border-slate-100"><th className="bg-slate-50/60 px-5 py-4 text-xs font-bold text-muted">{label}</th>{products.map((product) => <td key={product.id} className={`px-4 py-4 text-sm ${emphasis ? 'font-extrabold text-deep-navy' : 'text-slate-700'}`}>{render(product)}</td>)}</tr>
}
