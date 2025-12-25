import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const dynamic = 'force-dynamic'

interface CollectionsPageProps {
    searchParams: Promise<{ category?: string }>
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
    const { category: categorySlug } = await searchParams

    const categories = await prisma.category.findMany()

    const where: any = {}
    if (categorySlug) {
        const category = categories.find(c => c.slug === categorySlug)
        if (category) {
            where.categoryId = category.id
        }
    }

    const products = await prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Koleksiyonlarımız</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Doğanın en nadide parçalarını özenle seçip işliyoruz.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <Button
                        variant={!categorySlug ? "default" : "outline"}
                        asChild
                        className="rounded-full"
                    >
                        <Link href="/collections">Tümü</Link>
                    </Button>
                    {categories.map((c) => (
                        <Button
                            key={c.id}
                            variant={categorySlug === c.slug ? "default" : "outline"}
                            asChild
                            className="rounded-full"
                        >
                            <Link href={`/collections?category=${c.slug}`}>{c.name}</Link>
                        </Button>
                    ))}
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
                        <p className="text-xl">Bu kategoride henüz ürün bulunmuyor.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
