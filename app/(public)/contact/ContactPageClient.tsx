"use client"

import { Button } from "@/components/ui/Button"
import { submitContactForm } from "./actions"
import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { SiteSettings } from "@prisma/client"

interface ContactPageProps {
    settings: SiteSettings | null
}

export default function ContactPageClient({ settings }: ContactPageProps) {
    const [status, setStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setStatus(null)

        const formData = new FormData(event.currentTarget)
        const result = await submitContactForm(formData)

        setStatus(result)
        setIsSubmitting(false)

        if (result.success) {
            (event.target as HTMLFormElement).reset()
        }
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">İletişim</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Projeleriniz için teklif almak veya sorularınız için bizimle iletişime geçin.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl">
                            <h3 className="text-2xl font-serif font-bold mb-6">Merkez Ofis & Showroom</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-primary mt-1" />
                                    <div>
                                        <p className="font-semibold">Adres</p>
                                        <p className="text-secondary-foreground/80 whitespace-pre-wrap">
                                            {settings?.address || "Mermerciler Sanayi Sitesi, İstanbul"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-primary mt-1" />
                                    <div>
                                        <p className="font-semibold">Telefon</p>
                                        <p className="text-secondary-foreground/80">{settings?.phone || "+90 212 000 00 00"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-primary mt-1" />
                                    <div>
                                        <p className="font-semibold">E-posta</p>
                                        <p className="text-secondary-foreground/80">{settings?.email || "info@marbleweb.com"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-[300px] bg-muted rounded-2xl overflow-hidden">
                            <iframe
                                src={settings?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.5!2d28.6!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOMKwMzYnMDAuMCJF!5e0!3m2!1sen!2str!4v1620000000000!5m2!1sen!2str"}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold mb-6">Bize Yazın</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Ad Soyad *</label>
                                    <input
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium">Telefon</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="05XX XXX XX XX"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">E-posta *</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="ornek@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Mesajınız *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    className="w-full p-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Projenizden bahsedin..."
                                />
                            </div>

                            {status?.error && (
                                <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                                    {status.error}
                                </div>
                            )}

                            {status?.success && (
                                <div className="p-4 bg-green-500/10 text-green-600 rounded-lg text-sm">
                                    {status.message}
                                </div>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full text-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
