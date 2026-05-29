'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Calculator } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const FRAME_COUNT = 193 
const IMG_PREFIX = '/sequence/frame ('
const IMG_SUFFIX = ').gif'

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [useFallback, setUseFallback] = useState(false)

  // Motion useScroll to track progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Preload image sequence
  useEffect(() => {
    let loadedCount = 0
    const loadedImages: HTMLImageElement[] = []
    let isMounted = true

    const preloadImages = async () => {
      const promises = Array.from({ length: FRAME_COUNT }).map((_, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image()
          const frameNum = String(index + 1)
          img.src = `${IMG_PREFIX}${frameNum}${IMG_SUFFIX}`
          
          img.onload = () => {
            if (isMounted) {
              loadedImages[index] = img
              loadedCount++
              setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100))
            }
            resolve()
          }

          img.onerror = () => {
            resolve()
          }
        })
      })

      // Instead of failing and turning to fallback, just wait
      await Promise.all(promises)

      if (isMounted) {
        setImages(loadedImages)
        // Force not to use fallback
        setUseFallback(false)
        setLoading(false)
      }
    }

    preloadImages()

    return () => {
      isMounted = false
    }
  }, [])

  // Canvas render logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    
    // Particle system for carbon/oxygen simulation in fallback mode
    const particles: Array<{
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      color: string
      opacity: number
    }> = Array.from({ length: 80 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.5 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      color: '',
      opacity: Math.random() * 0.5 + 0.3
    }))

    // Resize canvas
    const resizeCanvas = () => {
      const scale = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      ctx.scale(scale, scale)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Render loop
    const render = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const progress = scrollYProgress.get()
      
      // Clear canvas with a very rich dark ecological green-black
      ctx.fillStyle = '#030a08'
      ctx.fillRect(0, 0, width, height)

      if (!useFallback && images.length > 0) {
        // --- 1. RENDER IMAGE SEQUENCE ---
        // Find correct frame index
        const frameIndex = Math.min(
          images.length - 1,
          Math.floor(progress * images.length)
        )
        const img = images[frameIndex]

        if (img) {
          // Draw image scaled (cover fit)
          const imgWidth = img.width
          const imgHeight = img.height
          const imgRatio = imgWidth / imgHeight
          const screenRatio = width / height

          let drawWidth = width
          let drawHeight = height
          let drawX = 0
          let drawY = 0

          if (screenRatio > imgRatio) {
            drawHeight = width / imgRatio
            drawY = (height - drawHeight) / 2
          } else {
            drawWidth = height * imgRatio
            drawX = (width - drawWidth) / 2
          }

          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
        }
      } else {
        // --- 2. RENDER GENERATIVE ART FALLBACK (Awwwards-level eco-visualizer) ---
        
        // Background subtle glowing grid or portal
        const gradientRadius = Math.max(width, height) * 0.6
        const radialGlow = ctx.createRadialGradient(
          width / 2, height / 2, 10,
          width / 2, height / 2, gradientRadius
        )
        // Transition glow color from dark red/gray (carbon) to vibrant emerald green (fresh oxygen)
        const glowColor = progress < 0.5
          ? `rgba(16, 185, 129, ${0.05 + progress * 0.1})` // forest green glow
          : `rgba(20, 184, 166, ${0.15 - (progress - 0.5) * 0.1})` // cyan/teal glow
        
        radialGlow.addColorStop(0, glowColor)
        radialGlow.addColorStop(0.5, 'rgba(4, 13, 10, 0.5)')
        radialGlow.addColorStop(1, '#030a08')
        ctx.fillStyle = radialGlow
        ctx.fillRect(0, 0, width, height)

        // Draw floating environment particles
        particles.forEach((p) => {
          // Move particle
          p.y += p.speedY
          p.x += p.speedX
          // Wrap around screen boundaries
          if (p.y < 0) p.y = 1
          if (p.x < 0) p.x = 1
          if (p.x > 1) p.x = 0

          const px = p.x * width
          const py = p.y * height

          // Particles transition from dark amber/carbon (left to right) to bright green oxygen
          const colorProgress = progress
          const r = Math.floor(180 - colorProgress * 164) // 180 -> 16
          const g = Math.floor(83 + colorProgress * 102)   // 83 -> 185
          const b = Math.floor(45 + colorProgress * 84)    // 45 -> 129
          ctx.beginPath()
          ctx.arc(px, py, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`
          ctx.fill()
        })

        // Draw a growing fractal Tree of Life in the center
        ctx.save()
        ctx.translate(width / 2, height * 0.85) // Bottom-middle of screen
        
        // Define tree structure parameters based on scroll progress
        const maxDepth = Math.floor(2 + progress * 8) // Recursive depth increases with scroll
        const branchLength = (height * 0.18) * Math.min(1, progress * 1.3) // Branches grow longer
        const branchThickness = 12 * Math.min(1, progress * 1.5) // Branches thicken
        const angleLeft = Math.PI / 6 + (Math.sin(progress * Math.PI) * 0.05) // Easing movement
        const angleRight = Math.PI / 6.5 - (Math.cos(progress * Math.PI) * 0.03)

        // Draw fractal tree function
        const drawTree = (len: number, thickness: number, depth: number) => {
          if (depth === 0 || len < 2) return

          ctx.lineWidth = thickness
          
          // Color: bottom branches are woody dark brown, top branches become fresh green
          const treeG = Math.floor(30 + (maxDepth - depth) * 20)
          ctx.strokeStyle = `rgb(15, ${Math.min(150, treeG)}, 40)`
          ctx.lineCap = 'round'

          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(0, -len)
          ctx.stroke()

          ctx.translate(0, -len)

          // Draw leaves at the end of outer branches
          if (depth <= 3) {
            const leafCount = Math.floor(5 - depth)
            for (let i = 0; i < leafCount; i++) {
              ctx.save()
              ctx.rotate((Math.random() - 0.5) * 1.5)
              ctx.beginPath()
              // Draw leaf shape
              ctx.ellipse(
                (Math.random() - 0.5) * 6,
                -Math.random() * 8,
                2 + (1 - depth * 0.2) * 4,
                4 + (1 - depth * 0.2) * 8,
                0,
                0,
                Math.PI * 2
              )
              // Leaves grow and change color to vivid emerald green
              ctx.fillStyle = `rgba(16, ${140 + Math.floor(progress * 115)}, 129, ${0.4 + progress * 0.6})`
              ctx.fill()
              ctx.restore()
            }
          }

          // Left branch
          ctx.save()
          ctx.rotate(-angleLeft)
          drawTree(len * 0.72, thickness * 0.7, depth - 1)
          ctx.restore()

          // Right branch
          ctx.save()
          ctx.rotate(angleRight)
          drawTree(len * 0.75, thickness * 0.68, depth - 1)
          ctx.restore()
        };

        if (progress > 0.02) {
          drawTree(branchLength, branchThickness, maxDepth)
        }
        ctx.restore()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [images, useFallback, scrollYProgress])

  // Story overlays motion values
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  const story1Opacity = useTransform(scrollYProgress, [0.18, 0.28, 0.38, 0.45], [0, 1, 1, 0])
  const story1Y = useTransform(scrollYProgress, [0.18, 0.28, 0.38, 0.45], [50, 0, 0, -50])

  const story2Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.78], [0, 1, 1, 0])
  const story2Y = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.78], [50, 0, 0, -50])

  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.82, 0.92], [50, 0])

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#030a08] overflow-clip">
      
      {/* Premium Dark Theme Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              filter: 'blur(10px)',
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030a08] overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full bg-emerald-900/20 filter blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vw] h-[25vw] rounded-full bg-teal-800/20 filter blur-[80px] pointer-events-none" />

            <div className="flex flex-col items-center z-10 w-full px-8 max-w-sm">
              {/* Logo Animation */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="mb-12"
              >
                <div className="relative">
                  <Image 
                    src="/images/logo.png" 
                    alt="Karwanua Logo" 
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                    priority
                  />
                </div>
              </motion.div>

              {/* Progress Text */}
              <div className="flex justify-between items-end w-full mb-3 text-emerald-50/70 font-medium">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold">
                  Memuat Ekosistem...
                </span>
                <div className="font-display font-light text-2xl tracking-tighter tabular-nums leading-none">
                  {loadProgress}<span className="text-emerald-500 font-medium text-sm ml-0.5">%</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-full"
                  style={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                />
              </div>

              {/* Minimal Bottom Info */}
              <div className="mt-12 flex space-x-2 text-[8px] tracking-[0.3em] text-emerald-500/40 uppercase">
                <span>Karwanua</span>
                <span>&bull;</span>
                <span>{new Date().getFullYear()}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

        {/* --- SCROLL TEXT OVERLAYS --- */}

        {/* 1. Hero Overlay (0% - 15% Scroll) */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto text-white"
        >
          <h1 className="text-4xl sm:text-6xl md:text-[80px] font-black tracking-tight leading-[1.05] font-display uppercase">
            Ketahui Jejak <br className="sm:hidden" /> Karbonmu, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">
              Kurangi Dampaknya!
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed font-medium">
            Jadilah bagian dari solusi perubahan iklim. Hitung emisi CO₂ harian Anda secara presisi dan tebus langsung melalui aksi penanaman pohon.
          </p>
        </motion.div>

        {/* 2. Story 1 Overlay (18% - 45% Scroll) */}
        <motion.div
          style={{ opacity: story1Opacity, y: story1Y }}
          className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 w-full max-w-md text-white px-4"
        >
          <span className="text-emerald-400 text-[10px] font-black tracking-widest uppercase block mb-3">
            01. Krisis Tersembunyi
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display mb-4 uppercase">
            Bumi Sedang Menghangat
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Setiap perjalanan kendaraan, penggunaan listrik rumah, hingga makanan yang Anda santap menyisakan jejak emisi karbon tak kasat mata yang membebani atmosfer bumi kita hari ini.
          </p>
        </motion.div>

        {/* 3. Story 2 Overlay (50% - 78% Scroll) */}
        <motion.div
          style={{ opacity: story2Opacity, y: story2Y }}
          className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 w-full max-w-md text-white text-right px-4 ml-auto"
        >
          <span className="text-emerald-400 text-[10px] font-black tracking-widest uppercase block mb-3">
            02. Solusi Nyata
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display mb-4 uppercase">
            Satu Langkah, Dampak Nyata
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Melalui Tebuskarbon, setiap emisi yang Anda hasilkan dapat dikalkulasikan secara akurat dan ditebus langsung lewat penanaman pohon mangrove & tanaman pelindung yang dilacak menggunakan satelit.
          </p>
        </motion.div>

        {/* 4. Final CTA Overlay (82% - 100% Scroll) */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto text-white"
        >
          <span className="text-emerald-400 text-[10px] font-black tracking-widest uppercase block mb-4">
            03. Saatnya Beraksi
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-display uppercase leading-none">
            Siap Menjadi <br /> Pahlawan Lingkungan?
          </h2>
          <p className="text-slate-400 text-xs sm:text-base max-w-md mx-auto mt-6 leading-relaxed font-medium">
            Jangan tunggu besok. Mulai hitung jejak karbon pribadi Anda sekarang, dukung kelestarian bumi, dan raih pencapaian hijau Anda.
          </p>
          <div className="mt-8 magnetic-btn-wrap">
            <Link
              href="/kalkulator"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-sm rounded-full inline-flex items-center gap-2.5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 uppercase tracking-wider"
            >
              <Calculator className="w-4 h-4" />
              Mulai Kalkulasi Emisi
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
