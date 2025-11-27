let handler = async (m, { conn }) => {
  try {
    // Lista de videos
    let videos = [
      "https://shadow-xyz.vercel.app/videos/shadow1.mp4",
      "https://shadow-xyz.vercel.app/videos/shadow2.mp4"
    ];

    // Escoge uno aleatorio
    let videoUrl = videos[Math.floor(Math.random() * videos.length)];

    // Texto del mensaje
    let caption = `> ${club || "🔥 Shadow_Xyz 🔥"}`.trim();

    // Envía el video
    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: caption,
      gifPlayback: false // true para GIF
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Error al enviar el video.");
  }
};

handler.command = ['xd']; 
handler.help = ['xd'];
handler.tags = ['anime'];

export default handler;