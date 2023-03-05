import { isDev } from "../util.js";

const renderError = async (ctx, err) => {
    // render the error page
    ctx.response.status = err.status || 500
    // set locals, only providing error in development
    await ctx.render(`error`, {
        title: `Error`,
        message: err.message,
        error: isDev ? err : {}
    })
}

export const logger = async (ctx, next) => {
    const signature = `${ctx.method} ${ctx.url}`;
    console.log(`> ${signature}`)
    try {
        await next()
    } finally {
        const rt = ctx.response.get('X-Response-Time')
        const status = ctx.status
        const message = `< ${signature} ${status} - ${rt}`;
        if (status !== 200) {
            console.warn(message)
        } else {
            console.log(message)
        }
    }
}

export const responseTime = async (ctx, next) => {
    const start = Date.now()
    try {
        await next()
    } finally {
        const ms = Date.now() - start
        ctx.set('X-Response-Time', `${ms}ms`)
    }
}

export const errorHandler = async (ctx, next) => {
    try {
        await next()
        const status = ctx.status || 404
        if (status === 404) {
            ctx.throw(404)
        }
    } catch (e) {
        await renderError(ctx, e)
    }
}
