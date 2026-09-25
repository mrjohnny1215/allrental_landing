import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const checklist = [
  ['공간', '설치 위치 및 크기', '싱크대 위 공간 또는 싱크 하부장 여유 확인'],
  ['기능', '온수·냉수·정수 기능', '우리 가족이 주로 사용하는 물의 온도 확인'],
  ['위생', '필터 교체 및 관리', '정기 방문 관리 또는 자가 관리 주기 확인'],
  ['편의', '조작부 및 안전기능', '아이를 위한 온수 잠금 기능 등 확인'],
]

const sections = [
  ['1. 설치 공간과 주방 주위 환경 파악하기', '정수기를 놓을 자리가 넉넉한지, 싱크대 위에 올려둘 제품이 좋은지 혹은 공간을 차지하지 않는 빌트인형이 좋은지 먼저 확인해 보세요. 주방 인테리어와 동선을 고려해 알맞은 크기와 디자인을 선택하는 것이 첫 번째 단계입니다.'],
  ['2. 우리 가족에게 맞는 정수 방식 선택하기', '정수기는 방식에 따라 물의 맛과 특징이 조금씩 다를 수 있습니다. 각 방식의 특징과 관리 방법을 살펴보고 가족들의 취향과 사용 환경에 맞는 방식을 선택하는 것이 좋습니다.'],
  ['3. 직수형과 저장고형의 차이 이해하기', '물을 그때그때 정수해 제공하는 직수형과 내부 탱크에 물을 보관하는 저장고형 중 우리 집에 더 적합한 방식을 골라야 합니다. 사용 빈도와 온수·냉수 사용 패턴에 따라 알맞은 구조를 선택할 수 있습니다.'],
  ['4. 관리 주기와 위생 케어 방식 비교하기', '필터 교체 주기가 어떻게 되는지, 정기적인 방문 관리와 자가 관리 중 어떤 서비스가 지원되는지를 비교해 보세요. 관리 방식은 사용 편의와 유지 관리 계획에 영향을 줄 수 있습니다.'],
  ['5. 자주 쓰는 기능과 안전 기능 확인하기', '온수·냉수·정수 기능 중 무엇을 자주 사용하는지 생각해 보세요. 아이가 있는 집이라면 온수 잠금처럼 일상에서 도움이 되는 안전 기능도 함께 확인하는 것이 좋습니다.'],
  ['6. 필터와 소모품 관리 조건 살펴보기', '필터의 종류만 보기보다 교체 시점, 교체 방법, 관리 안내가 어떻게 제공되는지를 함께 살펴보세요. 이용 중 궁금한 점을 확인할 수 있는 고객 지원 방식도 계약 전 점검하면 좋습니다.'],
  ['7. 렌탈 계약 조건은 문서로 확인하기', '약정 기간, 의무 사용 기간, 월 이용료에 포함되는 관리 범위와 비용 변동 조건을 정확히 확인하세요. 제품과 서비스의 조건은 시기와 모델에 따라 달라질 수 있으므로 계약서와 공식 안내를 기준으로 비교하는 것이 안전합니다.'],
]

export default function WaterPurifierGuide() {
  useEffect(() => {
    document.title = '처음 정수기를 알아보신다면? 정수기 렌탈 선택 가이드 | ALL렌탈'
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', '신혼부부와 아이 있는 가정을 위한 정수기 렌탈 비교 및 선택 기준 7가지! 처음 정수기를 고를 때 꼭 확인해야 할 핵심 포인트를 알기 쉽게 정리해 드립니다.')
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-deep-navy">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link to="/" className="text-base font-bold tracking-wide text-deep-navy">ALL렌탈</Link>
          <Link to="/" className="text-sm font-semibold text-gold">목록</Link>
        </div>
      </header>
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
            <p className="text-sm font-bold tracking-[0.14em] text-gold">WATER PURIFIER GUIDE</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">처음 정수기를 알아보신다면?<br />후회 없는 렌탈 선택 가이드</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">신혼부부와 아이 있는 가정이 우리 집에 맞는 정수기를 고를 때, 사양보다 먼저 확인하면 좋은 7가지 기준을 정리했습니다.</p>
            <div className="mt-8 flex flex-wrap gap-2 text-sm font-semibold">
              {['정수기 렌탈', '정수기 렌탈 비교', '정수기 선택 기준'].map((keyword) => <span key={keyword} className="rounded-full bg-amber-50 px-4 py-2 text-amber-900">{keyword}</span>)}
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
          <p className="text-base leading-8 text-slate-700">결혼 후 처음으로 가전을 준비하거나, 아이가 생겨 위생 관리에 더욱 신경 쓰게 되면서 정수기 렌탈을 알아보는 분들이 많습니다. 막상 찾아보면 종류와 기능이 다양해서 어떤 기준으로 골라야 할지 막막할 수 있는데요. 처음 알아보는 분도 쉽게 비교할 수 있도록 꼭 확인할 기준을 차례로 살펴보겠습니다.</p>

          <aside className="my-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-7">
            <p className="text-sm font-bold text-amber-900">핵심 결론</p>
            <p className="mt-2 text-base font-semibold leading-7 text-deep-navy">정수기는 가족의 생활 패턴과 주방 공간에 맞는 방식을 먼저 정하고, 관리 방식과 편의 기능, 계약 조건을 함께 비교할 때 만족스럽게 사용할 수 있습니다.</p>
          </aside>

          <div className="space-y-10">
            {sections.map(([title, content]) => (
              <section key={title}>
                <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
                <p className="mt-3 text-base leading-8 text-slate-700">{content}</p>
              </section>
            ))}
          </div>

          <section className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6"><h2 className="text-xl font-extrabold">한눈에 보는 선택 체크리스트</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px] text-left text-sm">
                <thead className="bg-slate-100 text-slate-700"><tr><th className="px-5 py-3 font-bold">구분</th><th className="px-5 py-3 font-bold">체크 포인트</th><th className="px-5 py-3 font-bold">확인 내용</th></tr></thead>
                <tbody>{checklist.map(([type, point, detail]) => <tr key={type} className="border-t border-slate-100"><td className="px-5 py-4 font-bold text-gold">{type}</td><td className="px-5 py-4 font-semibold">{point}</td><td className="px-5 py-4 text-slate-600">{detail}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section className="mt-12 rounded-2xl bg-deep-navy p-6 text-white sm:p-8">
            <h2 className="text-xl font-extrabold">계약 전 한 번 더 확인하세요</h2>
            <p className="mt-3 text-base leading-8 text-slate-200">정수장 검사 결과는 공급 전 수돗물 검사 자료이며, 특정 가정의 배관이나 저수조 상태를 그대로 보여 주지는 않습니다. 우리 집의 설치 환경과 제품의 관리 조건을 종합적으로 확인해 선택하세요.</p>
          </section>

          <section className="mt-12 border-t border-slate-200 pt-10">
            <h2 className="text-xl font-extrabold">마무리</h2>
            <p className="mt-3 text-base leading-8 text-slate-700">우리 가족의 생활 패턴에 맞는 기준으로 차분히 비교해 보신다면, 처음 정수기를 고를 때도 더 편안하게 결정하실 수 있습니다. 제품별 세부 사양과 렌탈 조건은 공식 안내와 계약서를 통해 확인해 주세요.</p>
          </section>
        </article>
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-muted">© {new Date().getFullYear()} 올(All)렌탈</footer>
    </div>
  )
}
