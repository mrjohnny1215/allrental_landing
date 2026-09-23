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
  }, [])

  return null
}
