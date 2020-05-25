const { owner } = require('../config');
const players = require('../players.json');
const { noBotPerms } = require('../utils/errors');

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('SEND_MESSAGES')) return noBotPerms(message, 'SEND_MESSAGES');
    if (message.author.id !== owner) return message.channel.send('Woah there buddy, you\'re not allowed to do that!');

    players.position = parseInt(args[0]);
    message.channel.send(`Position has been set to ${args[0]}`);
};

exports.help = {
    name: 'setposition',
    aliases: ['sp'],
    description: 'For the owner to set the position of the current nerd',
    usage: 'setposition <position>'
};