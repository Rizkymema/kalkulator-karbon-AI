import { EmissionData } from './store'

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Faktor emisi (kg CO2 per unit)
export const EMISSION_FACTORS = {
  // Transportasi (kg CO2 per km)
  motor_bensin: 0.08,
  motor_listrik: 0.03,
  mobil_bensin: 0.23,
  mobil_solar: 0.27,
  mobil_listrik: 0.10,
  mobil_hybrid: 0.15,
  bus: 0.07,
  krl: 0.03,
  mrt: 0.03,
  angkot: 0.05,
  sepeda: 0,
  jalan_kaki: 0,
  
  // Listrik (kg CO2 per kWh)
  pln: 0.9,
  panel_surya: 0,
  
  // Makanan (kg CO2 per porsi per minggu)
  daging_merah: 7, // 5-7 kg
  daging_putih: 2, // 1.5-2.5 kg
  produk_susu: 1.5, // 1-2 kg
  
  // Sampah & Plastik
  kantong_plastik: 0.2, // per kantong
  tidak_memilah_penalty: 5, // kg CO2 per bulan
  daur_ulang_bonus: -2, // kg CO2 per bulan
  
  // Belanja Konsumtif
  pakaian: 25, // kg CO2 per potong
  gadget: 400, // kg CO2 per unit (300-500)
  pengiriman_online: 0.75, // kg CO2 per pengiriman
  
  // Penerbangan
  domestik: 325, // kg CO2 per penerbangan (250-400)
  internasional: 1250, // kg CO2 per penerbangan (1000-1500)
}

export const KENDARAAN_OPTIONS = [
  { value: 'motor_bensin', label: 'Motor Bensin', icon: '🛵', color: 'orange' },
  { value: 'motor_listrik', label: 'Motor Listrik', icon: '⚡', color: 'yellow' },
  { value: 'mobil_bensin', label: 'Mobil Bensin', icon: '🚗', color: 'red' },
  { value: 'mobil_solar', label: 'Mobil Solar', icon: '🚙', color: 'blue' },
  { value: 'mobil_listrik', label: 'Mobil Listrik', icon: '🔋', color: 'green' },
  { value: 'mobil_hybrid', label: 'Mobil Hybrid', icon: '⚡', color: 'purple' },
  { value: 'bus', label: 'Bus/Transjakarta', icon: '🚌', color: 'indigo' },
  { value: 'krl', label: 'KRL', icon: '🚆', color: 'gray' },
  { value: 'mrt', label: 'MRT', icon: '🚇', color: 'cyan' },
  { value: 'angkot', label: 'Angkot', icon: '🚐', color: 'pink' },
  { value: 'sepeda', label: 'Sepeda', icon: '🚴', color: 'green' },
  { value: 'jalan_kaki', label: 'Jalan Kaki', icon: '🚶', color: 'emerald' },
]

export const LISTRIK_OPTIONS = [
  { value: 'prabayar', label: 'PLN Prabayar', icon: '🔌', color: 'blue' },
  { value: 'pascabayar', label: 'PLN Pascabayar', icon: '💡', color: 'yellow' },
  { value: 'panel_surya', label: 'Panel Surya', icon: '☀️', color: 'orange' },
]

export const MAKANAN_OPTIONS = [
  { value: 'vegan', label: 'Vegan', icon: '🌱', color: 'green' },
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥦', color: 'emerald' },
  { value: 'omnivora', label: 'Omnivora', icon: '🍖', color: 'red' },
]

export const FREKUENSI_OPTIONS = [
  { value: 1, label: 'Jarang (1x/minggu)', icon: '📅', color: 'green' },
  { value: 3, label: 'Kadang (3x/minggu)', icon: '📆', color: 'yellow' },
  { value: 5, label: 'Sering (5x/minggu)', icon: '🗓️', color: 'orange' },
  { value: 7, label: 'Setiap Hari', icon: '📋', color: 'red' },
]

export const SAMPAH_OPTIONS = [
  { value: 'ya', label: 'Ya, Selalu', icon: '♻️', color: 'green' },
  { value: 'kadang', label: 'Kadang-kadang', icon: '🗂️', color: 'yellow' },
  { value: 'tidak', label: 'Tidak Pernah', icon: '🗑️', color: 'red' },
]

export const PLASTIK_USAGE_OPTIONS = [
  { value: 2, label: 'Sangat Sedikit (1-5/minggu)', icon: '🌱', color: 'green' },
  { value: 10, label: 'Sedikit (6-15/minggu)', icon: '🛍️', color: 'yellow' },
  { value: 25, label: 'Sedang (16-35/minggu)', icon: '🛒', color: 'orange' },
  { value: 50, label: 'Banyak (>35/minggu)', icon: '🛍️', color: 'red' },
]

export const BELANJA_PAKAIAN_OPTIONS = [
  { value: 0, label: 'Jarang (0-2/tahun)', icon: '👕', color: 'green' },
  { value: 2, label: 'Sedang (3-6/tahun)', icon: '👔', color: 'yellow' },
  { value: 6, label: 'Sering (7-12/tahun)', icon: '👗', color: 'orange' },
  { value: 12, label: 'Sangat Sering (>12/tahun)', icon: '🛍️', color: 'red' },
]

export const PENERBANGAN_OPTIONS = [
  { value: 0, label: 'Tidak Pernah', icon: '🏠', color: 'green' },
  { value: 1, label: '1-2 kali/tahun', icon: '✈️', color: 'yellow' },
  { value: 3, label: '3-5 kali/tahun', icon: '🛫', color: 'orange' },
  { value: 6, label: '>5 kali/tahun', icon: '🌍', color: 'red' },
]

export function calculateEmissions(data: EmissionData): number {
  let total = 0

  // Transportasi (per minggu)
  const transportEmission = EMISSION_FACTORS[data.transportasi.jenisKendaraan as keyof typeof EMISSION_FACTORS] || 0
  total += transportEmission * data.transportasi.jarakTempuh * data.transportasi.frekuensi * 4.33 // per bulan

  // Listrik
  let listrikEmission = 0
  if (data.listrik.jenisListrik === 'prabayar' || data.listrik.jenisListrik === 'pascabayar') {
    const kwh = data.listrik.tagihan ? data.listrik.tagihan / 1500 : data.listrik.kwh // konversi tagihan ke kWh
    listrikEmission = EMISSION_FACTORS.pln * kwh
  } else if (data.listrik.jenisListrik === 'panel_surya') {
    const persentasePLN = 100 - (data.listrik.persentasePanelSurya || 0)
    const kwh = data.listrik.kwh
    listrikEmission = EMISSION_FACTORS.pln * kwh * (persentasePLN / 100)
  }
  total += listrikEmission

  // Makanan (per minggu ke bulan)
  total += EMISSION_FACTORS.daging_merah * data.makanan.dagingMerah * 4.33
  total += EMISSION_FACTORS.daging_putih * data.makanan.dagingPutih * 4.33
  total += EMISSION_FACTORS.produk_susu * data.makanan.produkSusu * 4.33

  // Sampah & Plastik
  total += EMISSION_FACTORS.kantong_plastik * data.sampah.kantongPlastik * 4.33 // per minggu ke bulan
  if (!data.sampah.memilahSampah) {
    total += EMISSION_FACTORS.tidak_memilah_penalty
  }
  if (data.sampah.produkDaurUlang) {
    total += EMISSION_FACTORS.daur_ulang_bonus
  }

  // Belanja Konsumtif
  total += EMISSION_FACTORS.pakaian * data.belanja.pakaian
  total += EMISSION_FACTORS.gadget * data.belanja.gadget / 12 // per tahun ke bulan
  total += EMISSION_FACTORS.pengiriman_online * data.belanja.belonjaOnline

  // Penerbangan (per tahun ke bulan)
  total += EMISSION_FACTORS.domestik * data.penerbangan.domestik / 12
  total += EMISSION_FACTORS.internasional * data.penerbangan.internasional / 12

  return Math.round(total * 100) / 100 // round to 2 decimal places
}

export function calculateTreesNeeded(emissionKg: number): number {
  // 1 pohon dapat menyerap sekitar 15-20 kg CO2 per tahun
  // Untuk tebusan langsung, kita gunakan 15 kg per pohon
  return Math.ceil(emissionKg / 15)
}

export function formatEmission(emission: number): string {
  return `${emission.toFixed(1)} kg CO₂`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Data rata-rata emisi tahunan (ton CO2)
export const AVERAGE_EMISSIONS = {
  indonesia: 2.3,
  asean: 4.2,
  global: 4.8,
  developed: 10.5
}

export interface EmissionComparison {
  userEmission: number
  indonesia: {
    value: number
    percentage: number
    status: 'higher' | 'lower' | 'equal'
  }
  asean: {
    value: number
    percentage: number
    status: 'higher' | 'lower' | 'equal'
  }
  global: {
    value: number
    percentage: number
    status: 'higher' | 'lower' | 'equal'
  }
}

export function compareEmissions(monthlyEmissionKg: number): EmissionComparison {
  // Konversi ke ton CO2 per tahun
  const yearlyEmissionTons = (monthlyEmissionKg * 12) / 1000

  const calculateComparison = (average: number) => {
    const percentage = Math.abs(((yearlyEmissionTons - average) / average) * 100)
    let status: 'higher' | 'lower' | 'equal' = 'equal'
    
    if (yearlyEmissionTons > average) status = 'higher'
    else if (yearlyEmissionTons < average) status = 'lower'
    
    return {
      value: average,
      percentage: Math.round(percentage * 10) / 10,
      status
    }
  }

  return {
    userEmission: Math.round(yearlyEmissionTons * 100) / 100,
    indonesia: calculateComparison(AVERAGE_EMISSIONS.indonesia),
    asean: calculateComparison(AVERAGE_EMISSIONS.asean),
    global: calculateComparison(AVERAGE_EMISSIONS.global)
  }
}

export function getEmissionCategory(yearlyTons: number): {
  category: string
  color: string
  description: string
} {
  if (yearlyTons < 2) {
    return {
      category: 'Sangat Rendah',
      color: 'text-green-600',
      description: 'Jejak karbon Anda sangat rendah! Terus pertahankan gaya hidup ramah lingkungan ini.'
    }
  } else if (yearlyTons < 4) {
    return {
      category: 'Rendah',
      color: 'text-green-500',
      description: 'Jejak karbon Anda masih dalam kategori rendah. Bagus!'
    }
  } else if (yearlyTons < 8) {
    return {
      category: 'Sedang',
      color: 'text-yellow-500',
      description: 'Jejak karbon Anda dalam kategori sedang. Masih ada ruang untuk perbaikan.'
    }
  } else if (yearlyTons < 12) {
    return {
      category: 'Tinggi',
      color: 'text-orange-500',
      description: 'Jejak karbon Anda cukup tinggi. Pertimbangkan untuk mengurangi aktivitas berkarbon tinggi.'
    }
  } else {
    return {
      category: 'Sangat Tinggi',
      color: 'text-red-600',
      description: 'Jejak karbon Anda sangat tinggi. Perlu tindakan segera untuk menguranginya.'
    }
  }
}
