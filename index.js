import {Telegraf} from "telegraf"
import {config as dotenv} from "dotenv"

dotenv()

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use((ctx, next) => {
    console.log(ctx.updateType)
    console.log(ctx.message ?? ctx)
    return next()
})


bot.launch().catch((e) => {
    console.error(e.message)
    console.error(e)

    process.exit(1)
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

const me = await bot.telegram.getMe()
console.log(`Bot is started https://t.me/${me.username}!`)