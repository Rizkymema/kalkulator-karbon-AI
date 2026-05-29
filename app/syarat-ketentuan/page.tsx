"use client"

import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export default function SyaratKetentuanPage() {
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
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-wider">
              Syarat & Ketentuan
            </h1>
          </div>

          <p className="text-slate-500 text-xs mb-8">Terakhir diperbarui: 29 Mei 2026</p>

          <div className="space-y-8 text-slate-300 leading-relaxed text-sm font-medium">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">1. Penerimaan Ketentuan</h2>
              <p>
                Dengan mengakses atau menggunakan platform Tebuskarbon, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini serta semua hukum dan peraturan yang berlaku. Jika Anda tidak menyetujui salah satu dari ketentuan ini, Anda dilarang menggunakan situs ini.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">2. Lisensi Penggunaan</h2>
              <p>
                Diberikan izin untuk mengakses dan menggunakan materi informasi di platform Tebuskarbon untuk penggunaan pribadi non-komersial sementara saja. Di bawah lisensi ini, Anda tidak diperkenankan untuk:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Memodifikasi atau menyalin materi yang tersedia.</li>
                <li>Menggunakan materi untuk tujuan komersial apa pun, atau untuk tampilan publik (komersial atau non-komersial).</li>
                <li>Mencoba mendekompilasi atau merekayasa balik perangkat lunak apa pun yang ada di platform.</li>
                <li>Menghapus hak cipta atau notasi kepemilikan lainnya dari materi.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">3. Akun Pengguna</h2>
              <p>
                Saat membuat akun di platform kami, Anda wajib memberikan informasi yang akurat dan lengkap. Anda bertanggung jawab penuh untuk menjaga kerahasiaan kata sandi Anda dan untuk setiap aktivitas yang terjadi di bawah akun Anda. Hubungi kami segera jika terjadi pelanggaran keamanan atau penggunaan akun tanpa izin.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">4. Perhitungan & Tebus Karbon</h2>
              <p>
                Kalkulasi emisi karbon yang disediakan oleh platform kami adalah estimasi berdasarkan model matematika standar dan input data dari Anda. Hasil tebus karbon (seperti penanaman pohon atau kontribusi donasi) dilakukan bekerja sama dengan mitra lingkungan resmi kami dan diproses sesuai dengan opsi yang Anda pilih.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">5. Batasan Tanggung Jawab</h2>
              <p>
                Dalam keadaan apa pun Tebuskarbon tidak bertanggung jawab atas kerugian apa pun (termasuk, tanpa batasan, kerugian atas hilangnya data atau keuntungan, atau karena gangguan bisnis) yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan materi di platform kami.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">6. Hukum yang Mengatur</h2>
              <p>
                Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia, dan Anda tunduk pada yurisdiksi eksklusif pengadilan di wilayah tersebut.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
