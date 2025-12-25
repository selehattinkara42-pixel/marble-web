import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { ImageGallery } from "@/components/product/ImageGallery"
import { Metadata } from "next"

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true },
    })

    if (!product) {
        return { title: "Ürün Bulunamadı" }
    }

    return {
        title: `${product.name} | ${product.category.name}`,
        description: product.description || `${product.name} - ${product.category.name} koleksiyonumuzdan premium doğal taş.`,
        openGraph: {
            title: product.name,
            description: product.description || `${product.name} - Premium doğal taş`,
            images: [{ url: product.imageUrl, width: 1200, height: 630, alt: product.name }],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: product.name,
            description: product.description || `${product.name} - Premium doğal taş`,
            images: [product.imageUrl],
        },
    }
}

export default async function Page({ params }: Props) {
    const { slug } = await params

    // 1. Try to find a Category first
    const category = await prisma.category.findUnique({
        where: { slug },
        include: { products: { include: { category: true } } }
    })

    if (category) {
        // Render Collection (Category) View
        const products = category.products

        return (
            <div className="min-h-screen bg-background pt-24 pb-20">
                <div className="container mx-auto px-4 md:px-6">
                    <Breadcrumbs />
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{category.name}</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            {category.name} koleksiyonumuzun seçkin parçaları.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <Link key={product.id} href={`/collections/${product.slug}`} className="group block">
                                <div className="aspect-[3/4] overflow-hidden bg-muted rounded-lg mb-4 relative">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white font-medium px-4 py-2 border border-white rounded-full">İncele</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.category.name}</p>
                            </Link>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <p className="text-xl">Bu koleksiyonda henüz ürün bulunmuyor.</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // 2. If not a category, try to find a Product
    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
            images: { orderBy: { order: "asc" } },
        },
    })

    if (!product) {
        notFound()
    }

    // Render Product Detail View
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <Breadcrumbs />
                <div className="mb-8">
                    <Link href="/collections" className="text-sm text-muted-foreground hover:text-primary mb-4 block">
                        ← Tüm Koleksiyonlar
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Image Gallery */}
                    <ImageGallery
                        images={product.images}
                        mainImage={product.imageUrl}
                        productName={product.name}
                    />

                    {/* Details */}
                    <div>
                        <div className="mb-6">
                            <span className="text-sm font-medium text-primary uppercase tracking-wider">{product.category.name}</span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">{product.name}</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {product.description || "Bu ürün için henüz detaylı açıklama eklenmemiştir."}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                            >
                                Teklif İste
                            </Link>
                            <Link
                                href="/projects"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
                            >
                                Uygulama Örnekleri
                            </Link>
                        </div>

                        <div className="bg-muted/30 p-6 rounded-xl border border-border">
                            <h3 className="font-semibold mb-4">Teknik Özellikler</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span>Menşei</span>
                                    <span className="font-medium text-foreground">{product.origin || "Türkiye"}</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span>Kullanım Alanları</span>
                                    <span className="font-medium text-foreground">{product.usageArea || "İç ve Dış Mekan"}</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span>Yüzey İşlemleri</span>
                                    <span className="font-medium text-foreground">{product.surfaceFinish || "Cilalı, Honlu, Fırçalı"}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Kategori</span>
                                    <span className="font-medium text-foreground">{product.category.name}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
            </div>
        </div>
    )
}
