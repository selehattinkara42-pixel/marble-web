
# 🌍 Sitenizi İnternette Yayınlama Kılavuzu (En Basit Anlatım)

Sitenizi **Vercel** üzerinden **ücretsiz** ve **ömür boyu** yayınlamak için aşağıdaki adımları sırasıyla yapın. Hiçbir teknik bilgiye ihtiyacınız yok, sadece tıklamanız yeterli.

---

## 1. Adım: GitHub'a Yükleme (En Detaylı Anlatım) 📦
Önce projemizi internetteki depoya (GitHub) koymamız lazım. Bunu yapmanın en kolay yolu **GitHub Desktop** programıdır.

### 1.1 Programı İndir ve Kur
1.  [desktop.github.com](https://desktop.github.com/) adresine gidin.
2.  Mor renkli **"Download for Windows"** butonuna basıp indirin.
3.  İnen dosyayı açıp kurun.

### 1.2 Giriş Yap
1.  Program açılınca **"Sign in to GitHub.com"** butonuna basın.
    *   *(Hesabınız yoksa önce github.com'a gidip ücretsiz üye olun).*
2.  Tarayıcı açılacak, onay verin ve programa geri dönün.

### 1.3 Projeyi Programa Ekle
1.  GitHub Desktop programında sol üstteki **File** menüsüne tıklayın.
2.  **"Add local repository..."** (Yerel depo ekle) seçeneğine basın.
3.  **Choose...** butonuna basın.
4.  Masaüstündeki projenizin klasörünü (`mermer sitesi/marble-web`) bulup seçin.
5.  **Add Repository** butonuna basın.
    *   *(Eğer "This directory does not appear to be a Git repository" derse "create a repository here" yazısına tıklayın).*

### 1.4 İnternete Gönder (Publish)
1.  Programın üst kısmında mavi renkli **"Publish repository"** butonunu göreceksiniz. Oraya basın.
2.  **Name:** `marble-web` olarak kalabilir (veya istediğiniz bir isim).
3.  **Keep this code private:** Bu kutucuktaki tiki **KALDIRIN** (Public olsun, daha rahat edersiniz, ama Private da kalabilir sorun değil).
4.  **Publish Repository** butonuna basın.
5.  Yükleme çubuğu dolunca projeniz artık GitHub'da! 🎉

---

## 2. Adım: Vercel'de Proje Açma ⚡
1.  [vercel.com](https://vercel.com) adresine gidin.
2.  Sağ üstten **Sign Up** (Üye ol) diyerek **"Continue with GitHub"** seçeneği ile giriş yapın.
3.  Ana sayfada **"Add New..."** butonuna basın > **"Project"** seçin.
4.  Listede az önce GitHub'a yüklediğiniz projeyi göreceksiniz. Yanındaki **"Import"** butonuna basın.
5.  Açılan sayfada hiçbir ayarı değiştirmeden mavi **"Deploy"** butonuna basın.
    *   *İlk denemede hata verebilir (Deployment Failed). Panik yapmayın! Veritabanı bağlı olmadığı için bu normal. Adım 3'e geçin.*

---

## 3. Adım: Veritabanını Bağlama (En Önemli Kısım) 🗄️
Sitenin çalışması için verilerin duracağı bir yer lazım. Bunu Vercel bize ücretsiz veriyor.

1.  Vercel'de oluşturduğunuz projenin paneline gelin (Dashboard).
2.  Üstteki menüden **"Storage"** sekmesine tıklayın.
3.  **"Connect Store"** (veya Create Database) butonuna basın.
4.  Listeden **"Postgres"** seçeneğini seçin.
5.  Listeden **"Vercel Postgres"** veya **"Neon"** seçebilirsiniz (fark etmez).
6.  Hüküm ve koşulları "Accept" diyip geçin.
7.  Veritabanı kurulunca sol menüden **"Settings"** > **"Environment Variables"** kısmına gidin.
8.  Burada bir sürü gizli yazı göreceksiniz (POSTGRES_URL vs.).
9.  **Şunu Yapın (Çok Dikkatli):**
    *   Oradaki `POSTGRES_PRISMA_URL` yazan satırın karşısındaki değeri kopyalayın (Göz işaretine basıp kopyalayabilirsiniz).
        *   *(Eğer POSTGRES_PRISMA_URL yoksa POSTGRES_URL değerini kopyalayın)*.
    *   Sayfada **"Create New"** butonuna basın.
    *   **Key** kısmına: `DATABASE_URL` yazın.
    *   **Value** kısmına: Kopyaladığınız değeri yapıştırın.
    *   **Save** deyin.

---

## 4. Adım: Siteyi Tekrar Başlat 🔄
Ayarları yaptık, şimdi siteye "Hadi tekrar dene" diyeceğiz.

1.  Üst menüden **"Deployments"** sekmesine gelin.
2.  En üstteki (muhtemelen kırmızı hata vermiş olan) satırın en sağındaki **üç noktaya** tıklayın.
3.  **"Redeploy"** seçeneğine basın.
4.  Açılan kutuda tekrar **"Redeploy"** deyin.

Arkanıza yaslanın! ☕
Vercel yaklaşık 2-3 dakika içinde:
*   Sitenizi kuracak.
*   Veritabanınızı oluşturacak.
*   İçine örnek ürünleri ve ayarları yükleyecek.

Ekran yeşil olup **"Congratulations!"** dediğinde siteniz yayında demektir! 🥳

**Domain (Alan Adı):** Size `proje-adi.vercel.app` gibi bir link verecek. O linke tıklayıp sitenize girebilirsiniz.

---

## 5. Adım: Admin Paneline Giriş 🔑
Siteniz açıldığında adres çubuğunun sonuna `/admin` yazarak yönetim paneline gidin.

**Giriş Bilgileri:**
*   **Email:** `admin@example.com`
*   **Şifre:** `password`

*Lütfen giriş yaptıktan sonra Ayarlar kısmından şifrenizi değiştirin!*

Hayırlı olsun!
