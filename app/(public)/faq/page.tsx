import { prisma } from "@/lib/prisma"
import { Accordion } from "@/components/ui/Accordion"
import { HelpCircle } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function FAQPage() {
    const faqs = await prisma.fAQ.findMany({
        where: { published: true },
        orderBy: { order: 'asc' }
    })

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <HelpCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Sıkça Sorulan Sorular</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Merak ettiğiniz konularda yanıtları burada bulabilirsiniz. Başka sorularınız varsa bizimle iletişime geçin.
                    </p>
                </div>

                {faqs.length > 0 ? (
                    <Accordion items={faqs.map(f => ({ id: f.id, question: f.question, answer: f.answer }))} />
                ) : (
                    <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl">
                        Henüz SSS eklenmemiş.
                    </div>
                )}

                <div className="mt-16 text-center p-8 bg-secondary rounded-2xl">
                    <h2 className="text-2xl font-serif font-bold mb-4">Başka Bir Sorunuz mu Var?</h2>
                    <p className="text-muted-foreground mb-6">
                        Aradığınız cevabı bulamadıysanız uzman ekibimizle iletişime geçin.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                    >
                        İletişime Geçin
                    </Link>
                </div>
            </div>
        </div>
    )
}
