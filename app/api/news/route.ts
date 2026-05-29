import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Helper untuk mendapatkan tanggal relatif (misal: hari ini - 2 hari)
function getRelativeDate(daysOffset: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return date.toISOString().split('T')[0] // Format YYYY-MM-DD
}

// Data Fallback berkualitas tinggi dengan penanggalan dinamis/relatif
const getFallbackData = () => {
  return {
    articles: [
      {
        id: "1",
        title: "Indonesia Catat Kenaikan Perdagangan Karbon Sektor Kehutanan",
        category: "kebijakan",
        excerpt: "Kementerian Lingkungan Hidup melaporkan peningkatan volume transaksi perdagangan karbon domestik melalui bursa karbon IDXCarbon, didominasi sektor kehutanan.",
        content: "Bursa Karbon Indonesia (IDXCarbon) mencatat pertumbuhan positif pada kuartal ini dengan kontribusi terbesar dari sektor kehutanan dan lahan (FOLU). Langkah ini mempercepat komitmen Indonesia mencapai Net Zero Emission melalui pendanaan hijau berbasis pasar.",
        author: "Kementerian LHK",
        date: getRelativeDate(-1),
        readTime: "4 menit",
        tags: ["Perdagangan Karbon", "Sektor Kehutanan", "IDXCarbon", "Regulasi"],
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
        views: 1840,
        featured: true
      },
      {
        id: "2",
        title: "5 Tips Mudah Mengurangi Emisi Karbon dari Rumah",
        category: "tips",
        excerpt: "Panduan praktis bagi keluarga Indonesia untuk menghemat energi listrik dan mengurangi jejak karbon rumah tangga secara signifikan.",
        content: "Mengurangi emisi karbon keluarga dapat dimulai dari langkah sederhana: mencabut colokan elektronik yang standby, menyetel suhu AC di 25°C, beralih ke lampu LED hemat energi, memilah sampah dapur, serta membatasi konsumsi air bersih.",
        author: "Tim Kampanye Hijau",
        date: getRelativeDate(-2),
        readTime: "3 menit",
        tags: ["Hemat Energi", "Gaya Hidup Hijau", "Tips Rumah", "Karbon Rendah"],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop",
        views: 2540,
        featured: false
      },
      {
        id: "3",
        title: "Teknologi Baru Panel Surya Fleksibel Mulai Diuji Coba di Manado",
        category: "teknologi",
        excerpt: "Uji coba panel surya generasi terbaru yang tipis dan fleksibel mulai diterapkan di beberapa gedung publik Manado guna mendorong energi bersih.",
        content: "Panel surya jenis baru dengan teknologi thin-film perovskite diuji coba untuk pertama kalinya pada bangunan umum di Manado, Sulawesi Utara. Teknologi ini memiliki efisiensi lebih tinggi di cuaca mendung dan lebih mudah dipasang di berbagai jenis arsitektur gedung.",
        author: "Pusat Studi Energi Unsrat",
        date: getRelativeDate(-3),
        readTime: "5 menit",
        tags: ["Energi Surya", "Teknologi Hijau", "Manado", "Transisi Energi"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
        views: 1200,
        featured: false
      },
      {
        id: "4",
        title: "Komunitas Kawanua Lakukan Aksi Penanaman Mangrove Raya",
        category: "lingkungan",
        excerpt: "Ratusan relawan lokal berkumpul di pesisir Sulawesi Utara untuk menanam bibit mangrove guna menahan abrasi dan menyerap emisi karbon pesisir.",
        content: "Dalam rangka memperingati Hari Bumi, komunitas pecinta alam Kawanua beserta warga setempat berhasil menanam lebih dari 2.500 bibit mangrove di kawasan pesisir. Hutan mangrove dikenal memiliki kemampuan menyerap karbon hingga 4 kali lebih efektif dibandingkan hutan daratan.",
        author: "Relawan Karwanua",
        date: getRelativeDate(-5),
        readTime: "4 menit",
        tags: ["Reboisasi", "Mangrove", "Sulawesi Utara", "Aksi Sosial"],
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
        views: 950,
        featured: false
      },
      {
        id: "5",
        title: "Pemerintah Tingkatkan Subsidi Pembelian Motor Listrik",
        category: "teknologi",
        excerpt: "Langkah strategis mempercepat migrasi dari kendaraan berbahan bakar fosil menuju kendaraan listrik beremisi rendah untuk menekan polusi udara.",
        content: "Untuk mendorong adopsi kendaraan listrik massal, pemerintah memperluas cakupan subsidi motor listrik untuk masyarakat. Diharapkan langkah ini dapat menekan konsumsi BBM nasional dan menurunkan tingkat pencemaran udara di kota-kota besar.",
        author: "Kementerian Perhubungan",
        date: getRelativeDate(-7),
        readTime: "4 menit",
        tags: ["Motor Listrik", "Subsidi", "Transportasi Hijau", "Polusi Udara"],
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop",
        views: 1670,
        featured: false
      },
      {
        id: "6",
        title: "Studi Baru: Dampak Pemanasan Suhu Laut terhadap Terumbu Karang Bunaken",
        category: "kebijakan",
        excerpt: "Peneliti menyerukan perlindungan ekstra setelah survei terbaru menunjukkan indikasi pemutihan karang minor di perairan Taman Nasional Bunaken.",
        content: "Pemanasan suhu permukaan air laut global berdampak langsung pada ekosistem laut Indonesia. Hasil studi terbaru di Bunaken menekankan pentingnya pembatasan aktivitas antropogenik di sekitar karang sensitif guna memberi kesempatan pemulihan terumbu karang alami.",
        author: "Dr. Alwi M.",
        date: getRelativeDate(-10),
        readTime: "6 menit",
        tags: ["Bunaken", "Terumbu Karang", "Perubahan Iklim", "Ekologi Laut"],
        image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop",
        views: 1420,
        featured: false
      }
    ],
    events: [
      {
        id: "1",
        title: "Workshop Penghitungan Jejak Karbon Mandiri",
        date: getRelativeDate(10),
        location: "Manado Town Square, Sulawesi Utara",
        type: "Workshop",
        participants: 65
      },
      {
        id: "2",
        title: "Aksi Bersih Pantai & Transplantasi Karang Bunaken",
        date: getRelativeDate(15),
        location: "Taman Nasional Bunaken",
        type: "Aksi Lingkungan",
        participants: 150
      },
      {
        id: "3",
        title: "Seminar Transisi Energi Bersih Sulawesi",
        date: getRelativeDate(22),
        location: "Auditorium Universitas Sam Ratulangi",
        type: "Seminar",
        participants: 120
      }
    ],
    tips: [
      {
        id: "1",
        category: "Transportasi",
        title: "Gunakan Transportasi Umum",
        description: "Naik bus, angkot, atau berboncengan (carpooling) untuk mengurangi emisi kendaraan pribadi di jalan raya.",
        impact: "Hemat 2.6 kg CO₂/hari",
        difficulty: "Mudah",
        color: "from-green-500 to-emerald-500"
      },
      {
        id: "2",
        category: "Energi",
        title: "Cabut Colokan Charger & Elektronik",
        description: "Matikan saklar dan cabut peralatan elektronik dari stopkontak saat tidak digunakan untuk menghindari arus standby (vampire power).",
        impact: "Hemat 0.8 kg CO₂/hari",
        difficulty: "Mudah",
        color: "from-blue-500 to-cyan-500"
      },
      {
        id: "3",
        category: "Makanan",
        title: "Meatless Day (Hari Tanpa Daging)",
        description: "Kurangi konsumsi daging merah 1-2 hari seminggu dan ganti dengan sayur atau protein nabati lokal seperti tahu dan tempe.",
        impact: "Hemat 3.2 kg CO₂/hari",
        difficulty: "Sedang",
        color: "from-orange-500 to-red-500"
      }
    ],
    publikasi: [
      {
        id: "pub-1",
        title: "Panduan Menghitung Jejak Karbon Pribadi 2026",
        type: "PDF Guide",
        description: "Panduan lengkap langkah demi langkah untuk menghitung dan mengurangi emisi karbon sehari-hari dari aktivitas transportasi, energi, makanan, dan belanja.",
        cover: "https://images.unsplash.com/photo-1532094349884-543559f5b6b2?q=80&w=600&auto=format&fit=crop",
        author: "Tim Karwanua",
        date: getRelativeDate(-5),
        downloadUrl: "/publikasi/panduan-karbon-2026.pdf",
        pages: 48,
        isNew: true
      },
      {
        id: "pub-2",
        title: "Riset Emisi Karbon Sektor Transportasi Indonesia 2025",
        type: "Research Paper",
        description: "Hasil penelitian tentang kontribusi sektor transportasi terhadap emisi GRK nasional dan rekomendasi kebijakan transisi menuju mobilitas rendah karbon.",
        cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop",
        author: "LIPI & BRIN",
        date: getRelativeDate(-18),
        downloadUrl: "/publikasi/riset-emisi-transportasi.pdf",
        pages: 92,
        isNew: false
      },
      {
        id: "pub-3",
        title: "Infografis: Jejak Karbon Rata-rata Orang Indonesia",
        type: "Infographic",
        description: "Visualisasi interaktif data emisi CO₂ rata-rata penduduk Indonesia berdasarkan sektor dan perbandingannya dengan negara-negara ASEAN lainnya.",
        cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
        author: "Pusat Data Lingkungan",
        date: getRelativeDate(-8),
        downloadUrl: "/publikasi/infografis-jejak-karbon.pdf",
        pages: 12,
        isNew: true
      },
      {
        id: "pub-4",
        title: "Laporan Tahunan Karwanua 2025",
        type: "Annual Report",
        description: "Laporan komprehensif tentang pencapaian platform Karwanua: jumlah pohon ditanam, emisi dikurangi, serta dampak nyata komunitas sepanjang 2025.",
        cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop",
        author: "Tim Karwanua",
        date: getRelativeDate(-30),
        downloadUrl: "/publikasi/laporan-tahunan-2025.pdf",
        pages: 64,
        isNew: false
      }
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.XAI_API_KEY
    const baseUrl = process.env.XAI_BASE_URL || 'https://api.x.ai/v1'
    const todayStr = new Date().toISOString().split('T')[0]

    if (!apiKey || apiKey.trim() === '') {
      console.log('No XAI_API_KEY found, serving dynamic fallback news')
      return NextResponse.json({
        success: true,
        ...getFallbackData(),
        source: 'fallback'
      })
    }

    console.log('Fetching real-time environmental news using xAI Grok...')

    const systemPrompt = `Anda adalah sistem data real-time untuk platform kelestarian lingkungan Tebuskarbon (Kalkulator Karbon Kawanua). 
Hari ini adalah tanggal ${todayStr}.
Tugas Anda adalah menghasilkan 6 artikel berita lingkungan terkini (fokus pada Indonesia, perubahan iklim, teknologi hijau, perdagangan karbon, reboisasi, atau kelautan), 3 kegiatan mendatang di Sulawesi Utara/Indonesia, dan 3 tips ramah lingkungan untuk hari ini.
Berita harus terasa sangat mutakhir dan realistis, berlokasi di tahun 2026 atau akhir 2025. Tanggal artikel harus dalam rentang tanggal 10 hari terakhir sebelum ${todayStr}.
Gunakan bahasa Indonesia yang baik, ramah, dan mendidik.

Kembalikan data secara eksklusif dalam bentuk JSON valid tanpa pembungkus markdown (tanpa kata kunci \`\`\`json). Format JSON harus persis seperti skema berikut:
{
  "articles": [
    {
      "id": "string angka unik",
      "title": "Judul Berita Lingkungan yang Aktual dan Menarik",
      "category": "tips" | "lingkungan" | "teknologi" | "kebijakan",
      "excerpt": "Ringkasan berita singkat dalam 1-2 kalimat.",
      "content": "Isi berita lengkap yang informatif (sekitar 3-4 kalimat).",
      "author": "Nama Penulis/Instansi",
      "date": "Format YYYY-MM-DD",
      "readTime": "3 menit",
      "tags": ["Tag1", "Tag2"],
      "image": "URL gambar berkualitas tinggi dari Unsplash yang relevan dengan topik (misal: panel surya, hutan, kendaraan listrik, laut bunaken, daur ulang)",
      "views": 1000,
      "featured": true (untuk 1 artikel utama) atau false (untuk artikel lainnya)
    }
  ],
  "events": [
    {
      "id": "string unik",
      "title": "Nama Kegiatan Lingkungan",
      "date": "Format YYYY-MM-DD (harus tanggal mendatang setelah hari ini)",
      "location": "Nama Tempat, Kota",
      "type": "Workshop" | "Aksi Lingkungan" | "Seminar",
      "participants": 120
    }
  ],
  "tips": [
    {
      "id": "string unik",
      "category": "Transportasi" | "Energi" | "Makanan" | "Belanja" | "Sampah",
      "title": "Judul Tip Ringkas",
      "description": "Langkah praktis yang mudah diikuti.",
      "impact": "Hemat X kg CO₂/hari",
      "difficulty": "Mudah" | "Sedang" | "Sulit",
      "color": "from-[color]-500 to-[color]-500 (contoh: from-green-500 to-emerald-500)"
    }
  ]
}`

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: 'Hasilkan data JSON berita lingkungan real-time.'
          }
        ],
        temperature: 0.6,
        max_tokens: 1500
      }),
      // Tambahkan timeout 8 detik agar tidak membuat front-end terhambat terlalu lama
      signal: AbortSignal.timeout(8000)
    })

    if (!response.ok) {
      throw new Error(`xAI API responded with status ${response.status}`)
    }

    const resData = await response.json()
    const rawContent = resData.choices?.[0]?.message?.content

    if (!rawContent) {
      throw new Error('xAI API returned empty response')
    }

    // Bersihkan wrapper markdown jika ada (walau menggunakan response_format json_object biasanya bersih)
    let cleanedJson = rawContent.trim()
    if (cleanedJson.startsWith('```')) {
      cleanedJson = cleanedJson.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim()
    }

    const newsData = JSON.parse(cleanedJson)

    // Validasi dasar
    if (!newsData.articles || !Array.isArray(newsData.articles)) {
      throw new Error('Invalid articles format returned from AI')
    }

    return NextResponse.json({
      success: true,
      articles: newsData.articles,
      events: newsData.events || getFallbackData().events,
      tips: newsData.tips || getFallbackData().tips,
      publikasi: newsData.publikasi || getFallbackData().publikasi,
      source: 'grok-ai'
    })

  } catch (error) {
    console.error('Error fetching real-time news from xAI:', error)
    // Kembali ke fallback dinamis berkualitas tinggi
    return NextResponse.json({
      success: true,
      ...getFallbackData(),
      source: 'fallback-on-error',
      error: error instanceof Error ? error.message : String(error)
    })
  }
}
