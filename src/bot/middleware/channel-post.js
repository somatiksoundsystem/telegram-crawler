import { Post } from "../../db/entity/post.js";
import { writeFile } from "node:fs/promises"
import { __root, isDev, printError } from "../../util.js";

const printChannelPostInfo = (post, isNew) => {
    console.log(post)
    console.log(`${isNew ? `New` : `Updated`} channel post: ${post.text || post.caption}`)
    return post
}

export const post = (ctx) => {
    const update = ctx.update
    const db = ctx.db
    // TODO: collect updates for tests and remove
    if (isDev) {
        writeFile(`${__root}/${ctx.updateType}.json`, ctx, `utf8`).catch(printError)
    }
    switch (ctx.updateType) {
        case `channel_post`:
            const post = update.channel_post;
            printChannelPostInfo(post, true)
            const myPost = new Post(post.message_id, post, post.author_signature, post.date)
            db.savePost(myPost).catch((e) => console.error(e))
            break
        case `edited_channel_post`:
            printChannelPostInfo(update.edited_channel_post, false)
            break
    }
}
