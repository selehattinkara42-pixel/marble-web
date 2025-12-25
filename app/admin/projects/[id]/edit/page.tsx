import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { updateProject } from "../../actions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditProjectPageProps {
    params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { id } = await params

    const project = await prisma.project.findUnique({
        where: { id }
    })

    if (!project) {
        notFound()
    }

    async function handleUpdate(formData: FormData) {
        "use server"
        await updateProject(id, formData)
        redirect("/admin/projects")
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Link href="/admin/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Projelere Dön
            </Link>

            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                <h1 className="text-2xl font-bold mb-6">Proje Düzenle</h1>

                <form action={handleUpdate} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Proje Adı</label>
                        <input
                            name="title"
                            required
                            defaultValue={project.title}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Slug (URL)</label>
                        <input
                            name="slug"
                            required
                            defaultValue={project.slug}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Konum</label>
                            <input
                                name="location"
                                defaultValue={project.location || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Yıl</label>
                            <input
                                name="year"
                                type="number"
                                defaultValue={project.year || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Görsel (Değiştirmek için yükleyin)</label>
                        <input type="file" name="image" accept="image/*" className="w-full" />
                        {project.imageUrl && (
                            <div className="mt-2">
                                <img src={project.imageUrl} alt={project.title} className="w-24 h-24 object-cover rounded-md" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Açıklama</label>
                        <textarea
                            name="description"
                            rows={4}
                            defaultValue={project.description || ""}
                            className="w-full p-3 rounded-md border border-input bg-background"
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">Kaydet</Button>
                        <Button type="button" variant="outline" asChild className="flex-1">
                            <Link href="/admin/projects">İptal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
