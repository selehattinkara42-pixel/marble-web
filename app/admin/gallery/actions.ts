"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateGallerySettings(formData: FormData) {
    const title = formData.get("title") as string
    const subtitle = formData.get("subtitle") as string
    const seoTitle = formData.get("seoTitle") as string
    const seoDescription = formData.get("seoDescription") as string

    // Process uploaded images from MultiImageUpload
    // The component sends hidden inputs with name="images" containing URLs
    const imageUrls = formData.getAll("images") as string[]

    // 1. Update Page Settings
    const first = await prisma.galleryPageContent.findFirst()
    if (first) {
        await prisma.galleryPageContent.update({
            where: { id: first.id },
            data: { title, subtitle, seoTitle, seoDescription },
        })
    } else {
        await prisma.galleryPageContent.create({
            data: { title, subtitle, seoTitle, seoDescription },
        })
    }

    // 2. Add New Images to GalleryItem
    // We only add NEW images. Since MultiImageUpload returns ALL images currently in the list,
    // we need to be careful.
    // BETTER STRATEGY for this mixed model:
    // The MultiImageUpload is pure UI state. When submitting:
    // - We check if these URLs already exist in GalleryItem.
    // - If not, we create them.
    // - If a GalleryItem exists but its URL is NOT in the submitted list, it means it was removed?
    //   -> NO, MultiImageUpload is for NEW uploads usually.
    // Let's change strategy for Admin Page:
    // - Top section: Page Settings (Title code).
    // - Middle section: "Add New Images" (MultiImageUpload). Submitting this ADDS to the list.
    // - Bottom section: "Existing Images" list (Delete/Reorder).

    if (imageUrls.length > 0) {
        // Create records for new images
        // We can't easily know which are "new" if we just accept a list.
        // But simply creating them is fine if the UI only sends NEWly uploaded ones.
        // However, MultiImageUpload manages a 'value' state.

        // Let's assume the user uses the MultiImageUpload to pick NEW files.
        // We will loop and create.
        for (const url of imageUrls) {
            // Check if exists to avoid duplicates if user double submits
            const exists = await prisma.galleryItem.findFirst({ where: { url } })
            if (!exists) {
                await prisma.galleryItem.create({
                    data: { url, order: 0 } // Default order
                })
            }
        }
    }

    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")
}

export async function deleteGalleryItem(id: string) {
    await prisma.galleryItem.delete({ where: { id } })
    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")
}

export async function updateGalleryItemOrder(id: string, newOrder: number) {
    await prisma.galleryItem.update({
        where: { id },
        data: { order: newOrder }
    })
    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")
}
