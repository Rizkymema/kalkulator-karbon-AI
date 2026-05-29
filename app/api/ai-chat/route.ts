import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Fallback responses untuk berbagai topik lingkungan
const fallbackResponses: Record<string, string[]> = {
  transportasi: [
    "🚗 Untuk mengurangi emisi transportasi:\n\n1. **Gunakan transportasi umum** - Bus dan kereta menghasilkan emisi per penumpang yang jauh lebih rendah\n2. **Carpooling** - Berbagi kendaraan dengan rekan kerja dapat mengurangi emisi hingga 50%\n3. **Sepeda atau jalan kaki** - Untuk jarak dekat, ini adalah pilihan terbaik\n4. **Kendaraan listrik** - Jika memungkinkan, pertimbangkan beralih ke EV\n\nTahukah Anda? Satu mobil pribadi rata-rata menghasilkan 4.6 ton CO₂ per tahun!",
    "🚌 Tips transportasi ramah lingkungan:\n\n• **Work from home** - Kurangi perjalanan dengan kerja dari rumah 1-2 hari/minggu\n• **Kombinasi moda** - Gunakan kereta untuk jarak jauh, sepeda untuk jarak dekat\n• **Perawatan kendaraan** - Ban yang tepat dan servis rutin meningkatkan efisiensi BBM\n• **Eco-driving** - Berkendara halus tanpa akselerasi mendadak menghemat BBM 15-20%"
  ],
  listrik: [
    "⚡ Cara menghemat listrik dan mengurangi emisi:\n\n1. **LED lighting** - Ganti semua lampu ke LED, hemat 75% energi\n2. **AC optimal** - Set suhu 24-26°C, bersihkan filter rutin\n3. **Unplug standby** - Cabut charger dan perangkat yang tidak dipakai\n4. **Panel surya** - Investasi jangka panjang yang menghemat dan ramah lingkungan\n\n💡 Tip: Matikan lampu saat keluar ruangan - kebiasaan kecil, dampak besar!",
    "☀️ Energi rumah yang lebih hijau:\n\n• **Smart power strips** - Otomatis matikan perangkat standby\n• **Peralatan hemat energi** - Pilih yang berlabel Energy Star\n• **Insulasi rumah** - Kurangi kebutuhan AC/pemanas\n• **Timer otomatis** - Untuk pemanas air dan AC\n\nRata-rata rumah tangga bisa menghemat 20-30% listrik dengan langkah sederhana ini!"
  ],
  makanan: [
    "🥗 Diet ramah lingkungan:\n\n1. **Kurangi daging merah** - Produksi daging sapi menghasilkan 27kg CO₂ per kg daging\n2. **Makan lokal** - Kurangi emisi transportasi makanan\n3. **Kurangi food waste** - Rencanakan belanja, simpan dengan benar\n4. **Perbanyak sayuran** - Diet nabati bisa kurangi footprint 50%\n\n🌱 Coba 'Meatless Monday' - satu hari tanpa daging per minggu sudah membantu!",
    "🍽️ Tips makanan berkelanjutan:\n\n• **Beli musiman** - Sayur/buah musiman lebih segar dan rendah emisi\n• **Kompos sisa makanan** - Ubah sampah organik jadi pupuk\n• **Bawa wadah sendiri** - Kurangi kemasan sekali pakai\n• **Masak di rumah** - Lebih sehat dan mengurangi kemasan\n\nTahukah Anda? Food waste menyumbang 8-10% emisi gas rumah kaca global!"
  ],
  sampah: [
    "♻️ Kelola sampah dengan bijak:\n\n1. **Reduce** - Kurangi penggunaan barang sekali pakai\n2. **Reuse** - Gunakan ulang tas belanja, botol minum\n3. **Recycle** - Pisahkan sampah yang bisa didaur ulang\n4. **Kompos** - Olah sampah organik jadi pupuk\n\n🌍 Satu kantong plastik butuh 500-1000 tahun untuk terurai!",
    "🗑️ Zero waste lifestyle:\n\n• **Bawa tumbler** - Hindari cup plastik sekali pakai\n• **Tas belanja sendiri** - No plastic bags!\n• **Pilah sampah** - Organik, plastik, kertas, logam\n• **Repair sebelum replace** - Perbaiki sebelum membuang\n\nTip: Mulai dari hal kecil, konsisten lebih penting dari sempurna!"
  ],
  umum: [
    "🌱 Halo! Saya AI Assistant Karwanua, siap membantu Anda memahami dan mengurangi jejak karbon.\n\nBeberapa topik yang bisa saya bantu:\n• 🚗 Tips transportasi ramah lingkungan\n• ⚡ Cara menghemat energi di rumah\n• 🥗 Diet yang lebih berkelanjutan\n• ♻️ Pengelolaan sampah yang baik\n• 🌳 Cara menebus emisi karbon\n\nSilakan tanyakan apa saja seputar lingkungan!",
    "🌍 Perubahan iklim adalah tantangan terbesar di zaman kita. Kabar baiknya, setiap orang bisa berkontribusi!\n\n**Fakta Penting:**\n• Rata-rata orang Indonesia menghasilkan 2.3 ton CO₂/tahun\n• Target Paris Agreement: max 2°C peningkatan suhu\n• 1 pohon menyerap ~22kg CO₂/tahun\n\nMulai dari langkah kecil: hitung emisi Anda, lalu kurangi secara bertahap. Bersama kita bisa! 💚"
  ],
  pohon: [
    "🌳 Tentang menanam pohon untuk menebus karbon:\n\n**Fakta Pohon:**\n• 1 pohon dewasa menyerap 22kg CO₂/tahun\n• Pohon juga menghasilkan oksigen untuk 2 orang\n• Butuh ~45 pohon untuk menebus emisi 1 orang Indonesia/tahun\n\n**Jenis pohon yang baik:**\n• Mahoni - tumbuh cepat, menyerap banyak CO₂\n• Trembesi - kanopi luas, cocok untuk kota\n• Mangrove - untuk pesisir, sangat efektif\n\nTanam pohon adalah investasi untuk generasi mendatang! 🌱",
    "🌲 Manfaat menanam pohon:\n\n1. **Menyerap CO₂** - Fotosintesis mengubah CO₂ jadi oksigen\n2. **Mendinginkan udara** - Shade dan evapotranspirasi\n3. **Habitat satwa** - Rumah bagi burung dan serangga\n4. **Mencegah erosi** - Akar menahan tanah\n5. **Kesehatan mental** - Ruang hijau meningkatkan well-being\n\nBahkan satu pohon di halaman rumah sudah berkontribusi besar!"
  ],
  donasi: [
    "❤️ Tentang donasi untuk lingkungan:\n\n**Platform terpercaya di Indonesia:**\n• **LindungiHutan** - Fokus reboisasi dan konservasi hutan\n• **Kitabisa** - Berbagai kampanye lingkungan\n• **WWF Indonesia** - Konservasi satwa dan habitat\n\n**Tips berdonasi:**\n• Pastikan organisasi transparan dan akuntabel\n• Pilih program dengan dampak terukur\n• Donasi rutin lebih baik dari sekali besar\n\nSetiap rupiah yang Anda donasikan membantu planet kita! 🌍"
  ]
}

// Fungsi untuk mendapatkan respons fallback berdasarkan pesan
function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Deteksi topik berdasarkan kata kunci
  if (lowerMessage.includes('transportasi') || lowerMessage.includes('kendaraan') || lowerMessage.includes('mobil') || lowerMessage.includes('motor') || lowerMessage.includes('bus') || lowerMessage.includes('kereta')) {
    return fallbackResponses.transportasi[Math.floor(Math.random() * fallbackResponses.transportasi.length)]
  }
  
  if (lowerMessage.includes('listrik') || lowerMessage.includes('energi') || lowerMessage.includes('ac') || lowerMessage.includes('lampu') || lowerMessage.includes('solar') || lowerMessage.includes('panel surya')) {
    return fallbackResponses.listrik[Math.floor(Math.random() * fallbackResponses.listrik.length)]
  }
  
  if (lowerMessage.includes('makanan') || lowerMessage.includes('makan') || lowerMessage.includes('diet') || lowerMessage.includes('daging') || lowerMessage.includes('sayur') || lowerMessage.includes('vegetarian')) {
    return fallbackResponses.makanan[Math.floor(Math.random() * fallbackResponses.makanan.length)]
  }
  
  if (lowerMessage.includes('sampah') || lowerMessage.includes('plastik') || lowerMessage.includes('recycle') || lowerMessage.includes('daur ulang') || lowerMessage.includes('waste')) {
    return fallbackResponses.sampah[Math.floor(Math.random() * fallbackResponses.sampah.length)]
  }
  
  if (lowerMessage.includes('pohon') || lowerMessage.includes('tanam') || lowerMessage.includes('hutan') || lowerMessage.includes('reboisasi')) {
    return fallbackResponses.pohon[Math.floor(Math.random() * fallbackResponses.pohon.length)]
  }
  
  if (lowerMessage.includes('donasi') || lowerMessage.includes('sumbang') || lowerMessage.includes('lindungihutan') || lowerMessage.includes('kitabisa')) {
    return fallbackResponses.donasi[Math.floor(Math.random() * fallbackResponses.donasi.length)]
  }
  
  // Default response
  return fallbackResponses.umum[Math.floor(Math.random() * fallbackResponses.umum.length)]
}

export async function POST(request: NextRequest) {
  try {
    // Get session if user is logged in (optional)
    const session = await getServerSession(authOptions)

    const { message, context, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Check if Gemini API key is available
    const apiKey = process.env.GEMINI_API_KEY?.trim() || ''
    
    // If no API key, use fallback responses
    if (!apiKey || apiKey.trim() === '') {
      console.log('No GEMINI_API_KEY found, using fallback responses')
      
      // Simulate some delay for natural feel
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const fallbackMessage = getFallbackResponse(message)
      
      return NextResponse.json({
        message: fallbackMessage,
        timestamp: new Date().toISOString(),
        isFallback: true
      })
    }

    // Prepare context for AI (environmental focus)
    const systemPrompt = `Anda adalah AI Assistant untuk Tebuskarbon (Karbon Kawanua), sebuah platform perhitungan emisi karbon. 
    
Tugas Anda:
1. Membantu pengguna memahami emisi karbon dan dampak lingkungan
2. Memberikan tips praktis untuk mengurangi jejak karbon
3. Menjelaskan hasil perhitungan emisi karbon
4. Memberikan rekomendasi gaya hidup ramah lingkungan
5. Menjawab pertanyaan tentang perubahan iklim dan sustainability

Konteks pengguna:
- Nama: ${session?.user?.name || 'Pengguna'}
- Email: ${session?.user?.email || 'Tidak tersedia'}
${context ? `- Data konteks aktivitas karbon: ${context}` : ''}

Gaya komunikasi:
- Ramah, antusias, dan informatif
- Fokus pada solusi praktis dan aksi nyata
- Gunakan bahasa Indonesia yang baik dan natural
- Berikan contoh konkret
- Gunakan emoji secara kreatif untuk membuat respons menarik
- Dorong aksi positif untuk lingkungan

Batasan: Jangan membahas topik di luar kelestarian lingkungan, emisi karbon, energi bersih, daur ulang, gaya hidup hijau, dan sustainability.`

    // Map history to Gemini contents format
    const contents: any[] = []
    
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          contents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          })
        }
      })
    }
    
    // Add current message to contents if not already at the end of history
    const lastContent = contents[contents.length - 1]
    if (!lastContent || lastContent.role !== 'user' || lastContent.parts[0].text !== message) {
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      })
    }

    // Call Gemini API
    console.log('Calling Gemini API...')
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [
              {
                text: systemPrompt
              }
            ]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      console.error('Gemini API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      
      // Fallback to local responses on API error
      console.log('Falling back to local responses due to API error')
      const fallbackMessage = getFallbackResponse(message)
      
      return NextResponse.json({
        message: fallbackMessage,
        timestamp: new Date().toISOString(),
        isFallback: true
      })
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiResponse) {
      // Fallback if no response content
      const fallbackMessage = getFallbackResponse(message)
      return NextResponse.json({
        message: fallbackMessage,
        timestamp: new Date().toISOString(),
        isFallback: true
      })
    }

    return NextResponse.json({
      message: aiResponse,
      timestamp: new Date().toISOString(),
      isFallback: false
    })

  } catch (error) {
    console.error('Chatbot API Error:', error)
    
    // Return fallback response even on error
    return NextResponse.json({
      message: "🌱 Maaf, saya sedang mengalami gangguan teknis. Tapi saya tetap bisa membantu!\n\nBeberapa tips umum untuk mengurangi jejak karbon:\n• Gunakan transportasi umum atau sepeda\n• Hemat listrik dengan matikan peralatan yang tidak dipakai\n• Kurangi konsumsi daging merah\n• Pilah dan kurangi sampah\n• Tanam pohon di sekitar rumah\n\nSilakan coba tanya lagi nanti untuk respons yang lebih personal!",
      timestamp: new Date().toISOString(),
      isFallback: true
    })
  }
}
