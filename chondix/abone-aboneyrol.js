const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')

  let aboneyetkilisi = message.mentions.roles.first()
  if (!aboneyetkilisi) return message.channel.send(`Lütfen ${ayarlar.sistem} Yetkili rolünü etiketlermisin?`)
   
  db.set(`aboneyetkilisi_${message.guild.id}`, aboneyetkilisi.id)
  message.channel.send(`${ayarlar.sistem} Yetkili Rolü Başarıyla Ayarlandı; **${aboneyetkilisi}**`)
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['aboneyrol','abone-y-rol'],
 permLevel: 0,
  kategori:"yetkili"
};

exports.help = {
 name: 'aboneyrol',
 description: 'kayıt Olunca Verilecek rolü ayarlarsınız',
 usage: 'kayıt-rol <@rol>'
};