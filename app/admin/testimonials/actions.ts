"use server"

import { prisma } from "@/lib/prisma"
import { uploadFile } from "@/lib/upload"
import { revalidatePath } from "next/cache"

export async function createTestimonial(formData: FormData) {
    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const content = formData.get("content") as string
    const featured = formData.get("featured") === "on"

    const imageFile = formData.get("image") as File
    let avatarUrl = ""

    if (imageFile && imageFile.size > 0) {
        avatarUrl = await uploadFile(imageFile)
    }

    await prisma.testimonial.create({
        data: {
            name,
            role,
            content,
            avatarUrl,
            featured,
        },
    })

    revalidatePath("/admin/testimonials")
    revalidatePath("/")
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath("/admin/testimonials")
    revalidatePath("/")
}
