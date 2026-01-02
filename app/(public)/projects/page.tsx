import { prisma } from "@/lib/prisma"
import { MapPin } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Projelerimiz</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Mermerin hayat bulduğu, mimari vizyonun gerçeğe dönüştüğü referanslarımız.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, index) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className={`group relative block overflow-hidden rounded-xl bg-muted ${index % 3 === 0 ? 'md:col-span-2 md:aspect-[21/9]' : 'md:aspect-video'}`}
                        >
                            <div className="md:absolute md:inset-0 w-full aspect-video md:aspect-auto">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 md:opacity-80 md:group-hover:opacity-100 transition-opacity hidden md:block" />
                            </div>

                            <div className="relative p-6 md:absolute md:bottom-0 md:left-0 md:w-full md:p-8 bg-background md:bg-transparent text-foreground md:text-white border-t border-border md:border-none">
                                <div className="flex items-center gap-2 text-primary mb-2 text-sm font-medium uppercase tracking-wider">
                                    <MapPin className="w-4 h-4" />
                                    {project.location} {project.year && `• ${project.year}`}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h2>
                                <p className="text-muted-foreground md:text-white/80 max-w-2xl line-clamp-3 md:line-clamp-none">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">Henüz proje eklenmemiş.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
