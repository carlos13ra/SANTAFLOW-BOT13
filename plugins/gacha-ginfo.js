import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'

// Inicializamos global si no existe
if (!global.gachaCooldown) global.gachaCooldown = {
    roll: {},
    claim: {}
}

let handler = async (m, { conn }) => {
    const userId = m.sender
    const now = Date.now()

    try {
        // Leer characters.json
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        const characters = JSON.parse(data)

        // Personajes reclamados por el usuario
        const claimed = characters.filter(c => c.user === userId)

        const claimedCount = claimed.length
        const totalValue = claimed.reduce((sum, c) => sum + Number(c.value || 0), 0)

        const totalCharacters = characters.length
        const totalSeries = new Set(characters.map(c => c.source)).size

        // Formatear cooldown
        function format(time) {
            if (!time || now >= time) return 'Ahora'
            let r = Math.floor((time - now) / 1000)
            let m = Math.floor(r / 60)
            let s = r % 60
            return `${m}m ${s}s`
        }

        const rollCD = format(global.gachaCooldown.roll[userId])
        const claimCD = format(global.gachaCooldown.claim[userId])
        const voteCD = 'Ahora'

        const username = m.pushName || userId.split('@')[0]

        const msg = `
*❀ Usuario \`<${username}>\`*

ⴵ RollWaifu » *${rollCD}*
ⴵ Claim » *${claimCD}*
ⴵ Vote » *${voteCD}*

♡ Personajes reclamados » *${claimedCount}*
✰ Valor total » *${totalValue}*
❏ Personajes totales » *${totalCharacters}*
❏ Series totales » *${totalSeries}*
        `.trim()

        await conn.reply(m.chat, msg, m)

    } catch (e) {
        await conn.reply(m.chat, `✘ Error en ginfo: ${e.message}`, m)
    }
}

handler.help = ['ginfo']
handler.tags = ['gacha']
handler.command = ['ginfo', 'gi']
handler.group = true

export default handler
