import { useState } from 'react'

export default function ConsultationForm({ apartment, utm }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    interest: '',
    moveInDate: '',
    message: '',
    privacyConsent: false,
  })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.privacyConsent) {
      alert('개인정보 수집 및 이용에 동의해주세요.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartmentSlug: apartment.slug,
          apartmentName: apartment.name,
          name: form.name,
          phone: form.phone,
          interest: form.interest,
          moveInDate: form.moveInDate,
          message: form.message,
          privacyConsent: form.privacyConsent,
          utmSource: utm.utmSource,
          utmMedium: utm.utmMedium,
          utmCampaign: utm.utmCampaign,
          utmContent: utm.utmContent,
          status: 'NEW',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || '상담 신청에 실패했습니다.')
      setStatus('success')
      setForm({ name: '', phone: '', interest: '', moveInDate: '', message: '', privacyConsent: false })
    } catch (err) {
      alert(err.message)
      setStatus('idle')
    }
  }

  return (
    <section id="consult" className="bg-deep-navy">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center text-white">
            <h2 className="text-2xl font-bold md:text-3xl">
              [{apartment.name}] 입주민 렌탈 상담 신청
            </h2>
            <p className="mt-3 text-sm text-gray-200">
              상담 신청 후 제품과 조건을 비교해 안내드립니다.
              <br />
              신청만으로 계약이 확정되지 않습니다.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-semibold text-deep-navy">이름</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  placeholder="홍길동"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-deep-navy">연락처</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  placeholder="010-0000-0000"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-deep-navy">관심제품</label>
                <input
                  value={form.interest}
                  onChange={(e) => setForm((prev) => ({ ...prev, interest: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  placeholder="정수기, 비데"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-deep-navy">입주예정일</label>
                <input
                  value={form.moveInDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, moveInDate: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  placeholder="2026-10"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-deep-navy">상담 요청사항</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  rows="3"
                  placeholder="관심 있는 제품이나 문의사항을 적어주세요."
                />
              </div>
              <label className="flex items-start gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  checked={form.privacyConsent}
                  onChange={(e) => setForm((prev) => ({ ...prev, privacyConsent: e.target.checked }))}
                  className="mt-1"
                />
                <span>개인정보 수집 및 이용에 동의합니다. 상담 신청 후 계약이 확정되지 않습니다.</span>
              </label>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-2xl bg-gold px-5 py-4 text-center text-base font-semibold text-white disabled:opacity-40"
              >
                {status === 'loading' ? '상담 신청 중...' : '무료 상담 신청하기'}
              </button>
            </div>
          </form>
        </div>
        {status === 'success' && (
          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-center text-sm font-semibold text-white">
            상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
          </div>
        )}
      </div>
    </section>
  )
}
