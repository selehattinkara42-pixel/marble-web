"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
        return { success: false, error: "Lütfen zorunlu alanları doldurunuz." }
    }

    try {
        await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone,
                message,
            },
        })

        revalidatePath("/admin/messages")
        return { success: true, message: "Mesajınız başarıyla gönderildi." }
    } catch (error) {
        console.error("Contact form error:", error)
        return { success: false, error: "Bir hata oluştu. Lütfen tekrar deneyiniz." }
    }
}
