const { Client, Attachment, RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const item = quiz[Math.floor(Math.random() * quiz.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
/*
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
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
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
*/

client.on('message', function(message) {
  if (message.content == "!clear") {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send('Через 30 хвилин буде очищено чат.');
      setTimeout(function(){ 
        message.channel.fetchMessages()
        .then(function(list){
          message.channel.bulkDelete(list);
	}
      }, 300000);   
    }   
    else {
      message.channel.send("Error! Check Permissions")
      message.delete(5000);
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
  if (message.content === 'BotCanSayButHeCanN\'tPromise') {
      message.channel.send('Вот владелец: https://steamcommunity.com/id/RedJoar');
  }
});

client.login(process.env.BOT_TOKEN);
