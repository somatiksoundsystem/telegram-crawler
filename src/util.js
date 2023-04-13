import { fileURLToPath } from "node:url";
import path from "node:path";

export const isDev = process.env.NODE_ENV === `development`

export const abort = (err) => {
    printError(err)
    process.exit(1)
}

export const printError = (e) => {
    if (!e) {
        console.error(`Error happened but details wasn't provided`)
        console.trace(`Handler stacktrace`)
    }
    console.error(e, `Uncaught Exception thrown`)
}

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
console.log('directory-name 👉️', __dirname)

export const __root = path.join(__dirname, '..')
console.log('root-directory-name 👉️', __root)

