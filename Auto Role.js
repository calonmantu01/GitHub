const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });
const fs = require('fs');

client.on('ready', () => {
  console.log('Bot Ready!');
});

client.on('guildMemberAdd', (member) => {
  const role = member.guild.roles.cache.find((role) => role.name === 'New Member');
  if (role) {
    member.roles.add(role);
    console.log(`The New Member role has been assigned to ${member.user.username}.`);
  }
});

client.on('messageCreate', (message) => {
  if (message.content.startsWith('/auto-role')) {
    const args = message.content.split(' ');
    if (args.length === 1) {
      message.reply('Please use the /auto-role <role-name> command to enable auto role.');
    } else {
      const roleName = args[1];
      const role = message.guild.roles.cache.find((role) => role.name === roleName);
      if (role) {
        message.reply(`Role ${roleName} has been activated.`);
      } else {
        message.reply('Role not found.');
      }
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
