import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
})

export async function generateMetadata() {
  const settings = await prisma.siteSettings.findFirst()

  const title = settings?.seoTitle || settings?.siteTitle || "Lapis & Celikag Marble"
  const description = settings?.seoDescription || settings?.description || "Exclusive Natural Stone Collection"

  // Favicon cache busting
  const faviconUrl = settings?.faviconUrl
    ? `${settings.faviconUrl}?v=${new Date().getTime()}`
    : "/favicon.ico"

  return {
    title: {
      default: title,
      template: `%s | ${settings?.brandName || "Marble Web"}`
    },
    description: description,
    keywords: settings?.seoKeywords ? settings.seoKeywords.split(",").map(k => k.trim()) : ["natural stone", "marble", "travertine"],
    icons: {
      icon: faviconUrl,
      apple: faviconUrl, // Use same for apple-touch-icon for now or separate if needed
    },
    openGraph: {
      title: title,
      description: description,
      url: 'https://marbleweb.com', // Should be dynamic base URL ideally
      siteName: settings?.brandName || "Marble Web",
      images: [
        {
          url: settings?.logoUrl || '/og-image.jpg', // Fallback OG image
          width: 800,
          height: 600,
        },
      ],
      type: 'website',
    },
  }
}

import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { ScrollToTop } from "@/components/ui/ScrollToTop"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await prisma.siteSettings.findFirst()

  return (
    // Force dark mode by adding "dark" class and specific background color
    <html lang="tr" className="scroll-smooth dark">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col font-sans bg-black text-white`}
      >
        <GoogleAnalytics gaId={settings?.googleAnalyticsId} />
        <Navbar settings={settings} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer settings={settings} />
        <WhatsAppButton phone={settings?.phone} />
        <ScrollToTop />
      </body>
    </html>
  )
}
