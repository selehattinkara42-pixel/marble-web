import { prisma } from "@/lib/prisma"
import { Mail, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/Button"

export const dynamic = 'force-dynamic'

export default async function SubscribersPage() {
    const subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' }
    })

    // Create CSV content for export
    const csvContent = `Email,Tarih\n${subscribers.map(s => `${s.email},${s.createdAt.toISOString()}`).join('\n')}`

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">E-Bülten Aboneleri</h1>
                    <p className="text-muted-foreground mt-1">Toplam {subscribers.length} abone</p>
                </div>
                <a
                    href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
                    download="aboneler.csv"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Excel'e Aktar
                </a>
            </div>

            <div className="bg-background rounded-xl shadow-sm border border-border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">E-posta</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Kayıt Tarihi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {subscribers.map((subscriber) => (
                            <tr key={subscriber.id} className="hover:bg-muted/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium">{subscriber.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(subscriber.createdAt).toLocaleDateString('tr-TR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {subscribers.length === 0 && (
                            <tr>
                                <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                                    Henüz abone yok.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
