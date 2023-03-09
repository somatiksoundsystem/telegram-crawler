import download from "../../download.js"

const SAVE_FOLDER = `./data`

export class Photo {
    constructor(photo, parent) {
        Object.assign(this, photo)
        this.parent = parent;
    }

    get url() {
        return `file/${this.parent.telegram_id}-${this.file_unique_id}.jpg`
    }

    async download(telegram) {
        const location = `${SAVE_FOLDER}/${this.file_unique_id}.jpg`;
        return download(telegram.getFileLink(this.file_id), location)
    }

}
