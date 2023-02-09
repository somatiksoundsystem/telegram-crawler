import { EntitySchema } from "typeorm";

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
