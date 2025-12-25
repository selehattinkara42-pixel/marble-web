import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { createCategory, deleteCategory } from "./actions"
import { Plus, Trash2, Edit, Package } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } },
        orderBy: { name: 'asc' }
    })

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Kategori Yönetimi</h1>
                    <p className="text-muted-foreground mt-1">Ürün kategorilerini ekleyin, düzenleyin veya silin.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Category Form */}
                <div className="lg:col-span-1">
                    <div className="bg-background p-6 rounded-xl shadow-sm border border-border sticky top-8">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Yeni Kategori Ekle
                        </h2>
                        <form action={createCategory} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Kategori Adı</label>
                                <input
                                    name="name"
                                    required
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Örn: Mermer"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Slug (URL)</label>
                                <input
                                    name="slug"
                                    required
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="ornek-kategori"
                                />
                                <p className="text-xs text-muted-foreground mt-1">URL'de kullanılacak, boşluksuz ve küçük harf.</p>
                            </div>
                            <Button type="submit" className="w-full">Ekle</Button>
                        </form>
                    </div>
                </div>

                {/* Category List */}
                <div className="lg:col-span-2">
                    <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Kategori Adı</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Slug</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase">Ürün Sayısı</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-muted/50">
                                        <td className="px-6 py-4 font-medium">{category.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground text-sm">{category.slug}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                <Package className="w-3 h-3" />
                                                {category._count.products}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/categories/${category.id}/edit`}
                                                    className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                {category._count.products === 0 && (
                                                    <form action={deleteCategory.bind(null, category.id)}>
                                                        <button className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                            Henüz kategori eklenmemiş.
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
