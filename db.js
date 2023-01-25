import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
    // Retrieve all published posts
    const allPosts = await prisma.post.findMany({
        where: { published: true },
    })
    console.log(`Retrieved all published posts: `, allPosts)

    // Create a new post (written by an already existing user with email alice@prisma.io)
    const newPost = await prisma.post.create({
        data: {
            title: 'Join the Prisma Slack community',
            content: 'http://slack.prisma.io',
            published: false,
        },
    })
    console.log(`Created a new post: `, newPost)

    // Publish the new post
    const updatedPost = await prisma.post.update({
        where: {
            id: newPost.id,
        },
        data: {
            published: true,
        },
    })
    console.log(`Published the newly created post: `, updatedPost)

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
