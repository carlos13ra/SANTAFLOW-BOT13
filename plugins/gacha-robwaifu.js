import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'
const cooldowns = {}

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('❀ No se pudo cargar el archivo characters.json.')
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8')
    } catch (error) {
        throw new Error('❀ No se pudo guardar characters.json.')
    }
}

let handler = async (m, { conn, args }) => {
    const thief = m.sender

    // Detectar víctima igual que tu comando harem
    let victim

    if (m.quoted && m.quoted.sender) {
        victim = m.quoted.sender
    } else if (args[0] && args[0].startsWith('@')) {
        victim = args[0].replace('@', '') + '@s.whatsapp.net'
    } else {
        return conn.reply(m.chat, '《✧》Debes mencionar o citar a alguien para robarle una waifu.\nEjemplo: *#robwaifu @usuario*', m)
    }

    if (victim === thief)
        return conn.reply(m.chat, '《✧》No puedes robarte a ti mismo >:v', m)

    // Cooldown 10 min
    const now = Date.now()
    if (cooldowns[thief] && now < cooldowns[thief]) {
        const remaining = Math.ceil((cooldowns[thief] - now) / 1000)
        const min = Math.floor(remaining / 60)
        const sec = remaining % 60
        return conn.reply(m.chat, `《✧》Debes esperar *${min}m ${sec}s* para volver a robar.`, m)
    }

    try {
        let characters = await loadCharacters()

        // Waifus de la víctima (igual que tu harem.js)
        const victimCharacters = characters.filter(c => c.user === victim)

        if (victimCharacters.length === 0)
            return conn.reply(m.chat, '《✧》Ese usuario no tiene waifus para robar.', m)

        // Probabilidad de éxito 45%
        const success = Math.random() < 0.45

        // Activamos cooldown
        cooldowns[thief] = now + 10 * 60 * 1000

        if (!success) {
            return conn.reply(m.chat, '《✧》Fallaste en el robo, la waifu te dio una patada y escapó 😭', m)
        }

        // Elegir waifu aleatoria
        const stolen = victimCharacters[Math.floor(Math.random() * victimCharacters.length)]

        // Transferir waifu
        stolen.user = thief
        stolen.status = "Robado"

        await saveCharacters(characters)

        return conn.reply(
            m.chat,
            `✦ *Robo Exitoso*\n\n` +
            `💘 *Waifu robada:* ${stolen.name} (*${stolen.value}*)\n` +
            `👤 *A:* @${victim.split('@')[0]}\n` +
            `🔪 *Por:* @${thief.split('@')[0]}\n`,
            m,
            { mentions: [victim, thief] }
        )

    } catch (e) {
        return conn.reply(m.chat, `✘ Error en el robo: ${e.message}`, m)
    }
}

handler.help = ['robwaifu @usuario']
handler.tags = ['gacha']
handler.command = ['robwaifu', 'robarwaifu']
handler.group = true

export default handler
