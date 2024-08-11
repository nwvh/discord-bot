import { createEmbed } from "../functions/createEmbed";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("COMMAND_NAME")
    .setDescription("COMMAND_DESCRIPTION");

export async function execute(interaction: CommandInteraction) {
    const EXAMPLE_EMBED = createEmbed(
        {
            description: `This is an example embed, if you see this, it means you haven't changed the command template yet.`
        }
    )
    await interaction.reply({ embeds: [EXAMPLE_EMBED] });
}