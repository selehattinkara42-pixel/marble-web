import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { updateHomePage, updateAboutPage } from "./actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Save } from "lucide-react"
import ImageUpload from "@/components/admin/ImageUpload"
import MultiImageUpload from "@/components/admin/MultiImageUpload"
import Image from "next/image"

export const dynamic = 'force-dynamic'

export default async function PagesManagement() {
    const homeContent = await prisma.homePageContent.findFirst()
    const aboutContent = await prisma.aboutPageContent.findFirst()

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Sayfa İçerik Yönetimi</h1>
                <p className="text-muted-foreground mt-2">Ana sayfa ve hakkımızda sayfası metin ve görsellerini düzenleyin.</p>
            </div>

            <Tabs defaultValue="home" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-muted rounded-lg">
                    <TabsTrigger value="home" className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2">Ana Sayfa</TabsTrigger>
                    <TabsTrigger value="about" className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2">Hakkımızda Sayfası</TabsTrigger>
                </TabsList>

                <TabsContent value="home">
                    <form action={updateHomePage} className="space-y-8">
                        {/* Hero Section */}
                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Hero (Giriş) Bölümü</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Ana Başlık</label>
                                    <input name="heroTitle" defaultValue={homeContent?.heroTitle} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Alt Başlık</label>
                                    <textarea name="heroSubtitle" defaultValue={homeContent?.heroSubtitle} rows={2} className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <div>
                                        <MultiImageUpload
                                            name="heroImages"
                                            label="Slider Görselleri (Sırayla)"
                                            defaultValues={homeContent?.heroImages || (homeContent?.heroBgUrl ? [homeContent.heroBgUrl] : [])}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Slayt Geçiş Süresi (milisaniye, örn: 5000 = 5 sn)</label>
                                        <input type="number" name="heroSlideDuration" defaultValue={homeContent?.heroSlideDuration || 5000} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                        <div>
                                            <label className="text-sm font-medium">1. Buton Metni</label>
                                            <input name="heroBtn1Text" defaultValue={homeContent?.heroBtn1Text || "Koleksiyonu Keşfet"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">1. Buton Linki</label>
                                            <input name="heroBtn1Link" defaultValue={homeContent?.heroBtn1Link || "/collections"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">2. Buton Metni</label>
                                            <input name="heroBtn2Text" defaultValue={homeContent?.heroBtn2Text || "Projelerimiz"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">2. Buton Linki</label>
                                            <input name="heroBtn2Link" defaultValue={homeContent?.heroBtn2Link || "/projects"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Hakkımızda Özeti</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Başlık</label>
                                    <input name="aboutTitle" defaultValue={homeContent?.aboutTitle} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">İçerik</label>
                                    <textarea name="aboutText" defaultValue={homeContent?.aboutText} rows={3} className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <ImageUpload
                                        name="aboutImageUrl"
                                        label="Görsel"
                                        defaultValue={homeContent?.aboutImageUrl}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                    <div>
                                        <label className="text-sm font-medium">Buton Metni</label>
                                        <input name="aboutBtnText" defaultValue={homeContent?.aboutBtnText || "Hikayemizi Oku"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Buton Linki</label>
                                        <input name="aboutBtnLink" defaultValue={homeContent?.aboutBtnLink || "/about"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Collections Section */}
                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Koleksiyonlar Bölümü</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Başlık</label>
                                    <input name="collectionsTitle" defaultValue={homeContent?.collectionsTitle || "Öne Çıkan Koleksiyonlar"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Alt Başlık</label>
                                    <textarea name="collectionsSubtitle" defaultValue={homeContent?.collectionsSubtitle || "Doğanın en saf haliyle şekillenen, mekanlarınıza değer katacak özel seçki."} rows={2} className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        {/* Projects Section */}
                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Projeler Bölümü</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Başlık</label>
                                    <input name="projectsTitle" defaultValue={homeContent?.projectsTitle || "Son Projelerimiz"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Alt Başlık</label>
                                    <textarea name="projectsSubtitle" defaultValue={homeContent?.projectsSubtitle || "Mimari vizyonu gerçeğe dönüştürdüğümüz seçkin referanslarımızdan örnekler."} rows={2} className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">CTA (Eylem Çağrısı) Bölümü</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Başlık</label>
                                    <input name="ctaTitle" defaultValue={homeContent?.ctaTitle} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Açıklama</label>
                                    <textarea name="ctaText" defaultValue={homeContent?.ctaText} rows={2} className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <ImageUpload
                                        name="ctaBgUrl"
                                        label="Arkaplan Görseli"
                                        defaultValue={homeContent?.ctaBgUrl}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                    <div>
                                        <label className="text-sm font-medium">Buton Metni</label>
                                        <input name="ctaBtnText" defaultValue={homeContent?.ctaBtnText || "İletişime Geçin"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Buton Linki</label>
                                        <input name="ctaBtnLink" defaultValue={homeContent?.ctaBtnLink || "/contact"} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end sticky bottom-8">
                            <Button type="submit" size="lg" className="shadow-lg gap-2">
                                <Save className="w-4 h-4" />
                                Ana Sayfayı Güncelle
                            </Button>
                        </div>
                    </form>
                </TabsContent>

                <TabsContent value="about">
                    <form action={updateAboutPage} className="space-y-8">
                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Genel İçerik</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Sayfa Başlığı</label>
                                    <input name="title" defaultValue={aboutContent?.title} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Giriş Metni</label>
                                    <textarea name="mainText" defaultValue={aboutContent?.mainText} rows={4} className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Hikayemiz Bölümü</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Başlık</label>
                                    <input name="storyTitle" defaultValue={aboutContent?.storyTitle} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">İçerik</label>
                                    <textarea name="storyText" defaultValue={aboutContent?.storyText} rows={4} className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <ImageUpload
                                        name="storyImageUrl"
                                        label="Görsel"
                                        defaultValue={aboutContent?.storyImageUrl}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Vizyonumuz Bölümü</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Başlık</label>
                                    <input name="visionTitle" defaultValue={aboutContent?.visionTitle} className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">İçerik</label>
                                    <textarea name="visionText" defaultValue={aboutContent?.visionText} rows={4} className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <ImageUpload
                                        name="visionImageUrl"
                                        label="Görsel"
                                        defaultValue={aboutContent?.visionImageUrl}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end sticky bottom-8">
                            <Button type="submit" size="lg" className="shadow-lg gap-2">
                                <Save className="w-4 h-4" />
                                Hakkımızda Sayfasını Güncelle
                            </Button>
                        </div>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    )
}
