"use server"

import { prisma } from "@/lib/prisma"
import { uploadFile } from "@/lib/upload"
import { revalidatePath } from "next/cache"

export async function updateHomePage(formData: FormData) {
    const heroTitle = formData.get("heroTitle") as string
    const heroSubtitle = formData.get("heroSubtitle") as string
    const heroBtn1Text = formData.get("heroBtn1Text") as string
    const heroBtn1Link = formData.get("heroBtn1Link") as string
    const heroBtn2Text = formData.get("heroBtn2Text") as string
    const heroBtn2Link = formData.get("heroBtn2Link") as string
    const aboutTitle = formData.get("aboutTitle") as string
    const aboutText = formData.get("aboutText") as string
    const aboutBtnText = formData.get("aboutBtnText") as string
    const aboutBtnLink = formData.get("aboutBtnLink") as string
    const collectionsTitle = formData.get("collectionsTitle") as string
    const collectionsSubtitle = formData.get("collectionsSubtitle") as string
    const projectsTitle = formData.get("projectsTitle") as string
    const projectsSubtitle = formData.get("projectsSubtitle") as string
    const ctaTitle = formData.get("ctaTitle") as string
    const ctaText = formData.get("ctaText") as string
    const ctaBtnText = formData.get("ctaBtnText") as string
    const ctaBtnLink = formData.get("ctaBtnLink") as string

    const heroBgFile = formData.get("heroBg") as File
    const aboutImageFile = formData.get("aboutImage") as File
    const ctaBgFile = formData.get("ctaBg") as File

    const data: any = {
        heroTitle,
        heroSubtitle,
        heroBtn1Text,
        heroBtn1Link,
        heroBtn2Text,
        heroBtn2Link,
        aboutTitle,
        aboutText,
        aboutBtnText,
        aboutBtnLink,
        collectionsTitle,
        collectionsSubtitle,
        projectsTitle,
        projectsSubtitle,
        ctaTitle,
        ctaText,
        ctaBtnText,
        ctaBtnLink,
    }

    if (heroBgFile && heroBgFile.size > 0) {
        data.heroBgUrl = await uploadFile(heroBgFile)
    }

    if (aboutImageFile && aboutImageFile.size > 0) {
        data.aboutImageUrl = await uploadFile(aboutImageFile)
    }

    if (ctaBgFile && ctaBgFile.size > 0) {
        data.ctaBgUrl = await uploadFile(ctaBgFile)
    }

    const first = await prisma.homePageContent.findFirst()
    if (first) {
        await prisma.homePageContent.update({
            where: { id: first.id },
            data,
        })
    } else {
        await prisma.homePageContent.create({ data })
    }

    revalidatePath("/")
    revalidatePath("/admin/pages")
}

export async function updateAboutPage(formData: FormData) {
    const title = formData.get("title") as string
    const mainText = formData.get("mainText") as string
    const storyTitle = formData.get("storyTitle") as string
    const storyText = formData.get("storyText") as string
    const visionTitle = formData.get("visionTitle") as string
    const visionText = formData.get("visionText") as string

    const storyImageFile = formData.get("storyImage") as File
    const visionImageFile = formData.get("visionImage") as File

    const data: any = {
        title,
        mainText,
        storyTitle,
        storyText,
        visionTitle,
        visionText,
    }

    if (storyImageFile && storyImageFile.size > 0) {
        data.storyImageUrl = await uploadFile(storyImageFile)
    }

    if (visionImageFile && visionImageFile.size > 0) {
        data.visionImageUrl = await uploadFile(visionImageFile)
    }

    const first = await prisma.aboutPageContent.findFirst()
    if (first) {
        await prisma.aboutPageContent.update({
            where: { id: first.id },
            data,
        })
    } else {
        await prisma.aboutPageContent.create({ data })
    }

    revalidatePath("/about")
    revalidatePath("/admin/pages")
}
