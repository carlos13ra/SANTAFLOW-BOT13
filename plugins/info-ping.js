import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
    let timestamp = speed();
    let latensi = speed() - timestamp;

    exec(`neofetch --stdout`, (error, stdout, stderr) => {
        let child = stdout.toString("utf-8");
        let ssd = child.replace(/Memory:/, "Ram:");

        conn.reply(m.chat, `┏━❖『 ⚡ 𝐄𝐒𝐓𝐀𝐃𝐎 𝐎𝐍𝐋𝐈𝐍𝐄 』❖━┓
┃ 🖤 *Sistema activo y estable.*
┃ ⚡ 𝐓𝐢𝐞𝐦𝐩𝐨: ${latensi.toFixed(4)}ms
┃ ❝  *! Pong ¡*❞
┗━━━━━━━━━━━━━━━━━━━┛`, m);
    });
};

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler
