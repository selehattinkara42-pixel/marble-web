import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { updateBlogPost } from "../../actions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditBlogPageProps {
    params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
    const { id } = await params

    const post = await prisma.blogPost.findUnique({
        where: { id }
    })

    if (!post) {
        notFound()
    }

    async function handleUpdate(formData: FormData) {
        "use server"
        await updateBlogPost(id, formData)
        redirect("/admin/blog")
    }

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <Link href="/admin/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog Yazılarına Dön
            </Link>

            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                <h1 className="text-2xl font-bold mb-6">Blog Yazısı Düzenle</h1>

                <form action={handleUpdate} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Başlık</label>
                        <input
                            name="title"
                            required
                            defaultValue={post.title}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Slug (URL)</label>
                        <input
                            name="slug"
                            required
                            defaultValue={post.slug}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Özet</label>
                        <textarea
                            name="excerpt"
                            rows={2}
                            defaultValue={post.excerpt || ""}
                            className="w-full p-3 rounded-md border border-input bg-background"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Kapak Görseli (Değiştirmek için yükleyin)</label>
                        <input type="file" name="image" accept="image/*" className="w-full" />
                        {post.coverImage && (
                            <div className="mt-2">
                                <img src={post.coverImage} alt={post.title} className="w-32 h-20 object-cover rounded-md" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">İçerik</label>
                        <textarea
                            name="content"
                            rows={12}
                            required
                            defaultValue={post.content}
                            className="w-full p-3 rounded-md border border-input bg-background font-mono text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="published" id="published" defaultChecked={post.published} />
                        <label htmlFor="published" className="text-sm font-medium">Yayınla</label>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">Kaydet</Button>
                        <Button type="button" variant="outline" asChild className="flex-1">
                            <Link href="/admin/blog">İptal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
