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
const Discord   = require("discord.js"),
// Parse, validate, manipulate, and display dates
    moment      = require("moment"),
// Terminal string styling done right
    chalk       = require("chalk");
// Creating our discord client
const client    = new Discord.client({ autoReconnect: true }),
    active      = new Map(),
    cooldowns   = new Discord.Collection(),
    Glossary    = new require()


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