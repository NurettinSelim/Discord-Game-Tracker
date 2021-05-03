const Discord = require('discord.js');

const myIntents = new Discord.Intents();
myIntents.add('GUILD_PRESENCES');

const client = new Discord.Client({
    presence: {
        status: 'online',
        activity: {
            name: 'github.com/NurettinSelim',
            type: 'WATCHING',
            // url: "https://www.github.com/NurettinSelim"
        },
    },
    ws: { intents: myIntents }
});

client.login(process.env.GAME_TRACKER_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    // if (!newPresence.activities) return false;

    newPresence.activities.forEach(async activity => {
        if (activity.type == "PLAYING") {
            try {
                let channel = await client.channels.fetch("838673685207580702")
                channel.send(`${newPresence.user} ${activity.name} oynamaya başladı!`)
            } catch (error) {
                // console.log(error)
            }
            if (activity.name == "VALORANT" && newPresence.userID == process.env.SOME_USER_ID) {
                try {
                    let channel = await client.channels.fetch("838673685207580702")
                    channel.send(`Bırakıyorum dememiş miydin?`)
                } catch (error) {
                    // console.log(error)
                }
            }
        }
    });
});