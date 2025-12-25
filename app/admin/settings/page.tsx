import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { updateSettings } from "./actions"
import { Instagram, Facebook, Linkedin } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
    const settings = await prisma.siteSettings.findFirst()

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Site Ayarları</h1>
                <p className="text-muted-foreground mt-2">Genel site bilgileri, iletişim ve marka ayarları.</p>
            </div>

            <form action={updateSettings} className="space-y-8">
                {/* General Settings */}
                <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Genel Bilgiler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Marka Adı</label>
                            <input
                                name="brandName"
                                defaultValue={settings?.brandName}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Site Başlığı (Tarayıcı Sekmesi)</label>
                            <input
                                name="siteTitle"
                                defaultValue={settings?.siteTitle}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-medium">Site Açıklaması (SEO)</label>
                            <textarea
                                name="description"
                                defaultValue={settings?.description}
                                rows={3}
                                className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">SEO Ayarları (Google)</h2>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">SEO Başlığı (Meta Title)</label>
                            <input
                                name="seoTitle"
                                defaultValue={settings?.seoTitle || settings?.siteTitle}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Örn: Lapis & Celikag Mermer - Doğal Taş Koleksiyonu"
                            />
                            <p className="text-xs text-muted-foreground">Google sonuçlarında görünecek mavi başlık.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Google Analytics ID (İsteğe Bağlı)</label>
                            <input
                                name="googleAnalyticsId"
                                defaultValue={settings?.googleAnalyticsId || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="G-XXXXXXXXXX"
                            />
                            <p className="text-xs text-muted-foreground">Google Analytics 4 ölçüm kimliğinizi girin.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">SEO Açıklaması (Meta Description)</label>
                            <textarea
                                name="seoDescription"
                                defaultValue={settings?.seoDescription || settings?.description}
                                rows={3}
                                className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Örn: En kaliteli mermer ve doğal taş seçenekleri..."
                            />
                            <p className="text-xs text-muted-foreground">Google sonuçlarında başlığın altında çıkan açıklama.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Anahtar Kelimeler (Keywords)</label>
                            <input
                                name="seoKeywords"
                                defaultValue={settings?.seoKeywords || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Örn: mermer, traverten, doğal taş, mutfak tezgahı"
                            />
                            <p className="text-xs text-muted-foreground">Virgülle ayırarak yazınız.</p>
                        </div>
                    </div>
                </div>

                {/* Branding */}
                <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Logo & Favicon</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Logo Yükle</label>
                            <div className="flex items-center gap-4">
                                <input type="file" name="logo" accept="image/*" className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                            </div>
                            {settings?.logoUrl && (
                                <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border inline-block text-center w-full">
                                    <p className="text-xs text-muted-foreground mb-2">Mevcut Logo:</p>
                                    <img src={settings.logoUrl} alt="Logo" className="h-12 object-contain mx-auto" style={{ height: settings.logoHeight || 56 }} />
                                </div>
                            )}
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Logo Genişliği (px)</label>
                                    <input
                                        type="number"
                                        name="logoWidth"
                                        defaultValue={settings?.logoWidth || 150}
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                    <p className="text-xs text-muted-foreground">Logonun kapladığı yatay alan (Örn: 150).</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Logo Yüksekliği (px)</label>
                                    <input
                                        type="number"
                                        name="logoHeight"
                                        defaultValue={settings?.logoHeight || 56}
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                    <p className="text-xs text-muted-foreground">Logonun yüksekliği (Örn: 56).</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="showNavbarLogo"
                                    id="showNavbarLogo"
                                    defaultChecked={settings?.showNavbarLogo !== false}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="showNavbarLogo" className="text-sm font-medium">Navbar'da Logoyu Göster</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="showFooterLogo"
                                    id="showFooterLogo"
                                    defaultChecked={settings?.showFooterLogo !== false}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="showFooterLogo" className="text-sm font-medium">Footer'da Logoyu Göster</label>
                            </div>
                        </div>

                        <div className="space-y-2 col-span-2 border-t border-border pt-6">
                            <label className="text-sm font-medium">Favicon Yükle</label>
                            <div className="flex items-center gap-4">
                                <input type="file" name="favicon" accept="image/*" className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                            </div>
                            {settings?.faviconUrl && (
                                <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border inline-block">
                                    <p className="text-xs text-muted-foreground mb-2">Mevcut Favicon:</p>
                                    <img src={settings.faviconUrl} alt="Favicon" className="h-8 w-8 object-contain" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">İletişim Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Telefon</label>
                            <input
                                name="phone"
                                defaultValue={settings?.phone}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">E-posta</label>
                            <input
                                name="email"
                                defaultValue={settings?.email}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-medium">Adres</label>
                            <textarea
                                name="address"
                                defaultValue={settings?.address}
                                rows={2}
                                className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-medium">Google Maps Embed URL (iframe src)</label>
                            <input
                                name="mapEmbedUrl"
                                defaultValue={settings?.mapEmbedUrl || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="https://www.google.com/maps/embed?..."
                            />
                            <p className="text-xs text-muted-foreground">Google Haritalar&apos;da "Paylaş" -&gt; "Harita yerleştir" kısmındaki src değerini yapıştırın.</p>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">Sosyal Medya</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram URL</label>
                            <input
                                name="instagram"
                                defaultValue={settings?.instagram || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2"><Facebook className="w-4 h-4" /> Facebook URL</label>
                            <input
                                name="facebook"
                                defaultValue={settings?.facebook || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn URL</label>
                            <input
                                name="linkedin"
                                defaultValue={settings?.linkedin || ""}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="https://linkedin.com/..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end sticky bottom-8">
                    <Button type="submit" size="lg" className="shadow-lg">Ayarları Kaydet</Button>
                </div>
            </form>
        </div>
    )
}
