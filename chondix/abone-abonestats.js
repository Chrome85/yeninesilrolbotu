const Discord = require(`discord.js`);
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  id = message.author.id
  var selector = null
  const fetchdata = db.fetch(`coin_${id}_${message.guild.id}`)
  if(fetchdata == null) {
    selector = "0"
  } else {
    selector = fetchdata
  }

  if(!message.member.roles.cache.has(db.fetch(`aboneyetkilisi_${message.guild.id}`))) {
    return message.channel.send(`Bu Komutu Kullanabilmek İçin ${ayarlar.sistem} Yetkilisi Rolüne Sahip Olman Gerekir!`)
  }
    let kişi = message.mentions.users.first()
if(!args[0]) {
    const abonestats = await db.fetch(`aboneistatistik${message.author.id}.${message.guild.id}`)
    const statscoin1 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`**${message.author} İsimli Yetkilinin Toplam Kayıtı**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Toplam \`${abonestats ? abonestats : '0'}\` ${ayarlar.sistem} Rolü Vermişsin.**
    **${selector} Coini Mevcut!**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(statscoin1)}
if(kişi) {
    const abonestats2 = await db.fetch(`aboneistatistik${kişi.id}.${message.guild.id}`)
    const statscoin = new Discord.MessageEmbed()
    .setAuthor(kişi.username, kişi.avatarURL)
    .setThumbnail(message.mentions.users.first().avatarURL())
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`**Yetkilinin Bilgileri**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Toplam \`${abonestats2 ? abonestats2 : '0'}\` Abone Rolü Vermiş.**
    ${selector} Coini Mevcut!
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(statscoin)}  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["abone-istatistik","abone-stats","abonestats"],
 permLevel: 0,
};
exports.help = {
 name: 'aboneistatistik'
};