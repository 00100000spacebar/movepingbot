const { RichEmbed } = require('discord.js');
const { embedColor } = require('../config');
const { noBotPerms } = require('../utils/errors');

exports.run = async (client, message, args) => {
    let perms = message.guild.me.permissions;
    if (!perms.has('EMBED_LINKS')) return noBotPerms(message, 'EMBED_LINKS');

    let user = message.mentions.members.first();
    let gayness = user.id % 2 !== 0 ? 'This person is not gay' : 'This person is very gay';

    if (!user) return message.channel.send('You didn\'t provide me with a user to analyze!');

    const gayEmbed = new RichEmbed()
        .setTitle('Gayness Profile')
        .addField('User', args[0], false)
        .addField('Gayness', gayness, false)
        .setColor(embedColor)
        .setFooter('HmMmMmMmMmMmMm!')
        .setTimestamp();
    
    message.channel.send(gayEmbed);
}

exports.help = {
    name: 'isgay',
    aliases: [],
    description: 'Returns the gayness of a user',
    usage: 'isgay <user>'
};