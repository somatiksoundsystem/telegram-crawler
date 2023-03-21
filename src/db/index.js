import { Post } from "./entity/post.js";
import source from "./data-source.js"

export const init = async () => {
    const connection = await source.initialize()

    return {
        async savePost(post) {
            const repository = connection.getRepository(Post)

            const saved = await repository.save(post);

            console.log(`Created a new post: `, saved)

            return saved
        },
        async getPosts() {
            return connection.getRepository(Post).find()
        },
        async getPost(id) {
            return connection.getRepository(Post).findOneBy({id})
        },
        async close() {
            console.log(`Closing db...`)
            return source.destroy()
        }
    }
}
