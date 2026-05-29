"use client"

import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 pt-36 pb-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-emerald-405 hover:text-emerald-300 font-semibold mb-8 transition-colors text-sm group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Kembali ke Beranda
        </Link>

        {/* Content Card */}
        <div className="bg-slate-950/30 border border-white/5 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-wider">
              Kebijakan Privasi
            </h1>
          </div>

          <p className="text-slate-500 text-xs mb-8">Terakhir diperbarui: 29 Mei 2026</p>

          <div className="space-y-8 text-slate-300 leading-relaxed text-sm font-medium">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">1. Informasi yang Kami Kumpulkan</h2>
              <p>
                Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami saat mendaftar akun, menghitung jejak karbon, atau menghubungi kami melalui formulir kontak. Informasi ini mencakup nama lengkap, alamat email, data konsumsi emisi (listrik, transportasi, limbah), serta pesan atau saran yang dikirim.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">2. Penggunaan Informasi Anda</h2>
              <p>
                Informasi yang kami kumpulkan digunakan secara bertanggung jawab untuk:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Menghitung jejak emisi karbon Anda dengan akurat.</li>
                <li>Memberikan rekomendasi AI personal untuk membantu pengurangan emisi.</li>
                <li>Mengelola keikutsertaan Anda dalam tantangan komunitas dan papan peringkat (leaderboard).</li>
                <li>Memproses tebus karbon (offset emisi) yang Anda pilih.</li>
                <li>Meningkatkan fungsionalitas dan keamanan platform kami.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">3. Perlindungan & Keamanan Data</h2>
              <p>
                Keamanan data Anda adalah prioritas utama kami. Kami menggunakan protokol enkripsi industri modern untuk melindungi informasi pribadi Anda selama transmisi dan penyimpanan. Kami tidak pernah membagikan atau menjual informasi pribadi Anda kepada pihak ketiga untuk tujuan pemasaran tanpa persetujuan eksplisit dari Anda.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">4. Penggunaan Cookies</h2>
              <p>
                Platform kami menggunakan cookies untuk menyimpan sesi masuk Anda, mengingat preferensi kalkulasi, dan menganalisis statistik penggunaan web guna memberikan pengalaman pengguna yang lebih cepat dan dipersonalisasi.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">5. Hak-Hak Anda</h2>
              <p>
                Anda berhak untuk mengakses, memperbarui, atau menghapus informasi profil Anda kapan saja melalui pengaturan akun Anda atau dengan mengajukan permintaan langsung melalui formulir kontak kami.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">6. Perubahan Kebijakan Ini</h2>
              <p>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan pada layanan kami atau regulasi hukum. Kami menyarankan Anda untuk meninjau halaman ini secara berkala untuk mengetahui pembaruan terbaru.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
