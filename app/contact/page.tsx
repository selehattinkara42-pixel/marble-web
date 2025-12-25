import { prisma } from "@/lib/prisma"
import ContactPageClient from "./ContactPageClient"

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
    const settings = await prisma.siteSettings.findFirst()
    return <ContactPageClient settings={settings} />
}
