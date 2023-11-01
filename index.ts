// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persists across program updates. Store data here.
import { nodes, root, state } from 'membrane';

export async function run() {
    await randomize_guild_image();
}

// Handles the program's HTTP endpoint
export async function endpoint(args) {
    await randomize_guild_image();
    return `Done`;
}

let limit = 100;
let validate_emoji = "\u{2705}";
let upvote_emoji = "\u{1F44D}";

async function randomize_guild_image() {
    while (true) {
        do {
            const messages = await get_next_messages(last_message_id);
            last_message_id = messages[messages.length - 1].id;
            for (const message of messages) {
                if (message.attachments && message.attachments.length !== 0) {
                    let string = JSON.stringify(message.attachments[0]);
                    console.log(`Hello World ${string}`);
                }
            }

            // let msgs_init = { headers: { "authorization": `Bot ${ env.DISCORD_TOKEN }` } };
            // let before = "";
            // if (last_message_id) {
            //     before = `& before=${ last_message_id }`;
            // }
            // let url2 = `${ base_url } / channels / ${ env.DISCORD_CHANNEL_ID } / messages ? limit = ${ limit }${ before }`;
            // const messages = await fetch(url2, msgs_init).then((res) => res.json());
            // for (var message of messages) {
            //     if (message.attachments.length != 0) {
            //         let emoji = encodeURI(validate_emoji);
            //         let url3 = `${ base_url } / channels / ${ env.DISCORD_CHANNEL_ID } / messages / ${ message.id } / reactions / ${ emoji }`;
            //         let users = await fetch(url3, msgs_init).then((res) => res.json());
            //         await new Promise((f) => setTimeout(f, 1e3));
            //         const is_admin = (user) => user.id === env.VALIDATOR_USER_ID;
            //         if (Array.isArray(users) && users.some(is_admin)) {
            //             const found = message.reactions.find((r) => {
            //                 return r.emoji.name === upvote_emoji;
            //             });
            //             let weight = 1;
            //             if (found) {
            //                 weight = weight + found.count;
            //             }
            //             for (var attachment of message.attachments) {
            //                 weighted_pictures.push({ weight, url: attachment.proxy_url });
            //             }
            //         }
            //     }
            // }
        } while (last_message_id != undefined);

        var flat_pictures = [];
        for (var weighted_picture of weighted_pictures) {
            for (var _i = 0; _i < fibonacci(weighted_picture.weight); _i++) {
                flat_pictures.push(weighted_picture.url);
            }
        }
        let random_number = Math.floor(Math.random() * flat_pictures.length);
        let chosen_picture = flat_pictures[random_number];
        let dus_init = { headers: { "x-auth-token": env.SCALEWAY_DATAURISCHEME_TOKEN } };
        const url = `https://meiliverserandomizerczcjdz5c-dataurischeme.functions.fnc.fr-par.scw.cloud/?url=${chosen_picture}`;
        const data_uri_scheme = await fetch(url, dus_init).then((response) => response.text());
        let disc_init = {
            method: "PATCH",
            headers: {
                "authorization": `Bot ${env.DISCORD_TOKEN}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ "icon": data_uri_scheme })
        };
        console.log(data_uri_scheme);
        let output = await fetch(`${base_url}/guilds/${env.DISCORD_GUILD_ID}`, disc_init).then((response) => response.json());
        console.log(output);
        if (!!output.icon) { // is not null,undefined,0,false,"", or NaN
            break
        }
    }
}

async function get_next_messages(before: string | undefined): Promise<discord.values.Message[]> {
    return await nodes.discord
        .guilds.one({ id: "532318017036746755" })
        .channels.one({ id: "1032008643807301782" })
        .messages.items({ limit: limit, before: before })
        .$query("id attachments")
}

interface WeightedMessage {
    weight: number;
    url: string;
}

interface Attachment {
    id: string;
    proxy_url: string;
}

async function fetch_weighted_messages(): Promise<WeightedMessage[]> {
    var weighted_pictures = [];
    var last_message_id: string | undefined = undefined;

    do {
        const messages = await get_next_messages(last_message_id);
        last_message_id = messages[messages.length - 1].id;
        for (const message of messages) {
            if (message.attachments && message.attachments.length !== 0) {
                let emoji = encodeURI(validate_emoji);


                let users = await fetch(url3, msgs_init).then((res) => res.json());
                await new Promise((f) => setTimeout(f, 1e3));
                const is_admin = (user) => user.id === env.VALIDATOR_USER_ID;
                if (Array.isArray(users) && users.some(is_admin)) {
                    const found = message.reactions.find((r) => {
                        return r.emoji.name === upvote_emoji;
                    });
                    let weight = 1;
                    if (found) {
                        weight = weight + found.count;
                    }
                    for (var attachment of message.attachments) {
                        attachment = attachment as Attachment;
                        weighted_pictures.push({ weight, url: attachment.proxy_url });
                    }
                }
            }
        }

        // for (var message of messages) {
        //     if (message.attachments.length != 0) {
        //         let emoji = encodeURI(validate_emoji);
        //         let url3 = `${ base_url } / channels / ${ env.DISCORD_CHANNEL_ID } / messages / ${ message.id } / reactions / ${ emoji }`;
        //         let users = await fetch(url3, msgs_init).then((res) => res.json());
        //         await new Promise((f) => setTimeout(f, 1e3));
        //         const is_admin = (user) => user.id === env.VALIDATOR_USER_ID;
        //         if (Array.isArray(users) && users.some(is_admin)) {
        //             const found = message.reactions.find((r) => {
        //                 return r.emoji.name === upvote_emoji;
        //             });
        //             let weight = 1;
        //             if (found) {
        //                 weight = weight + found.count;
        //             }
        //             for (var attachment of message.attachments) {
        //                 weighted_pictures.push({ weight, url: attachment.proxy_url });
        //             }
        //         }
        //     }
        // }
    } while (last_message_id != undefined);

    return weighted_pictures;
}