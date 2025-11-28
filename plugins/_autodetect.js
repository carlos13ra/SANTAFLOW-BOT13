let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import chalk from 'chalk'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

// VARIABLES NECESARIAS
const icono = "https://i.postimg.cc/pTm6Z0fw/1754253021526.jpg"
const textbot = "SANTAFLOW BOT - SISTEMA DE DETECCIÓN"
const dev = "Creado por Carlos R.V"
const redes = "https://youtube.com/@C4rlos.rv" 

// ❗ NECESARIO PARA QUE NO HAYA ERROR DE REFERENCIA
const sessions = 'sessions'

// FUNCION RESOLVE LID
async function resolveLidToRealJid(jid = '', conn) {
  try {
    if (!jid) return jid
    const result = await conn.onWhatsApp(jid)
    return result?.[0]?.jid || jid
  } catch {
    return jid
  }
}

const handler = m => m

handler.before = async function (m, { conn, participants }) {

  if (!m.messageStubType || !m.isGroup) return

  const chat = global.db.data.chats[m.chat] || {}
  const primaryBot = chat.primaryBot

  if (primaryBot && conn.user.jid !== primaryBot) throw false

  // EVITA CRASH SI NO EXISTE PARAMETRO
  const param = m?.messageStubParameters?.[0] || ""

  const usuario = await resolveLidToRealJid(m?.sender, conn)
  const groupAdmins = participants.filter(p => p.admin)
  const users = param || "usuario"

  // CANAL & AD
  const rcanal = { 
    contextInfo: { 
      isForwarded: true, 
      forwardedNewsletterMessageInfo: { 
        newsletterJid: '120363404087331895@newsletter', 
        serverMessageId: '', 
        newsletterName: '࿙ִ࿙ 𝐒𝐀𝐍𝐓𝐀𝐅𝐋𝐎𝐖 - 𝐁𝐎𝐓 ࿚ִ࿚' 
      }, 
      externalAdReply: { 
        title: "𐔌 . ⋮ ᗩ ᐯ I Տ O .ᐟ",
        body: textbot,
        thumbnail: await (await fetch(icono)).buffer(),
        sourceUrl: redes
      }
    }
  }

  const thumbnail = (await axios.get(icono, { responseType: "arraybuffer" }))
                    .data

  const shadow_xyz = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      productMessage: {
        product: {
          productImage: { jpegThumbnail: thumbnail },
          title: "🔥 SANTAFLOW BOT",
          description: dev,
          currencyCode: "USD",
          priceAmount1000: 5000,
          retailerId: "Carlos.R.V"
        },
        businessOwnerJid: "51900922660@s.whatsapp.net"
      }
    }
  }

  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => icono)

  // TEXTOS
  const nombre = `> ❀ @${usuario.split('@')[0]} Ha cambiado el nombre del grupo.\n> ✦ Nuevo nombre:\n> *${param}*`
  const foto = `> ❀ Se ha cambiado la imagen del grupo.\n> ✦ Por @${usuario.split('@')[0]}`
  const newlink = `> ❀ Se restableció el enlace.\n> ✦ Por @${usuario.split('@')[0]}`
  const edit = `> ❀ @${usuario.split('@')[0]} permitió que *${param == 'on' ? 'solo admins' : 'todos'}* configuren el grupo.`
  const status = `> ❀ El grupo fue *${param == 'on' ? 'cerrado' : 'abierto'}* por @${usuario.split('@')[0]}.`
  const admingp = `> ❀ @${users.split('@')[0]} ahora es admin.\n> ✦ Por @${usuario.split('@')[0]}`
  const noadmingp = `> ❀ @${users.split('@')[0]} ya no es admin.\n> ✦ Por @${usuario.split('@')[0]}`

  // DELETE SESSION FILES - YA NO ROMPE
  if (chat.detect && m.messageStubType == 2) {
    try {
      const uniqid = (m.isGroup ? m.chat : m.sender).split('@')[0]
      const sessionPath = `./${sessions}/`
      
      for (const file of await fs.promises.readdir(sessionPath)) {
        if (file.includes(uniqid)) {
          await fs.promises.unlink(path.join(sessionPath, file))
          console.log(`${chalk.yellow.bold('✎ Delete!')} ${chalk.greenBright(`'${file}'`)}`)
        }
      }
    } catch (e) {
      console.log("No hay sesiones para borrar.")
    }
  }

  // 🔰 RESPUESTAS SEGÚN STUB TYPE
  const mentions = [usuario, ...groupAdmins.map(v => v.id)].filter(Boolean)
  rcanal.contextInfo.mentionedJid = mentions

  switch (m.messageStubType) {
    case 21: return this.sendMessage(m.chat, { text: nombre, ...rcanal }, { quoted: shadow_xyz })
    case 22: return this.sendMessage(m.chat, { image: { url: pp }, caption: foto, ...rcanal }, { quoted: shadow_xyz })
    case 23: return this.sendMessage(m.chat, { text: newlink, ...rcanal }, { quoted: shadow_xyz })
    case 25: return this.sendMessage(m.chat, { text: edit, ...rcanal }, { quoted: shadow_xyz })
    case 26: return this.sendMessage(m.chat, { text: status, ...rcanal }, { quoted: shadow_xyz })
    case 29: return this.sendMessage(m.chat, { text: admingp, ...rcanal }, { quoted: shadow_xyz })
    case 30: return this.sendMessage(m.chat, { text: noadmingp, ...rcanal }, { quoted: shadow_xyz })
  }

  console.log({
    messageStubType: m.messageStubType,
    messageStubParameters: m.messageStubParameters,
    type: WAMessageStubType[m.messageStubType]
  })
}

export default handler
