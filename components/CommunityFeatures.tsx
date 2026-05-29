'use client'

import { useState, useEffect } from 'react'
import { Users, MapPin, Target, Calendar, TrendingUp, Share2, Heart, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface CommunityChallenge {
  id: string
  title: string
  description: string
  target: number
  current: number
  participants: number
  startDate: string
  endDate: string
  location: string
  type: 'local' | 'national' | 'global'
  category: 'tree-planting' | 'emission-reduction' | 'education' | 'cleanup'
  reward: string
  creator: string
  status: 'active' | 'completed' | 'upcoming'
}

interface CommunityPost {
  id: string
  user: string
  avatar: string
  content: string
  achievement: string
  timestamp: string
  likes: number
  comments: number
  image?: string
  carbonSaved: number
}

export function CommunityFeatures() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'posts' | 'create'>('challenges')
  const [challenges] = useState<CommunityChallenge[]>([
    {
      id: '1',
      title: 'Tanam 1000 Pohon Bersama Jakarta',
      description: 'Mari bersama-sama menanam 1000 pohon di area Jakarta untuk mengurangi emisi karbon kota',
      target: 1000,
      current: 734,
      participants: 89,
      startDate: '2025-07-01',
      endDate: '2025-08-31',
      location: 'Jakarta, Indonesia',
      type: 'local',
      category: 'tree-planting',
      reward: 'Sertifikat + Badge Eksklusif',
      creator: 'Komunitas Green Jakarta',
      status: 'active'
    },
    {
      id: '2',
      title: 'Kurangi Emisi 50% Challenge',
      description: 'Tantangan untuk mengurangi emisi personal sebesar 50% dalam 3 bulan',
      target: 100,
      current: 67,
      participants: 234,
      startDate: '2025-07-15',
      endDate: '2025-10-15',
      location: 'Indonesia',
      type: 'national',
      category: 'emission-reduction',
      reward: 'Hadiah Rp 1,000,000 + Merchandise',
      creator: 'Karwanua Indonesia',
      status: 'active'
    },
    {
      id: '3',
      title: 'Zero Waste Weekend',
      description: 'Tantangan untuk tidak menghasilkan sampah plastik selama akhir pekan',
      target: 500,
      current: 123,
      participants: 45,
      startDate: '2025-08-01',
      endDate: '2025-08-31',
      location: 'Surabaya, Indonesia',
      type: 'local',
      category: 'cleanup',
      reward: 'Tumbler Ramah Lingkungan',
      creator: 'Eco Surabaya',
      status: 'upcoming'
    }
  ])

  const [posts] = useState<CommunityPost[]>([
    {
      id: '1',
      user: 'Andi Pratama',
      avatar: 'https://ui-avatars.com/api/?name=Andi+Pratama&background=22c55e&color=fff',
      content: 'Akhirnya berhasil mengurangi emisi karbon saya sebesar 40% bulan ini! 🌱 Caranya dengan beralih ke transportasi umum dan mengurangi konsumsi daging. Siapa yang mau join challenge mengurangi emisi bareng?',
      achievement: 'Berhasil mengurangi 45 kg CO₂',
      timestamp: '2 jam yang lalu',
      likes: 23,
      comments: 5,
      carbonSaved: 45
    },
    {
      id: '2',
      user: 'Maya Sari',
      avatar: 'https://ui-avatars.com/api/?name=Maya+Sari&background=3b82f6&color=fff',
      content: 'Baru aja install panel surya di rumah! AI Karwanua merekomendasikan ini setelah lihat konsumsi listrik saya yang tinggi. Proyeksi bisa hemat 80% emisi dari listrik 🌞',
      achievement: 'Pasang Panel Surya Pertama',
      timestamp: '5 jam yang lalu',
      likes: 45,
      comments: 12,
      image: '',
      carbonSaved: 120
    },
    {
      id: '3',
      user: 'Rudi Hermawan',
      avatar: 'https://ui-avatars.com/api/?name=Rudi+Hermawan&background=8b5cf6&color=fff',
      content: 'Hari ini ikut acara penanaman pohon di Bogor. Berhasil nanam 5 pohon sekaligus! Ternyata menyenangkan sekali berkontribusi langsung untuk lingkungan 🌳',
      achievement: 'Menanam 5 Pohon',
      timestamp: '1 hari yang lalu',
      likes: 67,
      comments: 18,
      carbonSaved: 75
    }
  ])

  const getCategoryIcon = (category: CommunityChallenge['category']) => {
    switch (category) {
      case 'tree-planting': return '🌳'
      case 'emission-reduction': return '📉'
      case 'education': return '📚'
      case 'cleanup': return '🧹'
      default: return '🌱'
    }
  }

  const getTypeColor = (type: CommunityChallenge['type']) => {
    switch (type) {
      case 'local': return 'bg-blue-950/40 border border-blue-500/20 text-blue-300'
      case 'national': return 'bg-green-950/40 border border-green-500/20 text-green-300'
      case 'global': return 'bg-purple-950/40 border border-purple-500/20 text-purple-300'
      default: return 'bg-slate-950/40 border border-white/5 text-slate-300'
    }
  }

  const getStatusColor = (status: CommunityChallenge['status']) => {
    switch (status) {
      case 'active': return 'bg-green-950/40 border border-green-500/20 text-green-300'
      case 'completed': return 'bg-slate-950/40 border border-white/5 text-slate-400'
      case 'upcoming': return 'bg-orange-950/40 border border-orange-500/20 text-orange-300'
      default: return 'bg-slate-950/40 border border-white/5 text-slate-300'
    }
  }

  return (
    <div className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-950/60 to-blue-950/60 px-6 py-4 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-emerald-450" />
          <div>
            <h3 className="text-xl font-bold text-white">Komunitas Iklim</h3>
            <p className="text-slate-400 text-sm">Bersama-sama untuk bumi yang lebih hijau</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-white/10">
        <nav className="flex">
          {[
            { key: 'challenges', label: 'Tantangan', icon: Target },
            { key: 'posts', label: 'Cerita Komunitas', icon: MessageCircle },
            { key: 'create', label: 'Buat Kampanye', icon: Share2 }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center space-x-2 px-6 py-4 font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === key
                  ? 'border-emerald-500 text-emerald-450 bg-emerald-950/20'
                  : 'border-transparent text-slate-405 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4 text-emerald-400" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-white">Tantangan Aktif</h4>
              <span className="text-sm text-slate-500">{challenges.length} tantangan tersedia</span>
            </div>
            
            <div className="grid gap-6">
              {challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-white/5 bg-slate-950/20 rounded-xl p-6 hover:border-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getCategoryIcon(challenge.category)}</span>
                      <div>
                        <h5 className="font-bold text-white">{challenge.title}</h5>
                        <p className="text-sm text-slate-450 leading-relaxed mt-0.5">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(challenge.type)}`}>
                        {challenge.type}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(challenge.status)}`}>
                        {challenge.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-955/20 border border-blue-500/10 rounded-xl">
                      <div className="font-black text-blue-400 text-lg">{challenge.current}</div>
                      <div className="text-xs text-slate-400 font-medium">Progress</div>
                    </div>
                    <div className="text-center p-3 bg-green-955/20 border border-green-500/10 rounded-xl">
                      <div className="font-black text-green-400 text-lg">{challenge.target}</div>
                      <div className="text-xs text-slate-400 font-medium">Target</div>
                    </div>
                    <div className="text-center p-3 bg-purple-955/20 border border-purple-500/10 rounded-xl">
                      <div className="font-black text-purple-400 text-lg">{challenge.participants}</div>
                      <div className="text-xs text-slate-400 font-medium">Peserta</div>
                    </div>
                    <div className="text-center p-3 bg-orange-955/20 border border-orange-500/10 rounded-xl">
                      <div className="font-black text-orange-400 text-lg">
                        {Math.round((challenge.current / challenge.target) * 100)}%
                      </div>
                      <div className="text-xs text-slate-400 font-medium">Selesai</div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-3 mb-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((challenge.current / challenge.target) * 100, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span>{challenge.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span>{new Date(challenge.endDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="font-semibold text-emerald-400">
                      Reward: {challenge.reward}
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer">
                    {challenge.status === 'upcoming' ? 'Daftar Sekarang' : 'Ikut Tantangan'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-white">Cerita dari Komunitas</h4>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold cursor-pointer">
                Bagikan Cerita
              </button>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-white/5 bg-slate-950/20 rounded-xl p-6"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-12 h-12 rounded-full bg-slate-805 object-cover border border-white/10"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.user)}&background=10b981&color=fff`;
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h5 className="font-bold text-white">{post.user}</h5>
                        <span className="text-xs text-slate-500 font-medium">{post.timestamp}</span>
                        <div className="px-2 py-0.5 bg-green-950/40 border border-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                          {post.achievement}
                        </div>
                      </div>
                      
                      <p className="text-slate-300 leading-relaxed mb-4 text-sm">{post.content}</p>
                      
                      {post.image && post.image.length > 0 && (
                        <div className="w-full h-48 rounded-xl mb-4 bg-gradient-to-br from-green-950/40 to-blue-955/40 flex items-center justify-center border border-white/5">
                          <span className="text-6xl">🌱</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between p-3 bg-green-950/20 border border-green-500/10 rounded-xl mb-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span className="font-semibold text-green-300 text-sm">
                            Berhasil menghemat {post.carbonSaved} kg CO₂
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-slate-500 font-semibold">
                        <button className="flex items-center space-x-1 hover:text-red-400 transition-colors cursor-pointer">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors cursor-pointer">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-emerald-400 transition-colors cursor-pointer">
                          <Share2 className="w-4 h-4" />
                          <span>Bagikan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Create Tab */}
        {activeTab === 'create' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Buat Kampanye Baru</h4>
              <p className="text-slate-400 text-sm">Ajak komunitas untuk bersama-sama beraksi demi lingkungan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border-2 border-dashed border-white/10 bg-slate-950/20 rounded-xl text-center hover:border-emerald-500 hover:bg-emerald-950/10 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-green-950/40 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-2xl">🌳</span>
                </div>
                <h5 className="font-bold text-white mb-1">Kampanye Penanaman</h5>
                <p className="text-xs text-slate-450 leading-relaxed">Buat kampanye untuk menanam pohon di area tertentu</p>
              </div>

              <div className="p-6 border-2 border-dashed border-white/10 bg-slate-955/20 rounded-xl text-center hover:border-blue-500 hover:bg-blue-955/10 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-blue-950/40 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-2xl">📉</span>
                </div>
                <h5 className="font-bold text-white mb-1">Challenge Pengurangan</h5>
                <p className="text-xs text-slate-450 leading-relaxed">Tantang komunitas untuk mengurangi emisi karbon</p>
              </div>

              <div className="p-6 border-2 border-dashed border-white/10 bg-slate-950/20 rounded-xl text-center hover:border-purple-500 hover:bg-purple-955/10 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-purple-955/40 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-2xl">📚</span>
                </div>
                <h5 className="font-bold text-white mb-1">Edukasi Lingkungan</h5>
                <p className="text-xs text-slate-450 leading-relaxed">Kampanye edukasi tentang lingkungan dan iklim</p>
              </div>

              <div className="p-6 border-2 border-dashed border-white/10 bg-slate-955/20 rounded-xl text-center hover:border-orange-500 hover:bg-orange-955/10 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-orange-955/40 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-2xl">🧹</span>
                </div>
                <h5 className="font-bold text-white mb-1">Aksi Bersih-bersih</h5>
                <p className="text-xs text-slate-455 leading-relaxed">Organisir aksi membersihkan lingkungan</p>
              </div>
            </div>

            <div className="text-center">
              <button className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer shadow-lg shadow-emerald-900/20">
                Mulai Buat Kampanye
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
