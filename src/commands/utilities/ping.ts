import { createEmbed } from "../../functions/createEmbed";
import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction) {
    const pingEmbed = createEmbed(
        {
            description: `**Pong!** | This command took ${interaction.createdTimestamp - Date.now()}ms to process.`
        }
    )
    await interaction.reply({ embeds: [pingEmbed] });
}