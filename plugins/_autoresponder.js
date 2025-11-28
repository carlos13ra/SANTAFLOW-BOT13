import axios from 'axios'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = m => m

handler.all = async function (m, { conn }) {

  // VALIDAR QUE EXISTAN USUARIO Y CHAT
  let user = global.db.data.users[m.sender] || {}
  let chat = global.db.data.chats[m.chat] || {}

  // SI EL MENSAJE NO TIENE TEXTO, DEFINIRLO COMO STRING VACÍO
  const text = m.text ?? ""

  // EVITAR DETECCIÓN DE MENSAJES DEL BOT
  m.isBot =
    (m.id.startsWith('BAE5') && m.id.length === 16) ||
    (m.id.startsWith('3EB0') && [12, 20, 22].includes(m.id.length)) ||
    (m.id.startsWith('B24E') && m.id.length === 20)

  if (m.isBot) return

  // ----------------------- PREFIX ------------------------
  const defaultPrefix = 'z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-'
  const prefixChars = global.opts?.prefix || defaultPrefix

  const prefixRegex = new RegExp(
    '^[' + prefixChars.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']'
  )

  if (prefixRegex.test(text)) return true

  if (m.sender.includes('bot') || m.sender.includes('Bot')) return true

  // ---------------- MENCIÓN AL BOT -----------------------
  const botMentioned =
    (Array.isArray(m.mentionedJid) && m.mentionedJid.includes(this.user.jid)) ||
    (m.quoted && m.quoted.sender === this.user.jid)

  if (!botMentioned || chat.isBanned) return

  // PALABRAS QUE EL BOT NO DEBE RESPONDER COMO IA
  const ignoreWords = ['PIEDRA', 'PAPEL', 'TIJERA', 'menu', 'estado', 'bots',
    'serbot', 'jadibot', 'Video', 'Audio', 'audio']

  if (ignoreWords.some(w => text.includes(w))) return true

  // --------------------- IA PROMPT ------------------------
  const botname = global.botname || "SANTAFLOW BOT"
  const etiqueta = global.creador || "Carlos R.V"

  let defaultPrompt = `
Eres ${botname}, creado por ${etiqueta}. Tienes una personalidad divertida,
competitiva y energética. Respondes siempre en español (a menos que el usuario 
pida otro idioma). También muestras empatía cuando es necesario.
`.trim()

  let query = text
  let username = m.pushName
  let logic = chat.sAutoresponder || defaultPrompt

  // ======================= APIS ===========================

  async function luminsesi(q, username, logic) {
    try {
      let res = await axios.post("https://luminai.my.id", {
        content: q,
        user: username,
        prompt: logic,
        webSearchMode: true
      })
      return res?.data?.result || null
    } catch (e) {
      console.error("Luminsesi Error:", e)
      return null
    }
  }

  async function geminiProApi(q, logic) {
    try {
      let url = `https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`
      let res = await fetch(url)
      if (!res.ok) throw new Error(`Error HTTP: ${res.statusText}`)
      let json = await res.json()
      return json?.answer || null
    } catch (e) {
      console.error("Gemini Error:", e)
      return null
    }
  }

  // ===================== AUTORESPONDER ====================
  if (chat.autoresponder) {

    if (m.fromMe) return
    if (!user?.registered) return

    await this.sendPresenceUpdate('composing', m.chat)

    let result = await geminiProApi(query, logic)
    if (!result) result = await luminsesi(query, username, logic)

    if (result) {
      return this.reply(m.chat, result, m)
    }
  }

  return true
}

export default handler
