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

export default async function ProductDetailPage({ params }: Props) {
    const { slug } = await params

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
                                    <span className="font-medium text-foreground">Türkiye</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span>Kullanım Alanları</span>
                                    <span className="font-medium text-foreground">İç ve Dış Mekan</span>
                                </li>
                                <li className="flex justify-between border-b border-border pb-2">
                                    <span>Yüzey İşlemleri</span>
                                    <span className="font-medium text-foreground">Cilalı, Honlu, Fırçalı</span>
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
