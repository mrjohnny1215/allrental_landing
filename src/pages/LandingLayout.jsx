import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useParams, Link } from 'react-router-dom'
import { getApartmentBySlug } from '../config'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BrandCompare from '../components/BrandCompare'
import HowItWorks from '../components/HowItWorks'
import Recommendation from '../components/Recommendation'
import CompareIntro from '../components/CompareIntro'
import MultiProductConsultation from '../components/MultiProductConsultation'
import Trust from '../components/Trust'
import ConsultationForm from '../components/ConsultationForm'
import Footer from '../components/Footer'
import KakaoChatButton from '../components/KakaoChatButton'
import Faq from '../components/Faq'

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
        <BrandCompare />
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
                  카카오톡으로 간편 비교견적
                </span>
                <h2 className="text-2xl font-bold md:text-3xl">
                  [{apartment.name}]<br />입주 전 렌탈, 카카오톡으로 비교하세요
                </h2>
                <p className="mt-3 text-sm text-gray-200">
                  정수기·비데·공기청정기·매트리스의 월 렌탈료,
                  약정, 관리 방식, 설치 가능일을 카카오톡으로 확인하세요.
                </p>
                <a
                  href="http://pf.kakao.com/_xiccxmJX/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-[#FEE500] px-5 py-4 text-base font-bold text-[#191919] transition hover:-translate-y-0.5"
                >
                  <span aria-hidden="true">💬</span>
                  카카오톡으로 비교견적 받기
                  <span aria-hidden="true">→</span>
                </a>
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
              <details className="group rounded-2xl border border-white/20 bg-white/5 p-5">
                <summary className="cursor-pointer list-none text-sm font-semibold text-white">
                  카카오톡 사용이 어려우신가요?
                  <span className="ml-2 text-gray-300 group-open:hidden">연락처 남기기 →</span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-gray-200">
                  연락처를 남겨주시면 렌탈 비교 안내를 도와드립니다.
                </p>
                <div className="mt-4">
                  <ConsultationForm
                    apartment={apartment}
                    utm={{ utmSource, utmMedium, utmCampaign, utmContent }}
                    brandAccent={brandAccent}
                  />
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>
      <Footer apartment={apartment} />
      <KakaoChatButton />
    </div>
  )
}
