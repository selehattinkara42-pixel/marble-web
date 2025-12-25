import { prisma } from "@/lib/prisma"
import { Quote } from "lucide-react"

export async function Testimonials() {
    const testimonials = await prisma.testimonial.findMany({
        where: { featured: true },
        orderBy: { createdAt: 'desc' },
        take: 3
    })

    if (testimonials.length === 0) return null

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Müşterilerimiz Ne Diyor?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Projelerinde bizi tercih eden iş ortaklarımızın deneyimleri.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-background p-8 rounded-2xl shadow-sm border border-border relative">
                            <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                            <p className="text-muted-foreground mb-6 italic leading-relaxed">"{t.content}"</p>
                            <div className="flex items-center gap-4">
                                {t.avatarUrl ? (
                                    <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                        {t.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold">{t.name}</h4>
                                    <p className="text-sm text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
