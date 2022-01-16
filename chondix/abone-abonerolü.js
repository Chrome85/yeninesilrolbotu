const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')

  let abonerol = message.mentions.roles.first()
  if (!abonerol) return message.channel.send(`Lütfen ${ayarlar.sistem} rolünü etiketlermisin?`)
   
  db.set(`abonerolü_${message.guild.id}`, abonerol.id)
  message.channel.send(`${ayarlar.sistem} Rolü Başarıyla Ayarlandı; **${abonerol}**`)
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['abonerol'],
 permLevel: 0,
  kategori:"yetkili"
};

exports.help = {
 name: 'abonerol',
 description: 'kayıt Olunca Verilecek rolü ayarlarsınız',
 usage: 'kayıt-rol <@rol>'
};