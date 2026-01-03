"use client"

import { useState } from "react"
import { Trash2, Edit2, Check, X } from "lucide-react"
import { deleteGalleryItem, updateGalleryItem } from "@/app/admin/gallery/actions"
import { GalleryItem } from "@prisma/client"

interface GalleryItemCardProps {
    item: GalleryItem
}

export default function GalleryItemCard({ item }: GalleryItemCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(item.title || "")
    const [category, setCategory] = useState(item.category || "")

    const handleSave = async () => {
        await updateGalleryItem(item.id, { title, category })
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <div className="group relative aspect-square rounded-lg overflow-hidden border border-primary bg-background shadow-lg z-10 flex flex-col">
                <div className="relative h-1/2 w-full">
                    <img
                        src={item.url}
                        alt="Preview"
                        className="object-cover w-full h-full opacity-50"
                    />
                </div>
                <div className="p-2 space-y-2 text-xs flex-1 flex flex-col justify-center bg-background">
                    <input
                        className="w-full border rounded px-1 py-1"
                        placeholder="Başlık / Açıklama"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="w-full border rounded px-1 py-1"
                        placeholder="Kategori (Mutfak, Banyo...)"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <div className="flex gap-1 mt-1">
                        <button onClick={handleSave} className="flex-1 bg-primary text-primary-foreground rounded py-1 flex items-center justify-center gap-1 hover:bg-primary/90">
                            <Check className="w-3 h-3" /> Kaydet
                        </button>
                        <button onClick={() => setIsEditing(false)} className="bg-muted text-muted-foreground rounded px-2 hover:bg-muted/80">
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
            <img
                src={item.url}
                alt={item.title || "Gallery Item"}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />

            {/* Overlay Info */}
            <div className="absolute inset-x-0 top-0 p-2 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium truncate">{item.category || "Kategorisiz"}</p>
            </div>

            {/* Actions Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform flex justify-end gap-2 text-white">
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    title="Düzenle"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="p-1.5 bg-destructive rounded-md hover:bg-destructive/90 transition-colors"
                    title="Sil"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {/* Title Badge if exists */}
            {item.title && (
                <div className="absolute bottom-2 left-2 right-2 pointer-events-none group-hover:opacity-0 transition-opacity">
                    <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded-full truncate inline-block max-w-full">
                        {item.title}
                    </span>
                </div>
            )}
        </div>
    )
}
