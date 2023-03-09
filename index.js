import { config as dotenv } from 'dotenv'
import { init } from "./src/db/index.js";
import webApp from "./src/web/index.js"
import telegram from "./src/bot/index.js"

dotenv()

const db = await init()

// const bot = telegram(db).catch((e) => shutdown(e.message))

const PORT = 3000
webApp.app.db = db
webApp.start(PORT)

const shutdown = (reason) => {
    console.log(`Shutting down server. Reason: ${reason}`)

    process.exit(0)
}

// Enable graceful stop
process.once(`SIGINT`, () => shutdown(`SIGINT`))
process.once(`SIGTERM`, () => shutdown(`SIGTERM`))

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p)
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1)
    });
