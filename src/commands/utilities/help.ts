import { createEmbed } from "../../functions/createEmbed";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows the help menu with all available commands");

export async function execute(interaction: CommandInteraction) {
    const helpEmbed = createEmbed(
        {
            title: "Available Commands",
            description: `Categorized list of all available commands`,
            timestamp: true,
            fields: [
                {
                    name: "Utilities",
                    value: "`/help` `/ping` `/avatar`",
                    inline: true
                },
            ]
        }
    )
    await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
}