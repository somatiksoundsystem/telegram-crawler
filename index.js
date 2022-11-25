import {Telegraf} from 'telegraf'
import {config as dotenv} from 'dotenv'
import {debug} from './src/debug.js'
import {post} from './src/channel-post.js'

dotenv()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(debug)
bot.use(post)

bot.launch().catch((e) => bot.stop(e.message))

// Enable graceful stop
process.once(`SIGINT`, () => bot.stop(`SIGINT`))
process.once(`SIGTERM`, () => bot.stop(`SIGTERM`))

const me = await bot.telegram.getMe()
console.log(`Bot is started https://t.me/${me.username}!`)