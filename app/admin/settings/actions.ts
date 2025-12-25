"use server"

import { prisma } from "@/lib/prisma"
import { uploadFile } from "@/lib/storage"
import { revalidatePath } from "next/cache"

export async function updateSettings(formData: FormData) {
    const brandName = formData.get("brandName") as string
    const siteTitle = formData.get("siteTitle") as string
    const description = formData.get("description") as string
    const address = formData.get("address") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const mapEmbedUrl = formData.get("mapEmbedUrl") as string

    const seoTitle = formData.get("seoTitle") as string
    const googleAnalyticsId = formData.get("googleAnalyticsId") as string
    const seoDescription = formData.get("seoDescription") as string
    const seoKeywords = formData.get("seoKeywords") as string

    const instagram = formData.get("instagram") as string
    const facebook = formData.get("facebook") as string
    const linkedin = formData.get("linkedin") as string

    const logoHeight = parseInt(formData.get("logoHeight") as string) || 56
    const showNavbarLogo = formData.get("showNavbarLogo") === "on"
    const showFooterLogo = formData.get("showFooterLogo") === "on"

    const logoFile = formData.get("logo") as File
    const faviconFile = formData.get("favicon") as File

    const data: any = {
        brandName,
        siteTitle,
        description,
        address,
        phone,
        email,
        mapEmbedUrl,
        seoTitle: seoTitle || null,
        googleAnalyticsId: googleAnalyticsId || null,
        seoDescription: seoDescription || null,
        seoKeywords: seoKeywords || null,
        instagram,
        facebook,
        linkedin,
        logoHeight,
        logoWidth: parseInt(formData.get("logoWidth") as string) || 150,
        showNavbarLogo,
        showFooterLogo,
    }

    if (logoFile && logoFile.size > 0) {
        data.logoUrl = await uploadFile(logoFile)
    }

    if (faviconFile && faviconFile.size > 0) {
        data.faviconUrl = await uploadFile(faviconFile)
    }

    const first = await prisma.siteSettings.findFirst()
    if (first) {
        await prisma.siteSettings.update({
            where: { id: first.id },
            data,
        })
    } else {
        await prisma.siteSettings.create({ data })
    }

    revalidatePath("/")
    revalidatePath("/admin/settings")
}
