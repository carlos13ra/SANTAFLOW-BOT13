import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const cooldowns = {};

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('❀ No se pudo cargar el archivo characters.json.');
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('❀ No se pudo guardar characters.json.');
    }
}

let handler = async (m, { conn }) => {

    const thief = m.sender;
    const victim = m.mentionedJid ? m.mentionedJid[0] : null;
    const now = Date.now();

    if (!victim)
        return conn.reply(m.chat, '《✧》Debes etiquetar a alguien para robarle una waifu.\nEjemplo: *#robwaifu @usuario*', m);

    if (thief === victim)
        return conn.reply(m.chat, '《✧》No puedes robarte a ti mismo >:v', m);

    // Cooldown 10 minutos
    if (cooldowns[thief] && now < cooldowns[thief]) {
        const remaining = Math.ceil((cooldowns[thief] - now) / 1000);
        const min = Math.floor(remaining / 60);
        const sec = remaining % 60;
        return conn.reply(m.chat, `《✧》Debes esperar *${min}m ${sec}s* para volver a robar.`, m);
    }

    try {
        let characters = await loadCharacters();

        // Buscar personajes reclamados por la víctima
        let victimWaifus = characters.filter(c => c.user === victim);

        if (victimWaifus.length === 0)
            return conn.reply(m.chat, '《✧》Ese usuario no tiene waifus para robar.', m);

        // Probabilidad de éxito 45%
        let success = Math.random() < 0.45;

        cooldowns[thief] = now + 10 * 60 * 1000;

        if (!success)
            return conn.reply(m.chat, '《✧》Fallaste en el robo, la waifu te dio una patada y escapó 😭', m);

        // Elegir waifu aleatoria para robar
        let stolen = victimWaifus[Math.floor(Math.random() * victimWaifus.length)];

        // Transferir waifu
        stolen.user = thief;
        stolen.status = "Robado";

        await saveCharacters(characters);

        return conn.reply(m.chat,
            `✦ *Robo Exitoso*\n\n` +
            `💘 *Waifu robada:* ${stolen.name}\n` +
            `👤 *A:* @${victim.split('@')[0]}\n` +
            `🔪 *Por:* @${thief.split('@')[0]}\n`,
            m,
            { mentions: [victim, thief] }
        );

    } catch (e) {
        return conn.reply(m.chat, `✘ Error en el robo: ${e.message}`, m);
    }
};

handler.help = ['robwaifu @usuario'];
handler.tags = ['gacha'];
handler.command = ['robwaifu', 'robarwaifu'];
handler.group = true;

export default handler;
