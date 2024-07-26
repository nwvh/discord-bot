import { createEmbed } from "../../functions/createEmbed";
import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin!");

export async function execute(interaction: CommandInteraction) {
    const result = Math.random() < 0.5;
    const flipEmbed = createEmbed(
        {
            description: `\`🪙\` You flipped a coin a it landed on ${result ? "**Heads**" : "**Tails**"}.`
        }
    )
    await interaction.reply({ embeds: [flipEmbed] });
}