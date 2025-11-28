// ---------------------------
// Variables necesarias
// ---------------------------
const emoji = "💰"
const moneda = "Coins"

// Tu canal oficial
const newsletterJid = '120363404087331895@newsletter'
const newsletterName = '⸸ 🎧「 sᴀɴᴛᴀғʟᴏᴡ ✦ ᴏғɪᴄɪᴀʟ 」💫 ⸸࣭'

let handler = async (m, { conn, args, participants }) => {

    // Convertir base de datos en array usable
    let users = Object.entries(global.db.data.users).map(([key, value]) => ({
        ...value,
        jid: key
    }));

    // Ordenar por coins + bank
    let sorted = users.sort((a, b) =>
        (b.coin || 0) + (b.bank || 0) -
        (a.coin || 0) - (a.bank || 0)
    );

    // Cantidad de posiciones
    let len = args[0] ? Math.min(10, Math.max(parseInt(args[0]), 10)) : 10;

    // Encabezado
    let text = `*${emoji} TOP ${len} Usuarios con más ¥${moneda}:*\n\n`;

    // Lista de usuarios
    text += sorted.slice(0, len).map((u, i) => {
        let total = (u.coin || 0) + (u.bank || 0);

        // Nombre inteligente
        let name = participants.some(p => p.id === u.jid)
            ? conn.getName(u.jid)
            : '@' + u.jid.split('@')[0];

        return `*${i + 1}.* ${name}\n   ➤ Total: *¥${total} ${moneda}*`;
    }).join('\n\n');

    // Enviar mensaje con canal integrado
    await conn.sendMessage(m.chat, {
        text,
        mentions: conn.parseMention(text),
        contextInfo: {
            forwardedNewsletterMessageInfo: {
                newsletterJid,
                newsletterName,
                serverMessageId: -1
            },
            externalAdReply: {
                title: `🏆 Top Economía – Santaflow`,
                body: `Los más ricos del servidor`,
                thumbnailUrl: "https://i.postimg.cc/pTm6Z0fw/1754253021526.jpg",
                mediaType: 1,
                renderLargerThumbnail: true,
                sourceUrl: "https://whatsapp.com"
            }
        }
    })
}

handler.help = ['baltop']
handler.tags = ['rpg']
handler.command = ['baltop', 'eboard']
handler.group = true
handler.register = true
handler.fail = null
handler.exp = 0

export default handler
