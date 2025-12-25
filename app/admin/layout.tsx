"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, FolderOpen, MessageSquare, LogOut, Settings, FileText, Newspaper, Layers, Users, HelpCircle, Menu, X } from "lucide-react"
import { logoutAction } from "./login/actions"
import { useState } from "react"

const sidebarItems = [
    { name: "Genel Bakış", href: "/admin", icon: LayoutDashboard },
    { name: "Kategoriler", href: "/admin/categories", icon: Layers },
    { name: "Ürünler", href: "/admin/products", icon: Package },
    { name: "Projeler", href: "/admin/projects", icon: FolderOpen },
    { name: "Mesajlar", href: "/admin/messages", icon: MessageSquare },
    { name: "E-Bülten Aboneleri", href: "/admin/subscribers", icon: Users },
    { name: "Sayfa İçerikleri", href: "/admin/pages", icon: FileText },
    { name: "Blog / Haberler", href: "/admin/blog", icon: Newspaper },
    { name: "SSS", href: "/admin/faq", icon: HelpCircle },
    { name: "Müşteri Yorumları", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Site Ayarları", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Don't show sidebar on login page
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
                <h2 className="text-lg font-bold font-serif">Admin Panel</h2>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={cn(
                "md:hidden fixed top-14 left-0 bottom-0 w-64 bg-background border-r border-border z-50 flex flex-col transform transition-transform duration-200",
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <form action={logoutAction}>
                        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                            <LogOut className="w-5 h-5" />
                            Çıkış Yap
                        </button>
                    </form>
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-background border-r border-border fixed h-full hidden md:flex flex-col">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-bold font-serif">Admin Panel</h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <form action={logoutAction}>
                        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                            <LogOut className="w-5 h-5" />
                            Çıkış Yap
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 pt-14 md:pt-0">
                {children}
            </main>
        </div>
    )
}
