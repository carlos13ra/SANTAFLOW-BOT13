let handler = async (m, { conn, args }) => {
    const emoji = global.emoji || "💰"
    const moneda = global.moneda || "YEN"

    // Cargar usuarios globales
    let users = Object.entries(global.db.data.users).map(([jid, user]) => ({
        jid,
        name: user.name || "Usuario",
        coin: user.coin || 0,
        bank: user.bank || 0
    }))

    // Ordenar por dinero total
    users.sort((a, b) => (b.coin + b.bank) - (a.coin + a.bank))

    // Cantidad a mostrar
    let len = args[0] ? Math.min(10, parseInt(args[0])) : 10

    let text = `「${emoji}」 *Top ${len} usuarios con más ${moneda}*\n\n`

    for (let i = 0; i < len && i < users.length; i++) {
        let u = users[i]
        let total = u.coin + u.bank

        // Obtener nombre real desde WhatsApp
        let name = await conn.getName(u.jid).catch(_ => u.name)

        text += `🏅 *${i + 1}.* ${name}
   ➤ Total: *¥${total} ${moneda}*\n\n`
    }

    return conn.reply(m.chat, text.trim(), m)
}

handler.help = ['baltop']
handler.tags = ['rpg']
handler.command = ['baltop', 'eboard']
handler.group = true

export default handler
