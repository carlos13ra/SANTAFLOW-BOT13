var handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // 🛑 Inicialización segura (evita errores de undefined)
    user.coin = user.coin || 0;
    user.exp = user.exp || 0;
    user.diamond = user.diamond || 0;
    user.lastclaim = user.lastclaim || 0;

    // 🎁 Recompensas aleatorias
    let coin = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    let exp = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    let d = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

    // ⏳ Cooldown: 2 horas (7200000 ms)
    let cooldown = 7200000;
    let remaining = cooldown - (new Date() - user.lastclaim);

    if (remaining > 0) {
        return conn.reply(m.chat, `${emoji4} *Reclama de nuevo en ${msToTime(remaining)}*`, m);
    }

    // 🔥 Sumar recompensas
    user.coin += coin;
    user.exp += exp;
    user.diamond += d;

    // Guardar último reclamo
    user.lastclaim = Date.now();

    // Variables necesarias
    let moneda = "¥";
    let emoji = "🎁";
    let emoji4 = "⏳";

    // 📩 Respuesta final
    conn.reply(m.chat,
`${emoji} *Recompensa Diaria*

✨ XP: *+${exp}*
💎 Diamantes: *+${d}*
💸 ${moneda} Monedas: *+${coin}*

¡Vuelve mañana para más recompensas!`,
m);
};

handler.help = ['daily', 'claim'];
handler.tags = ['rpg'];
handler.command = ['daily', 'diario'];
handler.group = true;
handler.register = true;

export default handler;

// ⏱ Convertir milisegundos a formato legible
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)));

    return `${hours} Horas ${minutes} Minutos ${seconds} Segundos`;
}
