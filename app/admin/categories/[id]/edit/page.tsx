import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { updateCategory } from "../../actions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditCategoryPageProps {
    params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
    const { id } = await params

    const category = await prisma.category.findUnique({
        where: { id }
    })

    if (!category) {
        notFound()
    }

    async function handleUpdate(formData: FormData) {
        "use server"
        await updateCategory(id, formData)
        redirect("/admin/categories")
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Link href="/admin/categories" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kategorilere Dön
            </Link>

            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                <h1 className="text-2xl font-bold mb-6">Kategori Düzenle</h1>

                <form action={handleUpdate} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Kategori Adı</label>
                        <input
                            name="name"
                            required
                            defaultValue={category.name}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Slug (URL)</label>
                        <input
                            name="slug"
                            required
                            defaultValue={category.slug}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">Kaydet</Button>
                        <Button type="button" variant="outline" asChild className="flex-1">
                            <Link href="/admin/categories">İptal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
