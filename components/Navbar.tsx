'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Users, LogOut, BarChart3, History, Newspaper, Settings, Bot, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

type NavbarIconName = 'BarChart3' | 'History' | 'Bot' | 'Newspaper' | 'User' | 'Users' | 'Settings'

type ProfileMenuItem = {
  name: string
  href: string
  icon: NavbarIconName
  description: string
  action?: 'openChat'
}

// Menu yang selalu ditampilkan (untuk semua pengguna)
const publicNavigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Hitung Emisi', href: '/kalkulator' },
  { name: 'Cara Menggunakan', href: '/cara-menggunakan' },
  { name: 'Berita & Info', href: '/berita' },
  { name: 'Tentang', href: '/tentang' },
  { name: 'Kontak', href: '/hubungi' },
]

// Submenu untuk Profil Saya (muncul di dropdown setelah login)
const profileSubMenu: ProfileMenuItem[] = [
  { name: 'Dasbor', href: '/dashboard', icon: 'BarChart3', description: 'Ringkasan emisi + grafik + tips pribadi' },
  { name: 'Riwayat Saya', href: '/riwayat', icon: 'History', description: 'Lihat semua perhitungan sebelumnya' },
  { name: 'AI Assistant', href: '#', icon: 'Bot', description: 'Chat dengan AI untuk tips lingkungan', action: 'openChat' },
  { name: 'Berita Terbaru', href: '/profil/berita', icon: 'Newspaper', description: 'Feed singkat dari Berita & Info' },
  { name: 'Profil Saya', href: '/profil', icon: 'User', description: 'Edit nama, lokasi, preferensi' },
]

// Menu khusus admin
const adminProfileMenu: ProfileMenuItem[] = [
  { name: 'Profil Saya', href: '/profil', icon: 'User', description: 'Edit nama, lokasi, preferensi' },
  { name: 'Admin Dashboard', href: '/admin', icon: 'Settings', description: 'Panel administrasi' },
  { name: 'Kelola User', href: '/admin/users', icon: 'Users', description: 'Panel administrasi' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { data: session } = useSession()
  
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  
  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Helper function untuk mendapatkan icon
  const getIcon = (iconName: NavbarIconName, className = "h-4 w-4") => {
    const icons: Record<NavbarIconName, React.ReactElement> = {
      BarChart3: <BarChart3 className={className} />,
      History: <History className={className} />,
      Bot: <Bot className={className} />,
      Newspaper: <Newspaper className={className} />,
      User: <User className={className} />,
      Users: <Users className={className} />,
      Settings: <Settings className={className} />,
    }
    return icons[iconName] || <User className={className} />
  }

  // Function to open chatbot (will trigger chatbot component)
  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent('openChatbot'))
    setIsProfileMenuOpen(false)
  }

  // Helper to extract first letter for user avatar
  const getInitials = (name?: string | null) => {
    return name ? name.trim().charAt(0).toUpperCase() : 'U'
  }

  const isPublicRouteActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname === href || pathname?.startsWith(`${href}/`)
  }

  return (
    <>
      {/* Sleek Floating Capsule Navbar */}
      <nav className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl rounded-full border border-white/10 bg-[#091512]/80 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300">
        <div className="px-2.5 sm:px-4 lg:px-5">
          <div className="flex h-12 sm:h-16 items-center gap-2 sm:gap-3">
            {/* Logo */}
            <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5 rounded-full pr-2 transition-colors duration-200 group select-none">
              <Image
                src="/images/logo.png" 
                alt="Karwanua Logo" 
                width={32}
                height={32}
                className="h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform duration-200 group-hover:scale-[1.03]" 
              />
              <div className="hidden sm:flex flex-col justify-center">
                <span className="text-[15px] font-black text-white tracking-tight leading-none transition-colors group-hover:text-emerald-450">
                  Karwanua
                </span>
                <span className="text-[7.5px] text-slate-400 font-bold tracking-wider uppercase mt-1">
                  Karbon Kawanua
                </span>
              </div>
            </Link>

            <div className={`hidden lg:flex flex-1 justify-center px-2 transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
              <div className="flex items-center gap-1 rounded-full border border-white/5 bg-[#030a08]/60 p-1 shadow-inner">
                {publicNavigation.map((item) => {
                  const isActive = isPublicRouteActive(item.href)

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 ${isActive ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/50' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="ml-auto flex items-center gap-2">
              
              {/* Auth Dropdowns */}
              {session ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    aria-expanded={isProfileMenuOpen}
                    aria-label="Buka menu profil"
                    className={`flex items-center gap-2 rounded-full border bg-slate-900/90 p-1 pr-3 text-xs font-bold text-slate-200 shadow-sm transition-all duration-150 cursor-pointer select-none ${isProfileMenuOpen ? 'border-white/20 bg-slate-800 text-white' : 'border-white/10 hover:border-white/20 hover:bg-slate-850 hover:text-white'}`}
                  >
                    <div className="h-7 w-7 bg-gradient-to-tr from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center font-bold text-xs border border-emerald-400/20 shadow-sm">
                      {getInitials(session?.user?.name)}
                    </div>
                    <span className="hidden max-w-[100px] truncate sm:inline-block">{session?.user?.name || 'Profil'}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.97, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-3 w-64 bg-[#091512] rounded-2xl shadow-2xl py-2 z-50 border border-white/10 overflow-hidden"
                      >
                        <div className="px-4 py-2.5 border-b border-white/10">
                          <div className="font-bold text-white text-xs truncate leading-none mb-0.5 font-display">
                            {session?.user?.name || 'User'}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate font-semibold">
                            {session?.user?.email}
                          </div>
                        </div>

                        <div className="py-1 px-1.5 space-y-0.5">
                          {(session?.user?.role === 'ADMIN' ? adminProfileMenu : profileSubMenu).map((item) => {
                            const isChat = item.action === 'openChat'
                            const handleClick = isChat ? openChatbot : () => setIsProfileMenuOpen(false)
                            
                            return (
                              <div key={item.name}>
                                {isChat ? (
                                  <button
                                    onClick={handleClick}
                                    className="w-full text-left px-2.5 py-1.5 text-slate-300 hover:bg-white/5 hover:text-emerald-400 transition-colors duration-150 rounded-xl group flex items-center space-x-2.5 cursor-pointer"
                                  >
                                    <div className="h-6.5 w-6.5 bg-white/5 group-hover:bg-emerald-950/50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors duration-150">
                                      {getIcon(item.icon, "h-3.5 w-3.5")}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-bold text-xs text-slate-200 group-hover:text-emerald-300 transition-colors">{item.name}</div>
                                      <div className="text-[9px] text-slate-500 group-hover:text-emerald-500/80 truncate leading-none mt-0.5 font-medium">{item.description}</div>
                                    </div>
                                  </button>
                                ) : (
                                  <Link 
                                    href={item.href} 
                                    className="px-2.5 py-1.5 text-slate-300 hover:bg-white/5 hover:text-emerald-400 transition-colors duration-150 rounded-xl group flex items-center space-x-2.5"
                                    onClick={handleClick}
                                  >
                                    <div className="h-6.5 w-6.5 bg-white/5 group-hover:bg-emerald-950/50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors duration-150">
                                      {getIcon(item.icon, "h-3.5 w-3.5")}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-bold text-xs text-slate-200 group-hover:text-emerald-300 transition-colors">{item.name}</div>
                                      <div className="text-[9px] text-slate-500 group-hover:text-emerald-500/80 truncate leading-none mt-0.5 font-medium">{item.description}</div>
                                    </div>
                                  </Link>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        <div className="border-t border-white/10 my-1"></div>
                        <div className="px-1.5 py-0.5">
                          <button
                            onClick={() => {
                              signOut();
                              setIsProfileMenuOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors duration-150 rounded-xl group flex items-center space-x-2.5 cursor-pointer"
                          >
                            <div className="h-6.5 w-6.5 bg-red-950/20 rounded-lg flex items-center justify-center text-red-400 group-hover:text-red-300 transition-colors duration-150">
                              <LogOut className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <div className="font-bold text-xs text-red-400">Keluar</div>
                              <div className="text-[9px] text-slate-500 leading-none mt-0.5 font-medium">Logout dari akun</div>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : null}

              {/* Sleek Awwwards Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-900 bg-slate-900 px-3 py-2 sm:px-4 sm:py-2.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.24em] text-white shadow-sm transition-all duration-300 cursor-pointer hover:border-emerald-600 hover:bg-emerald-600 z-50"
              >
                <span className="leading-none">{isMenuOpen ? 'Tutup' : 'Menu'}</span>
                <div className="relative w-3.5 h-3">
                  <span className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'top-1 rotate-45' : 'top-0'}`} />
                  <span className={`absolute left-0 w-full h-[2px] bg-white top-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                  <span className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'top-1 -rotate-45' : 'top-2'}`} />
                </div>
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Slider Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-45 w-full sm:w-[400px] bg-[#030a08]/96 border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-white flex flex-col justify-between p-6 sm:p-8 pt-20 sm:pt-24 overflow-y-auto no-scrollbar"
            >
              {/* Navigation Links and Content */}
              <div className="flex flex-col flex-1 py-4">
                
                {/* Navigation Links */}
                <div className="flex flex-col space-y-1.5 mb-6">
                  <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2 select-none">
                    Navigasi Utama
                  </span>
                  
                  {publicNavigation.map((item, idx) => {
                    const isActive = isPublicRouteActive(item.href)

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-center space-x-3 py-1.5 transition-colors duration-200 ${isActive ? 'text-emerald-400' : 'text-slate-350 hover:text-white'}`}
                      >
                        <span className="font-mono text-[10px] font-bold text-emerald-500/70 select-none">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="font-display text-[15px] font-bold tracking-tight transition-transform duration-200 group-hover:translate-x-1.5">
                          {item.name}
                        </span>
                      </Link>
                    )
                  })}

                </div>

                {/* Micro Carbon Stats Box */}
                <div className="bg-emerald-950/15 border border-emerald-500/10 p-4.5 rounded-xl relative overflow-hidden mb-5 select-none">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full filter blur-xl pointer-events-none" />
                  <span className="text-[8.5px] text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                    Status Iklim Bersama
                  </span>
                  <div className="font-display text-base font-black text-white leading-tight">
                    124.530 kg CO₂
                  </div>
                  <span className="text-[9.5px] text-slate-400 mt-1 block leading-relaxed">
                    Total emisi karbon berhasil ditebus pengguna Karwanua bulan ini.
                  </span>
                </div>

                {/* Contact and Info */}
                <div className="space-y-3.5 text-xs pt-4 border-t border-white/5 select-none">
                  <div>
                    <span className="text-[8px] text-slate-500 font-extrabold uppercase tracking-widest block mb-0.5">
                      Kirim Pesan
                    </span>
                    <a href="mailto:hello@tebuskarbon.id" className="text-slate-350 hover:text-emerald-400 font-bold transition-colors">
                      hello@tebuskarbon.id
                    </a>
                  </div>

                  <div>
                    <span className="text-[8px] text-slate-500 font-extrabold uppercase tracking-widest block mb-0.5">
                      Sekretariat
                    </span>
                    <p className="text-slate-455 font-medium leading-relaxed">
                      Kawanua Lestari Foundation<br />
                      Manado, Sulawesi Utara
                    </p>
                  </div>
                </div>

              </div>

              {/* Social Media & Footer */}
              <div className="pt-5 border-t border-white/5 select-none">
                <div className="flex space-x-5 text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                  <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
                  <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
                  <a href="#" className="hover:text-emerald-400 transition-colors">Linkedin</a>
                </div>
                
                <div className="flex justify-between items-center text-[8px] text-slate-650 font-bold uppercase tracking-widest">
                  <span>Lestari Alamku</span>
                  <span>© {new Date().getFullYear()} Karwanua</span>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
