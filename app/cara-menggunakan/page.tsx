"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, CheckCircle, TrendingDown, Leaf } from "lucide-react"
import Link from "next/link"

export default function CaraMenggunakanPage() {
  const steps = [
    {
      icon: <Calculator className="h-6 w-6 text-emerald-400" />,
      title: "Isi Data Emisi Anda",
      description: "Masukkan data konsumsi harian Anda seperti transportasi, listrik, gas, dan limbah",
      details: [
        "Pilih jenis kendaraan yang sering digunakan",
        "Input konsumsi listrik bulanan (kWh)",
        "Masukkan penggunaan gas LPG",
        "Estimasi produksi limbah harian"
      ]
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-emerald-400" />,
      title: "Cek Hasil Perhitungan",
      description: "Sistem akan menghitung total emisi karbon Anda dalam satuan ton CO₂",
      details: [
        "Lihat breakdown emisi per kategori",
        "Bandingkan dengan standar nasional",
        "Dapatkan skor lingkungan Anda",
        "Lihat dampak terhadap lingkungan"
      ]
    },
    {
      icon: <TrendingDown className="h-6 w-6 text-emerald-400" />,
      title: "Dapatkan Rekomendasi",
      description: "Terima saran untuk mengurangi jejak karbon dan gaya hidup yang lebih ramah lingkungan",
      details: [
        "Tips hemat energi di rumah",
        "Alternatif transportasi ramah lingkungan",
        "Cara mengurangi limbah",
        "Rekomendasi produk eco-friendly"
      ]
    },
    {
      icon: <Leaf className="h-6 w-6 text-emerald-400" />,
      title: "Pantau Progress Anda",
      description: "Lacak perkembangan penekanan emisi Anda dari waktu ke waktu",
      details: [
        "Simpan riwayat perhitungan",
        "Lihat grafik perkembangan",
        "Set target pengurangan emisi",
        "Dapatkan badge pencapaian"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 relative overflow-hidden pt-36 pb-20">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-black font-display uppercase tracking-wider text-white">
            Cara Menggunakan
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed">
            Ikuti panduan langkah demi langkah untuk menghitung jejak karbon Anda, memantau dampak lingkungan, dan mengambil tindakan nyata menuju gaya hidup berkelanjutan.
          </p>
          <div className="flex justify-center pt-4">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] text-sm">
              <Link href="/kalkulator" className="flex items-center gap-2">
                <Calculator className="h-4.5 w-4.5 text-white" />
                Mulai Hitung Sekarang
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-20">
        
        {/* Steps Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black font-display uppercase text-white tracking-wider">
              4 Langkah Mudah Menuju Ramah Lingkungan
            </h2>
            <p className="text-slate-450 max-w-2xl mx-auto font-semibold">
              Proses kalkulasi yang sederhana dan intuitif dirancang untuk membantu Anda memahami dampak emisi harian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden p-8 rounded-3xl bg-slate-950/30 border border-white/5 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/20 hover:shadow-[0_10px_30px_rgba(16,185,129,0.03)] group"
              >
                {/* Step Watermark Number */}
                <div className="absolute -top-4 -right-2 text-8xl font-black text-white/[0.02] group-hover:text-emerald-500/[0.04] transition-colors select-none pointer-events-none font-display">
                  0{index + 1}
                </div>

                <CardContent className="p-0 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    {step.description}
                  </p>

                  <ul className="space-y-3 pt-6 border-t border-white/5">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3 text-sm text-slate-350 font-medium">
                        <CheckCircle className="h-4.5 w-4.5 text-emerald-500/60 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-slate-950/30 backdrop-blur-xl border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-2xl font-black text-center text-white uppercase tracking-wider mb-12">
            Tips Mendapatkan Hasil Presisi
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="text-center space-y-3">
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl w-fit text-emerald-400 mx-auto">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-white text-base">Gunakan Data Riil</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                Gunakan angka riil dari tagihan listrik atau odometer kendaraan untuk kalkulasi yang lebih valid.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl w-fit text-emerald-400 mx-auto">
                <TrendingDown className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-white text-base">Kalkulasi Berkala</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                Lakukan perhitungan berkala (misal sebulan sekali) untuk mengamati tren keberhasilan pengurangan emisi.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl w-fit text-emerald-400 mx-auto">
                <Leaf className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-white text-base">Terapkan Rekomendasi</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                Implementasikan langkah-langkah hemat emisi yang disarankan AI guna merasakan dampak nyata lingkungan.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-slate-950/80 to-emerald-950/15 border border-white/5 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute bottom-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
              Siap Menjadi Pahlawan Lingkungan?
            </h3>
            <p className="text-slate-400 text-base font-medium leading-relaxed">
              Mulai hitung emisi Anda hari ini dan ambil langkah pertama untuk menjaga kelestarian bumi kita.
            </p>
            <div className="flex justify-center pt-2">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] text-sm">
                <Link href="/kalkulator" className="flex items-center gap-2">
                  <Calculator className="h-4.5 w-4.5 text-white" />
                  Mulai Hitung Emisi
                </Link>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
