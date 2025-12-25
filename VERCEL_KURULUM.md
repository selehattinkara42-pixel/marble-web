
# 🚀 Vercel Yayına Alma Kılavuzu (Ücretsiz)

Sitenizi internette yayınlamak için aşağıdaki adımları sırasıyla yapmanız yeterlidir. Tüm ayarları otomatikleştirdim.

## 1. Adım: GitHub'a Yükleme
Bu projeyi GitHub hesabınıza yüklemiş olmanız gerekiyor. (Eğer henüz yüklemediyseniz GitHub Desktop veya VS Code ile "Publish to GitHub" yapın).

## 2. Adım: Vercel'de Proje Oluşturma
1.  [Vercel.com](https://vercel.com) adresine gidin ve (GitHub ile) giriş yapın.
2.  **Add New...** > **Project** butonuna tıklayın.
3.  GitHub hesabınızdaki `marble-web` (veya projenizin adı) reposunu seçip **Import** deyin.

## 3. Adım: Veritabanı Oluşturma (Çok Önemli!)
Proje oluşturma ekranındayken veya proje oluşturulduktan sonra "Settings"e gitmeden önce:

1.  Vercel panelinde projenizin adına tıklayın.
2.  Yukarıdaki sekmelerden **Storage** sekmesine gelin.
3.  **Connect Store** butonuna basın.
4.  **Postgres** (Vercel Postgres veya Neon) seçeneğini seçin.
5.  Hüküm ve Koşulları kabul edip oluşturun.
6.  Oluşturulduktan sonra size `.env.local` butonları gösterecek. Sol menüden **Settings > Environment Variables** kısmına gidin.
7.  Otomatik olarak `POSTGRES_URL`, `POSTGRES_PRISMA_URL` gibi değerlerin eklendiğini göreceksiniz.
8.  **DİKKAT:** Bizim kodumuz `DATABASE_URL` ismini kullanıyor.
    *   **Environment Variables** sayfasında "Edit" diyerek veya yeni ekleyerek:
    *   Name: `DATABASE_URL`
    *   Value: `POSTGRES_PRISMA_URL` değerinin aynısını kopyalayıp yapıştırın. (Genellikle `postgres://...` ile başlar).

## 4. Adım: Yayınla (Deploy)
1.  Environment Variable'ı ekledikten sonra **Deployments** sekmesine gidin.
2.  Son deployment'ın yanındaki üç noktaya tıklayıp **Redeploy** deyin.
3.  Vercel sitenizi kurmaya başlayacak.

**Otomatik İşlemler:**
Sistem kurulurken yazdığım özel komut (`prisma db push && prisma db seed`) sayesinde:
*   Veritabanı tablolarınız otomatik oluşturulacak.
*   Örnek veriler (Mermerler, Projeler, Hakkımızda yazıları) otomatik yüklenecek.
*   Admin kullanıcısı oluşturulacak:
    *   **Email:** `admin@example.com`
    *   **Şifre:** `password`

## 5. Adım: Giriş Yapın
Site yayınlanınca `/admin` paneline gidip yukarıdaki bilgilerle giriş yapın ve şifrenizi değiştirin!

Hayırlı olsun! 🎉
