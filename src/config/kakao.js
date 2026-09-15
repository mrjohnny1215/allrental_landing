export const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_xiccxmJX'
export const KAKAO_CHAT_URL = `${KAKAO_CHANNEL_URL}/chat`
export const KAKAO_SEARCH_ID = 'allrental85'

export function openKakaoChat(event) {
  if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
    event.preventDefault()
    window.dispatchEvent(new Event('allrental:open-kakao-guide'))
  }
}
