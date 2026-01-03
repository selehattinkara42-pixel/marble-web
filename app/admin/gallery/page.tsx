import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import MultiImageUpload from "@/components/admin/MultiImageUpload"
import { updateGallerySettings, deleteGalleryItem } from "./actions"
import { Trash2, Save } from "lucide-react"
import GalleryItemCard from "@/components/admin/GalleryItemCard"

export const dynamic = 'force-dynamic'

export default async function GalleryAdminPage() {
    const content = await prisma.galleryPageContent.findFirst()
    const galleryItems = await prisma.galleryItem.findMany({
        orderBy: { order: 'asc' }, // Default order
    })

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Galeri Yönetimi</h1>
            </div>

            {/* Page Settings Form */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Sayfa Ayarları & Yeni Ekle</h2>
                <form action={updateGallerySettings} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Sayfa Başlığı</label>
                            <input
                                name="title"
                                defaultValue={content?.title}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Alt Başlık</label>
                            <input
                                name="subtitle"
                                defaultValue={content?.subtitle || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">SEO Başlığı</label>
                            <input
                                name="seoTitle"
                                defaultValue={content?.seoTitle || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">SEO Açıklaması</label>
                            <input
                                name="seoDescription"
                                defaultValue={content?.seoDescription || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                            />
                        </div>
                    </div>

                    <div className="border-t border-border pt-6">
                        <h3 className="text-lg font-semibold mb-4">Yeni Görseller Ekle</h3>
                        <MultiImageUpload
                            name="images"
                            label="Toplu Resim Yükle (Seçilenler mevcut galeriye EKLENİR)"
                            defaultValues={[]} // Always empty start for "Add New"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            Buradan seçeceğiniz resimler mevcut galeriye eklenecektir. Aşağıdaki listeden silme işlemi yapabilirsiniz.
                        </p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg" className="flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Kaydet ve Yükle
                        </Button>
                    </div>
                </form>
            </div>

            {/* Existing Images List */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">
                    Mevcut Görseller ({galleryItems.length})
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {galleryItems.map((item) => (
                        <GalleryItemCard key={item.id} item={item} />
                    ))}
                    {galleryItems.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            Henüz hiç görsel yüklenmemiş.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
