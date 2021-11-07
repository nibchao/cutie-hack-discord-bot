const { Client, Intents, Permissions } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES,] });
const token = process.env['token']

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  console.log(message);

  if (message.author.bot) return;

  if (message.content.startsWith("!kick"))
  { 
    if (message.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS]))
    {
        const target = message.mentions.users.first();
        const reason = message.content.split(' ').splice(2);
        if (target === undefined)
        {
          message.channel.send("User not found in the server. Command format is !kick @<user> [optional reason].");
          return;
        }
        const memberID = message.guild.members.cache.get(target.id);
        if (target && reason == '') {
        memberID.kick();
        message.channel.send(`${memberID} was kicked.`);
        }
        else
        {
          memberID.kick();
          message.channel.send(`${memberID} was kicked for ${reason}.`);
        }
    }
    else
    {
      message.channel.send(`<@${message.member.id}>, you do not have permission to use this command.`);
    }
    
  }
})

// https://en.wiktionary.org/wiki/Category:English_swear_words
const profanity = ["bastard","bullshit","cunt","slut","fuck","shit","bitch", "motherfucker"];

  client.on("messageCreate", async (message) => {
    console.log(message);

    const user = message.author;

    if (message.author.bot) return;

    for (var cnt = 0; cnt < profanity.length; cnt++) {
        if (message.content.toLowerCase().includes(profanity[cnt])) {
        await message.member.kick();
        message.channel.send(`${message.guild.members.cache.get(user.id)} was kicked for minor profanity.`);
        break;
        }
    }
    
  });
  
client.login(token);