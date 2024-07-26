import dotenv from "dotenv";

dotenv.config();

const { TOKEN, CLIENT_ID } = process.env;

if (!TOKEN || !CLIENT_ID) {
    throw new Error("Missing environment variables. Please configure them");
}

const Config = {
    token: TOKEN,
    clientId: CLIENT_ID,
    guildIds: [
        "1124446695841865789",
    ],
    firstMessage: true, // Sends a message: "first" to a newly created channels
}

export default Config