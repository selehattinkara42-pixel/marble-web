"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { HomePageContent } from "@prisma/client"

interface AboutSectionProps {
    content: HomePageContent | null
}

export function AboutSection({ content }: AboutSectionProps) {
    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
                            {content?.aboutImageUrl ? (
                                <Image
                                    src={content.aboutImageUrl}
                                    alt="Marble Workshop"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <Image
                                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop"
                                    alt="Marble Workshop"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    unoptimized
                                />
                            )}
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-secondary rounded-2xl -z-10" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                            {content?.aboutTitle || "Mermerin Zarafetini Ustalıkla İşliyoruz"}
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            {content?.aboutText || "Yılların verdiği tecrübe ile Lapis ve Çelikağ Mermer kalitesini bir araya getiriyoruz. Doğal taşın ham halini, yaşam alanlarınızın en değerli parçasına dönüştürüyoruz."}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Kalite</h3>
                                <p className="text-sm text-muted-foreground">En üst standartlarda üretim ve işçilik.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Tasarım</h3>
                                <p className="text-sm text-muted-foreground">Modern ve klasik çizgilerin mükemmel uyumu.</p>
                            </div>
                        </div>

                        <Button size="lg" variant="outline" asChild>
                            <Link href={content?.aboutBtnLink || "/about"}>
                                {content?.aboutBtnText || "Hikayemizi Oku"}
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
