import { useEffect } from 'react'

const PLUGIN_KEY = 'b7c4d7ed-5675-4260-9a28-817d26e9fce9'
let hasBooted = false

function installChannelScript() {
  if (window.ChannelIO) return

  const channel = (...args) => channel.c(args)
  channel.q = []
  channel.c = (args) => channel.q.push(args)
  window.ChannelIO = channel

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js'
  document.body.appendChild(script)
}

export function openChannelTalk() {
  window.ChannelIO?.('showMessenger')
}

export default function ChannelTalk() {
  useEffect(() => {
    installChannelScript()
    if (!hasBooted) {
      window.ChannelIO('boot', { pluginKey: PLUGIN_KEY })
      hasBooted = true
    }

    const syncMobileButton = () => {
      if (window.innerWidth < 768) {
        window.ChannelIO?.('hideChannelButton')
      } else {
        window.ChannelIO?.('showChannelButton')
      }
    }

    syncMobileButton()
    window.addEventListener('resize', syncMobileButton)
    return () => window.removeEventListener('resize', syncMobileButton)
  }, [])

  return (
    <button
      type="button"
      onClick={openChannelTalk}
      className="fixed bottom-5 right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#8d99e8] text-2xl text-[#0b1c2e] shadow-lg shadow-black/25 transition hover:scale-105 active:scale-95 md:hidden"
      aria-label="채팅 상담 열기"
    >
      <span aria-hidden="true">💬</span>
    </button>
  )
}
