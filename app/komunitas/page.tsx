'use client'

import { useState } from 'react'
import { ArrowLeft, Users, Trophy, Target, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CommunityFeatures } from '../../components/CommunityFeatures'
import { GamificationBadges } from '../../components/GamificationBadges'
import { Leaderboard } from '../../components/Leaderboard'

export default function CommunityPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<'features' | 'badges' | 'leaderboard'>('features')

  const communityStats = [
    {
      icon: Users,
      title: 'Total Anggota',
      value: '12.847',
      change: '+234 minggu ini',
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-950/20 border border-blue-500/10 text-blue-300'
    },
    {
      icon: Target,
      title: 'Tantangan Aktif',
      value: '23',
      change: '5 baru bulan ini',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-950/20 border border-green-500/10 text-green-300'
    },
    {
      icon: Trophy,
      title: 'Total Pencapaian',
      value: '1.567',
      change: '+89 minggu ini',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-950/20 border border-yellow-500/10 text-yellow-300'
    },
    {
      icon: TrendingUp,
      title: 'CO₂ Dikurangi',
      value: '245 ton',
      change: '+12 ton minggu ini',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-950/20 border border-red-500/10 text-red-300'
    }
  ]

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 pt-36 pb-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            Kembali ke Beranda
          </button>

          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black font-display uppercase tracking-tight text-white mb-4"
            >
              Komunitas Karwanua
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 max-w-3xl mx-auto font-medium"
            >
              Bergabunglah dengan ribuan orang yang berkomitmen untuk mengurangi jejak karbon dan menciptakan masa depan yang lebih berkelanjutan
            </motion.p>
          </div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {communityStats.map((stat, index) => (
              <div key={index} className={`${stat.bgColor} rounded-2xl p-6 backdrop-blur-md`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">{stat.value}</h3>
                  <p className="text-sm font-semibold text-slate-300 mb-1">{stat.title}</p>
                  <p className="text-xs text-slate-400">{stat.change}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-white/10">
            <nav className="flex space-x-8">
              {[
                { key: 'features', label: 'Tantangan & Cerita', description: 'Ikuti tantangan dan bagikan cerita' },
                { key: 'badges', label: 'Pencapaian', description: 'Badge dan reward yang bisa diraih' },
                { key: 'leaderboard', label: 'Peringkat', description: 'Lihat siapa yang paling aktif' }
              ].map(({ key, label, description }) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                    activeSection === key
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-transparent text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-bold">{label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{description}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'features' && (
            <div className="space-y-8">
              <CommunityFeatures />
            </div>
          )}

          {activeSection === 'badges' && (
            <div className="space-y-8">
              <GamificationBadges />
              
              {/* Additional Badge Categories */}
              <div className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 px-6 py-4 border-b border-white/5">
                  <h3 className="text-xl font-bold text-white">Kategori Badge</h3>
                  <p className="text-indigo-305 text-sm">Berbagai pencapaian yang bisa diraih</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: 'Pengurangan Emisi', icon: '📉', count: 8, description: 'Badge untuk pencapaian pengurangan emisi' },
                      { name: 'Aksi Lingkungan', icon: '🌱', count: 12, description: 'Badge untuk berbagai aksi pro-lingkungan' },
                      { name: 'Konsistensi', icon: '🔥', count: 6, description: 'Badge untuk konsistensi dalam tracking' },
                      { name: 'Komunitas', icon: '👥', count: 10, description: 'Badge untuk kontribusi ke komunitas' }
                    ].map((category, index) => (
                      <div key={index} className="text-center p-4 border border-white/5 bg-slate-950/40 rounded-xl hover:border-white/10 transition-all">
                        <div className="text-4xl mb-3">{category.icon}</div>
                        <h4 className="font-bold text-white mb-2">{category.name}</h4>
                        <p className="text-sm text-slate-400 mb-3">{category.description}</p>
                        <span className="inline-block px-3 py-1 bg-blue-950/40 border border-blue-500/20 text-blue-300 text-sm font-medium rounded-full">
                          {category.count} Badge
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'leaderboard' && (
            <div className="space-y-8">
              <Leaderboard />
              
              {/* Extended Leaderboard Features */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Champions */}
                <div className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-950/60 to-orange-955/40 px-6 py-4 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white">Juara Bulan Ini</h3>
                    <p className="text-yellow-305 text-sm">Top performer Juli 2025</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        { name: 'Sari Melati', achievement: 'Pengurangan Emisi Terbesar', value: '67% reduction', avatar: '/avatars/sari.jpg' },
                        { name: 'Budi Santoso', achievement: 'Konsistensi Tracking', value: '30 hari berturut', avatar: '/avatars/budi.jpg' },
                        { name: 'Maya Indah', achievement: 'Kontribusi Komunitas', value: '15 tantangan diikuti', avatar: '/avatars/maya.jpg' }
                      ].map((champion, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-yellow-955/10 border border-yellow-500/10 rounded-xl">
                          <img
                            src={champion.avatar || '/default-avatar.png'}
                            alt={champion.name}
                            className="w-12 h-12 rounded-full bg-slate-800 object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-white">{champion.name}</h4>
                            <p className="text-sm text-slate-400">{champion.achievement}</p>
                            <p className="text-sm font-semibold text-yellow-405">{champion.value}</p>
                          </div>
                          <Trophy className="w-6 h-6 text-yellow-505" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Community Impact */}
                <div className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-green-950/60 to-teal-950/60 px-6 py-4 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white">Dampak Komunitas</h3>
                    <p className="text-green-305 text-sm">Pencapaian bersama kita</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-black text-green-400 mb-2">245.7 ton</div>
                        <div className="text-slate-350 text-sm mb-4">Total CO₂ yang berhasil dikurangi komunitas</div>
                        <div className="w-full bg-slate-800 rounded-full h-3">
                          <div className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">78% dari target 315 ton tahun ini</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-950/20 border border-green-500/10 text-green-300 rounded-xl">
                          <div className="font-bold text-green-400">1.247</div>
                          <div className="text-xs">Pohon Ditanam</div>
                        </div>
                        <div className="text-center p-3 bg-blue-950/20 border border-blue-500/10 text-blue-300 rounded-xl">
                          <div className="font-bold text-blue-400">89</div>
                          <div className="text-xs">Tantangan Selesai</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
