const fishes = require('../../JSON/fishes.json');
let db = require('quick.db');
const ms = require("parse-ms");
const { randomRange } = require('../../functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'fish',
        aliases: ['catchfish'],
        category: 'economy',
        description: '[ + ] Menangkap Ikan dari Lautan yang Luas',
        usage: '[list | rewards] (optional)',
        acessableby: 'everyone'
    },
    run: async (bot, message, args) => {

        let user = message.author;

        let bal = db.fetch(`money_${user.id}`)

        let fish = await db.fetch(`fish_${user.id}`)
        if (!args[0]) {
            if (bal === null) bal = 0;

            if (fish == null) fish = 0;

            const fishID = Math.floor(Math.random() * 10) + 1;
            let rarity;
            if (fishID < 5) rarity = 'junk';
            else if (fishID < 8) rarity = 'common';
            else if (fishID < 9) rarity = 'uncommon';
            else if (fishID < 10) rarity = 'rare';
            else rarity = 'legendary';
            const fishh = fishes[rarity];
            const worth = randomRange(fishh.min, fishh.max);

            let timeout = 1800000;
            let fishtime = await db.fetch(`fishtime_${user.id}`);

            if (fishtime !== null && timeout - (Date.now() - fishtime) > 0) {
                let time = ms(timeout - (Date.now() - fishtime));

                let timeEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**ERROR-CMD:** \n\nAnda Baru-Baru Ini melakukan Pemancingan\nMemancing lagi dalam ${time.minutes}m ${time.seconds}s `);
                return message.channel.send(timeEmbed)
            }

            let embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`**FISHING-LOG:** 🎣 Anda Menarik Ulur dan Anda Menangkap sebuah ${fishh.symbol}, Saya Yakin itu akan Menjual untuk Harga Sekitar ${worth}!`)
            message.channel.send(embed);

            db.add(`money_${user.id}`, worth);
            db.add(`fish_${user.id}`, 1);
            db.set(`fishtime_${user.id}`, Date.now())
        }
        if (args[0] === 'list' || args[0] === 'rewards') {

            let lEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Daftar Nama Ikan dan Hadiah yang bisa Anda Dapatkan`)
                .setDescription(`
\`\`\`🔧Junk      :: Max Reward: 5, Min Reward: 1
🐟Common    :: Max Reward: 25, Min Reward: 10
🐠Uncommon  :: Max Reward: 50, Min Reward: 18
🦑Rare      :: Max Reward: 75, Min Reward: 30
🐋Legendary :: Max Reward: 100, Min Reward: 50\`\`\`
**Semua Hadiah Acak dari Maks**
​
`)
                .setFooter(message.guild.name, message.guild.iconURL())
            return message.channel.send(lEmbed);
        }
    }
}