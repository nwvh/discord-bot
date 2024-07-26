import { EmbedBuilder } from "discord.js"


type authorType = {
    name: string,
    iconUrl: string,
    url: string
}

type footerType = {
    text: string,
    iconUrl: string
}

interface fieldsType {
    name: string,
    value: string,
    inline?: boolean
}

interface EmbedOptions {
    description?: string;
    title?: string;
    url?: string;
    author?: authorType;
    thumbnail?: string;
    image?: string;
    timestamp?: boolean;
    footer?: footerType;
    fields?: fieldsType[];
}

export const createEmbed = ({
    description,
    title,
    url,
    author,
    thumbnail,
    image,
    timestamp,
    footer,
    fields
}: EmbedOptions) => {
    const createdEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setDescription(description || " ")
    if (url) createdEmbed.setURL(url)
    if (title) createdEmbed.setTitle(title || "")
    if (author) createdEmbed.setAuthor(author)
    if (thumbnail) createdEmbed.setThumbnail(thumbnail)
    if (image) createdEmbed.setImage(image)
    if (footer) createdEmbed.setFooter(footer)
    if (fields) createdEmbed.setFields(fields)
    if (timestamp) createdEmbed.setTimestamp()

    return createdEmbed
}

