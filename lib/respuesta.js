// --- VALORES NECESARIOS PARA LA NUEVA FUNCIONALIDAD ---
const newsletterJid = '120363404087331895@newsletter';
const newsletterName = '⸸ 🎧「 sᴀɴᴛᴀғʟᴏᴡ ✦ ᴏғɪᴄɪᴀʟ 」💫 ⸸࣭';
const packname = '⸙͎۪۫ ࣭࿐ ✿ ˚.🎵 𝐒𝐚𝐧𝐭𝐚𝐟𝐥𝐨𝐰 ♪ 𝐁𝐨𝐭 ♡⚡ ࿐ ۪۫⸙͎';
const dev = '𓏲⍣⃝🥭꙳ᴄᴀʀʟᴏs|ᴍᴀɴɢᴜɪᴛᴏ꙳⍣⃝ ☻⋆͙̈✫.🥭';


// Array de miniaturas
const iconos = [
      'https://i.postimg.cc/vZPm5jhv/1760212906099.jpg',
      'https://i.postimg.cc/NF1hb9ct/1760212236093.jpg',
      'https://i.postimg.cc/Kj3wjKzP/1760212149948.jpg',
      'https://i.postimg.cc/4N6ZQMfc/1760212222052.jpg',
      'https://i.postimg.cc/FHxrN6wr/1760212177470.jpg',
      'https://i.postimg.cc/HLhV1K75/1760212892451.jpg',
      'https://i.postimg.cc/J0cr0dtv/1760212895713.jpg',
      'https://i.postimg.cc/pTm6Z0fw/1754253021526.jpg',
      'https://i.postimg.cc/Y2JJXwyb/1754525693627.jpg',
      'https://i.postimg.cc/FHxrN6wr/1760212177470.jpg',
      'https://i.postimg.cc/0NxWTkp0/1754525596737.jpg',
];

// Función para obtener una aleatoria
const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

/**
 * Plugin centralizado para manejar todos los mensajes de error de permisos.
 */
const handler = (type, conn, m, comando) => {
  const msg = {
  rowner: `*\`【${global.comando2}】 ᴇs ᴜɴᴀ ғᴜɴᴄɪóɴ ᴇxᴄʟᴜsɪᴠᴀ ᴅᴇ ʟᴏs ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏs ᴘʀɪɴᴄɪᴘᴀʟᴇs. ᴛᴜ ᴀᴄᴄᴇsᴏ ɴᴏ ᴇsᴛá ᴀᴜᴛᴏʀɪᴢᴀᴅᴏ.\`*`,
  
  owner: `*\`【${global.comando2}】 sᴏʟᴏ ᴘᴜᴇᴅᴇ sᴇʀ ᴇᴊᴇᴄᴜᴛᴀᴅᴏ ᴘᴏʀ ʟᴏs ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏʀᴇs. ɴᴏ ᴛɪᴇɴᴇs ʟᴏs ᴘᴇʀᴍɪsᴏs ɴᴇᴄᴇsᴀʀɪᴏs.\`*`,
  
  mods: `*\`【${global.comando2}】 ᴇsᴛá ʀᴇsᴇʀᴠᴀᴅᴏ ᴘᴀʀᴀ ᴍᴏᴅᴇʀᴀᴅᴏʀᴇs. ᴛᴜ ᴘᴇʀғɪʟ ɴᴏ ᴄᴜᴍᴘʟᴇ ᴄᴏɴ ʟᴏs ʀᴇϙᴜɪsɪᴛᴏs.\`*`,
  
  premium: `*\`【${global.comando2}】 ᴇs ᴜɴ ʙᴇɴᴇғɪᴄɪᴏ ᴇxᴄʟᴜsɪᴠᴏ ᴘᴀʀᴀ ᴜsᴜᴀʀɪᴏs ᴘʀᴇᴍɪᴜᴍ. ᴇsᴛᴇ ᴘʀɪᴠɪʟᴇɢɪᴏ ᴀúɴ ɴᴏ ᴛᴇ ᴄᴏʀʀᴇsᴘᴏɴᴅᴇ.\`*`,
  
  group: `*\`【${global.comando2}】 sᴏʟᴏ ᴇsᴛá ᴅɪsᴘᴏɴɪʙʟᴇ ᴇɴ ɢʀᴜᴘᴏs. ᴇsᴛᴇ ᴇɴᴛᴏʀɴᴏ ɴᴏ ᴇs ᴠáʟɪᴅᴏ.\`*`,
  
  private: `*\`【${global.comando2}】 ᴅᴇʙᴇ ᴜᴛɪʟɪᴢᴀʀsᴇ ᴇɴ ᴜɴ ᴄʜᴀᴛ ᴘʀɪᴠᴀᴅᴏ.\`*`,
  
  admin: `*\`【${global.comando2}】 ʀᴇϙᴜɪᴇʀᴇ ᴘᴇʀᴍɪsᴏs ᴅᴇ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ. ᴀᴄᴄᴇsᴏ ᴅᴇɴᴇɢᴀᴅᴏ.\`*`,
  
  botAdmin: `*\`ᴘᴀʀᴀ ᴇᴊᴇᴄᴜᴛᴀʀ 【${global.comando2}】, ᴇʟ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ. ᴘᴏʀ ғᴀᴠᴏʀ, ᴀᴄᴛᴜᴀʟɪᴢᴀ ʟᴏs ᴘᴇʀᴍɪsᴏs.\`*`,
  
  unreg: `🎋 *☆ 𝙽𝙾 𝚃𝙴 𝙴𝙽𝙲𝚄𝙴𝙽𝚃𝚁𝙰𝚂 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝙳𝙾(𝙰) ☆*
 *- 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝚃𝙴 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙰 𝙵𝚄𝙽𝙲𝙸𝙾𝙽.*
 
• 🥭 */ʀᴇɢ <ɴᴏᴍʙʀᴇ.ᴇᴅᴀᴅ>*

> 🌿 \`- 🅁 🄴 🄶 -\`
> _#${global.verifyaleatorio} ${global.user2}.${global.edadaleatoria}_
> ꒰ ─┈ ⫶ 𝐌𝐚𝐧𝐠𝐮𝐢𝐭𝐨  ፝͜͡🥭`,

  restrict: `🚫 — Esta característica está deshabilitada.`
  }[type];

  if (msg) {
    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      },
      externalAdReply: {
        title: packname,
        body: dev,
        thumbnailUrl: getRandomIcono(), // ← aleatoria
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    };

    return conn.reply(m.chat, msg, m, { contextInfo }).then(_ => m.react('✖️'));
  }

  return true;
};

export default handler;
