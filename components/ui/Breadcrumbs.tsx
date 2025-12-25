"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

const routeNameMap: Record<string, string> = {
    "collections": "Koleksiyonlar",
    "projects": "Projeler",
    "blog": "Blog",
    "about": "Hakkımızda",
    "contact": "İletişim",
    "search": "Arama"
}

export function Breadcrumbs() {
    const pathname = usePathname()

    if (pathname === "/") return null

    const segments = pathname.split("/").filter(Boolean)

    return (
        <nav className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
                <Home className="w-4 h-4" />
            </Link>

            {segments.map((segment, index) => {
                const href = `/${segments.slice(0, index + 1).join("/")}`
                const isLast = index === segments.length - 1

                // Try to map known routes, otherwise capitalize or leave as is (for slugs)
                let name = routeNameMap[segment]
                if (!name) {
                    // If it's a slug, try to make it readable (replace hyphens with spaces)
                    name = segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
                }

                return (
                    <div key={href} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
                        {isLast ? (
                            <span className="font-medium text-foreground">{name}</span>
                        ) : (
                            <Link href={href} className="hover:text-primary transition-colors">
                                {name}
                            </Link>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}
