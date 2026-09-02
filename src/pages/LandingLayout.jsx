import { useEffect, useMemo } from 'react'
import { useSearchParams, useParams, Link } from 'react-router-dom'
import { getApartmentBySlug } from '../config'

export default function LandingLayout({ slug }) {
  const params = useParams()
  const resolvedSlug = params?.slug || slug
  const apartment = useMemo(() => getApartmentBySlug(resolvedSlug), [resolvedSlug])
  const [searchParams] = useSearchParams()

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

  return (
    <div className="min-h-screen bg-white">
      <Header apartment={apartment} />
      <main>
        <Hero apartment={apartment} />
        <Categories />
        <HowItWorks />
        <Recommendation />
        <CompareIntro />
        <MultiProductConsultation />
        <Trust />
        <ConsultationForm
          apartment={apartment}
          utm={{ utmSource, utmMedium, utmCampaign, utmContent }}
        />
      </main>
      <Footer apartment={apartment} />
    </div>
  )
}
