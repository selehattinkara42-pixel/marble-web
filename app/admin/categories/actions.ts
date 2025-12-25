"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string

    await prisma.category.create({
        data: { name, slug },
    })

    revalidatePath("/admin/categories")
    revalidatePath("/collections")
}

export async function updateCategory(id: string, formData: FormData) {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string

    await prisma.category.update({
        where: { id },
        data: { name, slug },
    })

    revalidatePath("/admin/categories")
    revalidatePath("/collections")
}

export async function deleteCategory(id: string) {
    // Check if category has products
    const productCount = await prisma.product.count({ where: { categoryId: id } })

    if (productCount > 0) {
        throw new Error("Bu kategoride ürünler var. Önce ürünleri silmeniz gerekiyor.")
    }

    await prisma.category.delete({ where: { id } })
    revalidatePath("/admin/categories")
    revalidatePath("/collections")
}
