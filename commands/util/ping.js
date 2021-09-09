// ██████ Integrations █████████████████████████████████████████████████████████

// A powerful library for interacting with the Discord API
const { MessageEmbed } = require("discord.js");
// A light-weight module that brings Fetch API to Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// –––––– Parameters –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

module.exports = {

    name            : "ping",
    description     : "Sends test packets to the bot, and measures the response time.",
    cooldown        : 5,
    aliases         : ["🏓", "pong"],
    guildOnly       : false,
    privileges      : ["SEND_MESSAGES"],

// –––––– Execution ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    async execute(interaction) {

        const Lat = new Date().getTime() - interaction.createdTimestamp;
        var embed = new MessageEmbed();

        // Retrieve status information
        const response = await fetch("https://srhpyqt94yxb.statuspage.io/api/v2/summary.json");
        await response.json().then((DiscordappStatus) => {

                embed
                    .setTitle(" Ｐ Ｏ Ｎ Ｇ !") 
                    .setColor("#7354f6")
                    .addFields(
                        {   name  : "— ヽ( •_•)O´¯\\`°.¸.·´¯\\`Q(^o^ )\\`",
                            value : [
                                "```",
                                `   Latency │ ${Lat}ms`,
                                //` Websocket │ ${Math.round(interaction.ws.ping)}ms`, // Need to fix this. ws.ping doesnt exist anymore
                                `CloudFlare │ ${DiscordappStatus.components[4].status ? "OK !" : "✗"}`,
                                `       API │ ${DiscordappStatus.components[0].status ? "OK !" : "✗"}`,
                                `   Gateway │ ${DiscordappStatus.components[3].status ? "OK !" : "✗"}`,
                                `Med. Proxy │ ${DiscordappStatus.components[6].status ? "OK !" : "✗"}`,
                                `     Voice │ ${DiscordappStatus.components[7].status ? "OK !" : "✗"}`,
                                "```"
                            ].join("\n")
                        },
                        {   name  : "— Servers Status",
                            value : [
                                "```",
                                `   EU West │ ${DiscordappStatus.components[1].status ? "✔" : "✗"} : ${DiscordappStatus.components[12].status ? "✔" : "✗"} │ US West`,
                                `EU Central │ ${DiscordappStatus.components[2].status ? "✔" : "✗"} : ${DiscordappStatus.components[13].status ? "✔" : "✗"} │ Brazil`,
                                ` Singapore │ ${DiscordappStatus.components[5].status ? "✔" : "✗"} : ${DiscordappStatus.components[14].status ? "✔" : "✗"} │ Hong Kong`,
                                `    Sydney │ ${DiscordappStatus.components[8].status ? "✔" : "✗"} : ${DiscordappStatus.components[15].status ? "✔" : "✗"} │ Russia`,
                                `US Central │ ${DiscordappStatus.components[9].status ? "✔" : "✗"} : ${DiscordappStatus.components[16].status ? "✔" : "✗"} │ Japan`,
                                `   US East │ ${DiscordappStatus.components[10].status ? "✔" : "✗"} : ${DiscordappStatus.components[17].status ? "✔" : "✗"} │ South Afr`,
                                `  US South │ ${DiscordappStatus.components[11].status ? "✔" : "✗"} : ✔ │ Having Fun!`,
                                "```"
                            ].join("\n")
                        },
                        {   name  : "— Maintenance & Incidents",
                            value : [
                                "```",
                                `     Event │ ${DiscordappStatus.incidents}${DiscordappStatus.scheduled_maintenances}`,
                                "```",
                                "[Discordapp Status](https://status.discordapp.com/)"
                            ].join("\n")
                        }
                    )
                    .setFooter(`Command executed by @${interaction.member.tag}`)
                    .setTimestamp();
            })
            .catch(() => {

                embed
                    .setDescription([
                        "```",
                        `   Latency │ ${Lat}ms`,
                        //` Websocket │ ${Math.round(interaction.ws.ping)}ms`, // Need to fix this. ws.ping doesnt exist anymore
                        "```",
                    ].join("\n"))
                    .setFooter(`Command executed by @${interaction.member.tag}`)
                    .setTimestamp();
            });

        // Send the embed and add a reaction to be able to remove it.
        interaction.reply({ embeds: [ embed ] });
    }
};