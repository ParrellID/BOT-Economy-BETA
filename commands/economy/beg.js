const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    config: {
        name: "beg",
        noalias: [""],
        category: "economy",
        description: "[ + ] Meminta Uang",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let user = message.author;

        let timeout = 120000;
        let amount = 20;

        let beg = await db.fetch(`beg_${user.id}`);

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** Anda sudah menggunakan Fitur Beberapa Hari ini\nMinta Lagi di ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-CMD:** Anda telah Meminta dan Menerima ${amount} coins`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.add(`begs_${user.id}`, 1)
            db.set(`beg_${user.id}`, Date.now())


        }
    }
};