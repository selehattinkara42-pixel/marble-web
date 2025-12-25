import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Package, FolderOpen, FileText } from "lucide-react"

export const dynamic = 'force-dynamic'

interface SearchPageProps {
    searchParams: Promise<{ q: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams
    const query = q || ""

    if (!query) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Arama terimi girilmedi.</h1>
                    <p className="text-muted-foreground">Lütfen aramak istediğiniz kelimeyi yazın.</p>
                </div>
            </div>
        )
    }

    const [products, projects, posts] = await Promise.all([
        prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { description: { contains: query } },
                ]
            },
            include: { category: true }
        }),
        prisma.project.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                    { location: { contains: query } },
                ]
            }
        }),
        prisma.blogPost.findMany({
            where: {
                published: true,
                OR: [
                    { title: { contains: query } },
                    { content: { contains: query } },
                    { excerpt: { contains: query } },
                ]
            }
        })
    ])

    const hasResults = products.length > 0 || projects.length > 0 || posts.length > 0

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl font-serif font-bold mb-8">
                    "{query}" için arama sonuçları
                </h1>

                {!hasResults && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p className="text-xl">Sonuç bulunamadı.</p>
                        <p className="mt-2">Farklı anahtar kelimelerle tekrar deneyin.</p>
                    </div>
                )}

                <div className="space-y-12">
                    {products.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Package className="w-6 h-6" /> Ürünler
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map(product => (
                                    <Link key={product.id} href={`/collections/${product.slug}`} className="group block">
                                        <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        </div>
                                        <h3 className="font-medium group-hover:text-primary transition-colors">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground">{product.category.name}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <FolderOpen className="w-6 h-6" /> Projeler
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map(project => (
                                    <Link key={project.id} href={`/projects`} className="group block">
                                        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3">
                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        </div>
                                        <h3 className="font-medium group-hover:text-primary transition-colors">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground">{project.location}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {posts.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <FileText className="w-6 h-6" /> Blog Yazıları
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {posts.map(post => (
                                    <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                                        <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden mb-3">
                                            {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />}
                                        </div>
                                        <h3 className="font-medium group-hover:text-primary transition-colors">{post.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
