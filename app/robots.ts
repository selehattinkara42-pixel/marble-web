import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function robots(): Promise<MetadataRoute.Robots> {
    const settings = await prisma.siteSettings.findFirst()
    const baseUrl = settings?.siteUrl?.replace(/\/$/, "") || 'https://marbleweb.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
