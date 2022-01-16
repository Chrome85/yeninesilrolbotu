const discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')

    let kanal = message.mentions.channels.first();
    let rolkanal = await db.fetch(`rolkanal${message.guild.id}`)

    if (!args[0]) return message.channel.send(new discord.MessageEmbed()                                          
    .setTitle("Hata!")
    .setDescription("Kullanım: .abonekanal ayarla #kanal \nSıfırlamak İçin: .abonekanal sıfırla") //bu kısmı sisteme göre değişin
    .setColor("BLUE")
    .setFooter( "Krom Code Sunar...", client.user.avatarURL()));

if(args[0] == "ayarla") {
    if (!kanal) return message.channel.send("**Lütfen bir kanalı etiketleyip tekrar deneyin.**")
    db.set(`rolkanal_${message.guild.id}`, kanal.id)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setDescription(`${ayarlar.sistem} Rolü Kanalı Ayarlandı!`)
    .setColor("BLUE")
    .setFooter( "Krom Code Sunar...", client.user.avatarURL()))

}

if(args[0] == "sıfırla") {
    db.delete(`rolkanal_${message.guild.id}`)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setDescription(`${ayarlar.sistem} Rolü Kanalı Sıfırlandı.`)
    .setColor("BLUE")
    .setFooter( "Krom Code Sunar...", client.user.avatarURL()))
}    

};
exports.conf = {
  enabled: true,
  guildOnly: true, //Bu sadece sunucularda kullanılabilir ayarıdır true yazarsanız dm de kullanamazsınız false yazarsanız kullanabilirsiniz
  aliases: ["rolkanal"],
  permLevel: 0,
};

exports.help = {
  name: 'abonekanal',
  description: 'komut açıklama',
  usage: ''
};