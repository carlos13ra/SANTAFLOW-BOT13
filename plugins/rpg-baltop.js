let handler = async (m, { conn, args, participants }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return { ...value, jid: key };
    });

    // Ordena por total (coin + bank)
    let sortedLim = users.sort((a, b) => ((b.coin || 0) + (b.bank || 0)) - ((a.coin || 0) + (a.bank || 0)));

    // Cantidad a mostrar
    let len = args[0] && !isNaN(args[0]) ? Math.min(10, parseInt(args[0])) : Math.min(10, sortedLim.length);

    let moneda = "¥";  // ← Ajusta si tu moneda es diferente
    let emoji = "💰";  // ← Emoji para el encabezado

    let text = `「${emoji}」 *Top ${len} usuarios con más ${moneda}:*\n\n`;

    for (let i = 0; i < len; i++) {
        let { jid, coin, bank } = sortedLim[i];
        let total = (coin || 0) + (bank || 0);

        // Obtener nombre REAL del usuario
        let name = await conn.getName(jid).catch(_ => jid.split('@')[0]);

        text += `✰ ${i + 1}. *${name}*\n`;
        text += `   Total → *${moneda}${total}*\n\n`;
    }

    await conn.reply(m.chat, text.trim(), m);
};

handler.help = ['baltop'];
handler.tags = ['rpg'];
handler.command = ['baltop', 'eboard'];
handler.group = true;
handler.register = true;
handler.fail = null;
handler.exp = 0;

export default handler;
