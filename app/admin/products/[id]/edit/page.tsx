import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { updateProduct } from "../../actions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditProductPageProps {
    params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params

    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
    })

    const categories = await prisma.category.findMany()

    if (!product) {
        notFound()
    }

    async function handleUpdate(formData: FormData) {
        "use server"
        await updateProduct(id, formData)
        redirect("/admin/products")
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Link href="/admin/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ürünlere Dön
            </Link>

            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                <h1 className="text-2xl font-bold mb-6">Ürün Düzenle</h1>

                <form action={handleUpdate} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Ürün Adı</label>
                        <input
                            name="name"
                            required
                            defaultValue={product.name}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Slug (URL)</label>
                        <input
                            name="slug"
                            required
                            defaultValue={product.slug}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Kategori</label>
                        <select
                            name="categoryId"
                            required
                            defaultValue={product.categoryId}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        >
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Görsel (Değiştirmek için yükleyin)</label>
                        <input type="file" name="image" accept="image/*" className="w-full" />
                        {product.imageUrl && (
                            <div className="mt-2">
                                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Açıklama</label>
                        <textarea
                            name="description"
                            rows={3}
                            defaultValue={product.description || ""}
                            className="w-full p-3 rounded-md border border-input bg-background"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="featured" id="featured" defaultChecked={product.featured} />
                        <label htmlFor="featured" className="text-sm font-medium">Öne Çıkan</label>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">Kaydet</Button>
                        <Button type="button" variant="outline" asChild className="flex-1">
                            <Link href="/admin/products">İptal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
