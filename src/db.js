import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const savePost = async (post) => {
    const data = {
        ...post.data,
    }

    if (post.photos) {
        data.photos = {
            create: post.photos.map((it) => it.data)
        }
    }

    const newPost = await prisma.post.create({
        data: data,
        include: {
            photos: true,
        },
    })

    console.log(`Created a new post: `, newPost)

    return newPost
}

prisma.savePost = savePost

export const closeDatabase = () => prisma.$disconnect()

export const middleware = (ctx, next) => {
    ctx.prisma = prisma
    return next()
}


