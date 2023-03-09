import { DataSource } from "typeorm";
import { Post } from "./entity/post.js";

export const init = async () => {
    const dataSource = new DataSource({
        type: "mysql",
        host: process.env.DB_HOSTNAME,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: true,
        entities: [Post.schema],
        subscribers: [],
        migrations: [],
        extra: {
            charset: "utf8mb4_unicode_ci"
        },
    })

    const connection = await dataSource.initialize()

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
        async close() {
            console.log(`Closing db...`)
            return dataSource.destroy()
        }
    }
}
