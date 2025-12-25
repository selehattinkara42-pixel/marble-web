"use client"

import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface WhatsAppButtonProps {
    phone?: string
}

export function WhatsAppButton({ phone }: WhatsAppButtonProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    if (!phone) return null

    // Format phone number: remove spaces, ensure it starts with country code if possible, or just use as is if it looks like a full number
    // Assuming input like "+90 555 123 45 67" -> "905551234567"
    const cleanPhone = phone.replace(/\D/g, '')

    return (
        <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-105 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            aria-label="WhatsApp ile iletişime geçin"
        >
            <MessageCircle className="w-6 h-6" />
            <span className="font-medium hidden md:inline">WhatsApp</span>
        </a>
    )
}
