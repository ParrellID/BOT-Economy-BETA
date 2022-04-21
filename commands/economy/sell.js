const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { PREFIX } = require('../../config')

module.exports = {
    config: {
        name: "sell",
        noalias: [""],
        category: "economy",
        description: "[ - ] Menjual Barang ke Seseorang",
        usage: "[mention | ID] <amount>",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
        let user = message.author;

        if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let embed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** Anda tidak memiliki Nikes untuk Dijual`);

            let nikees = await db.fetch(`nikes_${user.id}`)

            if (nikees < 1) return message.channel.send(embed1)

            db.fetch(`nikes_${user.id}`)
            db.subtract(`nikes_${user.id}`, 1)

            let embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-SELL:** Berhasil Menjual Nikes seharga 700 Coins`);

            db.add(`money_${user.id}`, 700)
            message.channel.send(embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** Anda tidak memiliki Mobil untuk Dijual`);

            let cars = await db.fetch(`car_${user.id}`)

            if (cars < 1) return message.channel.send(embed3)

            db.fetch(`car_${user.id}`)
            db.subtract(`car_${user.id}`, 1)

            let embed4= new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-SELL:** Menjual Mobil seharga 800 Koin`);

            db.add(`money_${user.id}`, 800)
            message.channel.send(embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** Berhasil Anda tidak memiliki Mansion untuk Dijual`);

            let houses = await db.fetch(`house_${user.id}`)

            if (houses < 1) return message.channel.send(sembed2)

            db.fetch(`house_${user.id}`)
            db.subtract(`house_${user.id}`, 1)

            let sembed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-SELL:** Berhasil Menjual Mansion seharga 1200 Koin`);

            db.add(`money_${user.id}`, 1200)
            message.channel.send(sembed3)
        } else {
            if (message.content.toLowerCase() === `${prefix}sell`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**INFO-SELLING:** Masukkan Item untuk Dijual. Ketik _${prefix}store_ untuk Melihat Daftar Barang`)
                return message.channel.send(embed9)
            } else {
              return message.channel.send("**ERROR-CMD:** Item tidak Valid!")
            }
        }
    }
}