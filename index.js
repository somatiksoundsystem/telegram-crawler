import { config as dotenv } from 'dotenv'
import { init } from "./src/db/index.js";
import webApp from "./src/web/index.js"
import telegram from "./src/bot/index.js"
import { abort } from "./src/util.js";

dotenv()

let bot = undefined

const shutdown = async (reason) => {
    console.log(`Shutting down server. Reason: ${reason}`)

    if (bot) {
        await bot.stop(reason)
    }

    await webApp.stop(5000)
    await db.close()

    process.exit(0)
}

const db = await init()

const token = process.env.BOT_TOKEN;
if (token) {
    bot = await telegram(db).catch((e) => shutdown(e.message))
} else {
    console.warn(`BOT_TOKEN is not passed. Didn't start bot service`)
}


const PORT = 3000
webApp.app.db = db
webApp.app.bot = bot
webApp.start(PORT)


// Enable graceful stop
process.on(`SIGINT`, () => shutdown(`SIGINT`).catch(abort))
process.on(`SIGTERM`, () => shutdown(`SIGTERM`).catch(abort))

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p)
    })
    .on('uncaughtException', abort)
