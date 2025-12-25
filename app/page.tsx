import { Hero } from "@/components/home/Hero"
import { FeaturedCollections } from "@/components/home/FeaturedCollections"
import { AboutSection } from "@/components/home/AboutSection"
import { RecentProjects } from "@/components/home/RecentProjects"
import { CTA } from "@/components/home/CTA"
import { Testimonials } from "@/components/home/Testimonials"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const homeContent = await prisma.homePageContent.findFirst()

  return (
    <div className="flex flex-col min-h-screen">
      <Hero content={homeContent} />
      <FeaturedCollections />
      <AboutSection content={homeContent} />
      <RecentProjects />
      <Testimonials />
      <CTA content={homeContent} />
    </div>
  )
}
