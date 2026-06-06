AI bot script using Node.js and Discord.js. 

Here's an example script:

-----------------------------------------------------------------------------------------------

javascript
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });
const fs = require('fs');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

client.on('ready', () => {
  console.log('Bot Ready!');
});

client.on('messageCreate', (message) => {
  if (message.content.startsWith('/ai')) {
    const args = message.content.split(' ');
    if (args.length === 1) {
      message.reply('Please use the /ai <question> command to get an answer from AI.');
    } else {
      const pertanyaan = args.slice(1).join(' ');
      const jawaban = getJawaban(pertanyaan);
      message.reply(jawaban);
    }
  }
});

function getJawaban(pertanyaan) {
  const tokenizer = new natural.WordTokenizer();
  const kataKunci = tokenizer.tokenize(pertanyaan);
  const jawaban = 'Answer from AI : ' + kataKunci.join(' ');
  return jawaban;
}

client.login(process.env.DISCORD_BOT_TOKEN);

-----------------------------------------------------------------------------------------------

However, keep in mind that you need to install the natural package using npm with the command npm install natural to make this script run.

To create smarter AI, you can use NLP (Natural Language Processing) technologies like the bert or transformers packages, which you can install using npm with the commands npm install bert or npm install transformers.
