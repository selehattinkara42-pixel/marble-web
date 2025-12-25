import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { createProduct, deleteProduct } from "./actions"
import { Plus, Trash2, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    })

    const categories = await prisma.category.findMany()

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Product Form */}
                <div className="lg:col-span-1">
                    <div className="bg-background p-6 rounded-xl shadow-sm border border-border sticky top-8">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Yeni Ürün Ekle
                        </h2>
                        <form action={createProduct} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Ürün Adı</label>
                                <input name="name" required className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Slug (URL)</label>
                                <input name="slug" required className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="ornek-urun-adi" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Kategori</label>
                                <select name="categoryId" required className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Görsel Yükle</label>
                                <input type="file" name="image" accept="image/*" required className="w-full" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Açıklama</label>
                                <textarea name="description" rows={3} className="w-full p-3 rounded-md border border-input bg-background" />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="featured" id="featured" />
                                <label htmlFor="featured" className="text-sm font-medium">Öne Çıkan</label>
                            </div>
                            <Button type="submit" className="w-full">Ekle</Button>
                        </form>
                    </div>
                </div>

                {/* Product List */}
                <div className="lg:col-span-2">
                    <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Görsel</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Ad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Kategori</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-muted/50">
                                        <td className="px-6 py-4">
                                            <div className="relative w-12 h-12 rounded-md overflow-hidden">
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{product.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{product.category.name}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <form action={deleteProduct.bind(null, product.id)}>
                                                    <button className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
