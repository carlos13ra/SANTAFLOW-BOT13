let handler = async (m, { conn, usedPrefix, command, args }) => {
  let chat = global.db.data.chats[m.chat];
  if (!(m.chat in global.db.data.chats)) {
    return conn.reply(m.chat, `✧ *𝐄𝐒𝐓𝐄 𝐓𝐄𝐑𝐑𝐄𝐍𝐎 𝐀Ú𝐍 𝐍𝐎 𝐄𝐒 𝐃𝐄 𝐑𝐈𝐍 𝐈𝐓𝐎𝐒𝐇𝐈...* ⚽`, m);
  }

  if (command === 'bot') {
    if (args.length === 0) {
      const estado = chat.isBanned ? '✘ 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎' : '✔ 𝐀𝐂𝐓𝐈𝐕𝐎';
      const info = `▰▰▰〔 ✧ 𝑪𝑶𝑵𝑻𝑹𝑶𝑳 : 𝑹𝑰𝑵 𝑰𝑻𝑶𝑺𝑯𝑰 ✧ 〕▰▰▰
▣ Solo los directores pueden gestionar a Rin.

➤ 〔 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 〕
 ⇢  ⌬ ${usedPrefix}bot on   | ➜ Activar
 ⇢  ⌬ ${usedPrefix}bot off   | ➜ Desactivar

➤ 〔 𝑬𝑺𝑻𝑨𝑫𝑶 〕
 ⇢  ⌬ Estado Actual ➜ \`${estado}\`

▰▰▰〔 ✧ 𝑴𝑨𝑬𝑺𝑻𝑹𝑶 𝑫𝑬𝑳 𝑱𝑼𝑬𝑮𝑶 ✧ 〕▰▰▰`;
      return conn.reply(m.chat, info, fkontak, rcanal);
    }

    if (args[0] === 'off') {
      if (chat.isBanned) {
        return conn.reply(m.chat, `🔕 *𝐒𝐚𝐧𝐭𝐚𝐟𝐥𝐨𝐰 𝐞𝐬𝐭𝐚𝐛𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨...*`, m, fake);
      }
      chat.isBanned = true;
      return conn.reply(m.chat, `🛑 *𝐒𝐚𝐧𝐭𝐚𝐟𝐥𝐨𝐰 𝐬𝐞 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐨...*`, m, fake);
    } else if (args[0] === 'on') {
      if (!chat.isBanned) {
        return conn.reply(m.chat, `✔ *𝐒𝐚𝐧𝐭𝐚𝐟𝐥𝐨𝐰 𝐲𝐚 𝐞𝐬𝐭𝐚𝐛𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨.*`, m, fake);
      }
      chat.isBanned = false;
      return conn.reply(m.chat, `⚡ *𝐒𝐚𝐧𝐭𝐚𝐟𝐥𝐨𝐰 𝐯𝐮𝐞𝐥𝐯𝐞 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐬𝐞.*`, m, fake);
    }
  }
};

handler.help = ['bot'];
handler.tags = ['grupo'];
handler.command = ['bot'];
handler.admin = true;

export default handler;
