import { Telegraf } from "telegraf";
import { debug } from "./middleware/debug.js";
import { post } from "./middleware/channel-post.js";
import { abort } from "../util.js";

export default async (db, token = process.env.BOT_TOKEN) => {
    const dbMiddleware = (ctx, next) => {
        ctx.db = db
        return next()
    }

    const bot = new Telegraf(token)

    bot.use(debug)
    bot.use(dbMiddleware)
    bot.use(post)

    bot.launch().catch(abort)

    const me = await bot.telegram.getMe()
    console.log(`Bot is started https://t.me/${me.username}!`)

    return bot
}
