
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const settings = await prisma.siteSettings.findFirst()
    if (!settings) {
        console.log('No settings found')
        return
    }

    if (settings.logoUrl) {
        await prisma.siteSettings.update({
            where: { id: settings.id },
            data: {
                faviconUrl: settings.logoUrl
            }
        })
        console.log('Favicon updated to match Logo URL:', settings.logoUrl)
    } else {
        console.log('No logo URL found to copy')
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
