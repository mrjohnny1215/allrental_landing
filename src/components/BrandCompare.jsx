const BRANDS = ['코웨이', '청호나이스', '쿠쿠', 'SK매직', '현대큐밍', 'LG', '웰스', '세스코']
const PRODUCTS = ['정수기', '공기청정기', '비데', '매트리스', '안마의자']

export default function BrandCompare() {
  return (
    <section className="bg-deep-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
        <p className="text-center text-sm font-semibold text-gold">한 곳에서, 내 조건에 맞게</p>
        <h2 className="mt-2 text-center text-xl font-bold md:text-3xl">상담 가능한 브랜드와 제품</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed text-gray-300 md:mt-3">
          여러 브랜드의 렌탈 조건을 비교한 뒤, 원하는 제품만 선택하세요.
        </p>
        <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white md:hidden">
          코웨이 · 청호나이스 · 쿠쿠 외 <span className="text-gold">8개 브랜드</span><br />
          정수기 · 비데 · 공기청정기 외 <span className="text-gold">5개 품목</span>
        </div>
        <div className="mt-8 hidden grid-cols-2 gap-3 sm:grid-cols-4 md:grid md:grid-cols-8">
          {BRANDS.map((brand) => (
            <div key={brand} className="rounded-xl border border-white/15 bg-white/5 px-3 py-4 text-center text-sm font-semibold">
              {brand}
            </div>
          ))}
        </div>
        <div className="mt-6 hidden flex-wrap justify-center gap-2 md:flex">
          {PRODUCTS.map((product) => (
            <span key={product} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-deep-navy">{product}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
