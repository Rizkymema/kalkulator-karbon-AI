import { Github, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'

// Custom TikTok icon
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.19 1.13 1.29 2.74 2.1 4.47 2.29V10.3c-1.74-.08-3.45-.75-4.8-1.86-.33-.28-.63-.58-.9-.9v6.97c-.02 2.17-.89 4.26-2.45 5.75-1.72 1.66-4.14 2.53-6.52 2.37-2.73-.12-5.32-1.73-6.66-4.14-1.63-2.88-1.2-6.67 1.05-9.1C3.86 8.16 5.86 7.27 8 7.26c.72-.01 1.43.09 2.13.29V11.5c-.71-.24-1.48-.31-2.22-.19-1.39.2-2.65 1.07-3.26 2.32-.85 1.7-.49 3.92 1.02 5.22 1.25 1.08 3.02 1.4 4.58.78 1.34-.51 2.24-1.84 2.29-3.28.02-3.14.01-6.28.02-9.42-.01-2.29.02-4.58-.02-6.87z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-[#020706] border-t border-white/5 py-16 relative overflow-hidden">
      {/* Subtle bottom background glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
          
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 group select-none">
              <img 
                src="/images/logo.png" 
                alt="Karwanua Logo" 
                className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105" 
              />
              <span className="text-base font-extrabold text-white font-display tracking-tight">
                Karwanua
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed font-medium">
              Platform dekarbonisasi digital untuk membantu masyarakat Indonesia menghitung jejak karbon pribadi dan menebusnya secara instan lewat penanaman pohon.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Navigasi
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/kalkulator" className="text-slate-400 hover:text-emerald-400 text-xs font-bold transition-colors">
                  Kalkulator Emisi
                </Link>
              </li>
              <li>
                <Link href="/tebus" className="text-slate-400 hover:text-emerald-400 text-xs font-bold transition-colors">
                  Tebus Karbon
                </Link>
              </li>
              <li>
                <Link href="/edukasi" className="text-slate-400 hover:text-emerald-400 text-xs font-bold transition-colors">
                  Edukasi Hijau
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-slate-400 hover:text-emerald-400 text-xs font-bold transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Ikuti Kami
            </h4>
            <div className="flex space-x-2">
              <a 
                href="https://www.linkedin.com/in/rizky-oktavian-teddy-mema-947336370?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 bg-slate-950/60 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://www.instagram.com/rizkymema?igsh=cGJ5NjBuZm41NXc2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 bg-slate-950/60 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer"
                title="Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://www.tiktok.com/@rizkymema?_r=1&_t=ZS-96lBF3ty06i" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 bg-slate-950/60 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer"
                title="TikTok"
              >
                <TikTokIcon className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://github.com/Rizkymema" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 bg-slate-950/60 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer"
                title="GitHub"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500">
          <p className="text-center md:text-left">
            © Copyright 2026 rizkymema. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/kebijakan-privasi" className="hover:text-emerald-400 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-emerald-400 transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
