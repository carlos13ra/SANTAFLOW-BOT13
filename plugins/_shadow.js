const handler = async (m, { conn, args, command, usedPrefix }) => {
  const ownerNumber = '51919199620' // gay si editas esta parte att: shadow_xyz
  const sender = m.sender
  const senderNumber = sender.split('@')[0]
  const user = global.db.data.users[sender]
  global.shadowGifts = global.shadowGifts || {}

  if (command === 'shadowregalo') {
    if (!user.coin || user.coin < 1)
      return m.reply('🚫 *No tienes suficientes monedas para crear un regalo.*')

    if (args.length < 3)
      return m.reply(
        `🎁 *Uso correcto del comando:*\n\n` +
        `> ${usedPrefix + command} <monto> <copias> <nombre>\n\n` +
        `🌸 *Ejemplo:*\n${usedPrefix + command} 10000 3 RinPremio`
      )

    const monto = parseInt(args[0])
    const copias = parseInt(args[1])
    const nombre = args.slice(2).join(' ')

    if (isNaN(monto) || isNaN(copias))
      return m.reply('❌ *Debes ingresar números válidos para el monto y las copias.*')

    const costoTotal = monto * copias
    if (user.coin < costoTotal)
      return m.reply(`💸 *No tienes suficientes monedas.*\nRequieres ${costoTotal.toLocaleString()} 💰`)

    user.coin -= costoTotal

    // Crear token único
    const token = Math.random().toString(36).substring(2, 10).toUpperCase()
    global.shadowGifts[token] = {
      creador: sender,
      monto,
      copias,
      nombre,
      reclamados: []
    }

    await conn.sendMessage(m.chat, {
      text: `
╭━━━〔 🎁 𝐑𝐄𝐆𝐀𝐋𝐎 𝐂𝐑𝐄𝐀𝐃𝐎 🌸 〕━━⬣
│ 🧸 *Creador:* @${senderNumber}
│ 💰 *Valor por usuario:* ${monto.toLocaleString()} coins
│ 📦 *Copias disponibles:* ${copias}
│ 🪙 *Token:* ${token}
│ 🎀 *Nombre:* ${nombre}
│ 
│ 🕊️ *Los usuarios pueden reclamar con:*
│ ${usedPrefix}shadowcanje ${token}
│ 
╰━━━〔 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 🌷 〕━━⬣
      `,
      mentions: [sender]
    })

    return
  }

  if (command === 'shadowcanje') {
    const token = args[0]?.toUpperCase()
    if (!token) return m.reply(`❄️ *Uso:* ${usedPrefix + command} <token>\nEjemplo: ${usedPrefix + command} ABC12345`)

    const regalo = global.shadowGifts[token]
    if (!regalo) return m.reply('🎁 *Ese token no existe o ya fue usado completamente.*')

    if (regalo.reclamados.includes(sender))
      return m.reply('🌸 *Ya reclamaste este regalo antes.*')

    if (regalo.reclamados.length >= regalo.copias) {
      delete global.shadowGifts[token]
      return m.reply('☃️ *Todas las copias de este regalo ya fueron reclamadas.*')
    }

    const receptor = global.db.data.users[sender]
    if (!receptor.coin) receptor.coin = 0
    if (!receptor.exp) receptor.exp = 0
    if (!receptor.joincount) receptor.joincount = 0

    receptor.coin += regalo.monto
    receptor.exp += regalo.monto
    receptor.joincount += regalo.monto

    regalo.reclamados.push(sender)

    const creadorName = await conn.getName(regalo.creador)
    const receptorName = await conn.getName(sender)

    await conn.sendMessage(m.chat, {
      text: `
╭━━━〔 ☃️ 𝐂𝐀𝐍𝐉𝐄 𝐄𝐗𝐈𝐓𝐎𝐒𝐎 🎀 〕━━⬣
│ 👤 *Receptor:* ${receptorName}
│ 💎 *Has recibido:* ${regalo.monto.toLocaleString()} coins
│ 📦 *Regalo:* ${regalo.nombre}
│ 🧧 *De parte de:* ${creadorName}
│
│ 🔖 *Token:* ${token}
│ 🎁 *Copias restantes:* ${regalo.copias - regalo.reclamados.length}
│
╰━━━〔 𝐑𝐢𝐧 𝐈𝐭𝐨𝐬𝐡𝐢 🌷 〕━━⬣
      `,
      mentions: [sender, regalo.creador],
      contextInfo: {
        externalAdReply: {
          title: '☃️ ShadowCanje',
          body: 'Has reclamado un regalo misterioso 🌸',
          thumbnailUrl: 'https://qu.ax/ALOZa.jpg',
          sourceUrl: 'https://github.com/Shadow-nex',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })

    // Si se agotaron las copias, eliminar
    if (regalo.reclamados.length >= regalo.copias) {
      delete global.shadowGifts[token]
    }

    return
  }
}

// Configuración del handler
handler.help = ['shadowregalo', 'shadowcanje']
handler.tags = ['rpg', 'rewards']
handler.command = ['shadowregalo', 'shadowcanje']
handler.register = true
export default handler