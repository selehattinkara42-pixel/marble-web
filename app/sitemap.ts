import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://marbleweb.com' // Replace with actual domain

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/collections',
        '/projects',
        '/blog',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic pages
    const products = await prisma.product.findMany()
    const productUrls = products.map((product) => ({
        url: `${baseUrl}/collections/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    const projects = await prisma.project.findMany()
    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const posts = await prisma.blogPost.findMany({ where: { published: true } })
    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...staticPages, ...productUrls, ...projectUrls, ...postUrls]
}
