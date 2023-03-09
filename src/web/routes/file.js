import Router from '@koa/router'

const router = new Router({
    prefix: '/file'
})

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
    const post =  await db.getPost(parseInt(postId, 10))

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



    console.log(ctx.state.photo)
    ctx.throw(501, `File handling is not implemented [${params.path}]`)
})

export default router
