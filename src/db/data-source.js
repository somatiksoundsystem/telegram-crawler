import { DataSource } from "typeorm";
import { Post } from "./entity/post.js";

export default new DataSource({
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
