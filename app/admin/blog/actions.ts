"use server"

import { prisma } from "@/lib/prisma"
import { uploadFile } from "@/lib/upload"
import { revalidatePath } from "next/cache"

export async function createBlogPost(formData: FormData) {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "on"

    const imageFile = formData.get("image") as File
    let coverImage = ""

    if (imageFile && imageFile.size > 0) {
        coverImage = await uploadFile(imageFile)
    } else {
        coverImage = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop"
    }

    await prisma.blogPost.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            coverImage,
            published,
        },
    })

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
}

export async function updateBlogPost(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "on"

    const imageFile = formData.get("image") as File
    let coverImage: string | undefined = undefined

    if (imageFile && imageFile.size > 0) {
        coverImage = await uploadFile(imageFile)
    }

    await prisma.blogPost.update({
        where: { id },
        data: {
            title,
            slug,
            excerpt,
            content,
            published,
            ...(coverImage && { coverImage }),
        },
    })

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    revalidatePath(`/blog/${slug}`)
}

export async function deleteBlogPost(id: string) {
    await prisma.blogPost.delete({ where: { id } })
    revalidatePath("/admin/blog")
    revalidatePath("/blog")
}

