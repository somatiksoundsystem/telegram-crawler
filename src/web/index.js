import { fileURLToPath } from 'node:url'
import path from 'node:path'

import Koa from 'koa'
import koaStatic from 'koa-static'
import render from '@koa/ejs'

import indexRouter from './routes/index.js'
import fileRouter from './routes/file.js'
import { isDev } from "../util.js";
import { errorHandler, logger, responseTime } from "./middleware.js";

const app = new Koa()

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
console.log('directory-name 👉️', __dirname)

const __root = path.join(__dirname, '../..')
console.log('root-directory-name 👉️', __root)

// view engine setup
render(app, {
    root: path.join(__root, 'views'),
    layout: 'include/layout',
    viewExt: 'ejs',
    cache: !isDev,
    debug: false
});


// logger

app.use(logger)

// x-response-time

app.use(responseTime)

// 404 and error handler
app.use(errorHandler)

app.use(koaStatic(path.join(__root, `public`)))

app.use(indexRouter.routes())
app.use(indexRouter.allowedMethods())
app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())

// error handler
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})


let server
const TIMEOUT = 10000

export default {
    app,
    start: (port) => {
        if (server) throw new Error(`Server is already started on port: ${server.port}`)
        server = app.listen(port, () => console.log(`Server started on port ${port}`))
    },
    stop: (timeout = TIMEOUT) => {
        if (!server) throw new Error(`Server is not started!`)
        return new Promise((resolve, reject) => {
            console.log('Received kill signal, shutting down gracefully')

            const timeoutHandler = setTimeout(
                () => reject(`Could not close connections in ${timeout}ms`),
                timeout)

            server.close(() => {
                console.log('Closed out remaining connections')
                clearTimeout(timeoutHandler)
                resolve()
                server = undefined
            })
        })
    }
}
