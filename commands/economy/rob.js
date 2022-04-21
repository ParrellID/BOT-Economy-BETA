const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  config: {
    name: "rob",
    noalias: [""],
    category: "economy",
    description: "[ + ] Merampok Uang User",
    usage: "[username | nickname | mention | ID]",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send("**ERROR-CMD:** Masukkan Nama Pengguna / Tag User")  
    let user2 = message.author

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
    if (!user) return message.channel.send("**ERROR-CMD:** Masukkan User yang Valid")

    let embed2 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`**ERROR-CMD:** Anda tidak bisa Merampok pada Diri Sendiri`)

    if (user.user.id === message.author.id) {
      return message.channel.send(embed2)
    }

    let targetuser = await db.fetch(`money_${user.id}`)
    let author = await db.fetch(`rob_${user.id}`)
    let author2 = await db.fetch(`money_${user2.id}`)

    let timeout = 600000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      let timeEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**ROBBER-INFO:**\n\nAnda telah Merampok Seseorang\nCoba Lagi pada ${time.minutes}m ${time.seconds}s `);
      message.channel.send(timeEmbed)
    } else {

      let moneyEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**ROBBER-LOGS:** Anda membutuhkan Setidaknya 100 Coins di Dompet Anda untuk Merampok Seseorang`);

      if (author2 < 100) {
        return message.channel.send(moneyEmbed)

      }
      let moneyEmbed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**ROBBER-ERROR:** ${user.user.username} tidak Memiliki apa pun yang dapat Anda Rampok`);

      let random = Math.floor((Math.random() * 100)) + 1;

      if (targetuser < random) {
        return message.channel.send(moneyEmbed2)
      } else {

        let embed = new MessageEmbed()
          .setDescription(`**ROBBER-SUCCES:** Kamu telah Berhasil Merampok ${user.user.username} dan Mendapatkan ${random} coins`)
          .setColor("GREEN")
        message.channel.send(embed)

        db.subtract(`money_${user.id}`, random)
        db.add(`money_${user2.id}`, random)
        db.set(`rob_${user.id}`, Date.now())

      }
    };
  }
} 