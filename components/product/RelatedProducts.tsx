import { prisma } from "@/lib/prisma"
import Link from "next/link"

interface RelatedProductsProps {
    categoryId: string
    currentProductId: string
}

export async function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
    const products = await prisma.product.findMany({
        where: {
            categoryId,
            NOT: { id: currentProductId }
        },
        take: 4,
        include: { category: true }
    })

    if (products.length === 0) return null

    return (
        <section className="py-16 border-t border-border mt-16">
            <h2 className="text-2xl font-serif font-bold mb-8">Benzer Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link key={product.id} href={`/collections/${product.slug}`} className="group block">
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category.name}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}
