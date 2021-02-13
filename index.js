const Eris = require("eris");
const chalk = require("chalk")
const request = require("request").defaults({
    encoding: null
});
const config = require("./Settings/config.json")
const emoji = require("./Plugins/emojis.json");
const colors = require("./Plugins/colors.json");

var client = new Eris.CommandClient(config.token, {}, {
    description: "Learning Eris",
    owner: "Tazhys#0001",
    prefix: ["eb!", "@mention "],
    defaultHelpCommand: true,
    autoReconnect: true,
    ignoreBots: true,
    ignoreSelf: true
});

client.on("ready", () => {
    console.log(chalk.greenBright(`[INFO] `) + `${config.botname} is now online and running under eris!`)
    client.editStatus(null, { name: `nooder.gg | ${config.prefix}`, type: 0 })
});

let defaultPrefix = `eb!`;

client.registerCommand('ping', (msg) => {
    console.log(chalk.blueBright(`[INFO] `) + `${msg.author.username}#${msg.author.discriminator} executed the command ping`)
    let start = Date.now()
    client.createMessage(msg.channel.id, {
            embed: {
                color: colors.YELLOW,
                description: 'Pong!'
            }
        })
        .then(msg => {
            let diff = (Date.now() - start)
            return msg.edit({
                embed: {
                    color: colors.GREEN,
                    description: `**Pong!** \`${diff}ms\``
                }
            })
        })
}, {
    description: 'Pings the bot.',
    usage: `${defaultPrefix}ping`,
    cooldown: 2000,
    cooldownMessage: `${emoji.error} Woah! A little to fast there!`,
    cooldownReturns: 1
});

client.registerCommand('boop', (msg) => {
    console.log(chalk.blueBright(`[INFO] `) + `${msg.author.username}#${msg.author.discriminator} executed the command boop`)
    msg.channel.createMessage(`boop!`)
});

client.registerCommand('info', (msg, args) => {
    client.createMessage(msg.channel.id, {
        embed: {
            color: colors.PURPLE,
            fields: [{
                    name: 'Creator',
                    value: 'Tazhys#0001',
                    inline: false
                },
                {
                    name: 'Description',
                    value: 'An experimental discord bot made in javascript using eris!',
                    inline: false
                },
                {
                    name: 'Contributors',
                    value: '`Mxmnt` | `PsyKo`',
                    inline: false
                },
            ]
        }
    })
}, {
    description: 'Infos about the bot',
    fullDescription: 'Full infos about the bot',
    usage: `${defaultPrefix}info`,
    cooldown: 2000,
    cooldownMessage: `${emoji.error} Woah! A little to fast there!`,
    cooldownReturns: 1
});

client.connect();