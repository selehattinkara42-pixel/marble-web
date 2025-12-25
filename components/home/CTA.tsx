"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"
import { HomePageContent } from "@prisma/client"

interface CTAProps {
    content: HomePageContent | null
}

export function CTA({ content }: CTAProps) {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                {content?.ctaBgUrl ? (
                    <Image
                        src={content.ctaBgUrl}
                        alt="CTA Background"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                ) : (
                    <Image
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                        alt="CTA Background"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        unoptimized
                    />
                )}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                    {content?.ctaTitle || "Projeniz İçin Mükemmel Taşı Birlikte Seçelim"}
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                    {content?.ctaText || "Uzman ekibimizle iletişime geçin, hayalinizdeki mekanı tasarlamanıza yardımcı olalım."}
                </p>
                <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                    <Link href={content?.ctaBtnLink || "/contact"}>
                        {content?.ctaBtnText || "İletişime Geçin"}
                    </Link>
                </Button>
            </div>
        </section>
    )
}
