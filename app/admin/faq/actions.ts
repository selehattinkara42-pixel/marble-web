"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createFAQ(formData: FormData) {
    const question = formData.get("question") as string
    const answer = formData.get("answer") as string
    const order = parseInt(formData.get("order") as string) || 0
    const published = formData.get("published") === "on"

    await prisma.fAQ.create({
        data: { question, answer, order, published },
    })

    revalidatePath("/admin/faq")
    revalidatePath("/faq")
}

export async function updateFAQ(id: string, formData: FormData) {
    const question = formData.get("question") as string
    const answer = formData.get("answer") as string
    const order = parseInt(formData.get("order") as string) || 0
    const published = formData.get("published") === "on"

    await prisma.fAQ.update({
        where: { id },
        data: { question, answer, order, published },
    })

    revalidatePath("/admin/faq")
    revalidatePath("/faq")
}

export async function deleteFAQ(id: string) {
    await prisma.fAQ.delete({ where: { id } })
    revalidatePath("/admin/faq")
    revalidatePath("/faq")
}
