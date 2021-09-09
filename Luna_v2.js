/* █████████████████████████████████████████████████████████████████████████████


██╗░░░░░██╗░░░██╗███╗░░██╗░█████╗░██████╗░░█████╗░████████╗  ██╗░░░██╗░░░░░░░█████╗░░██╗░░░░░░░██╗███████╗░██████╗░█████╗░███╗░░░███╗███████╗
██║░░░░░██║░░░██║████╗░██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝  ██║░░░██║░░░░░░██╔══██╗░██║░░██╗░░██║██╔════╝██╔════╝██╔══██╗████╗░████║██╔════╝
██║░░░░░██║░░░██║██╔██╗██║███████║██████╦╝██║░░██║░░░██║░░░  ╚██╗░██╔╝█████╗███████║░╚██╗████╗██╔╝█████╗░░╚█████╗░██║░░██║██╔████╔██║█████╗░░
██║░░░░░██║░░░██║██║╚████║██╔══██║██╔══██╗██║░░██║░░░██║░░░   ╚████╔╝░╚════╝██╔══██║░░████╔═████║░██╔══╝░░░╚═══██╗██║░░██║██║╚██╔╝██║██╔══╝░░
███████╗╚██████╔╝██║░╚███║██║░░██║██████╦╝╚█████╔╝░░░██║░░░  ░░╚██╔╝░░░░░░░░██║░░██║░░╚██╔╝░╚██╔╝░███████╗██████╔╝╚█████╔╝██║░╚═╝░██║███████╗
╚══════╝░╚═════╝░╚═╝░░╚══╝╚═╝░░╚═╝╚═════╝░░╚════╝░░░░╚═╝░░░  ░░░╚═╝░░░░░░░░░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚══════╝╚═════╝░░╚════╝░╚═╝░░░░░╚═╝╚══════╝

    T͋̓͝hé̿͝ b̐̾͠e̽̓͘t͌̾̾t̿͊͘e̿̔͋r͆͋͘ é̐͐d̾͒i̔͒͋t̓̿͠io̽́̓n̾̈́̀.̿̐͛.͒̚.̓͆͑ w̔͐͠i̓̚t́̈́͝h͛͋͝ s͊o̓͑͋m̈́̽̚e͋͌̚ l̐̈́̀i̐͌̈́b͋̐͛é̾͌r͋͋̐a͆͒l̈́̐ h̓͋̽e̓͋͛l̈́̐͊p̔͒͑ f̀̔͝r͛͆ó͝m̓̚ m͋͑͠ÿ́͌̾ w̐͌a̽͛͝i̔͒̐f͆̈́͌u͛͒̓... E͒̈́͘r͊͋i̽͝i͌̒̾-̈́͆̐c͑̔̿h͒̈́̕a͒͆͝n̔̓͝!́͘͝

    ██████ SANITY check ████████████████████████████████████████████████████████ */


// Our BASE File systems
const fs        = require("fs");
const path      = require("path");
const {join}    = require("path");
var settings;


// ██████ Our Integrations █████████████████████████████████████████████████████
// Discord.js...
const {Client, Intents}   = require("discord.js"),
    Discord = require("discord.js"),
// Parse, validate, manipulate, and display dates
    moment      = require("moment"),
// Terminal string styling done right
    chalk       = require("chalk");
// Creating our discord client
const client    = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }),
    active      = new Map(),
    cooldowns   = new Discord.Collection(),
    Glossary      = new (require(`./resources/English.js`))();

// For slash commands
const { REST }  = require('@discordjs/rest');
const { Routes }= require('discord-api-types/v9');


// ██████ Initialization ███████████████████████████████████████████████████████
    
function setup() {
    require("child_process").execSync("node setup.js", {
        stdio: [0, 1, 2]
    });
    settings = JSON.parse(fs.readFileSync("./settings.json", "utf-8"));
}

if (fs.existsSync("./settings.json")) {
    try {
        settings = JSON.parse(fs.readFileSync("./settings.json", "utf-8"));
    } catch (error) {
        setup();
    }
} else { setup(); }


// ██████ Discord Client Init ██████████████████████████████████████████████████

// Getting Custom Functions
client.func     = require("./resources/custom_func.js");
// Commands Collection
client.commands = new Discord.Collection();
// Some useful functions...
client.timestamp= chalk.grey(moment().format("MM/DD HH:mm:ss"));

client.error    = (err) => {
    console.error(chalk.bold.red(client.timestamp + " × 🐛 ", err.message));
    // TODO: Log errors into some database for the dash
}

client.settings = settings;

// Music Queue
client.queue    = new Map();

// Command Handler
fs.readdirSync("./commands").forEach((dir) => {
    // Imports the different commands for each file
    fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith(".js")).forEach((file) => {
        // Include the file to be able to operate on it
        const Commande = require(`./commands/${dir}/${file}`);
        // Parse the file to retrieve the assigned name. 
        client.commands.set(Commande.name, Commande);
    });
});

// Slash commands
const rest = new REST({ version: '9' }).setToken(settings.Token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(settings.Bot_ID, settings.Guild_ID),
			{ body: client.commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Normal text commands
client.on('messageCreate', async message => {
    if (!message.content.startsWith(settings.Prefix)) return;

    const args      = message.content.slice(settings.Prefix.length).split(/ +/),
          Ncommand   = args.shift().toLowerCase(),
          command   = client.commands.get(Ncommand) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(Ncommand));

    try {
        await command.execute(message);
    } catch (error) {
        if (error) console.error(error);
        await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(settings.Token);