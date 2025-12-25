import { prisma } from "@/lib/prisma"
import { CheckCircle, Trash2, MailOpen, Mail } from "lucide-react"
import { markAsRead, deleteMessage } from "./actions"
import { Button } from "@/components/ui/Button"

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Gelen Mesajlar</h1>
                    <p className="text-muted-foreground mt-1">Müşterilerinizden gelen iletişim formları.</p>
                </div>
            </div>

            <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Durum</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tarih</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Gönderen</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">İletişim</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Mesaj</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {messages.map((msg) => (
                                <tr key={msg.id} className={`hover:bg-muted/50 transition-colors ${!msg.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {msg.isRead ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                Okundu
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Yeni
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                        {new Date(msg.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium">{msg.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-foreground">{msg.email}</div>
                                        <div className="text-sm text-muted-foreground">{msg.phone || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                                        {msg.message}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            {!msg.isRead && (
                                                <form action={markAsRead.bind(null, msg.id)}>
                                                    <button title="Okundu İşaretle" className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-colors">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            )}
                                            <form action={deleteMessage.bind(null, msg.id)}>
                                                <button title="Sil" className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {messages.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        <div className="flex flex-col items-center gap-2">
                                            <MailOpen className="w-8 h-8 opacity-50" />
                                            <p>Henüz hiç mesaj yok.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
