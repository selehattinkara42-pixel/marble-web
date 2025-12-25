import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import ImageUpload from "@/components/admin/ImageUpload"
import { createProject, deleteProject } from "./actions"
import { Plus, Trash2, Edit } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Proje Yönetimi</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Project Form */}
                <div className="lg:col-span-1">
                    <div className="bg-background p-6 rounded-xl shadow-sm border border-border sticky top-8">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Yeni Proje Ekle
                        </h2>
                        <form action={createProject} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Proje Adı</label>
                                <input name="title" required className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Slug (URL)</label>
                                <input name="slug" required className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="ornek-proje" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Konum</label>
                                <input name="location" className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="İstanbul" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Yıl</label>
                                <input name="year" type="number" className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="2025" />
                            </div>
                            <div>
                                <ImageUpload name="imageUrl" label="Proje Görseli" required />
                            </div>
                            <div>
                                <ImageUpload name="catalogUrl" label="Katalog PDF (İsteğe Bağlı)" accept=".pdf" folder="catalogs" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Açıklama</label>
                                <textarea name="description" rows={3} className="w-full p-3 rounded-md border border-input bg-background" />
                            </div>
                            <Button type="submit" className="w-full">Ekle</Button>
                        </form>
                    </div>
                </div>

                {/* Project List */}
                <div className="lg:col-span-2">
                    <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Görsel</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Başlık</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Konum</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-muted/50">
                                        <td className="px-6 py-4">
                                            <img src={project.imageUrl} alt={project.title} className="w-12 h-12 object-cover rounded-md" />
                                        </td>
                                        <td className="px-6 py-4 font-medium">{project.title}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{project.location}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/projects/${project.id}/edit`}
                                                    className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <form action={deleteProject.bind(null, project.id)}>
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
