//SLAPPEY WAS USED TO MAKE THIS COMMAND
//npm i slappey
//Slappey is a discord.js project helper which makes file for you( NO CODING PART AFFECTED )
//https://www.npmjs.com/package/slappey
//just paste all these codes below line 1 ( const BaseCommand = require('../../utils/structures/BaseCommand'); )

//CONTACT: Somanjit.js#5196    FOR HELP

const Discord = require('discord.js');

module.exports = class ApplicationCommand extends BaseCommand {
  constructor() {
    super('application', 'misc', []);
  }

  async run(client, message, args) {
    const questions = [
      "YOUR QUESTION: ",
      "YOUR QUESTION: ",
      "YOUR QUESTION: ",
      "YOUR QUESTION: ",
      "YOUR QUESTION: ",
    ];

    let collectCounter = 0;
    let endCounter = 0;

    const filter = (m) => m.author.id === message.author.id;

    const appStart = await message.author.send(questions[collectCounter++]);
    const channel = appStart.channel;

    const collector = channel.createMessageCollector(filter);

    collector.on("collect", () => {
      if(collectCounter < questions.length) {
        channel.send(questions[collectCounter++])
      } else {
        channel.send("**YOUR APPLICATION IS SUBMITTED**");
        collector.stop("Application completed");
      }
    });
        //ENTER YOUR CHANNEL ID WHERE THE APPLICATION SUBMISSION IS TO BE SENT, THE COMMAND CAN'T BE RUN WITHOUT IT
     const appChannel = client.channels.cache.get('CHANNEL_ID');
    collector.on("end", (collected, reason) => {
      if(reason === 'Application completed') {
        let index = 1;
        const mappedResponses = collected
        .map((msg) => {
          return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`;
        })
        .join("\n\n");

        appChannel.send(
          new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
          .setTitle('New Submission!')
          .setDescription(mappedResponses)
          .setColor('#E76DE5')
          .setTimestamp()
          //DON'T EDIT THE EMBED EXCEPT .setTitle AND .setColor
      )
      }
    });
  }
}
