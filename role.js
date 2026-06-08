const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });
const fs = require('fs');

client.on('ready', () => {
  console.log('Bot Ready!');
});

client.on('guildMemberJoin', (member) => {
  const role = member.guild.roles.cache.find((role) => role.name === 'New Member');
  if (role) {
    member.roles.add(role);
    console.log(`The New Member role has been assigned to ${member.user.username}.`);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
