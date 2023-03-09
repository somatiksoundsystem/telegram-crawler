export const isDev = process.env.NODE_ENV === `development`

export const abort = (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1)
}
