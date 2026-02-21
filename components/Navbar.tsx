'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, Menu, X, User, Users, LogOut, BarChart3, History, Newspaper, Settings, Bot } from 'lucide-react'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

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
const profileSubMenu = [
  { name: 'Dasbor', href: '/dashboard', icon: 'BarChart3', description: 'Ringkasan emisi + grafik + tips pribadi' },
  { name: 'Riwayat Saya', href: '/riwayat', icon: 'History', description: 'Lihat semua perhitungan sebelumnya' },
  { name: 'AI Assistant', href: '#', icon: 'Bot', description: 'Chat dengan AI untuk tips lingkungan', action: 'openChat' },
  { name: 'Berita Terbaru', href: '/profil/berita', icon: 'Newspaper', description: 'Feed singkat dari Berita & Info' },
  { name: 'Profil Saya', href: '/profil', icon: 'User', description: 'Edit nama, lokasi, preferensi' },
]

// Menu khusus admin
const adminProfileMenu = [
  { name: 'Profil Saya', href: '/profil', icon: 'User', description: 'Edit nama, lokasi, preferensi' },
  { name: 'Admin Dashboard', href: '/admin', icon: 'Settings', description: 'Panel administrasi' },
  { name: 'Kelola User', href: '/admin/users', icon: 'Users', description: 'Panel administrasi' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  
  // Menu navigasi utama (selalu tampil untuk semua pengguna)
  const navigation = publicNavigation

  // Helper function untuk mendapatkan icon
  const getIcon = (iconName: string, className = "h-4 w-4") => {
    const icons: { [key: string]: React.ReactElement } = {
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
    // Dispatch custom event to open chatbot
    window.dispatchEvent(new CustomEvent('openChatbot'))
    setIsProfileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-lg shadow-emerald-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex-shrink-0">
              <img 
                src="/images/logo.png" 
                alt="Karwanua Logo" 
                className="h-20 w-20 object-contain group-hover:scale-105 transition-all duration-300" 
              />
              <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold text-nature-gradient bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent leading-tight">
                Karwanua
              </span>
              <span className="text-sm text-emerald-600/80 font-medium -mt-1">
                Karbon Kawanua
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full relative overflow-hidden group ${
                  pathname === item.href
                    ? 'text-white bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/25'
                    : 'text-emerald-700 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 hover:shadow-lg hover:shadow-emerald-500/25'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-20 animate-pulse"></div>
                )}
              </Link>
            ))}

            {/* Auth Links */}
            {status === 'authenticated' ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 text-sm font-semibold text-emerald-700 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 rounded-full transition-all duration-300 border border-emerald-200 hover:border-transparent shadow-sm hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  <span>Profil Saya</span>
                  <div className="relative">
                    <User className="h-5 w-5" />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl py-3 z-50 border border-emerald-100 shadow-emerald-500/10">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-emerald-100">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-emerald-800">{session.user.name || 'User'}</div>
                          <div className="text-xs text-emerald-600">{session.user.email}</div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Submenu Items */}
                    <div className="py-2">
                      {/* Show admin menu if user is admin, otherwise show regular user menu */}
                      {(session.user.role === 'ADMIN' ? adminProfileMenu : profileSubMenu).map((item) => {
                        const handleClick = (item as any).action === 'openChat' ? openChatbot : () => setIsProfileMenuOpen(false)
                        
                        if ((item as any).action === 'openChat') {
                          return (
                            <button
                              key={item.name}
                              onClick={handleClick}
                              className="block w-full text-left px-4 py-3 text-sm text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-all duration-200 mx-2 rounded-xl"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                  {getIcon(item.icon, "h-4 w-4 text-emerald-600")}
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold">{item.name}</div>
                                  <div className="text-xs text-emerald-600 leading-tight">{item.description}</div>
                                </div>
                              </div>
                            </button>
                          )
                        }
                        
                        return (
                          <Link 
                            key={item.name}
                            href={item.href} 
                            className="block px-4 py-3 text-sm text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-all duration-200 mx-2 rounded-xl"
                            onClick={handleClick}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                {getIcon(item.icon, "h-4 w-4 text-emerald-600")}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-xs text-emerald-600 leading-tight">{item.description}</div>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>

                    {/* Logout */}
                    <div className="h-px bg-emerald-100 my-2 mx-4"></div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsProfileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 mx-2 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                          <LogOut className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <div className="font-semibold">Keluar</div>
                          <div className="text-xs text-red-500">Logout dari akun</div>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:-translate-y-0.5"
              >
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-[#3AA17E] transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    pathname === item.href
                      ? 'text-[#3AA17E] bg-green-50'
                      : 'text-gray-600 hover:text-[#3AA17E] hover:bg-green-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              {status === 'authenticated' ? (
                <>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="px-3 py-1 text-sm font-medium text-gray-400">
                      Logged in as {session.user.name || session.user.email}
                    </p>
                    
                    {/* Mobile Profile Submenu */}
                    {(session.user.role === 'ADMIN' ? adminProfileMenu : profileSubMenu).map((item) => {
                      if ((item as any).action === 'openChat') {
                        return (
                          <button
                            key={item.name}
                            onClick={() => {
                              window.dispatchEvent(new CustomEvent('openChatbot'))
                              setIsMenuOpen(false)
                            }}
                            className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#3AA17E] hover:bg-green-50 rounded-lg flex items-center space-x-2 w-full text-left"
                          >
                            {getIcon(item.icon, "h-4 w-4")}
                            <span>{item.name}</span>
                          </button>
                        )
                      }
                      
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#3AA17E] hover:bg-green-50 rounded-lg flex items-center space-x-2"
                        >
                          {getIcon(item.icon, "h-4 w-4")}
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                    
                    <div className="h-px bg-gray-200 my-2"></div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#3AA17E] hover:bg-green-50 rounded-lg w-full text-left flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-white bg-[#3AA17E] hover:bg-[#2E8C6C] rounded-lg transition-colors"
                >
                  Masuk
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
