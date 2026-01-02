import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { ScrollToTop } from "@/components/ui/ScrollToTop"

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const settings = await prisma.siteSettings.findFirst()

    return (
        <>
            <Navbar settings={settings} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer settings={settings} />
            <WhatsAppButton phone={settings?.phone} />
            <ScrollToTop />
        </>
    )
}
