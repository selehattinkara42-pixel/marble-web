import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { MapPin } from "lucide-react"

export async function RecentProjects() {
    // Projeleri veritabanından al
    const projects = await prisma.project.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' }
    })

    // HomePageContent'ten section başlıklarını al
    const homeContent = await prisma.homePageContent.findFirst()

    if (projects.length === 0) return null

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                        {homeContent?.projectsTitle || "Son Projelerimiz"}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {homeContent?.projectsSubtitle || "Mimari vizyonu gerçeğe dönüştürdüğümüz seçkin referanslarımızdan örnekler."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group cursor-pointer"
                        >
                            <Link href={`/projects/${project.slug}`}>
                                <div className="relative overflow-hidden rounded-lg aspect-video mb-4">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {project.year && (
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black rounded-sm z-20">
                                            {project.year}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-serif font-bold group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                {project.location && (
                                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                                        <MapPin className="w-3 h-3" />
                                        {project.location}
                                    </div>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
