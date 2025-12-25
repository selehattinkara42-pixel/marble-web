import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create Admin User
    const password = await bcrypt.hash("password", 10)
    await prisma.adminUser.upsert({
        where: { email: "admin@example.com" },
        update: { password },
        create: {
            email: "admin@example.com",
            password,
            name: "Admin User",
        },
    })

    // Initialize Site Settings
    const settingsCount = await prisma.siteSettings.count()
    if (settingsCount === 0) {
        await prisma.siteSettings.create({
            data: {
                brandName: "Lapis & Celikag",
                siteTitle: "Lapis & Celikag Marble | Exclusive Natural Stone",
                description: "Premium marble and natural stone collections.",
                address: "Mermerciler Sanayi Sitesi, 12. Cadde No: 5, Beylikdüzü, İstanbul",
                phone: "+90 212 850 00 00",
                email: "info@marbleweb.com",
                mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.5!2d28.6!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOMKwMzYnMDAuMCJF!5e0!3m2!1sen!2str!4v1620000000000!5m2!1sen!2str"
            }
        })
    }

    // Initialize Home Content
    const homeCount = await prisma.homePageContent.count()
    if (homeCount === 0) {
        await prisma.homePageContent.create({
            data: {
                heroTitle: "Doğanın Eşsiz Sanatı Mermer ile Buluşuyor",
                heroSubtitle: "Lapis & Celikag Mermer, projelerinize estetik ve zarafet katan, dünyanın en seçkin doğal taş koleksiyonlarını sunar.",
                heroBgUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
                aboutTitle: "Mermerin Zarafetini Ustalıkla İşliyoruz",
                aboutText: "Yılların verdiği tecrübe ile Lapis ve Çelikağ Mermer kalitesini bir araya getiriyoruz.",
                aboutImageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
                ctaTitle: "Projeniz İçin Mükemmel Taşı Birlikte Seçelim",
                ctaText: "Uzman ekibimizle iletişime geçin, hayalinizdeki mekanı tasarlamanıza yardımcı olalım.",
                ctaBgUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            }
        })
    }

    // Initialize About Content
    const aboutCount = await prisma.aboutPageContent.count()
    if (aboutCount === 0) {
        await prisma.aboutPageContent.create({
            data: {
                title: "Hakkımızda",
                mainText: "Lapis & Celikag Mermer, doğal taşın zamansız güzelliğini modern yaşam alanlarına taşıyan, sektörün öncü kuruluşlarından biridir.",
                storyTitle: "Hikayemiz",
                storyText: "Yıllar önce küçük bir atölyede başlayan yolculuğumuz, bugün uluslararası projelere imza atan büyük bir marka haline geldi.",
                storyImageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
                visionTitle: "Vizyonumuz",
                visionText: "Sadece bir mermer tedarikçisi olmak değil, mimari projelere değer katan bir çözüm ortağı olmak.",
                visionImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
            }
        })
    }

    // Create Categories
    const marble = await prisma.category.upsert({
        where: { slug: 'marble' },
        update: {},
        create: {
            name: 'Mermer',
            slug: 'marble',
        },
    })

    const granite = await prisma.category.upsert({
        where: { slug: 'granite' },
        update: {},
        create: {
            name: 'Granit',
            slug: 'granite',
        },
    })

    const onyx = await prisma.category.upsert({
        where: { slug: 'onyx' },
        update: {},
        create: {
            name: 'Oniks',
            slug: 'onyx',
        },
    })

    // Create Products (Only if empty to avoid duplicates on re-seed)
    const productCount = await prisma.product.count()
    if (productCount === 0) {
        await prisma.product.createMany({
            data: [
                {
                    name: 'Carrara White',
                    slug: 'carrara-white',
                    description: 'İtalya\'nın meşhur beyaz mermeri. Klasik ve zarif.',
                    imageUrl: 'https://images.unsplash.com/photo-1598556776374-0a37547526bb?q=80&w=1000&auto=format&fit=crop',
                    categoryId: marble.id,
                    featured: true,
                },
                {
                    name: 'Emperador Dark',
                    slug: 'emperador-dark',
                    description: 'Koyu kahverengi tonları ve açık damarlarıyla asil bir görünüm.',
                    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=1000&auto=format&fit=crop',
                    categoryId: marble.id,
                    featured: true,
                },
                {
                    name: 'Blue Bahia',
                    slug: 'blue-bahia',
                    description: 'Egzotik mavi granit, nadir ve çarpıcı.',
                    imageUrl: 'https://images.unsplash.com/photo-1615800098779-1be8287d6b34?q=80&w=1000&auto=format&fit=crop',
                    categoryId: granite.id,
                    featured: true,
                },
                {
                    name: 'Honey Onyx',
                    slug: 'honey-onyx',
                    description: 'Işığı geçiren yapısıyla büyüleyici bal rengi oniks.',
                    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
                    categoryId: onyx.id,
                    featured: true,
                },
            ],
        })
    }

    // Create Projects
    const projectCount = await prisma.project.count()
    if (projectCount === 0) {
        await prisma.project.createMany({
            data: [
                {
                    title: 'Bodrum Villa',
                    slug: 'bodrum-villa',
                    description: 'Modern mimari ile doğal taşın buluşması.',
                    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
                    location: 'Bodrum',
                    year: 2024,
                },
                {
                    title: 'Hilton Lobby',
                    slug: 'hilton-lobby',
                    description: 'Lüks otel lobisi zemin ve duvar kaplamaları.',
                    imageUrl: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1000&auto=format&fit=crop',
                    location: 'İstanbul',
                    year: 2023,
                },
            ],
        })
    }

    // Create Testimonials
    const testimonialCount = await prisma.testimonial.count()
    if (testimonialCount === 0) {
        await prisma.testimonial.createMany({
            data: [
                {
                    name: 'Ahmet Yılmaz',
                    role: 'Mimar / Y Mimarlık',
                    content: 'İstanbul\'daki projemiz için harika bir iş ortağıydılar. Kaliteli malzeme ve profesyonel hizmet.',
                    featured: true,
                },
                {
                    name: 'Elif Korkmaz',
                    role: 'İç Mimar',
                    content: 'Müşterilerime her zaman Lapis & Celikag ürünlerini öneriyorum. Mükemmel çeşitlilik ve kalite.',
                    featured: true,
                },
                {
                    name: 'Mehmet Demir',
                    role: 'İnşaat Müdürü / ABC Yapı',
                    content: 'Zamanında teslimat ve kusursuz işçilik. Tüm projelerimizde tercih ediyoruz.',
                    featured: true,
                },
            ],
        })
    }

    // Create FAQ
    const faqCount = await prisma.fAQ.count()
    if (faqCount === 0) {
        await prisma.fAQ.createMany({
            data: [
                {
                    question: 'Teslimat süreleri ne kadar?',
                    answer: 'Stokta bulunan ürünler için 3-5 iş günü içinde teslimat yapılmaktadır. Özel siparişlerde süre ürüne göre değişmektedir.',
                    order: 1,
                    published: true,
                },
                {
                    question: 'Ürünleri görmek için showroom\'a gelebilir miyim?',
                    answer: 'Evet, İstanbul Beylikdüzü\'ndeki showroom\' umuzu hafta içi 09:00-18:00, Cumartesi 10:00-14:00 saatleri arasında ziyaret edebilirsiniz.',
                    order: 2,
                    published: true,
                },
                {
                    question: 'Özel boyut ve kesim yapıyor musunuz?',
                    answer: 'Evet, projelerinize özel tüm boyut ve kesim işlemlerini modern CNC makinelerimizle gerçekleştiriyoruz.',
                    order: 3,
                    published: true,
                },
                {
                    question: 'Montaj hizmeti sunuyor musunuz?',
                    answer: 'Evet, uzman ekiplerimizle profesyonel montaj hizmeti veriyoruz. İstanbul ve çevresinde ücretsiz keşif yapıyoruz.',
                    order: 4,
                    published: true,
                },
                {
                    question: 'Ödeme seçenekleri nelerdir?',
                    answer: 'Nakit, havale/EFT, kredi kartı (taksitli) ve kurumsal çek ile ödeme kabul ediyoruz.',
                    order: 5,
                    published: true,
                },
            ],
        })
    }

    console.log('Seed data created.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
