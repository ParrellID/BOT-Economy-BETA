const { MessageEmbed }= require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "removemoney",
        aliases: ["rm"],
        category: "economy",
        description: "[ ! ] Menghapus Uang dari Pengguna",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_GUILD")) return message.channel.send("❌ You do not have permissions to remove money!");
        if (!args[0]) return message.channel.send("**INFO-CMD:** Silakan Tag User!")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**INFO-CMD:** Masukkan User yang Valid")

        if (!args[1]) return message.channel.send("**INFO-CMD:** Silakan Masukkan Jumlah!")
        if (isNaN(args[1])) return message.channel.send("**INFO-CMD:** Masukkan Jumlah yang Valid!");
        let bal = await db.fetch(`money_${user.id}`)

        if (args[0] > bal) return message.channel.send("**Cannot Remove That Much Money!**")
        db.subtract(`money_${user.id}`, args[1])
        let bal2 = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Removed ${args[1]} coins\n\nNew Balance: ${bal2}`);
        message.channel.send(moneyEmbed)

    }
}