"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageGalleryProps {
    images: { url: string; alt?: string | null }[]
    mainImage: string
    productName: string
}

export function ImageGallery({ images, mainImage, productName }: ImageGalleryProps) {
    const allImages = [{ url: mainImage, alt: productName }, ...images]
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)

    const currentImage = allImages[selectedIndex]

    const goToPrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
    }

    return (
        <>
            {/* Main Gallery */}
            <div className="space-y-4">
                {/* Main Image */}
                <div
                    className="relative aspect-square bg-muted rounded-2xl overflow-hidden cursor-zoom-in group"
                    onClick={() => setLightboxOpen(true)}
                >
                    <img
                        src={currentImage.url}
                        alt={currentImage.alt || productName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {allImages.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedIndex === index
                                        ? "border-primary ring-2 ring-primary/20"
                                        : "border-transparent hover:border-border"
                                    }`}
                            >
                                <img
                                    src={image.url}
                                    alt={image.alt || `${productName} ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                        onClick={() => setLightboxOpen(false)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Navigation */}
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); goToPrevious() }}
                                    className="absolute left-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); goToNext() }}
                                    className="absolute right-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Image */}
                        <motion.img
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            src={currentImage.url}
                            alt={currentImage.alt || productName}
                            className="max-w-[90vw] max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                            {selectedIndex + 1} / {allImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
