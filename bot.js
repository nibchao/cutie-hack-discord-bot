const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES,] });
const token = process.env['token']

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  console.log(message);

  if (message.author.bot) return;

  if (message.content.startsWith("!kick")) {
      const target = message.mentions.users.first();
      if (target === undefined)
      {
        message.channel.send("User not found in the server.");
        return;
      }
      const memberID = message.guild.members.cache.get(target.id);
      if (target) {
        memberID.kick();
        message.channel.send(`${memberID} was kicked.`);
      }
  }
})



// https://en.wiktionary.org/wiki/Category:English_swear_words
const profanity = ["bastard","bullshit","crap","cunt","slut","fuck","shit","bitch","damn","ass","asshole","dumbass", "motherfucker"];


  client.on("messageCreate", async (message) => {
    // 1. console log the message to find out what it is
    console.log(message);

    if (message.author.bot) return;

    // 3. create your own command
    for (var cnt = 0; cnt < profanity.length; cnt++) {
        if (message.content.toLowerCase().includes(profanity[cnt])) {
        await message.member.kick();
        break;
        }
    }
    
  });
  
client.login(token);