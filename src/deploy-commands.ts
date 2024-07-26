import { REST, Routes } from "discord.js";
import Config from "./config";
import { commands } from "./commands";
import { log } from "./functions";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(Config.token);

type DeployCommandsProps = {
    guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
    try {
        log(`Attempting to reload slash commands for guild ${guildId}`, "info");

        await rest.put(
            Routes.applicationGuildCommands(Config.clientId, guildId),
            {
                body: commandsData,
            }
        );

        log(`Reloaded slash commands for guild ${guildId}`, "success");
    } catch (error) {
        log("Failed to reload slash commands: " + error, "error");
    }
}