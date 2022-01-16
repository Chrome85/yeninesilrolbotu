const Discord = require('discord.js');
const db = require('quick.db') 
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')

  if(!db.fetch(`abonerolü_${message.guild.id}`)) return message.channel.send(`Görünüşe Göre ${ayarlar.sistem} Sistemi Zaten Kapalı Ya Da Ayarlanmamış :).`)
   

   message.reply(`${ayarlar.sistem} Sistem Ayarları Sıfırlanıp Başarı İle Kapatılmıştır.`)
db.delete(`abonek_${message.guild.id}`)
db.delete(`abonerolü_${message.guild.id}`)
db.delete(`aboneyetkilisi_${message.guild.id}`) 
db.delete(`rolkanal_${message.guild.id}`) 


}; 


exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: ['abonesistem-kapat','sistemkapat'], 
permLevel: 0
}

exports.help = {
 name: 'abonesistemkapat', 
description: 'kayıt sistemini kapatır',
 usage: 'kayıt-kapat' 
};