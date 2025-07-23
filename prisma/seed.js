import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const products = [
        {
            title: "The Best of Irish Country",
            artist: "Various Artists",
            description: "A collection of Ireland's finest country music spanning four decades",
            price: 15.99,
            category: "Irish Country",
            stock: 10,
            featured: true
        },
        {
            title: "Traditional Irish Fiddle Music",
            artist: "Kevin Burke",
            description: "Authentic fiddle tunes from County Sligo",
            price: 18.99,
            category: "Traditional",
            stock: 5,
            featured: true
        },
        {
            title: "Celtic Folk Tales",
            artist: "The Dubliners",
            description: "Stories and songs from the heart of Dublin",
            price: 16.99,
            category: "Folk",
            stock: 8,
            featured: false
        },
        {
            title: "Songs of Kells",
            artist: "Meath Traditional Ensemble",
            description: "Music from George's hometown in County Meath",
            price: 19.99,
            category: "Traditional",
            stock: 3,
            featured: true
        },
        {
            title: "Wexford Melodies",
            artist: "Coastal Irish Band",
            description: "Beautiful sounds from Ireland's Ancient East",
            price: 17.50,
            category: "Folk",
            stock: 7,
            featured: false
        }
    ]

    for (const product of products) {
        await prisma.product.create({ data: product })
    }

    console.log('Added sample Irish music products!')
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())