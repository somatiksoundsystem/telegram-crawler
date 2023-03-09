import download from "../../download.js"
import { __root } from "../../util.js";

const SAVE_FOLDER = `data`

const base64 = text => Buffer.from(text).toString(`base64`);

/**
 * @property {string} file_unique_id - unique file id
 */
export class Photo {
    constructor(photo, parent) {
        Object.assign(this, photo)
        this.parent = parent;
    }

    get url() {
        return `file/${this.parent.id}-${base64(this.file_unique_id)}.jpg`
    }

    get filepath() {
        return `${__root}/${SAVE_FOLDER}/${base64(this.file_unique_id)}.jpg`;
    }

    async download(telegram) {
        const location = this.filepath;
        return download(await telegram.getFileLink(this.file_id), location)
    }


}
