"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function subscribe(formData: FormData) {
    const email = formData.get("email") as string

    if (!email || !email.includes("@")) {
        return { error: "Geçerli bir e-posta adresi giriniz." }
    }

    try {
        await prisma.subscriber.create({
            data: { email },
        })
        return { success: true, message: "Bültenimize başarıyla abone oldunuz." }
    } catch (error) {
        return { error: "Bu e-posta adresi zaten kayıtlı." }
    }
}
