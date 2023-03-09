import Router from '@koa/router'
import { createReadStream } from 'node:fs';
import { access, constants, stat } from 'node:fs/promises';
import { extname } from "node:path";

const router = new Router({
    prefix: '/file'
})

const sendfile = async (ctx, path) => {
    const fStat = await stat(path)
    if (fStat.isFile()) {
        ctx.set(`Content-Length`, fStat.size)
        ctx.type = extname(path)
        ctx.body = createReadStream(path)
    } else {
        ctx.throw(501, `Invalid internal file path`)
    }
}

const filterPostAndFile = async (ctx, next) => {
    const request = ctx.request;
    const path = request.params.path
    console.log(`Path: ${path}`)

    if (!path) {
        ctx.throw(400, `Path is not passed`)
    }

    const [filename, extension] = path.split(`.`)

    if (!extension) {
        ctx.throw(404, `Extension is not provided`)
    }

    if (!([`jpg`, `jpeg`, `png`].find((it) => it === extension.toLowerCase()))) {
        ctx.throw(404, `Invalid extension`)
    }

    if (!filename) {
        ctx.throw(404, `Filename not provided`)
    }

    const [postId, fileUniqueId] = filename.split(`-`)

    if (!postId) {
        ctx.throw(404, `Post id not found`)
    }

    if (!fileUniqueId) {
        ctx.throw(404, `Unique id is not found`)
    }

    request.params.postId = postId
    request.params.fileUniqueId = fileUniqueId

    const db = ctx.app.db
    const post = await db.getPost(parseInt(postId, 10))

    console.log(`post id: ${postId} file unique id: ${fileUniqueId}`)

    if (!post) {
        ctx.throw(404, `Post not found`)
    }

    ctx.state.post = post

    const photoByUniqueId = post.getPhotoByUniqueId(Buffer.from(fileUniqueId, `base64`).toString())

    if (!photoByUniqueId) {
        ctx.throw(404, `Photo not found by id: ${fileUniqueId}`)
    }

    ctx.state.photo = photoByUniqueId


    await next()
}


/* GET home page. */
router.get('/:path', filterPostAndFile, async (ctx) => {
    const params = ctx.request.params
    console.log(`Requesting file: ${params.path}`)


    const photo = ctx.state.photo;
    console.log(photo)

    const filepath = photo.filepath
    let exists
    try {
        await access(filepath, constants.R_OK)
        console.log(`Photo found on disk`)
        exists = true
    } catch {
        exists = false
    }

    if (!exists) {
        console.log(`Download photo`)

        const bot = ctx.app.bot
        if (!bot) {
            ctx.throw(500, `Bot is not started fail to download image`)
        }
        console.log(bot)
        await photo.download(bot.telegram)
    }

    return sendfile(ctx, filepath)
})

export default router
