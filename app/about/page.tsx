import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
    const content = await prisma.aboutPageContent.findFirst()

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center">
                        {content?.title || "Hakkımızda"}
                    </h1>

                    <div className="prose prose-lg dark:prose-invert mx-auto">
                        <p className="lead text-xl text-center text-muted-foreground mb-12">
                            {content?.mainText || "Lapis & Celikag Mermer, doğal taşın zamansız güzelliğini modern yaşam alanlarına taşıyan, sektörün öncü kuruluşlarından biridir."}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                            <div>
                                <img
                                    src={content?.storyImageUrl || "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop"}
                                    alt="Mermer Atölyesi"
                                    className="rounded-lg shadow-xl w-full"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold mb-4">{content?.storyTitle || "Hikayemiz"}</h2>
                                <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                                    {content?.storyText || "Yıllar önce küçük bir atölyede başlayan yolculuğumuz, bugün uluslararası projelere imza atan büyük bir marka haline geldi."}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 md:flex-row-reverse">
                            <div className="order-2 md:order-1">
                                <h2 className="text-2xl font-serif font-bold mb-4">{content?.visionTitle || "Vizyonumuz"}</h2>
                                <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                                    {content?.visionText || "Sadece bir mermer tedarikçisi olmak değil, mimari projelere değer katan bir çözüm ortağı olmak."}
                                </p>
                            </div>
                            <div className="order-1 md:order-2">
                                <img
                                    src={content?.visionImageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"}
                                    alt="Vizyon"
                                    className="rounded-lg shadow-xl w-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-16 p-12 bg-secondary rounded-2xl text-secondary-foreground">
                        <h2 className="text-3xl font-serif font-bold mb-6">Bizimle Çalışmak İster misiniz?</h2>
                        <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                            Projelerinizde doğal taşın eşsiz dokusunu kullanmak için uzman ekibimizle iletişime geçin.
                        </p>
                        <Button size="lg" className="bg-primary text-black hover:bg-primary/90" asChild>
                            <Link href="/contact">İletişime Geçin</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
