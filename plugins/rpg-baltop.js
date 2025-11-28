let handler = async (m, { conn, args, participants }) => {
    // Variables de respaldo por si no existen
    const emoji = global.emoji || "💰"
    const moneda = global.moneda || "DOLARES💶"

    // Obtener usuarios de la base de datos
    let users = Object.entries(global.db.data.users).map(([jid, data]) => {
        return { jid, ...data }
    })

    // Ordenar por dinero total
    let sorted = users.sort((a, b) => {
        return ((b.coin || 0) + (b.bank || 0)) - ((a.coin || 0) + (a.bank || 0))
    })

    // Cuántos mostrar
    let len = args[0] ? Math.min(10, Number(args[0])) : 10

    let text = `「${emoji}」*Top ${len} usuarios con más ${moneda}*\n\n`

    for (let i = 0; i < len && i < sorted.length; i++) {
        let u = sorted[i]
        let total = (u.coin || 0) + (u.bank || 0)

        // Obtener nombre (funciona incluso si no está en el grupo)
        let name = await conn.getName(u.jid).catch(_ => "Usuario")

        text += `✰ ${i + 1} » *${name}*\n   Total → *¥${total} ${moneda}*\n\n`
    }

    await conn.reply(m.chat, text.trim(), m)
}

handler.help = ['baltop']
handler.tags = ['rpg']
handler.command = ['baltop', 'eboard']
handler.group = true
handler.register = true

export default handler
