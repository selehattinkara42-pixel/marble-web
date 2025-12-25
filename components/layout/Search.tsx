"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search as SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function Search() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`)
            setIsOpen(false)
            setQuery("")
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-white/90 hover:text-white transition-colors p-2"
                aria-label="Search"
            >
                <SearchIcon className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex justify-end mb-8">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-muted rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </Button>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <form onSubmit={handleSearch} className="relative">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ürün, proje veya yazı ara..."
                                    className="w-full h-16 pl-14 pr-4 rounded-2xl border-2 border-muted bg-background text-xl outline-none focus:border-primary transition-colors"
                                />
                            </form>
                            <p className="text-center text-muted-foreground mt-4">
                                Aramak için Enter'a basın. Kapatmak için ESC.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
