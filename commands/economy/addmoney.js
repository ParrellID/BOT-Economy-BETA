const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "addmoney",
        aliases: ["am"],
        category: "economy",
        description: "[ + ] Menambahkan Uang di Akun Anda",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**ERROR:** _Anda tidak memiliki Izin untuk Menambahkan Uang!_ - [ADMINISTRATOR]");
        if (!args[0]) return message.channel.send("**HELP-CMD:** _Tag User untuk Lebih Lanjut!_")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**ERROR-CMD:** _Masukkan User yang Valid untuk Lebih Lanjut!_")
        if (!args[1]) return message.channel.send("**HELP-CMD:** _Masukkan Jumlah untuk Menambahkan Uang!_")
        if (isNaN(args[1])) return message.channel.send(`**ERROR-CMD** _Jumlah yang Anda Masukkan Invalid!_`);
        if (args[0] > 10000) return message.channel.send("**ERROR-CMD:** _Tidak Dapat Menambahkan Jumlah Sebanyak Itu!_")
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**ADD-MONEY**\n\n☑️: Succesfully Added ${args[1]} FARxCOIN\n💰: New Balance ${bal}`);
        message.channel.send(moneyEmbed)

    }
}