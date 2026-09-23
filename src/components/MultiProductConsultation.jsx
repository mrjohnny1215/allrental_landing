const BUNDLES = [
  {
    id: 'water-bidet',
    title: '정수기 + 비데',
    desc: '필수 가전을 한 번에 편리하게',
    images: ['/images/products/water.jpg', '/images/products/bidet.jpg'],
  },
  {
    id: 'water-purifier',
    title: '정수기 + 공기청정기',
    desc: '깨끗한 물과 공기를 동시에',
    images: ['/images/products/water.jpg', '/images/products/purifier.jpg'],
  },
  {
    id: 'water-bidet-mattress',
    title: '정수기 + 비데 + 매트리스',
    desc: '생활 필수품을 스마트하게',
    images: ['/images/products/water.jpg', '/images/products/bidet.jpg', '/images/products/mattress.jpg'],
  },
]

export default function MultiProductConsultation() {
  return (
    <section className="bg-[#f5f7f9]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-center text-xs font-extrabold tracking-[0.16em] text-[#2f6ea9]">MOVE-IN BUNDLE</p>
        <h2 className="mt-2 text-center text-2xl font-black tracking-[-0.045em] text-deep-navy md:text-3xl">
          입주민이라면 여러 제품을 한 번에 상담하세요
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          여러 제품을 한 번에 비교하고 혜택까지 받아보세요.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className="group overflow-hidden rounded-[24px] border border-slate-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid h-44 gap-1 overflow-hidden rounded-[16px] bg-[#eaf2fb] p-1" style={{ gridTemplateColumns: `repeat(${bundle.images.length}, minmax(0, 1fr))` }}>
                {bundle.images.map((image, index) => (
                  <img key={image} src={image} alt="" className="h-full w-full rounded-xl object-cover transition duration-300 group-hover:scale-105" style={{ transitionDelay: `${index * 40}ms` }} />
                ))}
              </div>
              <div className="mt-5 px-2 text-lg font-black tracking-[-0.035em] text-deep-navy">{bundle.title}</div>
              <div className="px-2 text-sm text-muted">{bundle.desc}</div>
              <a
                href="#consult"
                className="mx-2 mb-2 mt-5 inline-flex w-[calc(100%-1rem)] items-center justify-center rounded-xl bg-[#FEE500] px-4 py-3 text-sm font-extrabold text-[#191919] transition hover:bg-[#ffef42]"
              >
                이 구성으로 견적 신청
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
