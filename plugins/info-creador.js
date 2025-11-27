// by dv.shadow - https://github.com/Yuji-XDev

import { proto } from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { conn }) => {
  const name = 'Carlos | Oficial';
  const numCreador = '51984169553';
  const empresa = 'santaflow Bot Inc.';
  const about = '🥭Desarrollador de Santaflow Bot';
  const correo = 'carlosramirezvillanueva30@gmail.com';
  const web = 'https://shadow-xyz.vercel.app/';
  const direccion = 'Tokyo, Japón 🇯🇵';
  const fotoPerfil = 'https://i.postimg.cc/HLhV1K75/1760212892451.jpg';

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa}
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:${correo}
URL:${web}
NOTE:${about}
ADR:;;${direccion};;;;
X-ABADR:ES
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim();

  const contactMessage = {
    displayName: name,
    vcard
  };
  m.react('🍂');
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [contactMessage]
    },
    contextInfo: {
    mentionedJid: [m.sender],
      externalAdReply: {
        title: '⚡ Contacto del Creador Carlos',
        body: 'Toca aquí para guardar el contacto o hablar con él',
        mediaType: 1,
        thumbnailUrl: fotoPerfil,
        renderLargerThumbnail: true,
        sourceUrl: web
      }
    }
  }, { quoted: fkontak });
};

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['creador', 'creator', 'owner'];
export default handler;
