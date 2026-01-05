import { prisma } from "@/lib/prisma"
import GalleryClient from "@/components/gallery/GalleryClient"
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
    const content = await prisma.galleryPageContent.findFirst()
    return {
        title: content?.seoTitle || content?.title || "Galeri",
        description: content?.seoDescription || content?.subtitle || "Doğal taş koleksiyonumuzdan seçkin örnekler.",
    }
}

export default async function GalleryPage() {
    const content = await prisma.galleryPageContent.findFirst()
    const items = await prisma.galleryItem.findMany({
        orderBy: { order: 'asc' },
    })

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-muted pt-40 pb-20 px-4 md:px-8 text-center border-b border-border">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-5xl font-playfair font-bold">
                        {content?.title || "Galeri"}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {content?.subtitle || "Projelerimize ve doğal taş koleksiyonumuza yakından göz atın."}
                    </p>
                </div>
            </div>

            {/* Gallery Content */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
                <GalleryClient items={items} />
            </div>
        </div>
    )
}
