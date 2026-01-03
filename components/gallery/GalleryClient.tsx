"use client"

import { useState } from "react"
import type { GalleryItem } from "@prisma/client"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import Image from "next/image"

interface GalleryClientProps {
    items: GalleryItem[]
}

export default function GalleryClient({ items }: GalleryClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("Tümü")
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    // Extract unique categories, filter out null/empty, add "Tümü"
    const categories = ["Tümü", ...Array.from(new Set(items.map(i => i.category).filter(Boolean)))]

    // Filter items based on selection
    const filteredItems = selectedCategory === "Tümü"
        ? items
        : items.filter(i => i.category === selectedCategory)

    // Lightbox handlers
    const openLightbox = (index: number) => setLightboxIndex(index)
    const closeLightbox = () => setLightboxIndex(null)

    // Calculate current item based on index WITHIN FILTERED LIST
    // When lightbox is open, we can traverse the filtered list
    const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

    const nextImage = () => {
        if (lightboxIndex !== null && lightboxIndex < filteredItems.length - 1) {
            setLightboxIndex(lightboxIndex + 1)
        } else {
            setLightboxIndex(0) // Loop back
        }
    }

    const prevImage = () => {
        if (lightboxIndex !== null && lightboxIndex > 0) {
            setLightboxIndex(lightboxIndex - 1)
        } else {
            setLightboxIndex(filteredItems.length - 1) // Loop to end
        }
    }

    return (
        <div className="space-y-8">
            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-2">
                {categories.map((catString) => {
                    const cat = catString as string;
                    return (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === cat
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                                }`}
                        >
                            {cat}
                        </button>
                    )
                })}
            </div>

            {/* Masonry Grid (CSS Columns) */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={item.id}
                            className="break-inside-avoid relative group cursor-zoom-in rounded-xl overflow-hidden bg-muted"
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={item.url}
                                alt={item.title || "Gallery Image"}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ZoomIn className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100" />
                            </div>

                            {/* Caption */}
                            {(item.title || item.category) && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {item.title && <h3 className="font-medium text-sm">{item.title}</h3>}
                                    {item.category && <p className="text-xs text-white/80">{item.category}</p>}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && currentItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[60]"
                            onClick={closeLightbox}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white rounded-full hover:bg-white/10 transition-colors z-[60] hidden md:block"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white rounded-full hover:bg-white/10 transition-colors z-[60] hidden md:block"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        {/* Main Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={currentItem.id} // Re-animate on change
                            className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={currentItem.url}
                                alt={currentItem.title || "Full screen image"}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />

                            {(currentItem.title || currentItem.category) && (
                                <div className="mt-4 text-center text-white">
                                    {currentItem.title && <h3 className="text-xl font-medium">{currentItem.title}</h3>}
                                    {currentItem.category && <p className="text-sm text-white/70">{currentItem.category}</p>}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
