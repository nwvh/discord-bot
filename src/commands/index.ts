// Utility Commands

import * as ping from "./utilities/ping";
import * as help from "./utilities/help";
import * as avatar from "./utilities/avatar";

// Moderation commands
import * as ban from "./moderation/ban"

// Fun commands
import * as coinflip from "./fun/coinflip";
import * as rps from "./fun/rps";

// Ticket commands
import * as refreshtickets from "./ticket/refreshTickets";

export const commands = {
    ping,
    help,
    avatar,
    ban,
    coinflip,
    rps,
    refreshtickets
};