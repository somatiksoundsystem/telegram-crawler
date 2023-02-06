import { Post } from "./entity/post.js";

const printChannelPostInfo = (post, isNew) => {
    console.log(post)
    console.log(`${isNew ? `New` : `Updated`} channel post: ${post.text || post.caption}`)
    return post
}

export const post = (ctx) => {
    const update = ctx.update
    const db = ctx.prisma
    switch (ctx.updateType) {
        case `channel_post`:
            printChannelPostInfo(update.channel_post, true)
            const myPost = new Post(update.channel_post)
            db.savePost(myPost).catch((e) => console.error(e))
            break
        case `edited_channel_post`:
            printChannelPostInfo(update.edited_channel_post, false)
            break
    }
}
