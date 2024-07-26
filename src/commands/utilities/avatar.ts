import { createEmbed } from "../../functions/createEmbed";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("avatar")
    .addUserOption(option =>
        option.setName("target")
            .setDescription("Target user - Mention or User ID")
            .setRequired(true)
    )
    .setDescription("Shows the avatar of the chosen user");

export async function execute(interaction: CommandInteraction) {
    const targetUsername = interaction.options.get("target")?.user?.username
    const avatarUrl = `${interaction.options.get("target")?.user?.displayAvatarURL()}?size=1024`
    const avatarEmbed = createEmbed(
        {
            title: `${targetUsername}'s avatar`,
            timestamp: true,
            url: avatarUrl,
            image: avatarUrl,
            footer: { text: `Requested by ${interaction.user.username}`, iconUrl: `${interaction.user.avatarURL}` }
        }
    )
    await interaction.reply({ embeds: [avatarEmbed] });
}