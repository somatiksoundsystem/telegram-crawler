import download from "../../download.js"

const SAVE_FOLDER = `./data`

/**
 * @property {string} file_unique_id - unique file id
 */
export class Photo {
    constructor(photo, parent) {
        Object.assign(this, photo)
        this.parent = parent;
    }

    get url() {
        return `file/${this.parent.id}-${Buffer.from(this.file_unique_id).toString(`base64`)}.jpg`
    }

    async download(telegram) {
        const location = `${SAVE_FOLDER}/${this.file_unique_id}.jpg`;
        return download(telegram.getFileLink(this.file_id), location)
    }

}
