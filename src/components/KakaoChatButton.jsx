import React from 'react'

export default function KakaoChatButton() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    }}>
      <a
        href="http://pf.kakao.com/_xixcxMJX/chat"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#FEE500',
          color: '#191919',
          padding: '14px 20px',
          borderRadius: '30px',
          fontWeight: 'bold',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '15px',
          transition: 'transform 0.2s'
        }}
      >
        <span style={{ fontSize: '18px' }}>💬</span>
        카카오톡 1:1 상담하기
      </a>
    </div>
  )
}
