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
      value: '12,847',
      change: '+234 minggu ini',
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Target,
      title: 'Tantangan Aktif',
      value: '23',
      change: '5 baru bulan ini',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Trophy,
      title: 'Total Pencapaian',
      value: '1,567',
      change: '+89 minggu ini',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: TrendingUp,
      title: 'CO₂ Dikurangi',
      value: '245 ton',
      change: '+12 ton minggu ini',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </button>

        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Komunitas Karwanua
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
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
            <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-opacity-20`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-700 mb-1">{stat.title}</p>
                <p className="text-xs text-gray-600">{stat.change}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { key: 'features', label: 'Tantangan & Cerita', description: 'Ikuti tantangan dan bagikan cerita' },
              { key: 'badges', label: 'Pencapaian', description: 'Badge dan reward yang bisa diraih' },
              { key: 'leaderboard', label: 'Peringkat', description: 'Lihat siapa yang paling aktif' }
            ].map(({ key, label, description }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold">{label}</div>
                  <div className="text-xs text-gray-500">{description}</div>
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Kategori Badge</h3>
                <p className="text-indigo-100">Berbagai pencapaian yang bisa diraih</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: 'Pengurangan Emisi', icon: '📉', count: 8, description: 'Badge untuk pencapaian pengurangan emisi' },
                    { name: 'Aksi Lingkungan', icon: '🌱', count: 12, description: 'Badge untuk berbagai aksi pro-lingkungan' },
                    { name: 'Konsistensi', icon: '🔥', count: 6, description: 'Badge untuk konsistensi dalam tracking' },
                    { name: 'Komunitas', icon: '👥', count: 10, description: 'Badge untuk kontribusi ke komunitas' }
                  ].map((category, index) => (
                    <div key={index} className="text-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
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
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Juara Bulan Ini</h3>
                  <p className="text-yellow-100">Top performer Juli 2025</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Sari Melati', achievement: 'Pengurangan Emisi Terbesar', value: '67% reduction', avatar: '/avatars/sari.jpg' },
                      { name: 'Budi Santoso', achievement: 'Konsistensi Tracking', value: '30 hari berturut', avatar: '/avatars/budi.jpg' },
                      { name: 'Maya Indah', achievement: 'Kontribusi Komunitas', value: '15 tantangan diikuti', avatar: '/avatars/maya.jpg' }
                    ].map((champion, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-xl">
                        <img
                          src={champion.avatar || '/default-avatar.png'}
                          alt={champion.name}
                          className="w-12 h-12 rounded-full bg-gray-300"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{champion.name}</h4>
                          <p className="text-sm text-gray-600">{champion.achievement}</p>
                          <p className="text-sm font-medium text-yellow-700">{champion.value}</p>
                        </div>
                        <Trophy className="w-6 h-6 text-yellow-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Community Impact */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Dampak Komunitas</h3>
                  <p className="text-green-100">Pencapaian bersama kita</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">245.7 ton</div>
                      <div className="text-gray-600 mb-4">Total CO₂ yang berhasil dikurangi komunitas</div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">78% dari target 315 ton tahun ini</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-green-600">1,247</div>
                        <div className="text-sm text-green-600">Pohon Ditanam</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-600">89</div>
                        <div className="text-sm text-blue-600">Tantangan Selesai</div>
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
  )
}
