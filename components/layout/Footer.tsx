"use client"

import Link from "next/link"
import { SiteSettings } from "@prisma/client"
import { subscribe } from "@/app/actions/newsletter"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Instagram, Facebook, Linkedin } from "lucide-react"

interface FooterProps {
    settings: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubscribe(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setStatus(null)

        const formData = new FormData()
        formData.append("email", email)

        const result = await subscribe(formData)
        setStatus(result)
        setLoading(false)
        if (result.success) setEmail("")
    }

    return (
        <footer className="bg-secondary text-secondary-foreground py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    {(settings?.showFooterLogo !== false) && (
                        settings?.logoUrl ? (
                            <img src={settings.logoUrl} alt={settings.brandName} className="w-auto object-contain brightness-0 invert" style={{ height: `${(settings.logoHeight || 56) * 0.8}px` }} />
                        ) : (
                            <h3 className="text-2xl font-bold tracking-tighter">{settings?.brandName || "MARBLE"}</h3>
                        )
                    )}
                    <p className="text-sm text-secondary-foreground/80 max-w-xs">
                        {settings?.description || "Doğanın sanatını yaşam alanlarınıza taşıyoruz."}
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Hızlı Erişim</h4>
                    <ul className="space-y-2 text-sm text-secondary-foreground/80">
                        <li><Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link></li>
                        <li><Link href="/collections" className="hover:text-primary transition-colors">Koleksiyonlar</Link></li>
                        <li><Link href="/projects" className="hover:text-primary transition-colors">Projeler</Link></li>
                        <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">İletişim</h4>
                    <ul className="space-y-2 text-sm text-secondary-foreground/80">
                        <li className="whitespace-pre-wrap">{settings?.address}</li>
                        <li>{settings?.email}</li>
                        <li>{settings?.phone}</li>
                    </ul>
                    <div className="flex gap-4 mt-4">
                        {settings?.instagram && (
                            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}
                        {settings?.facebook && (
                            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                        )}
                        {settings?.linkedin && (
                            <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">E-Bülten</h4>
                    <p className="text-sm text-secondary-foreground/80 mb-4">
                        Yeni koleksiyonlardan ve projelerden haberdar olun.
                    </p>
                    <form onSubmit={handleSubscribe} className="space-y-2">
                        <input
                            type="email"
                            placeholder="E-posta adresiniz"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-md text-sm focus:outline-none focus:border-primary text-secondary-foreground placeholder:text-secondary-foreground/50"
                        />
                        <Button type="submit" size="sm" className="w-full" disabled={loading}>
                            {loading ? "Kaydediliyor..." : "Abone Ol"}
                        </Button>
                        {status?.success && <p className="text-xs text-green-400">{status.message}</p>}
                        {status?.error && <p className="text-xs text-red-400">{status.error}</p>}
                    </form>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-secondary-foreground/10 text-center text-xs text-secondary-foreground/60">
                © {new Date().getFullYear()} {settings?.brandName || "Marble Web"}. Tüm hakları saklıdır.
            </div>
        </footer>
    )
}
