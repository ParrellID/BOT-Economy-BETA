const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  config: {
    name: "pay",
    noalias: [""],
    category: "economy",
    description: "[ $ ] Memberi Uang ke Seseorang",
    usage: "[mention | ID] <amount>",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
try {
  let user2 = message.author
    if (!args[0]) return message.channel.send("**HELP-CMD:** Silahkan Tag User");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!user) return message.channel.send("**ERROR-CMD:** Masukkan User yang Valid");

    let member = db.fetch(`money_${user2.id}`);

    let embed1 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`**ERROR-CMD:** TAG User untuk Melanjutkan!`);

    if (!args[0]) {
      return message.channel.send(embed1);
    }
    let embed2 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`**ERROR-CMD:** Anda Tidak Dapat Memberikan uang ke Diri Sendiri`);

    if (user.user.id === message.author.id) {
      return message.channel.send(embed2);
    }

    let embed3 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`**ERROR-CMD:** Tentukan Jumlah yang harus Diberikan`);

    if (!args[1]) {
      return message.channel.send(embed3);
    }
    let embed4 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`**ERROR-CMD:** Masukkan Jumlah yang Valid!`);

    if (isNaN(args[1])) {
      return message.channel.send(embed4);
    }
    let embed5 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`**ERROR-CMD:** Kamu tidak punya Uang Sebanyak itu`);

    if (member < args[1]) {
      return message.channel.send(embed5);
    }

    let embed6 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`**SUCCES-SEND:** Anda telah Memberikan ${user.displayName} ${args[1]} coins`);

    message.channel.send(embed6);
    db.add(`money_${user.id}`, args[1]);
    db.subtract(`money_${user2.id}`, args[1]);
    } catch {
        
    }
  }
};
