import https from "node:https"
import fs from "node:fs"

const download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest)
    https.get(url, function (response) {
        console.log('statusCode:', response.statusCode)
        console.log('headers:', response.headers)

        response.pipe(file)
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        })
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest, (err) => {
            if (err) return cb(err)
            console.log(`${dest} was deleted`)
        })
        if (cb) cb(err)
    })
}

export default async (url, dest) => new Promise((success, reject) => {
    download(url, dest, (err) => {
        if (err) return reject(err)
        success()
    })
})
