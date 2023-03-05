import { Telegraf } from "telegraf";
import { debug } from "./middleware/debug.js";
import { post } from "./middleware/channel-post.js";

export default async (db) => {
    const dbMiddleware = (ctx, next) => {
        ctx.db = db
        return next()
    }

    const bot = new Telegraf(process.env.BOT_TOKEN)

    bot.use(debug)
    bot.use(dbMiddleware)
    bot.use(post)

    await bot.launch()

    const me = await bot.telegram.getMe()
    console.log(`Bot is started https://t.me/${me.username}!`)

    return (reason) => bot.stop(reason)
}
