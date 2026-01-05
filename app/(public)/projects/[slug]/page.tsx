import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { MapPin, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Button } from "@/components/ui/Button"

export const dynamic = 'force-dynamic'

interface ProjectDetailPageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
    const { slug } = await params
    const project = await prisma.project.findUnique({
        where: { slug },
    })

    if (!project) {
        return { title: "Proje Bulunamadı" }
    }

    return {
        title: project.seoTitle || `${project.title} | Projelerimiz`,
        description: project.seoDescription || project.description || `${project.title} - ${project.location} projemiz`,
        openGraph: {
            title: project.title,
            description: project.description || `${project.title} projemiz`,
            images: [{ url: project.imageUrl, width: 1200, height: 630, alt: project.title }],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description || `${project.title} projemiz`,
            images: [project.imageUrl],
        },
    }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { slug } = await params
    const project = await prisma.project.findUnique({
        where: { slug }
    })

    if (!project) {
        notFound()
    }

    // Get related projects
    const relatedProjects = await prisma.project.findMany({
        where: { id: { not: project.id } },
        take: 3,
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <Breadcrumbs />
                <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Projelere Dön
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg bg-muted">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{project.title}</h1>

                        <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground border-b border-border pb-8">
                            {project.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span>{project.location}</span>
                                </div>
                            )}
                            {project.year && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{project.year}</span>
                                </div>
                            )}
                        </div>

                        {project.catalogUrl && (
                            <div className="mb-8">
                                <Button asChild variant="outline" className="w-full md:w-auto gap-2">
                                    <a href={project.catalogUrl} target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                                        Projeye Ait Kataloğu İndir (PDF)
                                    </a>
                                </Button>
                            </div>
                        )}

                        <div className="prose prose-lg dark:prose-invert mb-12">
                            <h3 className="text-xl font-bold mb-4">Proje Hakkında</h3>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {project.description || "Bu proje hakkında detaylı açıklama yakında eklenecektir."}
                            </p>
                        </div>

                        <div className="bg-secondary p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4 text-secondary-foreground">Bu Projede Kullanılan Taşlar</h3>
                            <p className="text-secondary-foreground/80 mb-6">
                                Bu projede kullanılan doğal taşlar hakkında bilgi almak veya benzer bir proje için teklif istemek için bizimle iletişime geçin.
                            </p>
                            <Button asChild>
                                <Link href="/contact">Proje Hakkında Bilgi Al</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div className="mt-24">
                        <h2 className="text-3xl font-serif font-bold mb-8 text-center">Diğer Projelerimiz</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((p) => (
                                <Link key={p.id} href={`/projects/${p.slug}`} className="group block">
                                    <div className="aspect-video rounded-xl overflow-hidden bg-muted mb-4 relative">
                                        <img
                                            src={p.imageUrl}
                                            alt={p.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                                    {p.location && (
                                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3" /> {p.location}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
