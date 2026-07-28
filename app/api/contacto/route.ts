import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campos obrigatorios' }, { status: 400 })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return NextResponse.json({ error: 'Bot non configurado' }, { status: 500 })
  }

  const text = [
    '📬 *Novo contacto — Cedeira Basket Club*',
    '',
    `👤 *Nome:* ${name}`,
    `✉️ *Email:* ${email}`,
    phone ? `📞 *Teléfono:* ${phone}` : null,
    '',
    `💬 *Mensaxe:*`,
    message,
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
