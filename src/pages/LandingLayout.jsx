import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useParams, Link } from 'react-router-dom'
import { getApartmentBySlug } from '../config'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BrandCompare from '../components/BrandCompare'
import ProductComparison from '../components/ProductComparison'
import HowItWorks from '../components/HowItWorks'
import Recommendation from '../components/Recommendation'
import CompareIntro from '../components/CompareIntro'
import MultiProductConsultation from '../components/MultiProductConsultation'
import Trust from '../components/Trust'
import ConsultationForm from '../components/ConsultationForm'
import Footer from '../components/Footer'
import Faq from '../components/Faq'

export default function LandingLayout({ slug }) {
  const params = useParams()
  const resolvedSlug = params?.slug || slug
  const apartment = useMemo(() => getApartmentBySlug(resolvedSlug), [resolvedSlug])
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [selectedComparison, setSelectedComparison] = useState([])

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
  const selectedInterest = selectedComparison.map((product) => `${product.brand} ${product.name}`).join(', ')

  return (
    <div className="min-h-screen bg-white" style={{ color: '#0b1c2e' }}>
      <Header apartment={apartment} />
      <main>
        <Hero apartment={apartment} />
        <BrandCompare />
        <ProductComparison products={products} onApply={setSelectedComparison} />
        <Categories />
        <HowItWorks />
        <Recommendation products={products} />
        <CompareIntro />
        <MultiProductConsultation />
        <Trust apartment={apartment} />
        <Faq />
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
                <span className="inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-100">
                  입주민 맞춤 렌탈 비교
                </span>
                <h2 className="text-2xl font-bold md:text-3xl">
                  [{apartment.name}]<br />입주 전 렌탈, 내 조건으로 비교하세요
                </h2>
                <p className="mt-3 text-sm text-gray-200">
                  정수기·비데·공기청정기·매트리스의 월 렌탈료,
                  약정, 관리 방식, 설치 가능일을 직접 선택해 확인하세요.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-gray-200">
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    여러 브랜드 비교
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    원하는 시간에 문의
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    상담 후 결정
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">30초 맞춤 견적 신청</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-200">
                  필요한 제품과 연락처를 남겨주시면, 비교 가능한 조건을 안내드립니다.
                </p>
                <div className="mt-4">
                  <ConsultationForm
                    apartment={apartment}
                    utm={{ utmSource, utmMedium, utmCampaign, utmContent }}
                    brandAccent={brandAccent}
                    prefillInterest={selectedInterest}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer apartment={apartment} />
    </div>
  )
}
