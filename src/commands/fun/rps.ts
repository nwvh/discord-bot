import { createEmbed } from "../../functions/createEmbed";
import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Rock, Paper, Scissors!");

const choices = ["`🪨` Rock", "`📄` Paper", "`✂️` Scissors"];


const checkWin = (my: string, user: string): string => {
    const winningCombinations: Record<string, string> = {
        Rock: "`✂️` Scissors",
        Paper: "`🪨` Rock",
        Scissors: "`📄` Paper"
    };
    return winningCombinations[my] === user ? "It's a **TIE**!" : winningCombinations[my] === user ? "You **WIN**!" : "You **LOSE**!";
}
export async function execute(interaction: CommandInteraction) {

    const myChoice = choices[Math.floor(Math.random() * choices.length)];
    const userChoice = choices[Math.floor(Math.random() * choices.length)];

    const flipEmbed = createEmbed(
        {
            description: `You chose ${myChoice} and I chose ${userChoice}. ${checkWin(myChoice, userChoice)}`
        }
    )
    await interaction.reply({ embeds: [flipEmbed] });

}

//! WORK FFS