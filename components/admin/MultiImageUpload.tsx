"use client"
import { Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { upload } from "@vercel/blob/client"
import { useRef, useState } from "react"

interface MultiImageUploadProps {
    name: string
    label: string
    defaultValues?: string[]
}

export default function MultiImageUpload({ name, label, defaultValues = [] }: MultiImageUploadProps) {
    const [images, setImages] = useState<string[]>(defaultValues)
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        setProgress(0)

        try {
            const newUrls: string[] = []
            // Using a loop to upload files
            for (let i = 0; i < files.length; i++) {
                const file = files[i]

                // Using Vercel Blob client-side upload
                // Note: Ensure /api/upload route exists and handles token generation as per Vercel docs
                const newBlob = await upload(file.name, file, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    onUploadProgress: (progressEvent) => {
                        // Calculate total progress roughly
                        const currentProgress = ((i + (progressEvent.percentage / 100)) / files.length) * 100
                        setProgress(Math.round(currentProgress))
                    }
                })

                newUrls.push(newBlob.url)
            }

            setImages(prev => [...prev, ...newUrls])
        } catch (error) {
            console.error("Upload failed", error)
            alert("Görsel yüklenirken bir hata oluştu: " + (error as any).message)
        } finally {
            setIsUploading(false)
            setProgress(0)
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
            <label className="text-sm font-medium flex justify-between">
                {label}
                {isUploading && <span className="text-xs text-muted-foreground">%{progress}</span>}
            </label>

            {/* Hidden inputs to be gathered by server action */}
            {images.map((url, index) => (
                <input key={index} type="hidden" name={name} value={url} />
            ))}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((url, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-border group bg-muted">
                        <Image
                            src={url}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
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
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
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
