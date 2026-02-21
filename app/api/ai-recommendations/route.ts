import { NextRequest, NextResponse } from 'next/server'
import { EmissionData } from '../../../lib/store'

// Simulasi AI service - bisa diganti dengan Azure OpenAI
class AIRecommendationService {
  private generateRecommendations(data: EmissionData): string[] {
    const recommendations: string[] = []
    
    // Analisis transportasi
    if (data.transportasi.jenisKendaraan === 'mobil_pribadi' || data.transportasi.jenisKendaraan === 'motor') {
      if (data.transportasi.jarakTempuh > 20) {
        recommendations.push('🚗 Pertimbangkan untuk menggunakan transportasi umum atau carpooling untuk perjalanan yang lebih jauh. Ini dapat mengurangi emisi hingga 45% per perjalanan.')
      }
      if (data.transportasi.frekuensi >= 5) {
        recommendations.push('🚌 Cobalah bekerja dari rumah 1-2 hari seminggu atau gunakan sepeda untuk jarak dekat. Mengurangi 20% perjalanan dapat menghemat 500kg CO₂ per tahun.')
      }
    }
    
    // Analisis listrik
    if (data.listrik.jenisListrik !== 'panel_surya') {
      if ((data.listrik.kwh || 0) > 300 || (data.listrik.tagihan || 0) > 400000) {
        recommendations.push('⚡ Konsumsi listrik Anda cukup tinggi. Ganti lampu LED, cabut perangkat yang tidak digunakan, dan pertimbangkan panel surya. Penghematan 20% listrik = 800kg CO₂ per tahun.')
      }
      recommendations.push('☀️ Pertimbangkan instalasi panel surya. Dengan investasi awal, Anda bisa mengurangi emisi hingga 80% dari konsumsi listrik dan menghemat biaya jangka panjang.')
    }
    
    // Analisis makanan
    if (data.makanan.polaMakan === 'omnivora') {
      if (data.makanan.dagingMerah > 3) {
        recommendations.push('🥩 Kurangi konsumsi daging merah menjadi 1-2 porsi per minggu. Ganti dengan protein nabati atau ikan. Ini dapat mengurangi 300kg CO₂ per tahun.')
      }
      if (data.makanan.dagingMerah > 0 || data.makanan.dagingPutih > 5) {
        recommendations.push('🌱 Coba "Meatless Monday" atau pola makan flexitarian. Mengurangi konsumsi daging 30% dapat menghemat 200kg CO₂ per tahun.')
      }
    }
    
    // Analisis sampah
    if (!data.sampah.memilahSampah) {
      recommendations.push('♻️ Mulai memilah sampah organik dan non-organik. Sampah organik yang dikompos mengurangi emisi metana dan menghasilkan pupuk alami.')
    }
    if (data.sampah.kantongPlastik > 2) {
      recommendations.push('🛍️ Gunakan tas belanja yang dapat digunakan kembali. Mengurangi 100 kantong plastik per tahun = 22kg CO₂ lebih sedikit.')
    }
    
    // Analisis belanja
    if (data.belanja.pakaian > 2) {
      recommendations.push('👕 Pertimbangkan fashion berkelanjutan: beli pakaian berkualitas, thrifting, atau swap clothes dengan teman. Fast fashion berkontribusi 8% dari emisi global.')
    }
    if (data.belanja.gadget > 1) {
      recommendations.push('📱 Gunakan gadget lebih lama sebelum upgrade. Memperpanjang usia smartphone 1 tahun = menghemat 85kg CO₂ dari produksi.')
    }
    
    // Analisis penerbangan
    if (data.penerbangan.domestik > 2 || data.penerbangan.internasional > 1) {
      recommendations.push('✈️ Kurangi perjalanan udara atau pilih penerbangan dengan carbon offset. Satu penerbangan Jakarta-Bali = 0.8 ton CO₂. Pertimbangkan staycation!')
    }
    
    // Rekomendasi umum berdasarkan profil
    const totalEmissionEstimate = this.estimateTotalEmission(data)
    if (totalEmissionEstimate > 8000) {
      recommendations.push('🎯 Target: Kurangi emisi 20% dalam 6 bulan dengan fokus pada transportasi dan listrik - dua sumber emisi terbesar Anda.')
    } else if (totalEmissionEstimate > 5000) {
      recommendations.push('🌟 Anda sudah cukup baik! Fokus pada fine-tuning: efisiensi energi rumah dan pola konsumsi yang lebih berkelanjutan.')
    } else {
      recommendations.push('🏆 Jejak karbon Anda sudah rendah! Bantu edukasi orang lain dan dukung teknologi hijau untuk dampak yang lebih besar.')
    }
    
    return recommendations.slice(0, 5) // Maksimal 5 rekomendasi
  }
  
  private estimateTotalEmission(data: EmissionData): number {
    // Estimasi sederhana untuk menentukan kategori rekomendasi
    let total = 0
    
    // Transportasi
    if (data.transportasi.jenisKendaraan === 'mobil_pribadi') {
      total += data.transportasi.jarakTempuh * data.transportasi.frekuensi * 0.2 * 52
    } else if (data.transportasi.jenisKendaraan === 'motor') {
      total += data.transportasi.jarakTempuh * data.transportasi.frekuensi * 0.1 * 52
    }
    
    // Listrik
    total += (data.listrik.kwh || 0) * 0.8 * 12
    
    // Makanan
    if (data.makanan.polaMakan === 'omnivora') {
      total += (data.makanan.dagingMerah * 15 + data.makanan.dagingPutih * 5) * 52
    }
    
    // Penerbangan
    total += data.penerbangan.domestik * 400 + data.penerbangan.internasional * 2000
    
    return total
  }
  
  async generateAIInsight(data: EmissionData): Promise<{
    recommendations: string[]
    impactLevel: 'low' | 'medium' | 'high'
    potentialSavings: string
    priorityActions: string[]
  }> {
    const recommendations = this.generateRecommendations(data)
    const totalEmission = this.estimateTotalEmission(data)
    
    let impactLevel: 'low' | 'medium' | 'high' = 'medium'
    let potentialSavings = '1-2 ton CO₂ per tahun'
    
    if (totalEmission > 8000) {
      impactLevel = 'high'
      potentialSavings = '3-5 ton CO₂ per tahun'
    } else if (totalEmission < 4000) {
      impactLevel = 'low'
      potentialSavings = '0.5-1 ton CO₂ per tahun'
    }
    
    const priorityActions = this.getPriorityActions(data)
    
    return {
      recommendations,
      impactLevel,
      potentialSavings,
      priorityActions
    }
  }
  
  private getPriorityActions(data: EmissionData): string[] {
    const actions: string[] = []
    
    // Prioritas berdasarkan dampak terbesar
    if (data.transportasi.jenisKendaraan === 'mobil_pribadi' && data.transportasi.jarakTempuh > 15) {
      actions.push('Optimalisasi transportasi (dampak tertinggi)')
    }
    
    if (data.listrik.jenisListrik !== 'panel_surya' && (data.listrik.kwh || 0) > 250) {
      actions.push('Efisiensi energi rumah (dampak tinggi)')
    }
    
    if (data.makanan.polaMakan === 'omnivora' && data.makanan.dagingMerah > 2) {
      actions.push('Modifikasi pola makan (dampak sedang-tinggi)')
    }
    
    return actions.slice(0, 3)
  }
}

export async function POST(request: NextRequest) {
  try {
    const emissionData: EmissionData = await request.json()
    
    // Validasi data
    if (!emissionData || typeof emissionData !== 'object') {
      return NextResponse.json(
        { error: 'Data emisi tidak valid' },
        { status: 400 }
      )
    }
    
    const aiService = new AIRecommendationService()
    const aiInsight = await aiService.generateAIInsight(emissionData)
    
    return NextResponse.json({
      success: true,
      ...aiInsight,
      generatedAt: new Date().toISOString(),
      aiVersion: 'TebusCarbonAI v1.0'
    })
    
  } catch (error) {
    console.error('Error generating AI recommendations:', error)
    return NextResponse.json(
      { error: 'Gagal menghasilkan rekomendasi AI' },
      { status: 500 }
    )
  }
}
