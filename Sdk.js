Create an SDK bot script using Node.js and Discord.js. 
   
Here is an example script:

-------------------------------------------------------------------------------------------------

javascript
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });
const fs = require('fs');

client.on('ready', () => {
  console.log('Bot Ready!');
});

client.on('messageCreate', (message) => {
  if (message.content.startsWith('/sdk')) {
    const args = message.content.split(' ');
    if (args.length === 1) {
      message.reply('Please use the /sdk <function> command to access the bot functions.');
    } else {
      const fungsi = args[1];
      switch (fungsi) {
        case 'getuser':
          const user = message.member;
          message.reply(`Username: ${user.username}`);
          break;
        case 'getguild':
          const guild = message.guild;
          message.reply(`Name Guild: ${guild.name}`);
          break;
        default:
          message.reply('Function not found.');
      }
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

-------------------------------------------------------------------------------------------------

However, keep in mind that you'll need to install the discord.js package using npm with the command npm install discord.js to make this script run. To create more complex SDK bots, you can use other technologies like the axios package to access the Discord API.
