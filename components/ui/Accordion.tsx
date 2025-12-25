"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
    id: string
    question: string
    answer: string
}

interface AccordionProps {
    items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null)

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="bg-background border border-border rounded-xl overflow-hidden"
                >
                    <button
                        onClick={() => setOpenId(openId === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                    >
                        <span className="font-medium pr-4">{item.question}</span>
                        <ChevronDown
                            className={cn(
                                "w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                                openId === item.id && "rotate-180"
                            )}
                        />
                    </button>
                    <div
                        className={cn(
                            "overflow-hidden transition-all duration-300",
                            openId === item.id ? "max-h-96" : "max-h-0"
                        )}
                    >
                        <div className="p-6 pt-0 text-muted-foreground whitespace-pre-wrap">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
