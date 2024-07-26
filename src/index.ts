import { Client } from "discord.js";
import Config from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";
import { log } from "./functions";

const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", () => {
    console.log(`

                            888               888    
                            888               888    
                            888               888    
888  888  888 888  888      88888b.   .d88b.  888888 
888  888  888 \`Y8bd8P'      888 "88b d88""88b 888     
888  888  888   X88K        888  888 888  888 888    
Y88b 888 d88P .d8""8b.      888 d88P Y88..88P Y88b.  
 "Y8888888P"  888  888      88888P"   "Y88P"   "Y888 
                                                     
`)
    log("Bot has been started", "success");
    log(`Username: ${client.user?.username}`, "info")
    log(`User ID: ${client.user?.id}`, "info")
    log(`Servers: ${client.guilds.cache.size}`, "info")
});

client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});


if (Config.firstMessage) {
    client.on("channelCreate", function (channel) {
        console.log(`channelCreate: ${channel}`);
        const newChannel: any = client.channels.cache.get(channel.id);
        newChannel.send("first")
    });
}


const refreshCommands = async () => {
    for (const guildId of Config.guildIds) {
        await deployCommands({ guildId: guildId });
    }
}

refreshCommands()



client.login(Config.token);