const CATEGORIES = [
  {
    id: 'water',
    label: '정수기',
    desc: '깨끗한 물, 편리한 관리',
    detail: '다양한 온수·냉수 기능',
    image: '/images/products/water.jpg',
  },
  {
    id: 'bidet',
    label: '비데',
    desc: '위생적인 관리와',
    detail: '편리한 생활을 한 번에',
    image: '/images/products/bidet.jpg',
  },
  {
    id: 'purifier',
    label: '공기청정기',
    desc: '미세먼지·유해물질 제거',
    detail: '쾌적한 실내 공기',
    image: '/images/products/purifier.jpg',
  },
  {
    id: 'mattress',
    label: '매트리스',
    desc: '숙면을 위한 최적의 선택',
    detail: '편안한 휴식과 회복',
    image: '/images/products/mattress.jpg',
  },
  {
    id: 'massager',
    label: '안마의자',
    desc: '하루의 피로를 풀어주는',
    detail: '프리미엄 힐링 케어',
    image: '/images/products/massager.jpg',
  },
]

export default function Categories() {
  return (
    <section id="benefits" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center text-xl font-bold text-deep-navy md:text-2xl">
          입주 전에 렌탈 준비, 한 번에 끝내세요
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          필요한 제품을 선택하고 맞춤 비교 상담을 받아보세요.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {CATEGORIES.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl border border-gray-100 bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-24 items-center justify-center overflow-hidden rounded-xl bg-white">
                <img src={item.image} alt={item.label} className="h-full w-full object-contain" />
              </div>
              <div className="mt-3 text-sm font-semibold text-deep-navy">{item.desc}</div>
              <div className="text-xs text-muted">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
