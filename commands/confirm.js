const { RichEmbed } = require('discord.js');
const players = require('../players.json');
const { embedColor } = require('../config');
const { noBotPerms } = require('../utils/errors');

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('EMBED_LINKS')) return noBotPerms(message, 'EMBED_LINKS');

    const confirmEmbed = new RichEmbed()
        .setTitle('Move Confirmed!')
        .setDescription('Time to pingus pongus the next nerd')
        .setFooter('Cade needs Polaris')
        .setTimestamp()
        .setColor(embedColor);

    if (message.author.id !== players.playerArr[players.position]) {
        return message.channel.send('It ain\'t your turn, chief!');
    
    } else {
        message.channel.send(confirmEmbed);

        players.position += 1;
        const tempPos = players.position;

        message.channel.send(`Hey there <@!${players.playerArr[players.position]}>! It's your turn!`);
        // pingus pongus
        var pings = 0;
        const interval = setInterval(() => {
            switch (pings) {
                case 0:
                    message.channel.send(`Hey there <@${players.playerArr[players.position]}>! It's been 12 hours since your last move! Please move!`);
                    pings++;
                    break;
                case 1:
                    message.channel.send(`Please hurry up and move <@!${players.playerArr[players.position]}>! A day has passed since your last move.`);
                    pings++;
                    break;
                default:
                    message.channel.send(`<@!${players.playerArr[players.position]}>, It's been over a day since your last move. Please hurry up and move >:(`);
            }
            // reset for new person
            if (players.position !== tempPos) {
                clearInterval(interval);
                pings = 0;
            }
        }, 43200000);
    }
};

exports.help = {
    name: 'confirm',
    aliases: ['c'],
    description: 'Confirms yer move ya naughty cowboy',
    usage: 'confirm'
};