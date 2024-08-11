import { createEmbed } from "../../functions/createEmbed";
import { ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, CommandInteraction, ComponentType, OverwriteType, PermissionOverwriteManager, PermissionOverwrites, PermissionsBitField, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder, ButtonInteraction, TextChannel } from "discord.js";
import Config, { TicketType } from "../../config";
import { client } from "../../index";
import { getCache, getTicketCountByCategory, log, modifyCache, modifyTicketsCount } from "../../functions";

export const data = new SlashCommandBuilder()
    .setName("refreshtickets")
    .setDescription("Refresh all tickets. This will remove all tickets and create new ones from the config file.");

const replacePlaceholders = (text: string, user: any) => {
    const username = user.username;
    const usernamePing = `<@${user.id}>`;

    return text.replace("[username]", username).replace("[usernamePing]", usernamePing);
}


const getTicketCategoryConfig = (id: string): any | unknown => {
    for (const ticket of Config.tickets) {
        if (ticket.id === id) return ticket;
    }
    return log(`Attempted to get invalid ticket category: ${id}`, "error");
}

export async function execute(interaction: CommandInteraction) {
    const refreshingEmbed = createEmbed(
        {
            description: "`🎫` Refreshing tickets..."
        }
    )
    await interaction.reply({ embeds: [refreshingEmbed], ephemeral: true });
    const createTickets = createEmbed(
        {
            title: "`🎫` Create a Ticket",
            description: Config.ticketsCreateDescription,
        }
    )
    const select = new StringSelectMenuBuilder()
        .setCustomId('ticket-category')
        .setPlaceholder('Ticket Category')
    for (const ticket of Config.tickets) {
        const { id, emoji, title, description } = ticket;
        select.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(`${emoji} ${title}`)
                .setDescription(description)
                .setValue(id)
        );
    }


    const row = new ActionRowBuilder()
        .addComponents(select);
    //@ts-ignore
    const ticketMessage = await client.channels?.cache?.get(Config.ticketsChannelId).send({
        embeds: [createTickets], components: [row],
    });

    const doneEmbed = createEmbed(
        {
            description: `\`✅\` Refreshed ${Config.tickets.length} tickets!`
        }
    )
    await interaction.editReply({ embeds: [doneEmbed] });
    modifyCache("ticketMessageId", ticketMessage.id);
    const collector = ticketMessage.createMessageComponentCollector({ componentType: ComponentType.StringSelect });
    collector.on('collect', async (i: StringSelectMenuInteraction) => {
        const selection = i.values[0];

        const config = getTicketCategoryConfig(selection);
        const errorEmbed = createEmbed(
            {
                description: `\`❌\` An error occured while creating your ticket.`
            }
        )
        if (!config) return i.reply({ embeds: [errorEmbed], ephemeral: true });
        const creatingEmbed = createEmbed(
            {
                description: `\`🔄️\` Your ${config.title} ticket is being created...`
            }
        )
        await i.reply({ embeds: [creatingEmbed], ephemeral: true });
        const guild = i.guild
        if (!guild) return i.reply({ embeds: [errorEmbed], ephemeral: true });

        try {
            const channel = await guild.channels.create({
                name: `${replaceChannelPlaceholders(config.channelName, i.user.username, (getTicketCountByCategory(config.id) + 1).toString().padStart(4, '0'))}`,
                type: ChannelType.GuildText,
                parent: config.categoryId,
                permissionOverwrites: [
                    {
                        id: i.guild.id,
                        allow: [PermissionsBitField.Flags.BanMembers],
                    },
                ],
            })
            const createdEmbed = createEmbed(
                {
                    description: `\`🎫\` Your ticket has been created! <#${channel.id}>`
                }
            )
            modifyTicketsCount(config.id, getTicketCountByCategory(config.id) + 1);
            const welcomeEmbed = createEmbed(
                {
                    title: `${config.emoji} ${config.title}`,
                    description: config.welcomeMessage.replace("[username]", i.user.username).replace("[usernamePing]", `<@${i.user.id}>`),
                    timestamp: true,
                    thumbnail: i.user.avatarURL()?.toString(),

                }
            )
            const close = new ButtonBuilder()
                .setCustomId('close')
                .setLabel('Close Ticket')
                .setEmoji('🔒')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
                .addComponents(close);
            const welcomeMessage = await channel.send({
                embeds: [welcomeEmbed],
                //@ts-ignore
                components: [row],
            });
            await i.editReply({ embeds: [createdEmbed] });
            log(`Created ticket: ${config.id}`, "info");
            const collectorFilter = (b: any) => b.user.id === i.user.id
            try {
                const confirmation = await welcomeMessage.awaitMessageComponent({ filter: collectorFilter });
                if (confirmation.customId === 'close') {
                    await welcomeMessage.delete();
                    const channel = confirmation.channel as TextChannel;
                    const deletingEmbed = createEmbed(
                        {
                            description: `\`❌\` Thank you for using our ticket system! Your ticket will be deleted.`
                        }
                    )
                    await channel.send({ embeds: [deletingEmbed] });
                    setTimeout(async () => {
                        await channel.delete();
                    }, 3000);
                }
            } catch (e: unknown) {
                await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
            }


        } catch (e) {
            log(`Error while creating ticket: ${e}`, "error");
        }

    });

}

const replaceChannelPlaceholders = (text: string, username: string, count: string) => {
    return text.replace("[username]", username).replace("[count]", count);
}