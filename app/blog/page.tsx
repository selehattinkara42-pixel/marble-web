import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Calendar } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Blog & Haberler</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Doğal taş dünyasından en son trendler, bakım ipuçları ve şirketimizden haberler.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                            <article className="bg-background rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                                <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                                    {post.coverImage ? (
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                                            Görsel Yok
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-primary text-sm font-medium mt-auto inline-flex items-center">
                                        Devamını Oku &rarr;
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">Henüz blog yazısı eklenmemiş.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
