// VARIABLES IMPORTANTES
const icono = "https://i.postimg.cc/pTm6Z0fw/1754253021526.jpg"
const emojis = "✔️"

// Tu canal oficial
const newsletterJid = '120363404087331895@newsletter'
const newsletterName = '⸸ 🎧「 sᴀɴᴛᴀғʟᴏᴡ ✦ ᴏғɪᴄɪᴀʟ 」💫 ⸸࣭'

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]

  let nombre = user.name || 'Sin nombre'
  let edad = user.age || 'Desconocida'

  // Imagen del usuario
  let pp
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image')
  } catch {
    pp = icono
  }

  // Eliminar registro
  user.registered = false

  await conn.sendMessage(m.chat, {
    text: `✧━━━━━━༺⚜️༻━━━━━━✧
       𝐓𝐔 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐅𝐔𝐄 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐃𝐎  
✧━━━━━━༺⚜️༻━━━━━━✧

👑👤 \`𝐍𝐨𝐦𝐛𝐫𝐞 𝐚𝐧𝐭𝐞𝐫𝐢𝐨𝐫:\` *${nombre}*
💫🎂 \`𝐄𝐝𝐚𝐝:\` *${edad} 𝐚𝐧̃𝐨𝐬*
🌟👋 𝐄𝐬𝐩𝐞𝐫𝐚𝐦𝐨𝐬 𝐯𝐨𝐥𝐯𝐞𝐫 𝐚 𝐯𝐞𝐫𝐭𝐞

━━━━━━━━━━━━━━━━━━━━
📜 𝐄𝐬𝐜𝐫𝐢𝐛𝐞: *.reg 𝐍𝐨𝐦𝐛𝐫𝐞 𝐄𝐝𝐚𝐝*
𝐩𝐚𝐫𝐚 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐫𝐭𝐞 𝐧𝐮𝐞𝐯𝐚𝐦𝐞𝐧𝐭𝐞.
━━━━━━━━━━━━━━━━━━━━`,
    mentions: [m.sender],

    contextInfo: {
      // *** AQUÍ VA TU CANAL ***
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      },

      externalAdReply: {
        title: `⚡ Registro eliminado correctamente ${emojis}`,
        body: `🧪 Nombre: ${nombre} • Edad: ${edad} años`,
        thumbnailUrl: pp,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: "https://whatsapp.com"
      }
    }
  }, { quoted: m })
}

handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg']
handler.register = true

export default handler
