const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
  const quick = require('quick.db');
  const ayarlar = require('../ayarlar.json');

  let data = await db.fetch(`abonerolü_${message.guild.id}`)
if(!data)  return message.channel.send(`${ayarlar.sistem} rolünü bulamadım.`)
let data2 = await db.fetch(`aboneyetkilisi_${message.guild.id}`)
if(!data2)  return message.channel.send(`${ayarlar.sistem} yetkilisi rolünü bulamadım.`)
let data3 = await db.fetch(`rolkanal_${message.guild.id}`)
if(!data3)  return message.channel.send(`${ayarlar.sistem} kanalını bulamadım.`)
let rol = message.guild.roles.cache.get(data)
if(!rol) return message.channel.send(`${ayarlar.sistem} rolü ayarlı değil.`)
let yetkili = message.guild.roles.cache.get(data2)
if(!yetkili) return message.channel.send(`${ayarlar.sistem} yetkilisi ayarlı değil.`)
let kanal = message.guild.channels.cache.get(data3)
if(!kanal) return message.channel.send(`${ayarlar.sistem} kanalı ayarlı değil.`)

 if(!message.member.roles.cache.has(db.fetch(`aboneyetkilisi_${message.guild.id}`))) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
 }

 let rolkanal = await db.fetch(`rolkanal_${message.guild.id}`)
 if (message.channel.id !== rolkanal) return message.channel.send(`Bu komutu sadece <#${rolkanal}> kanalında kullanabilirsin.`).then(m => m.delete({timeout: 10000}))
if (message.channel.id == rolkanal) {
  let user = message.mentions.members.first()
   if (!user) return message.channel.send('Kime Rol Verceğimi Yazmadın!').catch(console.error);
   if (user.roles.cache.has(db.fetch(`abonerolü_${message.guild.id}`))) return message.channel.send("Bu Kullanıcıda Zaten Abone Rolü Var!")
  user.roles.add(db.fetch(`abonerolü_${message.guild.id}`))

  const embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTimestamp()
  .setFooter(`Chondix ${ayarlar.sistem} Sistemi`)
  .setDescription(`**${ayarlar.sistem} Rolü Verildi!**`)
  .addField(`${ayarlar.sistem} Rolü Alan Kullanıcı;`, `${user}`,true)
  .addField(`${ayarlar.sistem} Rolü Veren Yetkili;`,`${message.author}`,true)
  .setDescription(`**${message.author} Kişisine başarıyla 1 Coin Ekledim!**`)
  message.channel.send(embed)
  db.add(`aboneistatistik${message.author.id}.${message.guild.id}`, 1)
  quick.add(`coin_${message.author.id}_${message.guild.id}`, 1)
  const ms = require("ms")
setTimeout(() => {
user.roles.remove(db.fetch(`abonerolü_${message.guild.id}`))
}, ms("14d")) //second minute day hour

}

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['abone','onay','onayla','a']
};

exports.help = {
  name: "a",
  description: "31!",
  usage: "abone"
};