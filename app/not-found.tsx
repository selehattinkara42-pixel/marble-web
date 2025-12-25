import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <div className="mb-8">
                    <span className="text-9xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                        404
                    </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    Sayfa Bulunamadı
                </h1>

                <p className="text-muted-foreground mb-8 text-lg">
                    Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            Ana Sayfaya Dön
                        </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="gap-2">
                        <Link href="/collections">
                            Koleksiyonları İncele
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        Yardıma mı ihtiyacınız var?{" "}
                        <Link href="/contact" className="text-primary hover:underline">
                            Bizimle iletişime geçin
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
