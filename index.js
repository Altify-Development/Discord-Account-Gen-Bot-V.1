const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000)); // DO NOT CHANGE

app.get('/', function (request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag} Successfully!`);
    console.log(`Have fun with your account generator bot provided by Altify#5121!`);
    console.log(`If there are any errors make sure to contact me immediately at Altify#5121`);
    console.log(`Continuing to launch configured bot`);
});

bot.on("message", message => {
    if (message.channel.id === config.botChannel) { 
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "You have a Cool Down of 30 Seconds! - " +
                    message.author
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Please provide a Service!");
                var fs = require("fs");
                const filePath = __dirname + "/" + args[0] + ".txt";
                //if(args[0] != __dirname + "txt") return message.reply("Couldnt find: " + args[0] + " in our Stock!")

                const embed = {
                    title: "Out of Stock!",
                    description: "The Service that you requested is currently Out of Stock!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png",
                        text: "Developed by Altify#5121"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png"
                    },
                    author: {
                        name: "Altify Account Generator Bot",
                        url: "https://discord.gg/AVKEJtWkBj",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        if(position == -1)
                        return message.channel.send({ embed });
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Account Generated!",
                                    description: "Account of your requested Service has been Sent as a DM!",
                                    color: 0xff033d,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url:
                                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png",
                                        text: "Developed by Altify#5121"
                                    },
                                    thumbnail: {
                                        url:
                                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png"
                                    },
                                    author: {
                                        name: "Altify Account Generator Bot",
                                        url: "https://discord.gg/AVKEJtWkBj",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, 5000); // 86400000 = 24 H , 150000 = 15 Min , 10000 = 1 Min , 5000 = 30 Seconds , 2500 = 15 Seconds , 1000 = 6 Seconds , 500 = 3 Seconds
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send("Out of Stock!");
                        }
                    } else {
                        const embed = {
                            title: "Service Not found!",
                            description: "The requested Service could not be found!",
                            color: 0xff033d,
                            timestamp: new Date(),
                            footer: {
                                icon_url:
                                    "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png",
                                text: "Developed by Altify#5121"
                            },
                            thumbnail: {
                                url:
                                    "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png"
                            },
                            author: {
                                name: "Altify Account Generator Bot",
                                url: "https://discord.gg/AVKEJtWkBj",
                                icon_url: bot.displayAvatarURL
                            },
                            fields: []
                        };
                        message.channel.send({ embed });
                        return;
                    }
                });
            }
        }
        else
            if (command === "stats") {
                const embed = {
                    title: "Stats",
                    description: `Total Users: ${bot.users.size}`,
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png",
                        text: "Developed by Altify#5121"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png"
                    },
                    author: {
                        name: "Altify Account Generator Bot",
                        url: "https://discord.gg/AVKEJtWkBj",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            }
        
            if (command === "help") {

                const embed = {
                    color: 0xff033d,
                    title: 'Altify Account Generator Bot',
                    url: 'https://discord.gg/AVKEJtWkBj',
                    author: {
                        name: 'Command list',
                        //icon_url: 'https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png',
                        url: 'https://discord.gg/AVKEJtWkBj',
                    },
                    description: '**This is a List of all Commands**',
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png',
                    },
                    fields: [
                        {
                            name: 'Generate Accounts',
                            value: 'Usage: =gen <Service Name>',
                        },
                        {
                            name: 'Create Service',
                            value: 'Usage: =create <Service Name>',
                        },
                        {
                            name: 'Restock Service',
                            value: 'Usage: =restock <ServiceName>',
                        },
                        {
                            name: 'Add Accounts',
                            value: 'Usage: =add <user:pass> <ServiceName>',
                        },
                        {
                            name: 'Show Stats of Altify Bot',
                            value: 'Usage: =stats',
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Developed by Altify#5121',
                        icon_url: 'https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png',
                    },
                };
                message.channel.send({ embed });
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You dont have Permissions to do that!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            if(!account) return message.reply("Provide a Formated Account String first!")
            if(!service) return message.reply("Provide a Service first!")
            const filePath = __dirname + "/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                const embed = {
                    title: "Account added!",
                    description: "Successfully added Account to " + service + "!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png",
                        text: "Developed by Altify#5121"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png"
                    },
                    author: {
                        name: "Altify Account Generator Bot",
                        url: "https://discord.gg/AVKEJtWkBj",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You dont have Permissions to do that!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/" + args[0] + ".txt";
            fs.writeFile(filePath, 'Altify:Altify', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Created Service!",
                    description: "Successfully created Service " + args[0] + "!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png",
                        text: "Developed by Altify#5121"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png"
                    },
                    author: {
                        name: "Altify Account Generator Bot",
                        url: "https://discord.gg/AVKEJtWkBj",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });
        }
        if (command === "restock") {
            const embed = {
                title: "Provide Service!",
                description: "Please Provide the Name of the Service you want to restock!",
                color: 0xff033d,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png",
                    text: "Developed by Altify#5121"
                },
                thumbnail: {
                    url:
                        "https://cdn.discordapp.com/attachments/860238638255702046/908091781789413386/image0.png"
                },
                author: {
                    name: "Altify Account Generator Bot",
                    url: "https://discord.gg/AVKEJtWkBj",
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You dont have Permissions to do that!");
            if (!args[0])
            {
                return message.channel.send({ embed });
            }
            else {
            message.channel.send("The Service " + args[0] + " has been restocked by " + "<@" + message.author.id +">");
            }
        }
    }
});

bot.login(config.token);
