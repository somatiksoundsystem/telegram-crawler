import { isDev } from "./util.js";

export const wait = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((e) => renderError(res, e))

export const renderError = async (ctx, err) => {
    // render the error page
    ctx.response.status = err.status || 500
    // set locals, only providing error in development
    await ctx.render(`error`, {
        title: `Error`,
        message: err.message,
        error: isDev ? err : {}
    })
};
