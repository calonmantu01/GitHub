
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });
const fs = require('fs');

client.on('ready', () => {
  console.log('Bot Ready!');
});

client.on('messageCreate', (message) => {
  if (message.content.includes('owo')) {
    message.reply('Halo, hai! 😊');
  } else if (message.content.includes('uwu')) {
    message.reply('A, You`re Good! 😊');
  } else if (message.content.includes('o')) {
    message.reply('O, You`re Cool! 😎');
  } else if (message.content.includes('p')) {
    message.reply('P, You`re Smart! 🤓');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
