"use server"

import { prisma } from "@/lib/prisma"
import { uploadFile } from "@/lib/storage"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const year = formData.get("year") ? parseInt(formData.get("year") as string) : null
    const seoTitle = formData.get("seoTitle") as string
    const seoDescription = formData.get("seoDescription") as string

    // Old file upload
    // const imageFile = formData.get("image") as File

    // New Client-Side Upload
    let imageUrl = formData.get("imageUrl") as string

    if (!imageUrl) {
        imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
    }

    // const catalogFile = formData.get("catalog") as File
    const catalogUrl = formData.get("catalogUrl") as string
    // if (catalogFile && catalogFile.size > 0) { ... }

    await prisma.project.create({
        data: {
            title,
            slug,
            description,
            imageUrl,
            location,
            year,
            ...(catalogUrl && { catalogUrl }),
            seoTitle,
            seoDescription,
        },
    })

    revalidatePath("/admin/projects")
    revalidatePath("/projects")
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } })
    revalidatePath("/admin/projects")
    revalidatePath("/projects")
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const year = formData.get("year") ? parseInt(formData.get("year") as string) : null
    const seoTitle = formData.get("seoTitle") as string
    const seoDescription = formData.get("seoDescription") as string

    // const imageFile = formData.get("image") as File
    const imageUrl = formData.get("imageUrl") as string

    // const catalogFile = formData.get("catalog") as File
    const catalogUrl = formData.get("catalogUrl") as string

    await prisma.project.update({
        where: { id },
        data: {
            title,
            slug,
            description,
            location,
            year,
            ...(imageUrl && { imageUrl }),
            ...(catalogUrl && { catalogUrl }),
            seoTitle,
            seoDescription,
        },
    })

    revalidatePath("/admin/projects")
    revalidatePath("/projects")
    revalidatePath(`/projects/${slug}`)
}
