let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return { ...value, jid: key };
  }).filter(user => participants.some(p => p.jid === user.jid));

  let sortedLim = users.sort((a, b) => (b.coin || 0) + (b.bank || 0) - (a.coin || 0) - (a.bank || 0));

  let len = Math.min(10, args[0] && !isNaN(args[0]) ? parseInt(args[0]) : 10);

  if (sortedLim.length === 0) {
    return conn.reply(m.chat, 'No se encontraron usuarios con monedas en este grupo.', m);
  }

  let text = `「${emoji}」Los usuarios con más *¥${moneda}* en este grupo son:\n\n`;
  text += sortedLim.slice(0, len).map(({ jid, coin, bank }, i) => {
    let total = (coin || 0) + (bank || 0);
    return `✰ ${i + 1} » *${conn.getName(jid)} (${jid.split`@`[0]})*` + `\n\t\t Total→ *¥${total} ${moneda}*`;
  }).join('\n');

  await conn.reply(m.chat, text.trim(), m, { mentions: conn.parseMention(text) });
}

handler.help = ['baltop'];
handler.tags = ['rpg'];
handler.command = ['baltop', 'eboard'];
handler.group = true;
handler.register = true;
handler.fail = null;
handler.exp = 0;

export default handler;
