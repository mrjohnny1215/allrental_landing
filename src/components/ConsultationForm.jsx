import { useState } from 'react'

export default function ConsultationForm({ apartment, utm }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
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
      setForm({ name: '', phone: '', message: '', privacyConsent: false })
    } catch (err) {
      alert(err.message)
      setStatus('idle')
    }
  }

  return (
    <section id="consult" className="bg-surface scroll-mt-20">
      <div className="mx-auto max-w-lg px-5 py-8">
        <h2 className="text-center text-lg font-semibold text-deep-navy">상담 신청</h2>
        <p className="mt-1 text-center text-sm text-muted">간단한 정보를 남겨주시면 빠른 상담을 도와드립니다.</p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 rounded-2xl bg-white p-4 shadow-sm">
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
            {status === 'loading' ? '상담 신청 중...' : '상담 신청'}
          </button>
        </form>
        {status === 'success' && (
          <div className="mt-4 rounded-2xl bg-white p-4 text-center text-sm font-semibold text-deep-navy shadow-sm">
            상담 신청이 완료되었습니다.
            <br />
            빠른 시일 내에 연락드리겠습니다.
          </div>
        )}
      </div>
    </section>
  )
}
