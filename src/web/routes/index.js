import Router from '@koa/router'

const router = new Router()

/* GET home page. */
router.get('/', async (ctx) => {
    const db = ctx.app.db
    console.log(`Database is ${db ? `defined` : `undefined`}`)
    await ctx.render('index', { title: 'Express', posts: await db.getPosts() })
})

export default router
