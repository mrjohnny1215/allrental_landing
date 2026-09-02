import { useState, useMemo } from 'react'

const CATEGORY_MAP = {
  water: '정수기',
  bidet: '비데',
  purifier: '공기청정기',
  mattress: '매트리스',
  massager: '안마의자',
}

const FAMILY_OPTIONS = [
  { value: '1', label: '1인' },
  { value: '2', label: '2인' },
  { value: '3', label: '3인' },
  { value: '4', label: '4인 이상' },
]
const CHILDREN_OPTIONS = [
  { value: 'no', label: '자녀 없음' },
  { value: 'yes', label: '자녀 있음' },
]
const PRODUCT_OPTIONS = [
  { value: 'water', label: '정수기' },
  { value: 'bidet', label: '비데' },
  { value: 'purifier', label: '공기청정기' },
  { value: 'mattress', label: '매트리스' },
  { value: 'massager', label: '안마의자' },
]
const BUDGET_OPTIONS = [
  { value: 'light', label: '3만원대' },
  { value: 'standard', label: '3~5만원' },
  { value: 'premium', label: '5만원 이상' },
  { value: 'undecided', label: '미정' },
]
const FEATURE_OPTIONS = [
  { value: 'smart', label: 'IoT/스마트' },
  { value: 'ice', label: '얼음 기능' },
  { value: 'large', label: '대용량' },
  { value: 'silent', label: '저소음' },
  { value: 'visit', label: '방문관리' },
]
const MOVE_IN_OPTIONS = [
  { value: '1m', label: '1개월 내' },
  { value: '3m', label: '3개월 내' },
  { value: '6m', label: '6개월 내' },
  { value: 'undecided', label: '미정' },
]

const IMAGE_MAP = {
  정수기: '/images/products/water.jpg',
  비데: '/images/products/bidet.jpg',
  공기청정기: '/images/products/purifier.jpg',
  매트리스: '/images/products/mattress.jpg',
  안마의자: '/images/products/massager.jpg',
}

export default function Recommendation({ products = [], preselected }) {
  const [form, setForm] = useState({
    family: '',
    children: '',
    products: preselected ? [preselected] : [],
    budget: '',
    features: [],
    moveIn: '',
  })

  const toggleArray = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }))
  }

  const isValid = form.family && form.children && form.products.length > 0 && form.budget && form.moveIn

  const recommended = useMemo(() => {
    if (!products.length || !isValid) return []
    const categoryLabel = CATEGORY_MAP[form.products[0]] || form.products[0]
    return products
      .filter((p) => (p.category || '').includes(categoryLabel))
      .filter((p) => {
        const fee = Number(p.min_monthly_fee || p.pricing_matrix?.[0]?.monthly_fee || 0)
        if (form.budget === 'light' && fee > 30000) return false
        if (form.budget === 'standard' && (fee < 30000 || fee > 50000)) return false
        if (form.budget === 'premium' && fee < 50000) return false
        return true
      })
      .sort((a, b) => (a.min_monthly_fee || 999999) - (b.min_monthly_fee || 999999))
      .slice(0, 3)
  }, [products, form, isValid])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
  }

  return (
    <section id="recommend" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <div className="h-64 w-full rounded-2xl bg-surface md:h-full" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-deep-navy md:text-2xl">우리 집 맞춤 렌탈 추천</h2>
            <p className="mt-2 text-sm text-muted">
              간단한 정보 입력만으로 우리 집에 딱 맞는 제품을 추천해드립니다.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-deep-navy">가족 구성</label>
                  <select
                    value={form.family}
                    onChange={(e) => setForm((prev) => ({ ...prev, family: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  >
                    <option value="">선택해주세요</option>
                    {FAMILY_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-deep-navy">자녀 유무</label>
                  <select
                    value={form.children}
                    onChange={(e) => setForm((prev) => ({ ...prev, children: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  >
                    <option value="">선택해주세요</option>
                    {CHILDREN_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-deep-navy">원하는 제품</label>
                  <select
                    value={form.products[0] || ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, products: e.target.value ? [e.target.value] : [] }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  >
                    <option value="">선택해주세요</option>
                    {PRODUCT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-deep-navy">월 예상 예산</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  >
                    <option value="">선택해주세요</option>
                    {BUDGET_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-deep-navy">원하는 기능</label>
                  <select
                    value={form.features[0] || ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, features: e.target.value ? [e.target.value] : [] }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  >
                    <option value="">선택해주세요</option>
                    {FEATURE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-deep-navy">입주 예정일</label>
                  <select
                    value={form.moveIn}
                    onChange={(e) => setForm((prev) => ({ ...prev, moveIn: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  >
                    <option value="">선택해주세요</option>
                    {MOVE_IN_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={!isValid}
                className="w-full rounded-2xl bg-deep-navy px-5 py-4 text-center text-base font-semibold text-white disabled:opacity-40"
              >
                맞춤 추천 받기 →
              </button>
              <p className="text-xs text-muted">
                * 입력하신 정보는 맞춤 추천 용도로만 사용되며 외부에 공유되지 않습니다.
              </p>
            </form>
            {recommended.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-deep-navy">맞춤 추천 TOP 3 제품</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {recommended.map((item, idx) => (
                    <ProductCard key={item.id} rank={idx + 1} product={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ rank, product }) {
  const monthly = product.pricing_matrix?.[0]?.monthly_fee || product.min_monthly_fee || '문의'
  const points = product.selling_points?.points?.slice(0, 4) || []
  const label = typeof monthly === 'number' ? `월 ${monthly.toLocaleString()}원` : monthly
  const thumb = product.thumbnail || IMAGE_MAP[product.category] || '/images/products/fallback.jpg'
  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div
        className={`absolute -top-3 left-4 rounded-full px-3 py-1 text-xs font-bold ${
          rank === 1 ? 'bg-gold text-white' : rank === 2 ? 'bg-gray-400 text-white' : 'bg-orange-300 text-white'
        }`}
      >
        {rank}
      </div>
      <div className="mt-2 flex h-32 items-center justify-center overflow-hidden rounded-xl bg-surface">
        <img src={thumb} alt={product.name} className="h-full w-full object-contain" />
      </div>
      <div className="mt-3 text-sm font-semibold text-deep-navy">{product.brand}</div>
      <div className="text-xs text-muted">{product.name}</div>
      <div className="mt-2 text-base font-bold text-deep-navy">{label}</div>
      <ul className="mt-2 space-y-1 text-xs text-muted">
        {points.map((pt, i) => (
          <li key={i}>• {pt}</li>
        ))}
      </ul>
      <a
        href="#consult"
        className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-deep-navy px-4 py-3 text-sm font-semibold text-deep-navy"
      >
        상담하기
      </a>
    </div>
  )
}
