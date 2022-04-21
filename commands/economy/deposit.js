const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "deposit",
        aliases: ["dep"],
        category: "economy",
        description: "[ $ ] Deposit Uang ke dalam Bank",
        usage: "<amount>",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {

        let user = message.author;

        let member = db.fetch(`money_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${user.id}`)

            let embedbank = new MessageEmbed()
                .setColor('GREEN')
                .setDescription("**ERROR-CMD;** _Anda tidak punya Uang untuk Deposit_")

            if (!money) return message.channel.send(embedbank)

            db.subtract(`money_${user.id}`, money)
            db.add(`bank_${user.id}`, money)
            let sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-CMD:** _Anda telah Menyetor Semua Coin Anda ke Bank_`);
            message.channel.send(sembed)

        } else {

            let embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** _Tentukan Jumlah untuk Deposit_`);

            if (!args[0]) {
                return message.channel.send(embed2)
                    .catch(err => message.channel.send(err.message))
            }
            let embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** Jumlah yang Anda Masukkan bukan Angka!`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            
            }
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** Anda Tidak dapat Menyetorkan Uang Negatif`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD** Anda Tidak Memiliki Banyak Uang`);

            if (member < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-LOG** Anda telah Deposit ${args[0]} coins ke Bank Anda`);

            message.channel.send(embed5)
            db.subtract(`money_${user.id}`, args[0])
            db.add(`bank_${user.id}`, args[0])

        }
    }
}