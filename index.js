import { Telegraf } from 'telegraf'
import { config as dotenv } from 'dotenv'
import { debug } from './src/debug.js'
import { post } from './src/channel-post.js'
import { init } from "./src/db.js";
import webApp from "./web.js"

dotenv()

const db = await init()
const dbMiddleware = (ctx, next) => {
    ctx.db = db
    return next()
}


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(debug)
bot.use(dbMiddleware)
bot.use(post)

bot.launch().catch((e) => shutdown(e.message))

const me = await bot.telegram.getMe()
console.log(`Bot is started https://t.me/${me.username}!`)

const PORT = 3000
webApp.app.set(`prisma`, db)
webApp.start(PORT)

const shutdown = (reason) => {
    console.log(`Shutting down server. Reason: ${reason}`)

    webApp.stop()
        .then(() => bot.stop(reason))
        .then(() => db.close())
        .catch((e) => {
            console.error(e)
            process.exit(1)
        })
}

// Enable graceful stop
process.once(`SIGINT`, () => shutdown(`SIGINT`))
process.once(`SIGTERM`, () => shutdown(`SIGTERM`))
