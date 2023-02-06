import { Photo } from "./photo.js";

export class Post {
    constructor(post) {
        this.post = post
        /*
          id          Int      @id @default(autoincrement())
          telegram_id BigInt
          text        String
          signature   String?
          date        DateTime
         */
        this.data = {
            telegram_id: post.message_id,
            signature: post.author_signature,
            date: new Date(post.date),
            content: post
        }

        this.photos = post.photo?.map((it) => new Photo(it))
    }

    get text() {
        return this.post.text || this.post.caption
    }

    get entities() {
        return this.post.entities || this.post.caption_entities || []
    }

    get html() {
        const text = this.text
        const entities = this.entities

        const parts = []

        let last = 0
        for (const entity of entities) {
            const before = text.substring(last, entity.offset)
            console.log(`Before: "${before}"`)
            parts.push(before)

            last = entity.offset + entity.length
            let content = text.substring(entity.offset, last)

            switch (entity.type) {
                case 'text_link':
                case 'url':
                    const url = entity.url
                    content = `<a href="${url || content}" target="_blank">${content}</a>`
            }
            console.log(`Content: ${content}`)
            parts.push(content)
        }
        parts.push(text.substring(last, text.length))
        const html = parts.join(``).replaceAll(`\n`, `<br>`)

        console.log(`HTML: ${html}`)

        return html
    }

}
