let handler = async (m, { conn, args, participants }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return { ...value, jid: key };
    });

    let sortedLim = users.sort((a, b) => (b.coin || 0) + (b.bank || 0) - (a.coin || 0) - (a.bank || 0));
    let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedLim.length);

    let text = `「${emoji}」Los usuarios con más *¥${moneda}* son:\n\n`;

    text += sortedLim.slice(0, len).map(({ jid, coin, bank }, i) => {
        let total = (coin || 0) + (bank || 0);
        let name = conn.getName(jid) || "Usuario desconocido";

        return `✰ ${i + 1} » *${name}*\n\t\t Total→ *¥${total} ${moneda}*`;
    }).join('\n');

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
