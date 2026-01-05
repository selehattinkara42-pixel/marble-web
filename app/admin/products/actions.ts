"use server"

import { prisma } from "@/lib/prisma"
import { uploadFile } from "@/lib/storage"
import { revalidatePath } from "next/cache"

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const categoryId = formData.get("categoryId") as string
    const featured = formData.get("featured") === "on"
    const origin = formData.get("origin") as string
    const usageArea = formData.get("usageArea") as string
    const surfaceFinish = formData.get("surfaceFinish") as string
    const seoTitle = formData.get("seoTitle") as string
    const seoDescription = formData.get("seoDescription") as string

    // Old file upload (Deprecated for Vercel 4.5MB limit)
    // const imageFile = formData.get("image") as File

    // New Client-Side Upload (imageUrl string)
    let imageUrl = formData.get("imageUrl") as string

    if (!imageUrl) {
        imageUrl = "https://images.unsplash.com/photo-1598556776374-0a37547526bb?q=80&w=1000&auto=format&fit=crop"
    }

    await prisma.product.create({
        data: {
            name,
            slug,
            description,
            imageUrl,
            categoryId,
            featured,
            origin,
            usageArea,
            surfaceFinish,
            seoTitle,
            seoDescription,
        },
    })

    revalidatePath("/admin/products")
    revalidatePath("/collections")
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } })
    revalidatePath("/admin/products")
    revalidatePath("/collections")
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const categoryId = formData.get("categoryId") as string
    const featured = formData.get("featured") === "on"

    // Tech Specs
    const origin = formData.get("origin") as string
    const usageArea = formData.get("usageArea") as string
    const surfaceFinish = formData.get("surfaceFinish") as string
    const seoTitle = formData.get("seoTitle") as string
    const seoDescription = formData.get("seoDescription") as string

    // const imageFile = formData.get("image") as File
    const imageUrl = formData.get("imageUrl") as string

    // if (imageFile && imageFile.size > 0) {
    //    imageUrl = await uploadFile(imageFile)
    // }

    await prisma.product.update({
        where: { id },
        data: {
            name,
            slug,
            description,
            categoryId,
            featured,
            origin,
            usageArea,
            surfaceFinish,
            ...(imageUrl && { imageUrl }),
            seoTitle,
            seoDescription,
        },
    })

    revalidatePath("/admin/products")
    revalidatePath("/collections")
    revalidatePath(`/collections/${slug}`)
}
