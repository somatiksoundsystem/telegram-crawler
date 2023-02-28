import express from 'express'
import { wait } from "../src/express.js";

const router = express.Router()

/* GET home page. */
router.get('/:path', wait(async (req, res) => {
    res.send(req.params.path)
    const prisma = req.app.get(`prisma`)
    console.log(`Prisma is ${prisma ? `defined` : `undefined`}`)
    res.render('index', { title: 'Express', posts: await prisma.getPosts() })
}))

export default router