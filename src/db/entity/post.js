import { EntitySchema } from "typeorm";
import { Photo } from "./photo.js";

export class Post {
    constructor(telegram_id, content, signature, date) {
        Object.assign(this, { telegram_id, content, signature, date: new Date(date * 1000) })
    }

    get text() {
        return this.content.text || this.content.caption
    }

    get entities() {
        return this.content.entities || this.content.caption_entities || []
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

    get photos() {
        const photos = this.content.photo ?? []
        return photos.map((it) => new Photo(it, this))
    }

    get photo() {
        console.log(`photos`)
        const photos = this.photos
        if (photos.length < 1) return undefined

        const smallest = photos[0] // <= 90px
        const small = photos[1] // <= 320px
        const medium = photos[2] // <= 800px
        const large = photos[3] // <= 1280px
        return `<img srcset="${smallest.url} 90w,
                             ${small.url} 320w,
                             ${medium.url} 800w,
                             ${large.url} 1280w"
                     sizes="(max-width: 320px) 90px,
                            (max-width: 800px) 320px,
                            (max-width: 1280px) 800px,
                            1280px"
             src="${large.url}" alt="${this.text}"> `
    }

    getPhotoByUniqueId(id) {
        return this.photos.filter((it) => it.uniqueId === id)[0]
    }

    static get schema() {
        return new EntitySchema({
            name: "Post",
            tableName: "Post",
            target: Post,
            columns: {
                id: {
                    type: "int",
                    primary: true,
                    generated: true
                },
                telegram_id: {
                    type: "bigint"
                },
                content: {
                    type: "json"
                },
                signature: {
                    type: "text"
                },
                date: {
                    type: "timestamp"
                }
            }
        })
    }

}
