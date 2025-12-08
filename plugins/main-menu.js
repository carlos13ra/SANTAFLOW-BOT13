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
      'https://files.catbox.moe/jgfdmn.mp4',
      'https://files.catbox.moe/wc8wcz.mp4',
      'https://files.catbox.moe/t9frnr.mp4',
      'https://files.catbox.moe/j4aew2.mp4',
      'https://files.catbox.moe/1b5zis.mp4',
      'https://files.catbox.moe/leq8g0.mp4',
      'https://files.catbox.moe/hvfmay.mp4',
      'https://files.catbox.moe/x2tt5r.mp4'
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
      const emoji = emojis[tag] || '⭐'
      return `
> ${emoji} ${tag.toUpperCase()}
${cmds.map(cmd => `✎‿ \`\`\`${cmd}`).join('\n')}\`\`\`
`
    }).join('\n')

    const menuText = `
╔═══❄️ 𝑺𝑨𝑵𝑻𝑨𝑭𝑳𝑶𝑾 𝑩𝑶𝑻 ❄️═══╗
┃ ✨ ${ucapan()} @${userId.split('@')[0]} ✨
╚══════════════════════╝

╭───〔 🎅 𝗣𝗘𝗥𝗙𝗜𝗟 〕───❄️
│ 👤 Usuario: ${name}
│ 🎚 Nivel: ${level}
│ 🌟 Exp: ${exp}
│ 🎖 Rango: ${role}
╰──────────────────❄️

╭───〔 🤖 𝗘𝗦𝗧𝗔𝗗𝗢 𝗗𝗘𝗟 𝗕𝗢𝗧 〕───❄️
│ 👑 Owner: wa.me/51${suittag}
│ 💻 Modo: ${(conn.user.jid === global.conn.user.jid) ? 'Bot oficial' : 'Sub bot'}
│ 📚 Comandos: ${totalCommands}
│ 👥 Usuarios: ${totalreg}
│ ⏱ Uptime: ${uptime}
│ 🌴 Date: ${hora}, ${fecha}, ${dia}
╰──────────────────❄️

${secciones}
`.trim()

    await m.react('❄️')

    await conn.sendMessage(m.chat, {
      video: { url: video },
      gifPlayback: false,
      caption: menuText,
      contextInfo: {
        //mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          newsletterName: channelRD.name,
          serverMessageId: -1
        },
        externalAdReply: {
          title: packname,
          body: dev,
          thumbnailUrl: icono,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: null })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `✘ Error al mostrar el menú:\n${e.message}`,
      mentions: [m.sender]
    }, { quoted: m })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'allmenu', 'menucompleto']
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
  if (time >= 5 && time < 12) return "Buenos días ☀️"
  if (time >= 12 && time < 18) return "Buenas tardes 🌤️"
  return "Buenas noches 🌙"
}