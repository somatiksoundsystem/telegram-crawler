const saveOrUpdateChannelPost = (post, isNew) => {
    console.log(post)
    console.log(`${isNew ? `New` : `Updated`} channel post: ${post.text}`)
}

export const post = (ctx) => {
    const update = ctx.update
    switch (ctx.updateType) {
        case `channel_post`:
            saveOrUpdateChannelPost(update.channel_post, true)
            break
        case `edited_channel_post`:
            saveOrUpdateChannelPost(update.edited_channel_post, false)
            break
    }
}
