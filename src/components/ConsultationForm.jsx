import { useEffect, useState } from 'react'
import { openChannelTalk } from './ChannelTalk'

export default function ConsultationForm({ apartment, utm, brandAccent = '#c7a14a', prefillInterest = '' }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    interest: '',
    moveInDate: '',
    message: '',
    privacyConsent: false,
  })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (prefillInterest) setForm((previous) => ({ ...previous, interest: prefillInterest }))
  }, [prefillInterest])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.privacyConsent) {
      alert('개인정보 수집 및 이용에 동의해주세요.')
      return
    }
    const phone = form.phone.replace(/[^0-9]/g, '')
    if (!/^01[0-9]{8,9}$/.test(phone)) {
      alert('연락 가능한 휴대폰 번호를 확인해주세요.')
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
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm font-semibold text-deep-navy">이름</label>
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-deep-navy placeholder:text-slate-400"
            placeholder="홍길동"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-deep-navy">연락처</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-deep-navy placeholder:text-slate-400"
            placeholder="010-0000-0000"
            inputMode="numeric"
            autoComplete="tel"
            pattern="01[0-9]-?[0-9]{3,4}-?[0-9]{4}"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-deep-navy">관심제품</label>
          <input
            value={form.interest}
            onChange={(e) => setForm((prev) => ({ ...prev, interest: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-deep-navy placeholder:text-slate-400"
            placeholder="정수기, 비데"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-deep-navy">입주예정일</label>
          <input
            type="date"
            value={form.moveInDate}
            onChange={(e) => setForm((prev) => ({ ...prev, moveInDate: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-deep-navy placeholder:text-slate-400"
            aria-label="입주예정일 선택"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-deep-navy">상담 요청사항</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-deep-navy placeholder:text-slate-400"
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
          <span><strong>수집 항목:</strong> 이름, 연락처, 상담 요청사항 · <strong>이용 목적:</strong> 렌탈 상담 안내. 상담 신청만으로 계약이 확정되지 않습니다.</span>
        </label>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-2xl px-5 py-4 text-center text-base font-semibold text-white disabled:opacity-40"
          style={{ backgroundColor: brandAccent }}
        >
          {status === 'loading' ? '접수 중...' : '맞춤 견적 신청하기'}
        </button>
      </div>
      {status === 'success' && (
        <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-center text-sm font-semibold text-deep-navy">
          <p>접수가 완료되었습니다. 남겨주신 연락처로 안내드리겠습니다.</p>
          <button
            type="button"
            onClick={openChannelTalk}
            className="mt-3 inline-flex rounded-xl bg-deep-navy px-4 py-2.5 text-xs font-bold text-white"
          >
            바로 채팅으로 문의하기 →
          </button>
        </div>
      )}
    </form>
  )
}
