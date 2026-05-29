'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import { 
  Calculator, 
  ArrowRight, 
  TreePine, 
  Award, 
  Sparkles, 
  MapPin, 
  Quote, 
  ChevronRight, 
  ChevronLeft, 
  Leaf, 
  Flame,
  Brain
} from 'lucide-react'
import Link from 'next/link'
import SequenceScroll from '../components/SequenceScroll'
import { MotionValue } from 'framer-motion'

// --- HELPER COMPONENT: TextReveal (split word scrub animation) ---
function Word({ word, progress, start, end }: { word: string, progress: MotionValue<number>, start: number, end: number }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  const y = useTransform(progress, [start, end], [12, 0])
  return (
    <motion.span
      style={{ opacity, y }}
      className="mr-2 sm:mr-2.5 mb-1 sm:mb-2 inline-block"
    >
      {word}
    </motion.span>
  )
}

function TextReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45']
  })
  
  const words = text.split(' ')
  return (
    <p ref={containerRef} className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black font-display leading-[1.3] text-slate-200 flex flex-wrap justify-center text-center max-w-4xl mx-auto px-4">
      {words.map((word, idx) => {
        const start = idx / words.length
        const end = (idx + 1) / words.length
        return <Word key={idx} word={word} progress={scrollYProgress} start={start} end={end} />
      })}
    </p>
  )
}

// --- HELPER COMPONENT: CountUp (numeric scroll animation) ---
function CountUp({ from = 0, to, duration = 2.5, suffix = "" }: { from?: number; to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView) return
    const element = ref.current
    if (!element) return

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // premium out-expo easing
      onUpdate(value) {
        element.textContent = Math.round(value).toLocaleString('id-ID') + suffix
      }
    })

    return () => controls.stop()
  }, [inView, from, to, duration, suffix])

  return <span ref={ref} className="tabular-nums">0</span>
}

// --- HELPER COMPONENT: BentoCard (hover glow mouse tracking) ---
function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-glow-card p-6 md:p-8 flex flex-col justify-between group ${className}`}
    >
      {children}
    </div>
  )
}

// --- TESTIMONIAL DATA ---
const testimonials = [
  {
    quote: "Dengan Tebuskarbon, saya akhirnya tahu persis berapa emisi dari AC kamar saya dan bisa langsung menanam 2 pohon mangrove di Manado untuk menebusnya secara instan.",
    author: "Alya Rahma",
    role: "Mahasiswi Lingkungan, Universitas Sam Ratulangi",
    avatar: "AR"
  },
  {
    quote: "Transparansi data koordinat satelit pohon membuat kami dari korporat percaya bahwa program pelestarian alam ini 100% nyata dan dapat dipertanggungjawabkan secara berkala.",
    author: "Ir. Budi Santoso, M.Si.",
    role: "Sustainability Director, Lestari Group",
    avatar: "BS"
  },
  {
    quote: "Sangat menyukai integrasi asisten AI-nya yang interaktif. Memberikan tips hemat karbon harian yang mudah dilakukan namun tetap berdampak besar bagi bumi.",
    author: "Fahmi Yusuf",
    role: "Pegiat Lingkungan, Green Community Manado",
    avatar: "FY"
  }
]

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)

  // Auto slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#030a08] overflow-x-clip font-sans antialiased text-slate-200">
      
      {/* 1. Immersive Canvas Sequence Scroll Section (Hero Section) */}
      <SequenceScroll />

      {/* 2. Subsequent Landing Sections (Closing the Hero sequence scroll via negative margin) */}
      <div className="-mt-[100vh] relative z-10 bg-slate-950 text-white rounded-t-[48px] shadow-[0_-20px_50px_rgba(3,10,8,0.5)] border-t border-emerald-500/10 overflow-hidden">
        
        {/* Subtle noise background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.04),transparent_50%)] pointer-events-none" />
        
        {/* --- ABOUT US (TEXT REVEAL SCRUB) SECTION --- */}
        <section className="py-20 md:py-24 px-4 max-w-5xl mx-auto flex flex-col items-center justify-center border-b border-white/5 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center space-y-3 mb-8 md:mb-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest select-none">
              <Leaf className="w-3.5 h-3.5" />
              <span>Visi & Misi Kami</span>
            </div>
          </motion.div>

          <TextReveal 
            text="Tebuskarbon lahir sebagai jembatan bagi setiap pejuang lingkungan untuk mengukur emisi harian secara presisi, memahami jejak karbon pribadi, dan melakukan langkah mitigasi nyata melalui penanaman pohon yang terverifikasi. Bersama, kita menanam bibit harapan untuk bumi yang lebih hijau, dingin, dan lestari bagi masa depan."
          />
        </section>

        {/* --- BENTO GRID FEATURE DISPLAY SECTION --- */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-b border-white/5">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest select-none">
              <span>ALAT & FITUR EKOSISTEM</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase">
              Solusi Terpadu Menjaga <br className="hidden sm:inline" /> Iklim Kita
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
              Eksplorasi modul canggih kami yang dirancang untuk membantu Anda beralih ke gaya hidup rendah emisi secara terstruktur dan terukur.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: AI Emission Calculator (Large: spans 2 columns in md) */}
            <BentoCard className="md:col-span-2 min-h-[320px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full filter blur-[40px] pointer-events-none" />
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-6">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black font-display uppercase text-white tracking-tight">
                  Kalkulator Emisi Presisi AI
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
                  Kalkulasikan jejak karbon dari aktivitas harian Anda seperti penggunaan listrik rumah, kendaraan transportasi, hingga konsumsi makanan secara terperinci menggunakan kecerdasan buatan.
                </p>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <Link 
                  href="/kalkulator" 
                  className="text-xs font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Mulai Menghitung <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">READY TO CALCULATE</span>
              </div>
            </BentoCard>

            {/* Card 2: Verified Afforestation */}
            <BentoCard className="min-h-[320px]">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-6">
                <TreePine className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black font-display uppercase text-white tracking-tight">
                  Penanaman Terverifikasi
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                  Setiap pohon yang Anda tebus ditanam nyata oleh yayasan mitra lokal dan dilengkapi dengan koordinat satelit yang dapat dipantau langsung.
                </p>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <Link 
                  href="/tentang" 
                  className="text-xs font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Pelajari Program <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">SATELLITE SYNC</span>
                </div>
              </div>
            </BentoCard>

            {/* Card 3: Community Leaderboard */}
            <BentoCard className="min-h-[320px]">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-6">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black font-display uppercase text-white tracking-tight">
                  Peringkat Pejuang Hijau
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                  Raih badge pencapaian iklim dan bersainglah bersama ribuan pejuang lingkungan lainnya di papan peringkat untuk menginspirasi masyarakat luas.
                </p>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <Link 
                  href="/dashboard" 
                  className="text-xs font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Lihat Papan Skor <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">LEADERBOARD</span>
              </div>
            </BentoCard>

            {/* Card 4: AI Insights Chatbot (Large: spans 2 columns in md) */}
            <BentoCard className="md:col-span-2 min-h-[320px] relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full filter blur-[40px] pointer-events-none" />
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black font-display uppercase text-white tracking-tight">
                  Rekomendasi Karbon AI Chatbot
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
                  Butuh tips instan menghemat pemakaian listrik atau rute perjalanan paling ramah lingkungan? Asisten AI pintar kami siap berdiskusi 24/7 memberikan panduan berkelanjutan secara praktis.
                </p>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}
                  className="text-xs font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Tanya AI Sekarang <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">POWERED BY LLM</span>
              </div>
            </BentoCard>

          </div>
        </section>

        {/* --- STATS SECTION (COUNT-UP) --- */}
        <section className="py-32 px-6 bg-slate-900/40 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 text-center">
              
              {/* Stat 1: Total CO2 Offsetted */}
              <div className="flex flex-col space-y-2 relative md:border-r md:border-white/5 md:pr-6">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">EMISI DITEBUS</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
                  <CountUp to={124530} suffix=" kg" />
                </span>
                <span className="text-xs text-slate-450 font-medium">Karbondioksida berhasil di-offset</span>
              </div>

              {/* Stat 2: Total Trees Planted */}
              <div className="flex flex-col space-y-2 relative md:border-r md:border-white/5 md:px-6">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <TreePine className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">POHON DITANAM</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  <CountUp to={15240} suffix=" 🌿" />
                </span>
                <span className="text-xs text-slate-450 font-medium">Mangrove & pohon hutan lindung</span>
              </div>

              {/* Stat 3: Active Members */}
              <div className="flex flex-col space-y-2 md:pl-6">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">PEJUANG AKTIF</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
                  <CountUp to={4820} suffix=" Pejuang" />
                </span>
                <span className="text-xs text-slate-450 font-medium">Individu & organisasi terafiliasi</span>
              </div>

            </div>
          </div>
        </section>

        {/* --- TESTIMONIAL SLIDER SECTION --- */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-b border-white/5 overflow-hidden">
          <div className="flex flex-col items-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest select-none">
              <span>TESTIMONI KOMUNITAS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight">
              Kisah Pejuang Hijau
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto min-h-[250px] bg-slate-900/30 border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden">
            
            {/* Quote Icon Background */}
            <Quote className="absolute right-8 top-8 w-24 h-24 text-white/2 opacity-[0.03] pointer-events-none" />

            {/* Slide animation */}
            <div className="flex-1">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p className="text-base sm:text-xl md:text-2xl font-bold font-display italic leading-relaxed text-slate-100">
                  &quot;{testimonials[activeSlide].quote}&quot;
                </p>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-black font-black text-xs flex items-center justify-center shadow-md">
                    {testimonials[activeSlide].avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-emerald-400">{testimonials[activeSlide].author}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{testimonials[activeSlide].role}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
              <div className="flex space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                  />
                ))}
              </div>
              <div className="flex space-x-3 select-none">
                <button
                  onClick={() => setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="h-8 w-8 rounded-full border border-white/10 hover:border-emerald-500/30 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev + 1) % testimonials.length)}
                  className="h-8 w-8 rounded-full border border-white/10 hover:border-emerald-500/30 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* --- CTA SECTION WITH FLOATING SHAPES BACKGROUND --- */}
        <section className="py-36 px-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
          
          {/* Glowing Animated Orbs Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ 
                x: [0, 40, -40, 0],
                y: [0, -40, 40, 0],
              }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[100px]"
            />
            <motion.div
              animate={{ 
                x: [0, -30, 30, 0],
                y: [0, 50, -50, 0],
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-teal-500/5 rounded-full filter blur-[80px]"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest select-none">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>MARI BERGABUNG</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-none uppercase max-w-2xl mx-auto">
              Siap Mengambil Langkah Pertama?
            </h2>
            
            <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              Bergabunglah bersama ribuan pejuang lingkungan yang telah memulai perjalanan dekarbonisasi demi menjaga ekosistem bumi yang sehat dan aman.
            </p>
            
            <div className="pt-6 magnetic-btn-wrap">
              <Link
                href="/kalkulator"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-sm rounded-full inline-flex items-center gap-2.5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 uppercase tracking-wider cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                Mulai Kalkulasi Emisi
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
