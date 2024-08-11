import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import Config from '../config';

const cachePath = path.join(__dirname, '..', '..', 'cache.json');

// Read the cache file and parse it
const readCache = () => {
    try {
        const data = readFileSync(cachePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing cache file:', error);
        return { ticketMessageId: null, ticketsCount: {} };
    }
};

// Write to the cache file
const writeCache = (cache: any) => {
    try {
        writeFileSync(cachePath, JSON.stringify(cache, null, 4), 'utf-8');
    } catch (error) {
        console.error('Error writing to cache file:', error);
    }
};

// Modify a general key in the cache
export const modifyCache = (key: string, value: any) => {
    const cache = readCache();
    cache[key] = value;
    writeCache(cache);
};

// Modify a key in the ticketsCount object
export const modifyTicketsCount = (key: string, value: number) => {
    const cache = readCache();
    if (!cache.ticketsCount) {
        cache.ticketsCount = {};
    }
    cache.ticketsCount[key] = value;
    writeCache(cache);
};

// Reset cache with default values
export const resetCache = async () => {
    let ticketCount: { [key: string]: number } = {};
    for (const ticket of Config.tickets) {
        const id = ticket["id"];
        ticketCount[id] = 0;
    }

    const cache = {
        ticketMessageId: null,
        ticketsCount: ticketCount
    };

    writeCache(cache);
};

// Get value from cache by key
export const getCache = (key: string) => {
    const cache = readCache();
    return cache[key];
};

// Retrieve the ticket count by category
export const getTicketCountByCategory = (categoryId: string): number => {
    const cache = readCache();
    if (cache.ticketsCount && typeof cache.ticketsCount[categoryId] === 'number') {
        return cache.ticketsCount[categoryId];
    } else {
        console.warn(`Category ${categoryId} not found in ticketsCount`);
        return 0; // Return 0 or another default value if the category is not found
    }
};
