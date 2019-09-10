const { Client, Attachment, RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const quiz = require('./quiz/quiz.json');
const item = quiz[Math.floor(Math.random() * quiz.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!pj') {
    msg.reply('\nКоманды: !servers !owner !about !quiz !link \nАдмин команды: !say !event !clear\nГифки: !win !nyancat !nice !fuckyou');
  }; 
});

client.on('message', msg => {
  if (msg.content === '!link') {
    msg.channel.send('Cсылки:\nКоллекция - \nФорум - \nСайт - \nДонат - \nЮтуб создателя :3 - ');
  }; 
});

client.on('message', message => {
  if (message.content === '!about') {
    const embed = new RichEmbed()
      .setTitle('Что из себя представляет Project Jupiter?')
      .setColor(0x1eff00)
      .setImage('https://wallpaperplay.com/walls/full/3/9/7/299161.jpg')
      .setDescription('Доброго времени суток.\nВы находитесь на проекте серверов игры Garry\'s Mod.\nВ данный момент работает сервер DarkRP, но позже буду добавляться и другие режимы.\n \n Желаем вам приятной игры и хорошего настроение :3');
    message.channel.send(embed);
  }
});

client.on('message', msg => {
  if (msg.content === '!event') {
    if (msg.member.roles.find(r => r.name === "Event Manager")) {
        msg.channel.send('Внимание вопрос!\nХотите ли вы ивент?')
        .then(function (message) {
          message.react('⭕');
          message.react('❌');
        }).catch(function() {
       });
    }
    else {
      msg.channel.send("У вас нету прав на выполнение данного действия.")
    }
  } 
});

client.on('message', msg => {
  if (msg.content === '!quiz') {
    msg.channel.send(item.question).then(() => {
      msg.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
        .then(collected => {
          msg.channel.send(`${collected.first().author} дал правильный ответ!`);
        })
        .catch(collected => {
          msg.channel.send('Извиняй, но время прошло.');
        });
    });
  }
})

client.on('message', function(message) {
  if (message.content == "!clear") {
    if (message.member.roles.find(r => r.name === "Owner")) {
      if (message.member.hasPermission("MANAGE_MESSAGES")) {
          message.channel.fetchMessages()
             .then(function(list){
                  message.channel.bulkDelete(list);
              }, function(err){message.channel.send("У вас нету прав на выполнение данного действия.")})
          }                        
      }
  }

});

client.on('message', message => {
   if (message.content.startsWith("!say ")) {
	if (message.member.hasPermission("MANAGE_MESSAGES")) {
      		message.delete(1000); //Supposed to delete message
     		message.channel.send(message.content.slice(5, message.content.length));
	}
   }
});


client.on('message', message => {
  if (message.content === '!owner') {
      message.channel.send('Вот владелец: https://steamcommunity.com/id/RedJoar');
  }
});

client.on('message', message => {
  if (message.content === '!servers') {
      message.channel.send('В данный момент сервера закрыти.');
  }
});

client.on('message', message => {
  if (message.content === '!win') {
      const attachment = new Attachment('http://mrwgifs.com/wp-content/uploads/2014/11/HQ-Carlton-Dance-With-a-Transparent-Background-Gif-From-The-Fresh-Prince-Of-Bel-Air.gif');
      message.channel.send(attachment);
  }
});

client.on('message', message => {
  if (message.content === '!nyancat') {
      const attachment = new Attachment('https://media2.giphy.com/media/mTs11L9uuyGiI/giphy.gif');
      message.channel.send(attachment);
  }
});

client.on('message', message => {
  if (message.content === '!nice') {
      const attachment = new Attachment('https://media1.giphy.com/media/n0lnosk5JX8Dm/giphy.gif');
      message.channel.send(attachment);
  }
});

client.on('message', message => {
  if (message.content === '!fuckyou') {
      const attachment = new Attachment('http://24.media.tumblr.com/69cc630a0001996cc58983c391f10407/tumblr_mr9x8jnd1I1semgkco1_500.gif');
      message.channel.send(attachment);
  }
});

client.login(process.env.BOT_TOKEN);
