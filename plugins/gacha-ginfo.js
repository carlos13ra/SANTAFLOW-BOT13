import { promises as fs } from 'fs'

// rutas
const charactersFilePath = './src/database/characters.json'

// importamos cooldowns de tus otros comandos
import { cooldowns as rollCooldowns } from './gacha-rollwaifu.js'
import { cooldowns as claimCooldowns } from './gacha-claim.js'

let handler = async (m, { conn }) => {
    const userId = m.sender
    const now = Date.now()

    try {
        // leer personajes
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        const characters = JSON.parse(data)

        // personajes reclamados por el usuario
        const claimed = characters.filter(ch => ch.user === userId)

        const claimedCount = claimed.length
        const totalValue = claimed.reduce((s, c) => s + Number(c.value || 0), 0)

        const totalCharacters = characters.length
        const totalSeries = new Set(characters.map(c => c.source)).size

        // función para formatear cooldown
        function format(time) {
            if (!time || now >= time) return 'Ahora'
            let r = Math.floor((time - now) / 1000)
            let m = Math.floor(r / 60)
            let s = r % 60
            return `${m}m ${s}s`
        }

        const rollCD = format(rollCooldowns[userId])
        const claimCD = format(claimCooldowns[userId])
        const voteCD = 'Ahora'  // fijo

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
