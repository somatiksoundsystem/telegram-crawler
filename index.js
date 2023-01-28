import { Telegraf } from 'telegraf'
import { config as dotenv } from 'dotenv'
import { debug } from './src/debug.js'
import { post } from './src/channel-post.js'
import { closeDatabase, middleware } from "./src/db.js";

dotenv()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(debug)
bot.use(middleware)
bot.use(post)

const finish = (reason) => {
    closeDatabase(reason)
        .then(() => bot.stop(reason))
        .catch((e) => {
            console.error(e)
            bot.stop(reason)
        })
}

bot.launch().catch((e) => finish(e.message))

// Enable graceful stop
process.once(`SIGINT`, () => finish(`SIGINT`))
process.once(`SIGTERM`, () => finish(`SIGTERM`))

const me = await bot.telegram.getMe()
console.log(`Bot is started https://t.me/${me.username}!`)
