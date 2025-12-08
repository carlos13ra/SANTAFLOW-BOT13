const estilogo = [
  { cmd: "glitchtext", emoji: "🟣" },
  { cmd: "narutotext", emoji: "🍥" },
  { cmd: "dragonball", emoji: "🟠" },
  { cmd: "neonlight", emoji: "💡" },
  { cmd: "pubglogo", emoji: "🔫" },
  { cmd: "harrypotter", emoji: "⚡" },
  { cmd: "marvel", emoji: "🦸" },
  { cmd: "pixelglitch", emoji: "🔳" },
  { cmd: "amongustext", emoji: "👾" },
  { cmd: "writetext", emoji: "✍️" },
  { cmd: "advancedglow", emoji: "🌟" },
  { cmd: "typographytext", emoji: "📝" },
  { cmd: "neonglitch", emoji: "🌈" },
  { cmd: "flagtext", emoji: "🏳️" },
  { cmd: "flag3dtext", emoji: "🏁" },
  { cmd: "deletingtext", emoji: "❌" },
  { cmd: "blackpinkstyle", emoji: "💖" },
  { cmd: "glowingtext", emoji: "✨" },
  { cmd: "underwatertext", emoji: "🌊" },
  { cmd: "logomaker", emoji: "🖌️" },
  { cmd: "cartoonstyle", emoji: "🎨" },
  { cmd: "papercutstyle", emoji: "✂️" },
  { cmd: "watercolortext", emoji: "🖍️" },
  { cmd: "effectclouds", emoji: "☁️" },
  { cmd: "blackpinklogo", emoji: "🌸" },
  { cmd: "gradienttext", emoji: "🌀" },
  { cmd: "summerbeach", emoji: "🏖️" },
  { cmd: "luxurygold", emoji: "🥇" },
  { cmd: "multicoloredneon", emoji: "💫" },
  { cmd: "sandsummer", emoji: "🏝️" },
  { cmd: "galaxywallpaper", emoji: "🪐" },
  { cmd: "style", emoji: "💠" },
  { cmd: "makingneon", emoji: "🔆" },
  { cmd: "royaltext", emoji: "👑" },
  { cmd: "freecreate", emoji: "🆓" },
  { cmd: "galaxystyle", emoji: "🌌" },
  { cmd: "rainytext", emoji: "🌧️" },
  { cmd: "graffititext", emoji: "🖍️" },
  { cmd: "colorfulltext", emoji: "🌈" },
  { cmd: "equalizertext", emoji: "🎚️" },
  { cmd: "angeltxt", emoji: "👼" },
  { cmd: "starlight", emoji: "🌟" },
  { cmd: "steel", emoji: "🔩" },
  { cmd: "neoncity", emoji: "🌃" },
  { cmd: "cloudsky", emoji: "☁️" },
  { cmd: "matrix", emoji: "🟩" },
  { cmd: "minion", emoji: "💛" },
  { cmd: "papercut3d", emoji: "📐" },
  { cmd: "firetext", emoji: "🔥" },
  { cmd: "icecold", emoji: "🧊" },
  { cmd: "rainbowtext", emoji: "🌈" }
];

const handler = async (m, { conn, usedPrefix }) => {
  try {
    let menuBase = `╭━━❰ *✨ MENÚ DE LOGOS & ESTILOS ✨* ❱━━╮\n`;
    menuBase += `┃ Usa: ${usedPrefix}comando texto\n`;
    menuBase += `┃ Ejemplo: *${usedPrefix}glitchtext Santaflow Bot*\n`;
    menuBase += `╰━━━━━━━━━━━━━━━━━━━⬣\n`;
    
    const populares = estilogo.slice(0, 10).map(e => `${e.emoji} ${usedPrefix}${e.cmd}`).join("\n");
    const creativos = estilogo.slice(10, 30).map(e => `${e.emoji} ${usedPrefix}${e.cmd}`).join("\n");
    const especiales = estilogo.slice(30).map(e => `${e.emoji} ${usedPrefix}${e.cmd}`).join("\n");

    await conn.sendMessage(m.chat, {
      text: menuBase,
      footer: "💠 Rin Itoshi - Logos & Estilos",
      templateButtons: [
        { quickReplyButton: { displayText: "🔥 Estilos Populares", id: "populares" } },
        { quickReplyButton: { displayText: "🎨 Estilos Creativos", id: "creativos" } },
        { quickReplyButton: { displayText: "🌈 Estilos Especiales", id: "especiales" } },
        { urlButton: { displayText: "🌐 GitHub", url: "https://github.com/Carlos13ra/SANTAFLOW-BOT13" } },
        { urlButton: { displayText: "✨ Más Estilos", url: "https://ephoto360.com" } },
      ],
      contextInfo: {
        externalAdReply: {
          title: "💠 Menú Logos & Estilos",
          body: "Crea tus logos al instante",
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/355eae35d55e.jpg',
          sourceUrl: 'https://github.com/Carlos13ra/SANTAFLOW-BOT13',
          mediaType: 1,
          renderLargerThumbnail: true,
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { text: `🔥 *Estilos Populares*\n\n${populares}` }, { quoted: m });
    await conn.sendMessage(m.chat, { text: `🎨 *Estilos Creativos*\n\n${creativos}` }, { quoted: m });
    await conn.sendMessage(m.chat, { text: `🌈 *Estilos Especiales*\n\n${especiales}` }, { quoted: m });

  } catch (err) {
    console.error(err);
  }
};

handler.help = ['menulogos'];
handler.tags = ['menus'];
handler.command = ['menulogos', 'logosmenu', 'logostylemenu'];

export default handler;
