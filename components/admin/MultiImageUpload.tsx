"use client"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { uploadToBlob } from "@/lib/upload"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MultiImageUploadProps {
    name: string
    label: string
    defaultValues?: string[]
}

export default function MultiImageUpload({ name, label, defaultValues = [] }: MultiImageUploadProps) {
    const [images, setImages] = useState<string[]>(defaultValues)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Hidden input to submit the array of images as a JSON string (or we can handle it in formData)
    // Actually, FORMDATA with array values works by appending multiple fields with same name.
    // BUT, storing as hidden inputs is easier to visualize.
    // Let's use hidden inputs for each URL.

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        try {
            const newUrls: string[] = []
            for (let i = 0; i < files.length; i++) {
                const url = await uploadToBlob(files[i])
                newUrls.push(url)
            }
            setImages(prev => [...prev, ...newUrls])
        } catch (error) {
            console.error("Upload failed", error)
            alert("Görsel yüklenirken bir hata oluştu.")
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const removeImage = (indexToRemove: number) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove))
    }

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium">{label}</label>

            {/* Hidden inputs to be gathered by server action */}
            {images.map((url, index) => (
                <input key={index} type="hidden" name={name} value={url} />
            ))}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((url, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-border group">
                        <Image
                            src={url}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Upload className="w-4 h-4" />
                    {isUploading ? "Yükleniyor..." : "Görsel Ekle"}
                </button>
                <span className="text-xs text-muted-foreground">
                    Birden fazla görsel seçebilirsiniz. Sıralama eklendiği gibi olur.
                </span>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    )
}
