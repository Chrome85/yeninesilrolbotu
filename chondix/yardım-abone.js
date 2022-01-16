const discord = require("discord.js")
exports.run = async(client,message,args) => {
const embed = new discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(`${message.author.username} Tarafından istendi`,message.author.avatarURL({dynamic: true}))
.setTitle(`Sunucu Kur yardım menüsü`)
.addFields(
    {name:`> .abone-rol`,value: `Abone Rolünü Ayarlarsınız.`},
    {name:`> .abonestats `,value:`Etiketlediğiniz kişinin veya kendinizin istatistiklerine bakarsınız.`},
    {name:`> .abonesayısını-sıfırla `,value:`Etiketlediğiniz kişinin abone istatistiklerini sıfırlarsınız.`},
    {name:`> .aboneyrol`,value:`Abone Yetkili Rolünü Ayarlarsınız.`},
    {name:`> .a`,value:`Abone Rolü Verirsiniz.`},
    {name:`> .ayarlar`,value:`Abone Sistemi Ayarlarını Görürsünüz.`},
    {value: '------------------------------------------------------'},
    {value:'Coin Sistemi'},
    {name:`> .coin`,value: `Coin ini görürsün`},
{name:`> .coin-ekle`,value:`Coin Eklersiniz`},
{name:`> .coin-rol`,value:`Coin İle attlanacak Rol Ayarlarsınız`},
{name:`> .coin-sil`,value:`Coin Siler`},
{name:`> .coin-set`,value:`Coin Sistemini Açıp Kapatılır`}
)
.setFooter(`Chondix`,client.user.avatarURL({dynamic:true}))
.setTimestamp()

return message.channel.send(embed)
}
exports.conf = {
    aliases:[]
}
exports.help = {
    name: "abone"
}
