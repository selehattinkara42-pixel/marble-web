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
                            className={`group relative block ${index % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-video'}`}
                        >
                            <div className="w-full h-full overflow-hidden rounded-xl bg-muted relative">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                                <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                                    <div className="flex items-center gap-2 text-primary mb-2 text-sm font-medium uppercase tracking-wider">
                                        <MapPin className="w-4 h-4" />
                                        {project.location} {project.year && `• ${project.year}`}
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h2>
                                    <p className="text-white/80 max-w-2xl line-clamp-2 md:line-clamp-none">
                                        {project.description}
                                    </p>
                                </div>
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
