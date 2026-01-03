"use client"

import { useState, useRef } from "react"
import { upload } from "@vercel/blob/client"
import { Upload, X, Loader2, FileText } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/Button"

interface ImageUploadProps {
    name: string
    label: string
    defaultValue?: string | null
    required?: boolean
    accept?: string
    folder?: string
}

export default function ImageUpload({
    name,
    label,
    defaultValue,
    required = false,
    accept = "image/*",
    folder = "uploads"
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(defaultValue || null)
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const inputFileRef = useRef<HTMLInputElement>(null)

    const isPDF = preview?.endsWith('.pdf') || (preview && accept.includes('pdf') && !preview.match(/\.(jpg|jpeg|png|webp)$/i))

    const resizeImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            // Only resize images
            if (!file.type.startsWith('image/')) {
                resolve(file)
                return
            }

            // If file is SVG or small enough (< 2MB), skip
            if (file.type === 'image/svg+xml' || file.size < 2 * 1024 * 1024) {
                resolve(file)
                return
            }

            const img = document.createElement('img')
            img.src = URL.createObjectURL(file)
            img.onload = () => {
                const canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height

                // Max dimension 2560px (Standard 2K/4K friendly, but manageable)
                const MAX_dimension = 2560

                if (width > height) {
                    if (width > MAX_dimension) {
                        height = Math.round((height * MAX_dimension) / width)
                        width = MAX_dimension
                    }
                } else {
                    if (height > MAX_dimension) {
                        width = Math.round((width * MAX_dimension) / height)
                        height = MAX_dimension
                    }
                }

                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext('2d')
                ctx?.drawImage(img, 0, 0, width, height)

                // High quality WebP output
                canvas.toBlob((blob) => {
                    if (blob) {
                        const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                            type: 'image/webp',
                            lastModified: Date.now(),
                        })
                        resolve(newFile)
                    } else {
                        resolve(file) // Fallback
                    }
                }, 'image/webp', 0.90) // 90% quality
            }
            img.onerror = () => resolve(file)
        })
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return
        }

        let file = event.target.files[0]
        setUploading(true)
        setError(null)
        setProgress(0)

        // Optimistic preview
        if (file.type.startsWith("image/")) {
            setPreview(URL.createObjectURL(file))
        }

        try {
            // Resize if necessary before upload
            if (file.type.startsWith("image/")) {
                file = await resizeImage(file)
            }

            // Manually rename file to avoid "File already exists" error
            const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
            const renamedFile = new File([file], filename, { type: file.type })

            const newBlob = await upload(renamedFile.name, renamedFile, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                onUploadProgress: (progressEvent) => {
                    setProgress(progressEvent.percentage)
                },
            })

            setPreview(newBlob.url)
        } catch (err) {
            setError(`Yükleme sırasında hata oluştu: ${(err as Error).message}`)
            console.error(err)
            if (!defaultValue) setPreview(null)
        } finally {
            setUploading(false)
        }
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault()
        setPreview(null)
        if (inputFileRef.current) {
            inputFileRef.current.value = ""
        }
    }

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
                {label}
                {uploading && <span className="text-xs text-muted-foreground">%{progress}</span>}
            </label>

            {/* Hidden input to store the URL for the form submission */}
            <input type="hidden" name={name} value={preview || ""} required={required} />

            {/* Mobile-friendly layout: Stack on small screens, row on larger */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
                {preview ? (
                    <div className="relative group shrink-0">
                        <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-lg border border-border overflow-hidden bg-muted flex items-center justify-center">
                            {isPDF ? (
                                <div className="text-center p-2">
                                    <FileText className="w-8 h-8 mx-auto text-primary mb-1" />
                                    <span className="text-xs break-all line-clamp-2 text-muted-foreground">PDF Dosyası</span>
                                </div>
                            ) : (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <button
                            onClick={handleRemove}
                            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-2 shadow-sm z-10 hover:bg-destructive/90 transition-colors"
                            type="button"
                            title="Kaldır"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => inputFileRef.current?.click()}
                        className={`w-full sm:w-32 h-32 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center cursor-pointer bg-muted/20 ${uploading ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        {uploading ? (
                            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                        ) : (
                            <>
                                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                                <span className="text-xs text-muted-foreground text-center px-2">
                                    Dosya Seç
                                </span>
                            </>
                        )}
                    </div>
                )}

                <div className="flex-1 space-y-2">
                    <input
                        ref={inputFileRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                    />

                    {uploading && (
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}

                    {error && (
                        <p className="text-xs text-destructive">{error}</p>
                    )}

                    <p className="text-xs text-muted-foreground">
                        {accept.includes("pdf") ? "PDF" : "JPG, PNG, WebP"} • Max 500MB
                    </p>
                </div>
            </div>
        </div>
    )
}
