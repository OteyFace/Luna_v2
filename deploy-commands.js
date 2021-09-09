const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { tolken } = require("./settings.json")

const commands = [
//  new SlashCommandBuilder().setName("<COMMAND NAME>").setDescription("DESCRIPTION") 
    new SlashCommandBuilder().setName("echo").setDescription("echos user input")

].map (
    command => command.toJSON()
);

const rest = new REST({ version: "9" }).setToken(tolken);