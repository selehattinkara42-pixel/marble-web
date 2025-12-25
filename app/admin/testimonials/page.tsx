import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { createTestimonial, deleteTestimonial } from "./actions"
import { Plus, Trash2, Quote } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function TestimonialsAdminPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Müşteri Yorumları</h1>
                    <p className="text-muted-foreground mt-1">Ana sayfada gösterilecek müşteri referansları.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Testimonial Form */}
                <div className="lg:col-span-1">
                    <div className="bg-background p-6 rounded-xl shadow-sm border border-border sticky top-8">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Yeni Yorum Ekle
                        </h2>
                        <form action={createTestimonial} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Müşteri Adı</label>
                                <input name="name" required className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Ünvan / Şirket</label>
                                <input name="role" className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="Mimar / ABC İnşaat" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Profil Fotoğrafı</label>
                                <input type="file" name="image" accept="image/*" className="w-full" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Yorum</label>
                                <textarea name="content" rows={4} required className="w-full p-3 rounded-md border border-input bg-background" placeholder="Müşteri görüşü..." />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="featured" id="featured" defaultChecked />
                                <label htmlFor="featured" className="text-sm font-medium">Ana Sayfada Göster</label>
                            </div>
                            <Button type="submit" className="w-full">Ekle</Button>
                        </form>
                    </div>
                </div>

                {/* Testimonial List */}
                <div className="lg:col-span-2">
                    <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Kişi</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Yorum</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {testimonials.map((t) => (
                                    <tr key={t.id} className="hover:bg-muted/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {t.avatarUrl ? (
                                                    <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {t.name.charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium">{t.name}</div>
                                                    <div className="text-xs text-muted-foreground">{t.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-muted-foreground line-clamp-2 italic">"{t.content}"</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <form action={deleteTestimonial.bind(null, t.id)}>
                                                <button className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                                {testimonials.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                                            Henüz yorum eklenmemiş.
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
