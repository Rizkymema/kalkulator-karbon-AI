'use client'

import { motion } from 'framer-motion'
import { Calculator, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section 
      className="relative h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/begraund pohon.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            >
              <span className="block">Ketahui Jejak Karbonmu,</span>
              <span className="block text-emerald-300">
                Kurangi Dampaknya Sekarang!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-sm"
            >
              Jadilah bagian dari solusi perubahan iklim dengan memahami seberapa besar emisi CO₂ yang kamu hasilkan.
              <br /><br />
              Langkah pertama menuju hidup berkelanjutan dimulai dari sini. Cukup masukkan aktivitas harianmu, dan kami akan bantu menghitung dampaknya terhadap lingkungan — 
              <span className="font-semibold text-emerald-300"> cepat, mudah, dan informatif!</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/kalkulator"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-2 hover:scale-105"
              >
                <Calculator className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Hitung Emisi Karbon Kamu
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/edukasi"
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/80 text-white font-bold rounded-2xl hover:border-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <TrendingUp className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Edukasi
              </Link>
            </motion.div>

            {/* Enhanced Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/30"
            >
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-emerald-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">2,500+</div>
                <div className="text-xs md:text-sm text-white/80 font-medium">🧑‍🤝‍🧑 Pengguna Aktif</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-blue-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">15,000+</div>
                <div className="text-xs md:text-sm text-white/80 font-medium">🌳 Pohon Ditanam</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-emerald-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">200+ ton</div>
                <div className="text-xs md:text-sm text-white/80 font-medium">♻️ CO₂ Dikurangi</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
