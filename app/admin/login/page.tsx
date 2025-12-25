"use client"

import { Button } from "@/components/ui/Button"
import { loginAction } from "./actions"
import { useActionState } from "react"

export default function LoginPage() {
    const [state, action, isPending] = useActionState(loginAction, null)

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
            <div className="w-full max-w-md p-8 bg-background rounded-xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-bold">Yönetici Girişi</h1>
                    <p className="text-muted-foreground">Devam etmek için giriş yapınız</p>
                </div>

                <form action={action} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">E-posta</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">Şifre</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                    </div>

                    {state?.error && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                            {state.error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
