import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { createFAQ, deleteFAQ } from "./actions"
import { Plus, Trash2, Edit, HelpCircle } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function FAQAdminPage() {
    const faqs = await prisma.fAQ.findMany({
        orderBy: { order: 'asc' }
    })

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">SSS Yönetimi</h1>
                    <p className="text-muted-foreground mt-1">Sıkça Sorulan Sorular sayfasını yönetin.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add FAQ Form */}
                <div className="lg:col-span-1">
                    <div className="bg-background p-6 rounded-xl shadow-sm border border-border sticky top-8">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Yeni Soru Ekle
                        </h2>
                        <form action={createFAQ} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Soru</label>
                                <input
                                    name="question"
                                    required
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                    placeholder="Örn: Teslimat süresi ne kadar?"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Cevap</label>
                                <textarea
                                    name="answer"
                                    rows={4}
                                    required
                                    className="w-full p-3 rounded-md border border-input bg-background"
                                    placeholder="Sorunun detaylı cevabı..."
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Sıra</label>
                                <input
                                    name="order"
                                    type="number"
                                    defaultValue={0}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="published" id="published" defaultChecked />
                                <label htmlFor="published" className="text-sm font-medium">Yayınla</label>
                            </div>
                            <Button type="submit" className="w-full">Ekle</Button>
                        </form>
                    </div>
                </div>

                {/* FAQ List */}
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="bg-background p-6 rounded-xl shadow-sm border border-border">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <HelpCircle className="w-4 h-4 text-primary" />
                                            <h3 className="font-medium">{faq.question}</h3>
                                            {!faq.published && (
                                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Taslak</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/faq/${faq.id}/edit`}
                                            className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <form action={deleteFAQ.bind(null, faq.id)}>
                                            <button className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {faqs.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground bg-background rounded-xl border border-border">
                                Henüz soru eklenmemiş.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
