"use server"

import { prisma } from "@/lib/prisma"
import { uploadFile } from "@/lib/upload"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const year = formData.get("year") ? parseInt(formData.get("year") as string) : null

    const imageFile = formData.get("image") as File
    let imageUrl = ""

    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadFile(imageFile)
    } else {
        imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
    }

    const catalogFile = formData.get("catalog") as File
    let catalogUrl = ""
    if (catalogFile && catalogFile.size > 0) {
        catalogUrl = await uploadFile(catalogFile)
    }

    await prisma.project.create({
        data: {
            title,
            slug,
            description,
            imageUrl,
            location,
            year,
            ...(catalogUrl && { catalogUrl }),
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

    const imageFile = formData.get("image") as File
    let imageUrl: string | undefined = undefined

    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadFile(imageFile)
    }

    const catalogFile = formData.get("catalog") as File
    let catalogUrl: string | undefined = undefined
    if (catalogFile && catalogFile.size > 0) {
        catalogUrl = await uploadFile(catalogFile)
    }

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
        },
    })

    revalidatePath("/admin/projects")
    revalidatePath("/projects")
    revalidatePath(`/projects/${slug}`)
}
