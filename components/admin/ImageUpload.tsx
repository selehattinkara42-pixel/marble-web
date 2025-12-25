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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return
        }

        const file = event.target.files[0]
        setUploading(true)
        setError(null)
        setProgress(0)

        // Optimistic preview for images
        if (file.type.startsWith("image/")) {
            setPreview(URL.createObjectURL(file))
        }

        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                onUploadProgress: (progressEvent) => {
                    setProgress(progressEvent.percentage)
                },
            })

            setPreview(newBlob.url)
        } catch (err) {
            setError('Yükleme sırasında hata oluştu. Lütfen tekrar deneyin.')
            console.error(err)
            // Revert preview if failed
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

            <div className="flex items-start gap-4">
                {preview ? (
                    <div className="relative group">
                        <div className="relative w-32 h-32 rounded-lg border border-border overflow-hidden bg-muted flex items-center justify-center">
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
                            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                            type="button"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => inputFileRef.current?.click()}
                        className={`w-32 h-32 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center cursor-pointer bg-muted/20 ${uploading ? 'pointer-events-none opacity-50' : ''}`}
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
