import { log } from "../../functions";
import { createEmbed } from "../../functions/createEmbed";
import { CommandInteraction, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ban")
    .addUserOption(option =>
        option.setName("target")
            .setDescription("Target user - Mention or User ID")
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("reason")
            .setDescription("Reason for the ban (optional)")
            .setRequired(false)
    )
    .setDescription("Bans user");

export async function execute(interaction: CommandInteraction) {
    const targetUsername = interaction.options.get("target")?.user?.username
    const target = interaction.options.get('target')?.user;
    const reason = interaction.options.get('reason')?.value ?? 'No reason provided';
    const confirmEmbed = createEmbed(
        {
            description: `Are you sure you want to ban **${targetUsername}**?`
        }
    )
    const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('Confirm Ban')
        .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
        .addComponents(cancel, confirm);
    const response = await interaction.reply(
        {
            embeds: [confirmEmbed],
            //@ts-ignore
            components: [row],
            ephemeral: true
        }
    );
    const collectorFilter = (i: any) => i.user.id === interaction.user.id;

    try {
        const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 15_000 });

        if (confirmation.customId === 'confirm') {
            const bannedEmbed = createEmbed(
                {
                    description: `<@${target?.id}> has been banned: ${reason}`
                }
            )
            await confirmation.reply({ embeds: [bannedEmbed] })
        } else if (confirmation.customId === 'cancel') {
            const cancelEmbed = createEmbed(
                {
                    description: `Ban cancelled`
                }
            )
            await confirmation.reply({ embeds: [cancelEmbed] })
            try {
                //@ts-ignore
                await interaction.guild?.members.ban(target)
            } catch (e) {
                log(`Ban failed: ${e}`, "error")
            } finally {
                log(`Banned user: ${targetUsername} for reason: ${reason}`, "success")
            }
        }
    } catch (e) {
        const failedEmbed = createEmbed(
            {
                description: `No response received, cancelling`
            }
        )
        console.log("Error: " + e)
        await interaction.editReply({ embeds: [failedEmbed], components: [] });
    }
}