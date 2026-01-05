import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { createBlogPost, deleteBlogPost } from "./actions"
import { Plus, Trash2, Eye, Edit } from "lucide-react"
import Link from "next/link"
import RichTextEditor from "@/components/admin/RichTextEditor"
import ImageUpload from "@/components/admin/ImageUpload"
import Image from "next/image"

export const dynamic = 'force-dynamic'

export default async function BlogAdminPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Blog Yönetimi</h1>
                    <p className="text-muted-foreground mt-1">Haberler, makaleler ve duyurular.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Post Form */}
                <div className="lg:col-span-1">
                    <div className="bg-background p-6 rounded-xl shadow-sm border border-border sticky top-8">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Yeni Yazı Ekle
                        </h2>
                        <form action={createBlogPost} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Başlık</label>
                                <input name="title" required className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Slug (URL)</label>
                                <input name="slug" required className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="ornek-yazi-basligi" />
                            </div>
                            <div>
                                <ImageUpload name="coverImage" label="Kapak Görseli" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">SEO Başlık (İsteğe Bağlı)</label>
                                <input name="seoTitle" className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="Google'da görünecek başlık" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">SEO Açıklama (İsteğe Bağlı)</label>
                                <textarea name="seoDescription" rows={2} className="w-full p-3 rounded-md border border-input bg-background" placeholder="Google'da görünecek açıklama" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Özet (Kısa Açıklama)</label>
                                <textarea name="excerpt" rows={2} className="w-full p-3 rounded-md border border-input bg-background" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">İçerik</label>
                                <RichTextEditor name="content" />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="published" id="published" defaultChecked />
                                <label htmlFor="published" className="text-sm font-medium">Yayınla</label>
                            </div>
                            <Button type="submit" className="w-full">Ekle</Button>
                        </form>
                    </div>
                </div>

                {/* Post List */}
                <div className="lg:col-span-2">
                    <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Görsel</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Başlık</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Durum</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-muted/50">
                                        <td className="px-6 py-4">
                                            {post.coverImage && (
                                                <div className="relative w-12 h-12 rounded-md overflow-hidden">
                                                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{post.title}</div>
                                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">{post.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.published ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Yayında
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Taslak
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/blog/${post.id}/edit`} className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <Link href={`/blog/${post.slug}`} target="_blank" className="text-green-600 hover:bg-green-100 p-2 rounded-md transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <form action={deleteBlogPost.bind(null, post.id)}>
                                                    <button className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                            Henüz blog yazısı yok.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
