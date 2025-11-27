let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import chalk from 'chalk'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

// 🔥 VARIABLES QUE FALTABAN (EVITA TODOS LOS ReferenceError)
const icono = "https://i.postimg.cc/pTm6Z0fw/1754253021526.jpg"
const textbot = "SANTAFLOW BOT - SISTEMA DE DETECCIÓN"
const dev = "Creado por Carlos R.V"
const redes = "https://youtube.com/@C4rlos.rv" 

const groupMetadataCache = new Map()
const lidCache = new Map()

// ✅ FUNCIÓN QUE FALTABA - YA NO DARÁ ERROR
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

handler.before = async function (m, { conn, participants, groupMetadata }) {

  if (!m.messageStubType || !m.isGroup) return

  const primaryBot = global.db.data.chats[m.chat].primaryBot
  if (primaryBot && conn.user.jid !== primaryBot) throw !1

  const chat = global.db.data.chats[m.chat]
  const users = m.messageStubParameters[0]
  const usuario = await resolveLidToRealJid(m?.sender, conn)

  const groupAdmins = participants.filter(p => p.admin)

  const rcanal = { 
    contextInfo: { 
      isForwarded: true, 
      forwardedNewsletterMessageInfo: { 
        newsletterJid: '120363404087331895@newsletter', 
        serverMessageId: '', 
        newsletterName: '࿙ִ࿙ ͡ྌ᳝֟፝ྌ𝐒𝐀𝐍𝐓𝐀𝐅𝐋𝐎𝐖 - 𝐁𝐎𝐓ྌ᳝֟፝ྌ͡ ࿚ִ࿚' 
      }, 
      externalAdReply: { 
        title: "𐔌 . ⋮ ᗩ ᐯ I Տ O .ᐟ ֹ ₊ ꒱", 
        body: textbot, 
        mediaUrl: null, 
        description: null, 
        previewType: "PHOTO", 
        thumbnail: await (await fetch(icono)).buffer(), 
        sourceUrl: redes, 
        mediaType: 1, 
        renderLargerThumbnail: false
      }, 
      mentionedJid: null 
    }
  }

  const getThumbnail = async () => {
    const res = await axios.get(icono, { responseType: "arraybuffer" })
    return Buffer.from(res.data, "binary")
  }

  const thumbnail = await getThumbnail()

  const shadow_xyz = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      productMessage: {
        product: {
          productImage: {
            mimetype: "image/jpeg",
            jpegThumbnail: thumbnail
          },
          title: "🔥sᴀɴᴛᴀғʟᴏᴡ ʙᴏᴛ💫 ",
          description: dev,
          currencyCode: "USD",
          priceAmount1000: 5000,
          retailerId: "Carlos.R.V",
          productImageCount: 1
        },
        businessOwnerJid: "51900922660@s.whatsapp.net"
      }
    }
  }

  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || icono

  const nombre = `> ❀ @${usuario.split('@')[0]} Ha cambiado el nombre del grupo.\n> ✦ Ahora el grupo se llama:\n> *${m.messageStubParameters[0]}*.`

  const foto = `> ❀ Se ha cambiado la imagen del grupo.\n> ✦ Acción hecha por:\n> » @${usuario.split('@')[0]}`

  const edit = `> ❀ @${usuario.split('@')[0]} Ha permitido que ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo.`

  const newlink = `> ❀ El enlace del grupo ha sido restablecido.\n> ✦ Acción hecha por:\n> » @${usuario.split('@')[0]}`

  const status = `> ❀ El grupo ha sido ${m.messageStubParameters[0] == 'on' ? '*cerrado*' : '*abierto*'} Por @${usuario.split('@')[0]}\n> ✦ Ahora ${m.messageStubParameters[0] == 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensaje.`

  const admingp = `> ❀ @${users.split('@')[0]} Ahora es admin del grupo.\n> ✦ Acción hecha por:\n> » @${usuario.split('@')[0]}`

  const noadmingp = `> ❀ @${users.split('@')[0]} Deja de ser admin del grupo.\n> ✦ Acción hecha por:\n> » @${usuario.split('@')[0]}`

  if (chat.detect && m.messageStubType == 2) {
    const uniqid = (m.isGroup ? m.chat : m.sender).split('@')[0]
    const sessionPath = `./${sessions}/`
    for (const file of await fs.promises.readdir(sessionPath)) {
      if (file.includes(uniqid)) {
        await fs.promises.unlink(path.join(sessionPath, file))
        console.log(`${chalk.yellow.bold('✎ Delete!')} ${chalk.greenBright(`'${file}'`)}\n${chalk.redBright('Que provoca el "undefined" en el chat.')}`)
      }
    }
  }

  if (chat.detect && m.messageStubType == 21) {
    rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
    await this.sendMessage(m.chat, { text: nombre, ...rcanal }, { quoted: shadow_xyz })
  }

  if (chat.detect && m.messageStubType == 22) {
    rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
    await this.sendMessage(m.chat, { image: { url: pp }, caption: foto, ...rcanal }, { quoted: shadow_xyz })
  }

  if (chat.detect && m.messageStubType == 23) {
    rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
    await this.sendMessage(m.chat, { text: newlink, ...rcanal }, { quoted: shadow_xyz })
  }

  if (chat.detect && m.messageStubType == 25) {
    rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
    await this.sendMessage(m.chat, { text: edit, ...rcanal }, { quoted: shadow_xyz })
  }

  if (chat.detect && m.messageStubType == 26) {
    rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
    await this.sendMessage(m.chat, { text: status, ...rcanal }, { quoted: shadow_xyz })
  }

  if (chat.detect && m.messageStubType == 29) {
    rcanal.contextInfo.mentionedJid = [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
    await this.sendMessage(m.chat, { text: admingp, ...rcanal }, { quoted: shadow_xyz })
    return
  }

  if (chat.detect && m.messageStubType == 30) {
    rcanal.contextInfo.mentionedJid = [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
    await this.sendMessage(m.chat, { text: noadmingp, ...rcanal }, { quoted: shadow_xyz })
  }

  else { 
    if (m.messageStubType == 2) return
    console.log({
      messageStubType: m.messageStubType,
      messageStubParameters: m.messageStubParameters,
      type: WAMessageStubType[m.messageStubType], 
    })
  }

}

export default handler
