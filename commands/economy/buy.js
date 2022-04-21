const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { PREFIX } = require('../../config');

module.exports = {
    config: {
        name: "buy",
        noalias: [""],
        category: "economy",
        description: "[ $ ] Membeli Item",
        usage: "[item]",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let user = message.author;

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
      
        let author = db.fetch(`money_${user.id}`)

        let Embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**INFO-CMD:** _Anda Membutuhkan 450 Coin untuk Membeli Bronze VIP_`);


        if (args.join(' ').toLocaleLowerCase() == 'bronze') {
            if (author < 450) return message.channel.send(Embed)

            await db.fetch(`bronze_${user.id}`);
            db.set(`bronze_${user.id}`, true)

            let Embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-BUY:** _Membeli Bronze VIP dengan 450 Coin_`);

            db.subtract(`money_${user.id}`, 200)
            message.channel.send(Embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let Embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** _Anda Membutuhkan 600 Coin untuk Membeli Beberapa Nikes`);

            if (author < 600) return message.channel.send(Embed3)

            await db.fetch(`nikes_${user.id}`)
            db.add(`nikes_${user.id}`, 1)

            let Embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-BUY** _Membeli Nikes Fresh seharga 600 Coin_`);

            db.subtract(`money_${user.id}`, 600)
            message.channel.send(Embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let Embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD:** _Anda Membutuhkan 800 Coin untuk Membeli Mobil Baru_`);

            if (author < 800) return message.channel.send(Embed5)

            await db.fetch(`car_${user.id}`)
            db.add(`car_${user.id}`, 1)

            let Embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-BUY:** _Membeli Mobil Baru seharga 800 Coin_`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 800)
            message.channel.send(Embed6)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let Embed7 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**ERROR-CMD** _Anda Membutuhkan 1200 Coin untuk Membeli Mansion_`);

            if (author < 1200) return message.channel.send(Embed7)

            await db.fetch(`house_${user.id}`)
            db.add(`house_${user.id}`, 1)

            let Embed8 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**SUCCES-BUY:** _Membeli Mansion seharga 1200 Coin_`);

            db.subtract(`money_${user.id}`, 1200)
            message.channel.send(Embed8)
        } else {
            if (message.content.toLowerCase() === `${prefix}buy`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**ERROR-CMD:**\n\nMasukkan Nama Item untuk Membeli!\nKetik ${prefix}store untuk Melihat Item!`)
                return message.channel.send(embed9)
            }
        }
    }
}