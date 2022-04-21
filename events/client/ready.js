const { PREFIX } = require('../../config');
module.exports = async bot => {
    console.log(`${bot.user.username} is available now!`)
    bot.user.setActivity("??help  | SG op", { type: "PLAYING", url: "https://www.youtube.com/channel/UCbnq-vcOL9-qBhhmJyY3mUg"});
};