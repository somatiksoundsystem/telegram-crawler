const saveOrUpdateChannelPost = (post, isNew) => {
    console.log(post)
    console.log(`${isNew ? `New` : `Updated`} channel post: ${post.text || post.caption}`)
    return post
}

const getPhotoLinks = async (post, ctx) => {
    if (post && post.photo) {
        const files = post.photo.map((it) => ctx.telegram.getFileLink(it.file_id));
        for await (const file of files) {
            console.log(file)
        }
    }
}

export const post = (ctx) => {
    const update = ctx.update
    let post;
    switch (ctx.updateType) {
        case `channel_post`:
            post = saveOrUpdateChannelPost(update.channel_post, true)
            break
        case `edited_channel_post`:
            post = saveOrUpdateChannelPost(update.edited_channel_post, false)
            break
    }
    getPhotoLinks(post, ctx).catch((e) => console.error(e));
}
