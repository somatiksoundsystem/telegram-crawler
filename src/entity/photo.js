import download from "../download.js"

const SAVE_FOLDER = `./data`

export class Photo {
    constructor(photo) {
        /*
          id             Int    @id @default(autoincrement())
          file_unique_id String
          file_id        String
          post_id        Int
          width          Int
          height         Int
          size           Int
         */
        this.data = {
            file_unique_id: photo.file_unique_id,
            file_id: photo.file_id,
            size: photo.file_size,
            width: photo.width,
            height: photo.height
        }
    }

    async download(telegram) {
        const location = `${SAVE_FOLDER}/${this.data.file_unique_id}.jpg`;
        return download(telegram.getFileLink(this.data.file_id), location)
    }

}
