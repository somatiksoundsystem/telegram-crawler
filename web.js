import createError from 'http-errors'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import {fileURLToPath} from 'url'

import indexRouter from './routes/index.js'
import { renderError } from "./src/express.js";

const app = express()

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)
console.log('directory-name 👉️', __dirname)

// view engine setup
app.set(`views`, path.join(__dirname, `views`))
app.set(`view engine`, `ejs`)

app.use(logger(`dev`))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, `public`)))

app.use(`/`, indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, _next) => renderError(res, err))

export default app
