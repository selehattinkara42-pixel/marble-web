import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await prisma.blogPost.findUnique({
        where: { slug },
    })

    if (!post) {
        return { title: "Yazı Bulunamadı" }
    }

    return {
        title: `${post.title} | Blog`,
        description: post.excerpt || post.content.substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : [],
            type: "article",
            publishedTime: post.createdAt.toISOString(),
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            images: post.coverImage ? [post.coverImage] : [],
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    })

    if (!post || !post.published) {
        notFound()
    }

    // Get related posts
    const relatedPosts = await prisma.blogPost.findMany({
        where: {
            id: { not: post.id },
            published: true,
        },
        take: 3,
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <article className="container mx-auto px-4 md:px-6 max-w-4xl">
                <Breadcrumbs />
                <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Blog'a Dön
                </Link>

                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                        {post.title}
                    </h1>
                    {post.coverImage && (
                        <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-lg">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </header>

                <div className="prose prose-base md:prose-lg dark:prose-invert mx-auto max-w-none prose-img:rounded-xl prose-img:w-full prose-headings:font-serif">
                    {post.excerpt && (
                        <div className="bg-muted p-6 rounded-lg mb-8 border-l-4 border-primary">
                            <p className="text-lg md:text-xl font-medium italic text-foreground m-0">
                                {post.excerpt}
                            </p>
                        </div>
                    )}
                    <div className="[&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-base md:[&>p]:text-lg [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 whitespace-normal break-words [word-break:normal] hyphens-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="container mx-auto px-4 md:px-6 max-w-6xl mt-24">
                    <h2 className="text-2xl font-serif font-bold mb-8 text-center">Diğer Yazılar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map((p) => (
                            <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                                <div className="aspect-video rounded-xl overflow-hidden bg-muted mb-4">
                                    {p.coverImage ? (
                                        <img
                                            src={p.coverImage}
                                            alt={p.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            Görsel Yok
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {new Date(p.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
