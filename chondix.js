const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const ayarlar = require("./ayarlar.json");
var prefix = ayarlar.prefix;
const express = require("express");
const app = express();
const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./chondix/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./chondix/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./chondix/${command}`)];
      let cmd = require(`./chondix/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./chondix/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./chondix/${command}`)];
      let cmd = require(`./chondix/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`${client.user.tag}! Aktif!`);
});
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === process.env.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
////-----------------------------\\\\\\\\\

//coin
const quick = require('quick.db')
client.on("message", async(message) => {
  if (message.author.bot) return;
 if (!message.guild) return;
 const ayarfetch = quick.fetch(`coinsistem_${message.guild.id}`)
 if(ayarfetch == true) {
  if(message.content.toLowerCase().startsWith('.saa')){
    quick.add(`coin_${message.author.id}_${message.guild.id}`, 2)
   }
   const fetch = quick.fetch(`coin_${message.author.id}_${message.guild.id}`)
   const objfetch = quick.fetch(`objcoin_${message.guild.id}`)
   if(objfetch !== null) {
    var res = objfetch.filter(obj => {
      return fetch >= obj.kacCoinLazim
     })
     if(res.length > 0) {
       try{
         for (let index = 0; index < res.length; index++) {
       await message.member.roles.add(res[index].rolID)            
         }
       } catch(e) {
         console.log(e)
       }
     }
   }
 }
})

//MİSSİNG HATASI İÇİN!!
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})

client.on("userUpdate", async(oldUser, newUser) => {//hamzamertakbaba#3361
  if(!oldUser.guild) return;
  let rol = "830078707161890821";
  let etiket = "discord"; //#'siz yazın.
  if(oldUser.presence == newUser.presence) return;
  if(oldUser.presence == etiket && newUser.presence !== etiket) {
  client.guilds.cache.get(newUser.guild.id).members.cache.get(newUser.id).roles.remove(rol);
  }
  if(newUser.presence == etiket) {
  client.guilds.cache.get(newUser.guild.id).members.cache.get(newUser.id).roles.add(rol);
  }
  });