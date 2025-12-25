import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export async function FeaturedCollections() {
    // Kategorileri veritabanından al
    const categories = await prisma.category.findMany({
        take: 3,
        include: {
            products: {
                take: 1,
                select: { imageUrl: true }
            }
        },
        orderBy: { name: 'asc' }
    })

    // HomePageContent'ten section başlıklarını al
    const homeContent = await prisma.homePageContent.findFirst()

    // Kategori görseli için ilk ürünün görselini veya varsayılan kullan
    const collectionsWithImages = categories.map(cat => ({
        id: cat.id,
        title: cat.name,
        slug: cat.slug,
        image: cat.products[0]?.imageUrl || "https://images.unsplash.com/photo-1598556776374-0a37547526bb?q=80&w=1000&auto=format&fit=crop"
    }))

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            {homeContent?.collectionsTitle || "Öne Çıkan Koleksiyonlar"}
                        </h2>
                        <p className="text-muted-foreground max-w-xl">
                            {homeContent?.collectionsSubtitle || "Doğanın en saf haliyle şekillenen, mekanlarınıza değer katacak özel seçki."}
                        </p>
                    </div>
                    <Link href="/collections" className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                        Tümünü Gör <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collectionsWithImages.map((item) => (
                        <div
                            key={item.id}
                            className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
                        >
                            <Link href={`/collections?category=${item.slug}`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
                                    <h3 className="text-2xl font-serif font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {item.title}
                                    </h3>
                                    <div className="h-0.5 w-0 bg-primary group-hover:w-12 transition-all duration-500" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
