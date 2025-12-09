import axios from 'axios'
import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const userId = m.mentionedJid?.[0] || m.sender
    const userData = global.db.data.users[userId] || {}

    const exp = userData.exp || 0
    const coin = userData.coin || 0
    const level = userData.level || 0
    const role = userData.role || 'Sin rango'
    const name = await conn.getName(userId)

    const uptime = clockString(process.uptime() * 1000)
    const totalreg = Object.keys(global.db.data.users).length
    const totalCommands = Object.keys(global.plugins).length

    const hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
    const fecha = new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
    const dia = new Date().toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })

    const videos = [
      'https://files.catbox.moe/j1bwtc.mp4',
      'https://files.catbox.moe/jic49n.mp4'
    ]
    const video = videos[Math.floor(Math.random() * videos.length)]

    const emojis = {
      main: '🦋', tools: '🛠️', audio: '🎧', group: '👥', owner: '👑',
      fun: '🎮', info: 'ℹ️', internet: '🌐', downloads: '⬇️', admin: '🧰',
      anime: '✨', search: '🔍', sticker: '🖼️', game: '🕹️', premium: '💎', bot: '🤖'
    }

    let grupos = {}
    for (let plugin of Object.values(global.plugins || {})) {
      if (!plugin?.help || !plugin?.tags) continue
      for (let tag of plugin.tags) {
        if (!grupos[tag]) grupos[tag] = []
        for (let help of plugin.help) {
          if (/^\$|^=>|^>/.test(help)) continue
          grupos[tag].push(`${usedPrefix}${help}`)
        }
      }
    }
    for (let tag in grupos) grupos[tag].sort((a, b) => a.localeCompare(b))

    const secciones = Object.entries(grupos).map(([tag, cmds]) => {
      const emoji = emojis[tag] || '🌱'
      return `
> ${emoji} ${tag.toUpperCase()}
${cmds.map(cmd =>  ۫'🌴ֹ 𔐼ֹ֪➩ \`\`\${cmd}`).join('\n')}\`\`\`
`
    }).join('\n')

let menuText = `
╔══❄️☃️════••════☃️❄️══╗
          𝑺𝑨𝑵𝑻𝑨𝑭𝑳𝑶𝑾-𝑩𝑶𝑻
╚══❄️☃️════••════☃️❄️══╝

🎁✨ ¡${ucapan()} @${userId.split('@')[0]}! ✨🎁
🎄 Bienvenido al menú mágico de Navidad 🎅  

𝗜 𝗡 𝗙 𝗢 - 𝗨 𝗦 𝗘 𝗥 💫
﹊﹊﹊﹊﹊﹊﹊﹊﹊
ᴜsᴇʀ: ${name}
ɴɪᴠᴇʟ: ${level}
ᴇxᴘ ᴛᴏᴛᴀʟ: ${exp}
ʀᴀɴɢᴏ: ${role}
─────────────────────────

𝗜 𝗡 𝗙 𝗢 - 𝗕 𝗢 𝗧 ☃️
﹊﹊﹊﹊﹊﹊﹊﹊﹊
👑 ᴏᴡɴᴇʀ: wa.me/${suittag}
🤖 ʙᴏᴛ: ${(conn.user.jid == global.conn.user.jid ? '☃️ ʙᴏᴛ ᴏғɪᴄɪᴀʟ' : '⛄ sᴜʙ ʙᴏᴛ')}
📚 ᴄᴏᴍᴀɴᴅᴏs: ${totalCommands}
🧑‍🤝‍🧑 ᴛᴏᴛᴀʟ ᴜsᴇʀs: ${totalreg}
⏱️ ʀᴜɴᴛɪᴍᴇ: ${uptime}
──────────────────────────

𝗜𝗡𝗙𝗢 - 𝗙𝗘𝗖𝗛𝗔 ❄️
﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊
⚡ ʜᴏʀᴀ ᴘᴇʀᴜ: ${hora}
🍩 ғᴇᴄʜᴀ: ${fecha}
☘️ ᴅɪᴀ: ${dia}
──────────────────────────

❄️═════════════════❄️
💫🎆 𝐅𝐄𝐋𝐈𝐙 𝐍𝐀𝐕𝐈𝐃𝐀𝐃 𝐘 𝐏𝐑𝐎𝐒𝐏𝐄𝐑𝐎 𝐀Ñ𝐎 𝐍𝐔𝐄𝐕𝐎 2026 🎆💫  
🎅 Que tu corazón brille de alegría,  
🎁 tus días se llenen de magia y amor,  
y tus sueños renazcan con esperanza ✨  
🎇 ¡Gracias por compartir esta navidad y 
💫 prospero año nuevo con nosotros! 💖  
❄️═════════════════❄️

${secciones}

╭ *SANTAFLOW BOT* ╮
🎁 “Tu ayudante mágico en esta Navidad y Año Nuevo”  
🎅 © 2025 - 2026 By Carlos Ramírez  
╰──────────────────────────╯
`.trim()

await m.react('❄️')
await conn.sendMessage(m.chat, { video: { url: video }, caption: menuText, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: packname, body: dev, thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender]
    }, { quoted: m })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto']
handler.register = true
export default handler

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}h ${minutes}m ${seconds}s`
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH')
  let res = "ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙"
  if (time >= 5 && time < 12) res = "ʙᴜᴇɴᴏs ᴅɪᴀs ☀️"
  else if (time >= 12 && time < 18) res = "ʙᴜᴇɴᴀs ᴛᴀʀᴅᴇs 🌤️"
  else if (time >= 18) res = "ʙᴜᴇɴᴀs ɴᴏᴄʜᴇs 🌙"
  return res
 }
