import dotenv from "dotenv";
import { log } from "./functions";

dotenv.config();

const { TOKEN, CLIENT_ID } = process.env;

if (!TOKEN || !CLIENT_ID) {
    log("You are missing the .env file or the required variables. Make sure to rename the .env.example file to .env and fill in the values.", "error");
    process.exit(1);
}

if (TOKEN === "your discord bot token" || CLIENT_ID === "your discord bot client id") {
    log("Your .env file is using the default values. Please fill in the values.", "error");
    process.exit(1);
}

const TicketColors: { [color: string]: string } = {
    "blue": "Primary",
    "grey": "Secondary",
    "green": "Success",
    "red": "Danger",
}

export interface TicketType {

    id: string,
    categoryId: string
    title: string,
    description: string,
    emoji: string,
    buttonColor: string,
    channelName: string,
    welcomeMessage: string,

}
interface ConfigType {
    token: string;
    clientId: string;
    guildIds: string[];
    firstMessage: boolean;
    firstMessageIgnoreTickets: boolean;
    ticketsChannelId: string;
    ticketsClosedCategoryId: string;
    ticketsCreateDescription: string;
    tickets: TicketType[];
}

const Config: ConfigType = {
    token: TOKEN,
    clientId: CLIENT_ID,
    guildIds: [
        "1124446695841865789",
    ],
    firstMessage: true,
    firstMessageIgnoreTickets: true, // If true, the first message will be ignored for ticket channels
    ticketsChannelId: "1223018134596882433", // The channel with a message for creating tickets.
    ticketsClosedCategoryId: "1223018134596882433", // Category for closed tickets
    ticketsCreateDescription: ` 
Select a ticket category to create a ticket.
Every ticket category is briefly explained in the dropdown.

## Rules: 

- You are allowed to ping the support team once every 24 hours.
- Do not ping the support team straight away.
- Do not DM the support team to ask for help.
- Make sure to read the documentation before asking for help. Tickets for questions that are explained in the documentation will be closed and deleted without any warning.
- Do not create a ticket for help about free resources.  

*Failing to follow these rules will result in your ticket being closed.*

### [📚 Documentation](https://docs.wx0.dev)
    `, // Description for the message with a list of tickets. Discord markdown is supported
    tickets: [

        /*
            Modify your ticket categories here.
    
            Available placeholders for the channel name:
    
            [username]: The username of the user who created the ticket
            [count]: The number of tickets in the current category

            Available placeholders for the welcome message:

            [username]: The username of the user who created the ticket (no ping)
            [usernamePing]: Pings the creator of the ticket

        */
        {
            id: "questions", // Use a unique, short id for each ticket. Do not use spaces or special characters.
            categoryId: "1272117484371316807", // The category where the ticket will be created.
            title: "Questions",
            description: "Tickets for questions",
            emoji: "❓",
            buttonColor: TicketColors["blue"],
            channelName: "question-[username]-[count]",
            welcomeMessage: `
Welcome, [usernamePing]!

The support team will assist you in max 24 hours. If you don't get a response within 24 hours, you're allowed to ping the support team.
            `,

        },
        {
            id: "bug-reports", // Use a unique, short id for each ticket. Do not use spaces or special characters.
            categoryId: "1272117519225720883", // The category where the ticket will be created.
            title: "Bug Reports",
            description: "Tickets for reporting bugs and issues",
            emoji: "🪲",
            buttonColor: TicketColors["blue"],
            channelName: "bug-[username]-[count]",
            welcomeMessage: `
Welcome, [usernamePing]!

The support team will assist you in max 24 hours. If you don't get a response within 24 hours, you're allowed to ping the support team.
            `,

        },
    ],
}

export default Config as ConfigType