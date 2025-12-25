import { prisma } from "@/lib/prisma"
import { Package, FolderOpen, MessageSquare, Users, Eye, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const [productCount, projectCount, messageCount, unreadMessageCount] = await Promise.all([
        prisma.product.count(),
        prisma.project.count(),
        prisma.contactMessage.count(),
        prisma.contactMessage.count({ where: { isRead: false } }),
    ])

    const stats = [
        {
            name: "Toplam Ürün",
            value: productCount,
            icon: Package,
            color: "text-blue-600 bg-blue-100",
            href: "/admin/products"
        },
        {
            name: "Toplam Proje",
            value: projectCount,
            icon: FolderOpen,
            color: "text-green-600 bg-green-100",
            href: "/admin/projects"
        },
        {
            name: "Okunmamış Mesaj",
            value: unreadMessageCount,
            total: messageCount,
            icon: MessageSquare,
            color: "text-yellow-600 bg-yellow-100",
            href: "/admin/messages"
        },
    ]

    const recentMessages = await prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        where: { isRead: false }
    })

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Genel Bakış</h1>
                <p className="text-muted-foreground mt-2">Site istatistikleri ve son aktiviteler.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat) => (
                    <Link key={stat.name} href={stat.href} className="block group">
                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground font-medium mb-1">{stat.name}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                                    {stat.total !== undefined && (
                                        <span className="text-sm text-muted-foreground">/ {stat.total} toplam</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Messages */}
                <div className="bg-background rounded-xl shadow-sm border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Son Mesajlar</h2>
                        <Link href="/admin/messages" className="text-sm text-primary hover:underline">Tümünü Gör</Link>
                    </div>

                    <div className="space-y-4">
                        {recentMessages.length > 0 ? (
                            recentMessages.map((msg) => (
                                <div key={msg.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-semibold truncate">{msg.name}</h4>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {new Date(msg.createdAt).toLocaleDateString('tr-TR')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{msg.message}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                Okunmamış yeni mesaj yok.
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions or other stats could go here */}
                <div className="bg-background rounded-xl shadow-sm border border-border p-6">
                    <h2 className="text-xl font-bold mb-6">Hızlı İşlemler</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/products" className="p-4 rounded-lg border border-border hover:bg-muted transition-colors flex flex-col items-center justify-center text-center gap-2">
                            <Package className="w-8 h-8 text-blue-500" />
                            <span className="font-medium">Ürün Ekle</span>
                        </Link>
                        <Link href="/admin/projects" className="p-4 rounded-lg border border-border hover:bg-muted transition-colors flex flex-col items-center justify-center text-center gap-2">
                            <FolderOpen className="w-8 h-8 text-green-500" />
                            <span className="font-medium">Proje Ekle</span>
                        </Link>
                        <Link href="/admin/pages" className="p-4 rounded-lg border border-border hover:bg-muted transition-colors flex flex-col items-center justify-center text-center gap-2">
                            <Eye className="w-8 h-8 text-purple-500" />
                            <span className="font-medium">İçerik Düzenle</span>
                        </Link>
                        <Link href="/admin/settings" className="p-4 rounded-lg border border-border hover:bg-muted transition-colors flex flex-col items-center justify-center text-center gap-2">
                            <Users className="w-8 h-8 text-orange-500" />
                            <span className="font-medium">Ayarları Yapılandır</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
