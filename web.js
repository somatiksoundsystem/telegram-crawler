import { fileURLToPath } from 'node:url'
import path from 'node:path'

import indexRouter from './routes/index.js'
import fileRouter from './routes/file.js'
import { renderError } from "./src/express.js";
import { isDev } from "./src/util.js";
import koaStatic from 'koa-static'

import Koa from 'koa'
import render from '@koa/ejs'

const app = new Koa()

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
console.log('directory-name 👉️', __dirname)

// view engine setup
render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'include/layout',
    viewExt: 'ejs',
    cache: !isDev,
    debug: isDev
});


// logger

app.use(async (ctx, next) => {
    try {
        await next()
    } finally {
        const rt = ctx.response.get('X-Response-Time');
        console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    }
})

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    try {
        await next()
    } finally {
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    }
});

app.use(koaStatic(path.join(__dirname, `public`)))

app.use(indexRouter.routes())
app.use(indexRouter.allowedMethods())
app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())

// error handler
app.on('error', async (err, ctx) => {
    console.error('server error', err, ctx)
    await renderError(ctx, err)
});


let server
const TIMEOUT = 10000

export default {
    app,
    start: (port) => {
        if (server) throw new Error(`Server is already started on port: ${server.port}`)
        server = app.listen(port, () => console.log(`Server started on port ${port}`))
    },
    stop: () => {
        if (!server) throw new Error(`Server is not started!`)
        return new Promise((resolve, reject) => {
            console.log('Received kill signal, shutting down gracefully')

            const timeout = setTimeout(
                () => reject(`Could not close connections in ${TIMEOUT}ms`),
                TIMEOUT)

            server.close(() => {
                console.log('Closed out remaining connections')
                clearTimeout(timeout)
                resolve()
                server = undefined
            })
        })
    }
}
