/// -- || BAŞLANGIÇ  || -- //
const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');
exports.run = async(client, message, args) => {

//abonerol
let aboneroll = db.get(`abonerolü_${message.guild.id}`)

let abonerol1
if(!aboneroll) {
    abonerol1 = "**Ayarlanmamış <a:kapali:927269429761425458>**"
} else {
    abonerol1 = `**<a:onay:927269137909153802> <@&${aboneroll}>**`
}

//aboneyetkilisi
let aboneytk = db.get(`aboneyetkilisi_${message.guild.id}`)

let aboneytkrol
if(!aboneytk) {
    aboneytkrol = "**Ayarlanmamış <a:kapali:927269429761425458>**"
} else {
    aboneytkrol = `**<a:onay:927269137909153802> <@&${aboneytk}>**`
}

//abone kanal
let abonekanal = db.get(`rolkanal_${message.guild.id}`)

let abonekanal1
if(!abonekanal) {
  abonekanal1 = "**Ayarlanmamış <a:kapali:927269429761425458>**"
} else {
  abonekanal1 = `**<a:onay:927269137909153802> <#${abonekanal}>**`
}


const ayars = new Discord.MessageEmbed()
.addField(`${message.guild.name} Rol Ayarları:`,
`
${ayarlar.sistem} Rolü: ${abonerol1}
${ayarlar.sistem} Yetkilisi Rolü : ${aboneytkrol}
${ayarlar.sistem} Kanal : ${abonekanal1}
`)
message.channel.send(ayars);
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 1 
};

exports.help = {
  name: "ayarlar", 
  description: "", 
  usage: "" 
};

