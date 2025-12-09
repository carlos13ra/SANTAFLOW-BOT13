import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'

// Cooldowns globales que comparten los otros comandos
import { cooldowns as rollCooldowns } from './gacha-rollwaifu.js'
import { cooldowns as claimCooldowns } from './gacha-claim.js'

let handler = async (m, { conn }) => {
    const userId = m.sender

    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        const characters = JSON.parse(data)

        // ---- PERSONAJES RECLAMADOS ----
        const claimed = characters.filter(c => c.user === userId)

        const claimedCount = claimed.length
        const totalValue = claimed.reduce((sum, ch) => sum + Number(ch.value || 0), 0)

        const totalCharacters = characters.length
        const totalSeries = new Set(characters.map(c => c.source)).size

        // ---- COOLDOWNS ----
        const now = Date.now()

        function formatCooldown(time) {
            if (!time || now >= time) return 'Ahora'

            let remaining = Math.floor((time - now) / 1000)
            let min = Math.floor(remaining / 60)
            let sec = remaining % 60

            return `${min}m ${sec}s`
        }

        const rollCD = formatCooldown(rollCooldowns[userId])
        const claimCD = formatCooldown(claimCooldowns[userId])
        const voteCD = 'Ahora' // Si luego quieres lo hacemos real

        // ---- MENSAJE FINAL ----
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

    } catch (error) {
        await conn.reply(m.chat, `✘ Error al cargar información: ${error.message}`, m)
    }
}

handler.help = ['ginfo']
handler.tags = ['gacha']
handler.command = ['ginfo', 'gi']
handler.group = true

export default handler
