const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    config: {
        name: "daily",
        aliases: ["day"],
        category: "economy",
        description: "[ + ] Memberi Daily 25 Coin perhari",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let user = message.author;

        let timeout = 86400000;
        let amount = 25;

        let daily = await db.fetch(`daily_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** _Anda telah Mengambil Hadiah Harian Anda\nDapatkan lagi di ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-BUY:** _Anda telah Mengumpulkan Hadiah Harian Sebesar ${amount} coins_`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())


        }
    }
}
