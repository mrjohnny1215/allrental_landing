import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'csv-parse/sync'

const CSV_PATH = path.join(process.cwd(), 'public', 'data', 'apartments.csv')
const OUT_PATH = path.join(process.cwd(), 'src', 'config', 'apartments.js')

const raw = fs.readFileSync(CSV_PATH, 'utf-8').replace(/^\uFEFF/, '').replace(/\r/g, '')
const lines = raw.split('\n')
const dataLines = lines.slice(3)

const records = parse(dataLines.join('\n'), {
  columns: true,
  skip_empty_lines: true,
  relax_column_count: true,
  trim: true,
})

function toSlug(name) {
  return (
    name
      .replace(/[\(\)\[\]{}]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .slice(0, 2)
      .join('-')
      .replace(/[^가-힣a-zA-Z0-9\-]/g, '')
      .toLowerCase()
  )
}

const brandColors = {
  hillstate: { brandColor: '#7a2e1a', brandAccent: '#d48c4a' },
  dh: { brandColor: '#1f3b5c', brandAccent: '#7ba7d8' },
  raemian: { brandColor: '#2e3a25', brandAccent: '#b2c49a' },
  ipark: { brandColor: '#2a3b4c', brandAccent: '#c7a14a' },
  doosan: { brandColor: '#3b4a3b', brandAccent: '#8aa7b8' },
  lotte: { brandColor: '#5c1f1f', brandAccent: '#d8a07b' },
  hyundai: { brandColor: '#2c3e50', brandAccent: '#5dade2' },
  gold: { brandColor: '#5c4a1f', brandAccent: '#d4b44a' },
  eco: { brandColor: '#2e4a3b', brandAccent: '#8cc4a8' },
  hoban: { brandColor: '#1f3b4a', brandAccent: '#7bc4d8' },
  zai: { brandColor: '#1a3a2a', brandAccent: '#8cc49a' },
}

function pickBrandColor(name) {
  const n = name.toLowerCase()
  for (const key of Object.keys(brandColors)) {
    if (n.includes(key)) return brandColors[key]
  }
  return { brandColor: '#0b1c2e', brandAccent: '#c7a14a' }
}

function esc(str) {
  return String(str ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
}

const entries = records.map((row) => {
  const name = row['단지명'] || row['name'] || ''
  const slug = toSlug(name)
  const bc = pickBrandColor(name)
  return {
    slug,
    name,
    location: row['지역'] || '',
    households: row['세대수'] ? `${row['세대수']}세대` : '',
    moveInDate: row['입주예정시기'] || '',
    heroBadge: '입주예정자 특별 상담',
    heroTitle: `${name}\n입주 준비 렌탈 비교 상담`,
    heroDescription: '정수기·비데·공기청정기·매트리스까지\n입주 전에 미리 비교하고 준비하세요.',
    heroImage: `/images/${slug}-hero.jpg`,
    recommendedProducts: [],
    campaign: slug,
    seoTitle: `${name} 입주 렌탈 비교상담 | ALL렌탈`,
    seoDescription: `${name} 입주 예정자 렌탈 상담. 정수기·비데·공기청정기·매트리스 비교 상담 신청.`,
    ogImage: `/images/${slug}-og.jpg`,
    phone: '1588-0000',
    ...bc,
    source: {
      cafeName: row['네이버 입예협 공식카페'] || '',
      cafeUrl: row['카페 링크'] || '',
      members: row['회원수 현황'] || '',
      chat: row['오픈채팅방 현황'] || '',
      note: row['비고'] || '',
    },
  }
})

const seen = new Set()
const unique = []
for (const item of entries) {
  if (!seen.has(item.slug)) {
    seen.add(item.slug)
    unique.push(item)
  }
}

const outLines = [
  'export const APARTMENTS = {',
  ...unique.flatMap((apt) => {
    const obj = [
      `  '${apt.slug}': {`,
      `    slug: '${esc(apt.slug)}',`,
      `    name: '${esc(apt.name)}',`,
      `    location: '${esc(apt.location)}',`,
      `    households: '${esc(apt.households)}',`,
      `    moveInDate: '${esc(apt.moveInDate)}',`,
      `    heroBadge: '${esc(apt.heroBadge)}',`,
      `    heroTitle: '${esc(apt.heroTitle)}',`,
      `    heroDescription: '${esc(apt.heroDescription)}',`,
      `    heroImage: '${esc(apt.heroImage)}',`,
      `    recommendedProducts: [],`,
      `    campaign: '${esc(apt.campaign)}',`,
      `    seoTitle: '${esc(apt.seoTitle)}',`,
      `    seoDescription: '${esc(apt.seoDescription)}',`,
      `    ogImage: '${esc(apt.ogImage)}',`,
      `    phone: '${esc(apt.phone)}',`,
      `    brandColor: '${esc(apt.brandColor)}',`,
      `    brandAccent: '${esc(apt.brandAccent)}',`,
      `    source: ${JSON.stringify(apt.source)},`,
      '  },',
    ]
    return obj
  }),
  '}',
  '',
  `export const DEFAULT_APARTMENT_SLUG = '${esc(unique[0]?.slug || '')}'`,
]

fs.writeFileSync(OUT_PATH, outLines.join('\n') + '\n')
console.log('synced', unique.length, 'apartments')
