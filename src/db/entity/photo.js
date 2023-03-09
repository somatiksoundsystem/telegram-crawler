import download from "../../download.js"

const SAVE_FOLDER = `./data`

export class Photo {
    constructor(photo) {
        Object.assign(this, photo)
    }

    get url() {
        return `file/${this.file_unique_id}-${this.width}.jpg`
    }

    async download(telegram) {
        const location = `${SAVE_FOLDER}/${this.file_unique_id}.jpg`;
        return download(telegram.getFileLink(this.file_id), location)
    }

}
