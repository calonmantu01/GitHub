javascript
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });
const fs = require('fs');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

client.on('ready', () => {
  console.log('Bot Ready!.');
});

client.on('messageCreate', (message) => {
  if (message.content.startsWith('/boombox')) {
    const args = message.content.split(' ');
    if (args.length === 1) {
      message.reply('Please use the command /boombox <link> to activate Boombox.');
    } else {
      const link = args[1];
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        message.reply('You must be on a voice channel to activate the Boombox.');
      } else {
        const player = createAudioPlayer();
        const resource = createAudioResource(link);
        voiceChannel.join().then((connection) => {
          connection.play(resource);
          player.play(resource);
        });
        message.reply('Boombox has been activated!');
      }
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
