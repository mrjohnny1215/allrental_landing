export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const lead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
    ...req.body,
  }

  console.log('NEW LEAD:', JSON.stringify(lead, null, 2))

  return res.status(201).json({ ok: true, id: lead.id })
}
