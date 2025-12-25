
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { updateFAQ } from "../../actions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

interface FAQEditPageProps {
    params: Promise<{ id: string }>
}

export default async function FAQEditPage({ params }: FAQEditPageProps) {
    const { id } = await params
    const faq = await prisma.fAQ.findUnique({
        where: { id }
    })

    if (!faq) {
        notFound()
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Link href="/admin/faq" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Listeye Dön
            </Link>

            <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                <h1 className="text-2xl font-bold mb-6">Soru Düzenle</h1>

                <form action={updateFAQ.bind(null, faq.id)} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Soru</label>
                        <input
                            name="question"
                            defaultValue={faq.question}
                            required
                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Cevap</label>
                        <textarea
                            name="answer"
                            defaultValue={faq.answer}
                            rows={6}
                            required
                            className="w-full p-3 rounded-md border border-input bg-background"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Sıra</label>
                        <input
                            name="order"
                            type="number"
                            defaultValue={faq.order}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="published"
                            id="published"
                            defaultChecked={faq.published}
                        />
                        <label htmlFor="published" className="text-sm font-medium">Yayınla</label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">Güncelle</Button>
                        <Button asChild variant="outline" className="flex-1">
                            <Link href="/admin/faq">İptal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
