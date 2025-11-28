//━━━━━━━━━━━━━━━━━━━//
//  REGISTRO SANTAFLOW BOT (OPTIMIZADO)
//━━━━━━━━━━━━━━━━━━━//

import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'
import fetch from 'node-fetch'

/*━━━━━━━━━━━━━━━━━━━━━━
 🔥 VARIABLES NECESARIAS
━━━━━━━━━━━━━━━━━━━━━━*/

// Canal de difusion
const channelRD = {
  id: '120363404087331895@newsletter',
  name: '⸸ 🎧「 sᴀɴᴛᴀғʟᴏᴡ ✦ ᴏғɪᴄɪᴀʟ 」💫 ⸸࣭'
};

// Redes sociales / link principal
const redes = 'https://facebook.com'

// Moneda
const moneda = '💰'

// Contacto citado
const fkontak = {
  key: {
    participants: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast',
    fromMe: false
  },
  message: {
    contactMessage: {
      displayName: 'SANTA FLOW BOT',
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Santaflow;;;\nFN:Santaflow\nEND:VCARD`
    }
  }
};

const Reg = /\|?(.*?)[.|] *([0-9]+)$/i;

/*━━━━━━━━━━━━━━━━━━━━━━
 🔥 HANDLER PRINCIPAL
━━━━━━━━━━━━━━━━━━━━━━*/

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.postimg.cc/mZqG44Dy/1760212243057.jpg')

  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender) || "Usuario"

  // BIO
  let bio
  try {
    const info = await conn.fetchStatus(who)
    bio = info?.status?.trim() || "😔 Sin biografía disponible"
  } catch {
    bio = "Sin biografía disponible"
  }

  /*━━━━━━━━━━━━━━━━━━━━━━
   🔥 YA REGISTRADO
  ━━━━━━━━━━━━━━━━━━━━━━*/

  if (user.registered) {
    const botones = [
      { buttonId: `${usedPrefix}ping`, buttonText: { displayText: '🧡 ᴘɪɴɢ' }, type: 1 },
      { buttonId: `${usedPrefix}unreg`, buttonText: { displayText: '💥 ᴇʟɪᴍɪɴᴀʀ ʀᴇɢɪsᴛʀᴏ' }, type: 1 },
    ];

    return await conn.sendMessage(
      m.chat,
      {
        image: { url: pp },
        caption: '⚠️ *Aviso*\n\nYa tienes un registro activo.\nUsa *#unreg* para borrar tu registro.',
        mentions: [m.sender],
        buttons: botones,
        headerType: 4,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 100,
            newsletterName: channelRD.name
          }
        }
      },
      { quoted: fkontak }
    );
  }

  /*━━━━━━━━━━━━━━━━━━━━━━
   🔥 FORMATO INCORRECTO
  ━━━━━━━━━━━━━━━━━━━━━━*/

  if (!Reg.test(text)) {
    const botones = [
      { buttonId: `${usedPrefix}reg ${name2}.18`, buttonText: { displayText: '🧡 ᴀᴜᴛᴏ ᴠᴇʀɪғɪᴄᴀʀ' }, type: 1 },
      { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '📜 ᴍᴇɴᴜ' }, type: 1 },
    ];

    return conn.sendMessage(
      m.chat,
      {
        image: { url: pp },
        caption: `⚠️ *Formato incorrecto*\n\nUsa:\n${usedPrefix + command} nombre.edad\nEjemplo:\n${usedPrefix + command} ${name2}.18`,
        buttons: botones,
        headerType: 4,
        mentions: [m.sender]
      },
      { quoted: fkontak }
    );
  }

  /*━━━━━━━━━━━━━━━━━━━━━━
   🔥 PROCESO DE REGISTRO
  ━━━━━━━━━━━━━━━━━━━━━━*/

  let [_, name, age] = text.match(Reg);
  age = parseInt(age);

  if (!name) return m.reply("⚠️ El nombre no puede estar vacío.");
  if (!age) return m.reply("⚠️ La edad no puede estar vacía.");
  if (name.length > 100) return m.reply("⚠️ El nombre es demasiado largo.");
  if (age < 5) return m.reply("⚠️ Muy pequeño para registrarte.");
  if (age > 100) return m.reply("⚠️ Edad inválida.");

  // Guardado
  user.name = `${name} ✓`
  user.age = age
  user.regTime = +new Date()
  user.registered = true
  user.coin = (user.coin || 0) + 40
  user.exp = (user.exp || 0) + 300
  user.joincount = (user.joincount || 0) + 20

  let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
  let fechaObj = new Date()
  let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
  let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `
≡══════════════════════≡
🎉 *REGISTRO COMPLETO* 🎉
≡══════════════════════≡

• 👤 Nombre: ${name}
• ✨ Usuario: ${name2}
• 📱 Número: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
• 🐰 Edad: ${age}
• 📖 Bio: ${bio}

📅 Fecha: ${fecha}
⏰ Hora: ${hora}
🌙 Día: ${dia}

🎁 *RECOMPENSAS* :
${moneda} +40  
🔮 +300 EXP  
💎 +20 TOKENS
──────────────────`;

  await m.react?.('📩')

  return conn.sendMessage(
    m.chat,
    {
      image: { url: pp },
      caption: regbot,
      footer: 'Registro Santaflow Bot',
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '🎵 Registro completado',
          body: 'Tu cuenta ha sido activada exitosamente.',
          mediaType: 1,
          thumbnailUrl: pp,
          mediaUrl: redes,
          sourceUrl: redes
        }
      }
    },
    { quoted: fkontak }
  );
};

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler
