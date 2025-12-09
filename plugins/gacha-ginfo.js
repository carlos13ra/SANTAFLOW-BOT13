import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'
const haremFilePath = './src/database/harem.json'

// Intentamos acceder a los cooldowns globales de cada comando
global.rollCooldowns = global.rollCooldowns || {}
global.claimCooldowns = global.claimCooldowns || {}
global.voteCooldowns = global.voteCooldowns || new Map()

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

function formatTime(ms) {
    if (ms <= 0) return "Ahora"
    let sec = Math.floor(ms / 1000)
    let m = Math.floor(sec / 60)
    let s = sec % 60
    return `${m}m ${s}s`
}

let handler = async (m, { conn }) => {
    const userId = m.sender
    const now = Date.now()

    // Obtener tiempos reales
    const rollEnd   = global.rollCooldowns[userId]  || 0
    const claimEnd  = global.claimCooldowns[userId] || 0
    const voteEnd   = global.voteCooldowns.get(userId) || 0

    const rollTime  = rollEnd  > now ? rollEnd  - now : 0
    const claimTime = claimEnd > now ? claimEnd - now : 0
    const voteTime  = voteEnd  > now ? voteEnd  - now : 0

    const characters = await loadCharacters()
    const harem = await loadHarem()

    const claimed = characters.filter(c => c.user === userId)
    const claimedCount = claimed.length
    const totalValue = claimed.reduce((sum, c) => sum + Number(c.value || 0), 0)

    const totalCharacters = characters.length
    const totalSeries = new Set(characters.map(c => c.source)).size

    const name = conn.getName(userId)

    const txt = `
*❀ Usuario* \`${name}\`

ⴵ RollWaifu » *${formatTime(rollTime)}*
ⴵ Claim » *${formatTime(claimTime)}*
ⴵ Vote » *${formatTime(voteTime)}*

♡ Personajes reclamados » *${claimedCount}*
✰ Valor total » *${totalValue}*
❏ Personajes totales » *${totalCharacters}*
❏ Series totales » *${totalSeries}*
`

    await conn.reply(m.chat, txt, m)
}

handler.help = ['ginfo']
handler.tags = ['gacha']
handler.command = ['ginfo', 'ginformacion', 'waifuinfo']
handler.group = true

export default handler
