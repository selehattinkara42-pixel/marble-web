"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { SiteSettings } from "@prisma/client"
import { Search } from "@/components/layout/Search"

const navItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Koleksiyonlar", href: "/collections" },
    { name: "Projeler", href: "/projects" },
    { name: "Galeri", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "SSS", href: "/faq" },
    { name: "Hakkımızda", href: "/about" },
    { name: "İletişim", href: "/contact" },
]

interface NavbarProps {
    settings: SiteSettings | null
}

export function Navbar({ settings }: NavbarProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b flex items-center",
                isScrolled
                    ? "bg-background/95 backdrop-blur-md border-border shadow-sm h-16"
                    : "bg-background/90 backdrop-blur-sm border-border/50 h-24"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full relative">
                {(settings?.showNavbarLogo !== false) && (
                    <div className="relative h-full flex items-center" style={{ width: settings?.logoWidth ? `${settings.logoWidth}px` : 'auto' }}>
                        <Link href="/" className="flex items-center gap-3">
                            {settings?.logoUrl ? (
                                <img
                                    src={settings.logoUrl}
                                    alt={settings.brandName}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 max-w-none transition-all duration-300 transform origin-left"
                                    style={{ height: `${settings.logoHeight || 56}px` }}
                                />
                            ) : (
                                <span className="text-2xl font-bold tracking-tighter text-foreground">
                                    {settings?.brandName || "MARBLE"}
                                </span>
                            )}
                        </Link>
                    </div>
                )}

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 ml-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-foreground/80 hover:text-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button size="sm" asChild>
                        <Link href="/contact">Teklif Al</Link>
                    </Button>
                    <div className="flex items-center gap-2 text-foreground">
                        <Search />
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-foreground ml-auto"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-background border-b border-border md:hidden"
                    >
                        <nav className="flex flex-col p-4 gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-muted",
                                        pathname === item.href ? "text-primary bg-muted" : "text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button className="w-full" asChild>
                                <Link href="/contact">Teklif Al</Link>
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
