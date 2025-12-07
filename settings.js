import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.botNumber = ''

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.owner = ["51978385249", "51978385249", "51919199620"]

global.mods = ['51978385249']
global.suittag = ['51978385249'] 
global.prems = ['51978385249']

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = '✦⃟🎧 Santaflow•Bot 🎧⃟✦'
global.namebot = '⸸ 𝐒𝐀𝐍𝐓𝐀𝐅𝐋𝐎𝐖 • 𝐁𝐎𝐓 ⸸'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.shadowJadibts = true

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.packname = '🎶 ⌬ 𝑺𝒂𝒏𝒕𝒂𝒇𝒍𝒐𝒘 𝑩𝒐𝒕 ⌬ 🎵'
global.botname = '🎵 𝐒𝐀𝐍𝐓𝐀𝐅𝐋𝐎𝐖 𝐁𝐎𝐓 ❤️'
global.wm = '◈ 𝐒𝐀𝐍𝐓𝐀𝐅𝐋𝐎𝐖 𝐁𝐎𝐓 ◈'
global.author = '⩇⃟🥭 𝑴𝒂𝒅𝒆 𝒃𝒚 𝐜𝐚𝐫𝐥𝐨𝐬.𝐫𝐯 ⩇⃟🎵'
global.dev = '🎶 ミ🎵 》𝑪𝑨𝑹𝑳𝑶𝑺.𝑹𝑽《 🎶ミ ❤️'
global.bot = '𝑺𝒂𝒏𝒕𝒂𝒇𝒍𝒐𝒘 𝒃𝒐𝒕'
global.club = '🎵 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 carlos•Core 𝖢𝗅𝗎𝖻 🎶'
global.textbot = 'sᴀɴᴛᴀғʟᴏᴡ ʙᴏᴛ ✦ ℂ𝔸ℝ𝕃𝕆𝕊•ℝ𝕍'
global.etiqueta = '@ᴄ`ᴀʀʟᴏs ʀ`ᴀᴍɪʀᴇᴢ ° ғ`ᴄ'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.moneda = 'ᴇᴜʀᴏs💶'
global.welcom1 = '💤 Bienvenido/a al grupo🎶\n❍ Edita con el comando *setwelcome*'
global.welcom2 = '🔥 un miembro ha salido del partido🔥\n❍ Edita con el comando *setbye*'
global.banner = 'https://i.postimg.cc/fbgJW3ND/93f25ee53428103d24f795274ad12ab3.jpg'
global.avatar = 'https://i.postimg.cc/xjMhMVbG/personaje-satoru-gojo-jujutsu-kaisen-7799.jpg'
global.logo = 'https://i.postimg.cc/Gpry5rSz/0x1900-000000-80-0-0.jpg'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.gp1 = 'https://whatsapp.com/channel/0029Vb6iXGDISTkKY8fxUa39'
global.comunidad1 = 'https://whatsapp.com/channel/0029Vb6iXGDISTkKY8fxUa39'
global.channel = 'https://whatsapp.com/channel/0029Vb6iXGDISTkKY8fxUa39'
global.channel2 = 'httpom/channel/0029VbAtbPA84OmJSLiHis2U'
global.md = 'https://github.com/carlos13ra/GOJO-BOT'
global.correo = 'carlosramirezvillanueva30@gmail.com'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363404087331895@newsletter',
ch2: "120363404087331895@newsletter",
ch3: "120363404087331895@newsletter"
}
global.multiplier = 60

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
