import { isDev } from "./util.js";

export const wait = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((e) => renderError(res, e))

export const renderError = (res, err) => {
    // render the error page
    res.status(err.status || 500)
    // set locals, only providing error in development
    res.render(`error`, {
        message: err.message,
        error: isDev ? err : {}
    })
};
