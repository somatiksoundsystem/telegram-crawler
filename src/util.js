import { fileURLToPath } from "node:url";
import path from "node:path";

export const isDev = process.env.NODE_ENV === `development`

export const abort = (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1)
}

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
console.log('directory-name 👉️', __dirname)

export const __root = path.join(__dirname, '..')
console.log('root-directory-name 👉️', __root)

