"use client"

import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { HomePageContent } from "@prisma/client"

interface HeroProps {
    content: HomePageContent | null
}

export function Hero({ content }: HeroProps) {
    // If no heroImages, fall back to heroBgUrl, or default image
    const images = content?.heroImages && content.heroImages.length > 0
        ? content.heroImages
        : (content?.heroBgUrl ? [content.heroBgUrl] : ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"])

    const [currentIndex, setCurrentIndex] = useState(0)
    const duration = content?.heroSlideDuration || 5000

    useEffect(() => {
        if (images.length <= 1) return
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length)
        }, duration)
        return () => clearInterval(interval)
    }, [images.length, duration])

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Slider */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt="Luxury Marble Background"
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight"
                >
                    {content?.heroTitle || "Doğanın Eşsiz Sanatı Mermer ile Buluşuyor"}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light"
                >
                    {content?.heroSubtitle || "Lapis & Celikag Mermer, projelerinize estetik ve zarafet katan, dünyanın en seçkin doğal taş koleksiyonlarını sunar."}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8" asChild>
                        <Link href={content?.heroBtn1Link || "/collections"}>
                            {content?.heroBtn1Text || "Koleksiyonu Keşfet"}
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black text-lg px-8" asChild>
                        <Link href={content?.heroBtn2Link || "/projects"}>
                            {content?.heroBtn2Text || "Projelerimiz"}
                        </Link>
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="w-[30px] h-[50px] rounded-full border-2 border-white/50 flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1 h-3 bg-white rounded-full"
                    />
                </div>
            </motion.div>

            {/* Dots Indicator (Optional, but good for UX) */}
            {images.length > 1 && (
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-4" : "bg-white/50"}`}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
