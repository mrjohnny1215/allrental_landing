import { useState, useEffect } from 'react'

const PRODUCTS = [
  { id: 'water', name: '정수기', image: '/assets/hillstate/water-purifier.jpg', desc: '깨끗한 물, 편리한 관리' },
  { id: 'bidet', name: '비데', image: '/assets/hillstate/bidet.jpg', desc: '위생적인 관리와 편리한 생활' },
  { id: 'purifier', name: '공기청정기', image: '/assets/hillstate/air-purifier.jpg', desc: '미세먼지·유해물질 제거' },
  { id: 'mattress', name: '매트리스', image: '/assets/hillstate/mattress.jpg', desc: '숙면을 위한 최적의 선택' },
  { id: 'massager', name: '안마의자', image: '/assets/hillstate/massage-chair.jpg', desc: '하루의 피로를 풀어주는 힐링 케어' },
]

export default function HillstateLanding() {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    apartment: '힐스테이트 메디알레',
    products: [],
    preferredTime: '',
    privacyConsent: false,
  })
  const [status, setStatus] = useState('idle')

  const scrollToForm = (productId) => {
    setSelectedProduct(productId)
    const el = document.getElementById('quote-form')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.privacyConsent) {
      alert('개인정보 수집 및 이용에 동의해주세요.')
      return
    }
    if (!form.name || !form.phone || !form.apartment) {
      alert('필수 정보를 입력해주세요.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartmentSlug: 'hillstate',
          apartmentName: form.apartment,
          name: form.name,
          phone: form.phone,
          interest: form.products.join(', ') || selectedProduct,
          products: form.products.length ? form.products : [selectedProduct],
          preferredTime: form.preferredTime,
          message: '',
          privacyConsent: form.privacyConsent,
          utmSource: '',
          utmMedium: '',
          utmCampaign: 'hillstate-landing',
          utmContent: '',
          status: 'NEW',
          source: 'hillstate-landing',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || '상담 신청에 실패했습니다.')
      setStatus('success')
      setForm({ name: '', phone: '', apartment: '힐스테이트 메디알레', products: [], preferredTime: '', privacyConsent: false })
    } catch (err) {
      alert(err.message)
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl font-extrabold tracking-tight text-[#8F1D18]">HILLSTATE</div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#products" className="hover:text-[#8F1D18]">렌탈 제품</a>
            <a href="#benefits" className="hover:text-[#8F1D18]">렌탈 혜택</a>
            <a href="#process" className="hover:text-[#8F1D18]">이용 안내</a>
            <a href="#reviews" className="hover:text-[#8F1D18]">고객 후기</a>
          </nav>
          <a href="tel:1600-1234" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#8F1D18]">
            <span>☎</span>
            <span>전화 상담 1600-1234</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-extrabold leading-tight text-[#171717] md:text-5xl">
                힐스테이트 입주민을 위한<br />
                <span className="text-[#8F1D18]">생활가전 렌탈 특별혜택</span>
              </h1>
              <p className="mt-4 text-base text-gray-600 md:text-lg">
                새로운 시작, 생활가전도 부담 없이<br />
                정수기부터 안마의자까지 한 번에 비교하세요!
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ['초기비용', '부담 없이'],
                  ['전문 상담', '무료 제공'],
                  ['빠른 설치', '& 관리'],
                  ['제휴', '특별 혜택'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-xl bg-[#FAF8F5] p-3 text-center">
                    <div className="text-xs font-bold text-[#8F1D18]">{title}</div>
                    <div className="text-xs text-gray-600">{desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="#quote-form" className="inline-flex items-center justify-center rounded-xl bg-[#8F1D18] px-6 py-4 text-base font-semibold text-white">
                  무료 견적 받기 →
                </a>
                <a href="#quote-form" className="inline-flex items-center justify-center rounded-xl border-2 border-[#8F1D18] px-6 py-4 text-base font-semibold text-[#8F1D18]">
                  카카오톡 상담
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-100 md:h-full">
                <img src="/assets/hillstate/water-purifier.jpg" alt="정수기" className="absolute left-4 top-4 h-32 w-32 rounded-xl object-cover shadow-lg md:h-40 md:w-40" />
                <img src="/assets/hillstate/air-purifier.jpg" alt="공기청정기" className="absolute right-4 top-8 h-28 w-28 rounded-xl object-cover shadow-lg md:h-36 md:w-36" />
                <img src="/assets/hillstate/massage-chair.jpg" alt="안마의자" className="absolute bottom-8 left-8 h-36 w-36 rounded-xl object-cover shadow-lg md:h-44 md:w-44" />
                <img src="/assets/hillstate/mattress.jpg" alt="매트리스" className="absolute bottom-4 right-8 h-28 w-28 rounded-xl object-cover shadow-lg md:h-36 md:w-36" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#171717] md:text-3xl">입주하면서 필요한 렌탈, 한 번에 비교하세요</h2>
            <p className="mt-2 text-sm text-gray-600">여러 브랜드, 여러 조건을 한 번에 비교하고 우리 집에 맞는 제품을 선택하세요.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="flex flex-col rounded-2xl border border-gray-100 bg-[#FAF8F5] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-32 items-center justify-center overflow-hidden rounded-xl bg-white">
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                </div>
                <div className="mt-3 text-base font-bold text-[#171717]">{p.name}</div>
                <div className="mt-1 text-xs text-gray-600">{p.desc}</div>
                <button onClick={() => scrollToForm(p.id)} className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#8F1D18] px-4 py-3 text-sm font-semibold text-white">
                  {p.name} 상담받기 →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="benefits" className="bg-[#FAF8F5] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-[#171717] md:text-3xl">왜 힐스테이트 입주민 렌탈 상담일까요?</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              ['🔍', '여러 브랜드 한 번에 비교', '다양한 브랜드와 상품을 한 번에 비교해드립니다.'],
              ['💳', '초기 비용 부담 없이', '목돈 부담 없이 월 렌탈료로 가볍게 시작하세요.'],
              ['📅', '입주 일정에 맞춘 설치', '입주일정에 맞춰 설치 일정을 안내해드립니다.'],
              ['✓', '필요한 제품만 선택', '원하는 제품만 단품으로 또는 여러 제품 동시 상담 가능.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="text-3xl">{icon}</div>
                <div className="mt-3 text-base font-bold text-[#171717]">{title}</div>
                <div className="mt-1 text-sm text-gray-600">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-[#171717] md:text-3xl">간편한 렌탈 상담 및 설치 과정</h2>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-start md:gap-4">
            {[
              ['01', '제품 선택'],
              ['02', '상담 신청'],
              ['03', '제품 및 조건 비교'],
              ['04', '상품 선택'],
              ['05', '설치 일정 안내'],
            ].map(([num, title]) => (
              <div key={num} className="flex-1 text-center">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8F1D18] text-lg font-bold text-white">{num}</div>
                </div>
                <div className="mt-4 text-base font-semibold text-[#171717]">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form + Benefits */}
      <section id="quote-form" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-[#171717] md:text-3xl">30초 무료 견적 신청</h2>
              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-[#171717]">이름</label>
                  <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm" placeholder="홍길동" required />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#171717]">연락처</label>
                  <input value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm" placeholder="010-0000-0000" required />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#171717]">입주 예정 아파트</label>
                  <input value={form.apartment} onChange={(e) => setForm((prev) => ({ ...prev, apartment: e.target.value }))} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm" placeholder="힐스테이트 메디알레" required />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#171717]">관심 제품</label>
                  <select value={selectedProduct} onChange={(e) => { setSelectedProduct(e.target.value); setForm((prev) => ({ ...prev, products: e.target.value ? [e.target.value] : [] })) }} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm">
                    <option value="">선택해주세요</option>
                    {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    <option value="multiple">여러 제품 함께 상담</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-[#171717]">상담 희망 시간</label>
                  <div className="mt-2 flex gap-3">
                    {['오전', '오후', '저녁'].map((t) => (
                      <button key={t} type="button" onClick={() => setForm((prev) => ({ ...prev, preferredTime: t }))} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold ${form.preferredTime === t ? 'border-[#8F1D18] bg-[#8F1D18] text-white' : 'border-gray-200 text-gray-700'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-2 text-xs text-gray-600">
                    <input type="checkbox" checked={form.privacyConsent} onChange={(e) => setForm((prev) => ({ ...prev, privacyConsent: e.target.checked }))} className="mt-1" />
                    <span>개인정보 수집 및 이용에 동의합니다. 상담 신청 후 계약이 확정되지 않습니다.</span>
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={status === 'loading'} className="w-full rounded-2xl bg-[#8F1D18] px-5 py-4 text-center text-base font-semibold text-white disabled:opacity-40">
                    {status === 'loading' ? '상담 신청 중...' : '무료 비교견적 신청하기'}
                  </button>
                </div>
              </form>
              {status === 'success' && <div className="mt-4 rounded-2xl bg-green-50 p-4 text-center text-sm font-semibold text-green-700">상담 신청이 완료되었습니다. 담당자가 확인 후 연락드리겠습니다.</div>}
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-[#FAF8F5] p-8">
              <h3 className="text-xl font-bold text-[#171717]">힐스테이트 입주민<br />특별 제휴 혜택</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>✓ 제휴 고객 전용 특별 사은품</li>
                <li>✓ 월 렌탈료 할인 혜택</li>
                <li>✓ 무상 관리 서비스 제공</li>
              </ul>
              <div className="mt-6 flex h-32 w-32 items-center justify-center rounded-xl bg-white shadow-sm">
                <div className="text-center text-xs text-gray-500">Gift Box</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#8F1D18] py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">힐스테이트 입주민의 더 나은 생활을 위해</h2>
          <p className="mt-2 text-sm text-white/80">정수기부터 안마의자까지, 한 번에 상담받아보세요!</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="tel:1600-1234" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-base font-semibold text-[#8F1D18]">☎ 전화 상담</a>
            <a href="#quote-form" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-6 py-4 text-base font-semibold text-white">● 카카오톡 상담</a>
            <a href="#quote-form" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-base font-semibold text-[#8F1D18]">무료 견적 받기</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#171717] py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-gray-400">
          <p>본 페이지는 힐스테이트 공식 홈페이지가 아니며, 렌탈 상담을 위한 별도 안내 페이지입니다.</p>
          <p className="mt-2">© {new Date().getFullYear()} ALL렌탈. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
