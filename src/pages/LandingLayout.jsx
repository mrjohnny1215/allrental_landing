import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useParams, Link } from 'react-router-dom'
import { getApartmentBySlug } from '../config'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import HowItWorks from '../components/HowItWorks'
import Recommendation from '../components/Recommendation'
import CompareIntro from '../components/CompareIntro'
import MultiProductConsultation from '../components/MultiProductConsultation'
import Trust from '../components/Trust'
import ConsultationForm from '../components/ConsultationForm'
import Footer from '../components/Footer'
import KakaoChatButton from '../components/KakaoChatButton'

export default function LandingLayout({ slug }) {
  const params = useParams()
  const resolvedSlug = params?.slug || slug
  const apartment = useMemo(() => getApartmentBySlug(resolvedSlug), [resolvedSlug])
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])

  const utmSource = searchParams.get('utm_source') || ''
  const utmMedium = searchParams.get('utm_medium') || ''
  const utmCampaign = searchParams.get('utm_campaign') || ''
  const utmContent = searchParams.get('utm_content') || ''

  useEffect(() => {
    if (!apartment) return
    document.title = apartment.seoTitle
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', apartment.seoDescription)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', apartment.seoTitle)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', apartment.seoDescription)

    fetch('/data/products.json')
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : []
        setProducts(list)
        try {
          localStorage.setItem('allrental_products', JSON.stringify(list))
        } catch {}
      })
      .catch(() => {})
  }, [apartment])

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-5">
        <div className="text-center">
          <p className="text-xl font-semibold text-deep-navy">단지 정보를 찾을 수 없습니다.</p>
          <Link to="/" className="mt-4 inline-block text-gold underline">
            메인으로 이동
          </Link>
        </div>
      </div>
    )
  }

  const brandBg = apartment.brandColor || '#0b1c2e'
  const brandAccent = apartment.brandAccent || '#c7a14a'

  return (
    <div className="min-h-screen bg-white" style={{ color: '#0b1c2e' }}>
      <Header apartment={apartment} />
      <main>
        <Hero apartment={apartment} />
        <Categories />
        <HowItWorks />
        <Recommendation products={products} />
        <CompareIntro />
        <MultiProductConsultation />
        <Trust apartment={apartment} />
        <section
          id="consult"
          className="relative"
          style={{
            background: `linear-gradient(180deg, ${brandBg} 0%, ${brandBg}dd 100%)`,
            color: '#fff',
          }}
        >
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold md:text-3xl">
                  [{apartment.name}] 입주민 렌탈 상담 신청
                </h2>
                <p className="mt-3 text-sm text-gray-200">
                  상담 신청 후 제품과 조건을 비교해 안내드립니다.
                  <br />
                  신청만으로 계약이 확정되지 않습니다.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-gray-200">
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    비교 상담
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    상담 후 결정
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    간편 신청
                  </span>
                </div>
              </div>
              <ConsultationForm
                apartment={apartment}
                utm={{ utmSource, utmMedium, utmCampaign, utmContent }}
                brandAccent={brandAccent}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer apartment={apartment} />
      <KakaoChatButton />
    </div>
  )
}
