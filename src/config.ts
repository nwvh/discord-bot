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

const Config = {
    token: TOKEN,
    clientId: CLIENT_ID,
    guildIds: [
        "1124446695841865789",
    ],
    firstMessage: true,
}

export default Config