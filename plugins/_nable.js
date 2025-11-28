import { createHash } from 'crypto'
import fetch from 'node-fetch'

/**
 * rcanal COMPLETO con icono + imagen
 */
const icono = "https://i.postimg.cc/pTm6Z0fw/1754253021526.jpg" // ICONO DEL CANAL
const imagenPreview = "https://i.postimg.cc/3xZ6GScP/photo-2025.jpg" // IMAGEN GRANDE

const rcanal = {
  contextInfo: {
    isForwarded: true,
    forwardingScore: 999,
    mentionedJid: [],
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363404087331895@newsletter",
      newsletterName: "💫Santaflow Bot💫",
      serverMessageId: -1
    },
    externalAdReply: {
      title: "💫Santaflow Bot💫",
      body: "Canal oficial del bot",
      thumbnailUrl: icono,         // ICONO
      mediaUrl: imagenPreview,     // IMAGEN GRANDE
      sourceUrl: "https://whatsapp.com/channel/0029Va123456789",
      mediaType: 1,
      renderLargerThumbnail: true,
      previewType: "photo"
    }
  }
}

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  try {
    let chat = global.db.data.chats[m.chat] || {}
    let user = global.db.data.users[m.sender] || {}
    let bot = global.db.data.settings?.[conn.user?.jid] || {}
    const type = command.toLowerCase()

    let explicitOn = args[0] && (/^on|enable$/i.test(args[0]))
    let explicitOff = args[0] && (/^off|disable$/i.test(args[0]))

    let isEnable = null
    if (explicitOn) isEnable = true
    if (explicitOff) isEnable = false

    if (isEnable === null) {
      const estado = chat[type] ? '✓ Activado' : '✗ Desactivado'
      return conn.reply(m.chat, `
━━━━━━━━━━━━━━━━━━━━━━━
  ﹒⌗﹒🌤️ .˚₊‧  𝐂𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐜𝐢𝐨𝐧 🥭ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨ
━━━━━━━━━━━━━━━━━━━━━━━
┊» 📜 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 » *${command}*
┊» 🛡️ 𝐀𝐝𝐦𝐢𝐧𝐬 𝐒𝐨𝐥𝐨 ✧
╰━═┅═━––––––๑

┊» 🔧 𝐀𝐜𝐭𝐢𝐯𝐚𝐫 » *${usedPrefix}${command} on*
┊» 📴 𝐃𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫 » *${usedPrefix}${command} off*
╰─────── • ◆ •
━━━━━━━━━━━━━━━━━━━━━━━
> ⣷ׅ᳝࣪ ࣪࣪𖡻ְְׅ᳝ׅׅ࣪࣪֘ᰰ🌿ׅ࣪ 𝐄𝐬𝐭𝐚𝐝𝐨: ${estado}
━━━━━━━━━━━━━━━━━━━━━━━`, m, rcanal)
    }

    let applyToAllBot = false
    let applyToUser = false

    switch (type) {
      case 'welcome':
      case 'bienvenida':
        if (!m.isGroup) {
          if (!isOwner) return global.dfail('group', m, conn)
        } else if (!isAdmin) return global.dfail('admin', m, conn)
        chat.welcome = isEnable
        break

      case 'antiprivado':
      case 'antiprivate':
        applyToAllBot = true
        if (!isOwner) return global.dfail('rowner', m, conn)
        bot.antiPrivate = isEnable
        break

      case 'antiarabe':
        applyToAllBot = true
        if (!isOwner) return global.dfail('rowner', m, conn)
        bot.antiarabe = isEnable
        break

      case 'restrict':
      case 'restringir':
        applyToAllBot = true
        if (!isOwner) return global.dfail('rowner', m, conn)
        bot.restrict = isEnable
        break

      case 'antibot':
      case 'antibots':
        if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
        chat.antiBot = isEnable
        break

      case 'autoaceptar':
      case 'aceptarauto':
        if (!m.isGroup) {
          if (!isOwner) return global.dfail('group', m, conn)
        } else if (!isAdmin) return global.dfail('admin', m, conn)
        chat.autoAceptar = isEnable
        break

      case 'autorechazar':
      case 'rechazarauto':
        if (!m.isGroup) {
          if (!isOwner) return global.dfail('group', m, conn)
        } else if (!isAdmin) return global.dfail('admin', m, conn)
        chat.autoRechazar = isEnable
        break

      case 'autoresponder':
      case 'autorespond':
        if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
        chat.autoresponder = isEnable
        break

      case 'antisubbots':
      case 'antibot2':
        if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
        chat.antiBot2 = isEnable
        break

      case 'modoadmin':
      case 'soloadmin':
        if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
        chat.modoadmin = isEnable
        break

      case 'reaction':
      case 'reaccion':
        if (!m.isGroup) {
          if (!isOwner) return global.dfail('group', m, conn)
        } else if (!isAdmin) return global.dfail('admin', m, conn)
        chat.reaction = isEnable
        break

      case 'nsfw':
      case 'modohorny':
        if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
        chat.nsfw = isEnable
        break

      case 'antispam':
        applyToAllBot = true
        if (!isOwner) return global.dfail('rowner', m, conn)
        bot.antiSpam = isEnable
        break

      case 'antilink2':
        if (!m.isGroup) {
          if (!isOwner) return global.dfail('group', m, conn)
        } else if (!isAdmin) return global.dfail('admin', m, conn)
        chat.antiLink2 = isEnable
        break

      case 'jadibotmd':
      case 'modejadibot':
        applyToAllBot = true
        if (!isOwner) return global.dfail('rowner', m, conn)
        bot.jadibotmd = isEnable
        break

      case 'detect':
      case 'avisos':
        if (!m.isGroup) {
          if (!isOwner) return global.dfail('group', m, conn)
        } else if (!isAdmin) return global.dfail('admin', m, conn)
        chat.detect = isEnable
        break

      case 'antiver':
      case 'antiocultar':
        if (!m.isGroup) {
          if (!isOwner) return global.dfail('group', m, conn)
        } else if (!isAdmin) return global.dfail('admin', m, conn)
        chat.antiver = isEnable
        break

      case 'audios':
        if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
        chat.audios = isEnable
        break

      case 'antilink':
        if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
        chat.antiLink = isEnable
        break

      case 'antifake':
      case 'antivirtuales':
        if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
        if (isEnable === null) {
          chat.antifake = !chat.antifake
          isEnable = chat.antifake
        } else {
          chat.antifake = isEnable
        }
        break

      default:
        return conn.reply(m.chat, `Comando desconocido: ${command}`, m, rcanal)
    }

    try {
      chat[type] = isEnable
    } catch {}

    try {
      global.db.data.chats[m.chat] = chat
      global.db.data.users[m.sender] = user
      if (applyToAllBot) global.db.data.settings[conn.user.jid] = bot
    } catch (e) {
      console.error('Error guardando DB:', e)
    }

    conn.reply(m.chat, `°================================°
 💦 𝐏𝐀𝐍𝐄𝐋 𝐃𝐄 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 💦
°================================°

> 🧩 𝐅𝐮𝐧𝐜𝐢𝐨́𝐧 » *${type}*
> ⚙️ 𝐄𝐬𝐭𝐚𝐝𝐨 » ${isEnable ? '✅ 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎' : '❌ 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎'}
> 🌍 𝐀𝐩𝐥𝐢𝐜𝐚 » ${applyToAllBot ? '🌐 𝐓𝐨𝐝𝐨 𝐞𝐥 𝐁𝐨𝐭' : '💬 𝐂𝐡𝐚𝐭'}

°================================°`, m, rcanal)

  } catch (err) {
    console.error(err)
    return conn.reply(m.chat, 'Ocurrió un error al procesar la configuración.', m, rcanal)
  }
}

handler.help = ['welcome','bienvenida','antiprivado','antiprivate','restrict','restringir','antibot','antibots','autoaceptar','aceptarauto','autorechazar','rechazarauto','autoresponder','autorespond','antisubbots','antibot2','modoadmin','soloadmin','reaction','reaccion','nsfw','modohorny','antispam','jadibotmd','modejadibot','subbots','detect','avisos','antilink','audios','antiver','antiocultar','antilink2','antiarabe','antifake','antivirtuales']
handler.tags = ['nable']
handler.command = handler.help

export default handler
