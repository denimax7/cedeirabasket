import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { playerName, birthYear, category, contactName, contactPhone, contactEmail, notes } =
    await request.json()

  if (!playerName || !birthYear || !contactName || !contactPhone || !contactEmail) {
    return NextResponse.json({ error: 'Campos obrigatorios' }, { status: 400 })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return NextResponse.json({ error: 'Bot non configurado' }, { status: 500 })
  }

  const text = [
    '🏀 *Nova inscrición — Cedeira Basket Club*',
    '',
    `👦 *Deportista:* ${playerName}`,
    `🎂 *Ano nacemento:* ${birthYear}`,
    category ? `📋 *Categoría:* ${category}` : null,
    '',
    `👨‍👩‍👦 *Contacto:* ${contactName}`,
    `📞 *Teléfono:* ${contactPhone}`,
    `✉️ *Email:* ${contactEmail}`,
    notes ? `\n📝 *Observacións:* ${notes}` : null,
  ]
    .filter((l) => l !== null)
    .join('\n')

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao enviar' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
