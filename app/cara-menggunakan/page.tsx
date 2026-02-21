"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, CheckCircle, TrendingDown, Leaf, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function CaraMenggunakanPage() {
  const steps = [
    {
      icon: <Calculator className="h-8 w-8 text-emerald-600" />,
      title: "1. Isi Data Emisi Anda",
      description: "Masukkan data konsumsi harian Anda seperti transportasi, listrik, gas, dan limbah",
      details: [
        "Pilih jenis kendaraan yang sering digunakan",
        "Input konsumsi listrik bulanan (kWh)",
        "Masukkan penggunaan gas LPG",
        "Estimasi produksi limbah harian"
      ]
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      title: "2. Cek Hasil Perhitungan",
      description: "Sistem akan menghitung total emisi karbon Anda dalam satuan ton CO₂",
      details: [
        "Lihat breakdown emisi per kategori",
        "Bandingkan dengan standar nasional",
        "Dapatkan skor lingkungan Anda",
        "Lihat dampak terhadap lingkungan"
      ]
    },
    {
      icon: <TrendingDown className="h-8 w-8 text-orange-600" />,
      title: "3. Dapatkan Rekomendasi",
      description: "Terima saran untuk mengurangi jejak karbon dan gaya hidup yang lebih ramah lingkungan",
      details: [
        "Tips hemat energi di rumah",
        "Alternatif transportasi ramah lingkungan",
        "Cara mengurangi limbah",
        "Rekomendasi produk eco-friendly"
      ]
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "4. Pantau Progress Anda",
      description: "Lacak perkembangan pengurangan emisi Anda dari waktu ke waktu",
      details: [
        "Simpan riwayat perhitungan",
        "Lihat grafik perkembangan",
        "Set target pengurangan emisi",
        "Dapatkan badge pencapaian"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cara Menggunakan Kalkulator Emisi
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Ikuti panduan langkah demi langkah untuk menghitung jejak karbon Anda dan mendapatkan rekomendasi untuk gaya hidup yang lebih ramah lingkungan
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button asChild className="bg-white text-emerald-600 hover:bg-emerald-50">
                <Link href="/kalkulator">
                  <Calculator className="h-5 w-5 mr-2" />
                  Mulai Hitung Sekarang
                </Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Play className="h-5 w-5 mr-2" />
                Tonton Video Tutorial
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Steps Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              4 Langkah Mudah Menghitung Emisi Karbon
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proses yang sederhana dan mudah dipahami untuk membantu Anda memahami jejak karbon pribadi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-gray-100">
                      {step.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 mt-3">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <ArrowRight className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Tips untuk Hasil yang Akurat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Data yang Akurat</h4>
              <p className="text-gray-600 text-sm">
                Gunakan data konsumsi riil dari tagihan bulanan untuk hasil yang lebih presisi
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Konsistensi</h4>
              <p className="text-gray-600 text-sm">
                Lakukan perhitungan secara berkala untuk melihat tren pengurangan emisi
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Tindak Lanjut</h4>
              <p className="text-gray-600 text-sm">
                Implementasikan rekomendasi yang diberikan untuk dampak maksimal
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Siap Mulai Perjalanan Ramah Lingkungan?
            </h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Mulai hitung jejak karbon Anda sekarang dan dapatkan panduan personal untuk gaya hidup yang lebih berkelanjutan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-emerald-600 hover:bg-emerald-50">
                <Link href="/kalkulator">
                  <Calculator className="h-5 w-5 mr-2" />
                  Mulai Hitung Emisi
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/register">
                  Daftar untuk Fitur Lengkap
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
