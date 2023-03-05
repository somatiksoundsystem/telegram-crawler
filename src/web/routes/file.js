import Router from '@koa/router'

const router = new Router({
    prefix: '/file'
})

/* GET home page. */
router.get('/:path', async (ctx) => {
    const db = ctx.app.db
    console.log(`Prisma is ${db ? `defined` : `undefined`}`)
    await ctx.render('index', { title: 'Express', posts: await db.getPosts() })
})

export default router
