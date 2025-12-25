"use server"

import { prisma } from "@/lib/prisma"
import { encrypt } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Lütfen tüm alanları doldurunuz." }
    }

    const user = await prisma.adminUser.findUnique({
        where: { email },
    })

    if (!user) {
        return { error: "Geçersiz e-posta veya şifre." }
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        return { error: "Geçersiz e-posta veya şifre." }
    }

    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ user: { id: user.id, email: user.email }, expires })

    const cookieStore = await cookies()
    cookieStore.set("session", session, { expires, httpOnly: true })

    redirect("/admin")
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.set("session", "", { expires: new Date(0) })
    redirect("/admin/login")
}
