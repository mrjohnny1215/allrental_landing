import { useState } from 'react'

const OPTIONS = {
  products: [
    { value: 'water', label: '정수기' },
    { value: 'bidet', label: '비데' },
    { value: 'purifier', label: '공기청정기' },
    { value: 'mattress', label: '매트리스' },
    { value: 'massager', label: '안마의자' },
  ],
  family: [
    { value: '1', label: '1인' },
    { value: '2', label: '2인' },
    { value: '3', label: '3인' },
    { value: '4', label: '4인 이상' },
  ],
  children: [
    { value: 'no', label: '자녀 없음' },
    { value: 'yes', label: '자녀 있음' },
  ],
  budget: [
    { value: 'light', label: '3만원대' },
    { value: 'standard', label: '3~5만원' },
    { value: 'premium', label: '5만원 이상' },
    { value: 'undecided', label: '미정' },
  ],
}

export default function Recommendation({ onComplete }) {
  const [form, setForm] = useState({
    products: [],
    family: '',
    children: '',
    budget: '',
  })

  const toggleProduct = (value) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(value)
        ? prev.products.filter((v) => v !== value)
        : [...prev.products, value],
    }))
  }

  const isComplete =
    form.products.length > 0 && form.family && form.children && form.budget

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-lg px-5 py-8">
        <h2 className="text-center text-lg font-semibold text-deep-navy">30초 맞춤 추천</h2>
        <p className="mt-1 text-center text-sm text-muted">간단한 조건을 선택해주세요.</p>
        <div className="mt-5 space-y-5">
          <div>
            <div className="text-sm font-semibold text-deep-navy">관심 제품</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {OPTIONS.products.map((option) => {
                const active = form.products.includes(option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleProduct(option.value)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? 'border-gold bg-gold text-white'
                        : 'border-gray-200 bg-white text-deep-navy'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-deep-navy">가족 구성</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {OPTIONS.family.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, family: option.value }))}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    form.family === option.value
                      ? 'border-gold bg-gold text-white'
                      : 'border-gray-200 bg-white text-deep-navy'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-deep-navy">자녀 유무</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {OPTIONS.children.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, children: option.value }))}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    form.children === option.value
                      ? 'border-gold bg-gold text-white'
                      : 'border-gray-200 bg-white text-deep-navy'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-deep-navy">월 예산</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {OPTIONS.budget.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, budget: option.value }))}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    form.budget === option.value
                      ? 'border-gold bg-gold text-white'
                      : 'border-gray-200 bg-white text-deep-navy'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            disabled={!isComplete}
            onClick={() => onComplete?.(form)}
            className="w-full rounded-2xl bg-gold px-5 py-4 text-center text-base font-semibold text-white disabled:opacity-40"
          >
            조건 선택 완료
          </button>
        </div>
      </div>
    </section>
  )
}
