export const debug = (ctx, next) => {
    console.log(ctx.updateType)
    console.log(ctx.message ?? ctx)
    return next()
}
