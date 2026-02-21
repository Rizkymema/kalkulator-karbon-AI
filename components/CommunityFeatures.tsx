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
      case 'local': return 'bg-blue-100 text-blue-800'
      case 'national': return 'bg-green-100 text-green-800'
      case 'global': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: CommunityChallenge['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'upcoming': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-xl font-bold text-white">Komunitas Iklim</h3>
            <p className="text-green-100">Bersama-sama untuk bumi yang lebih hijau</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {[
            { key: 'challenges', label: 'Tantangan', icon: Target },
            { key: 'posts', label: 'Cerita Komunitas', icon: MessageCircle },
            { key: 'create', label: 'Buat Kampanye', icon: Share2 }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === key
                  ? 'border-green-500 text-green-600 bg-green-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
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
              <h4 className="text-lg font-semibold text-gray-900">Tantangan Aktif</h4>
              <span className="text-sm text-gray-500">{challenges.length} tantangan tersedia</span>
            </div>
            
            <div className="grid gap-6">
              {challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getCategoryIcon(challenge.category)}</span>
                      <div>
                        <h5 className="font-bold text-gray-900">{challenge.title}</h5>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(challenge.type)}`}>
                        {challenge.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                        {challenge.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="font-bold text-blue-600">{challenge.current}</div>
                      <div className="text-sm text-blue-600">Progress</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="font-bold text-green-600">{challenge.target}</div>
                      <div className="text-sm text-green-600">Target</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="font-bold text-purple-600">{challenge.participants}</div>
                      <div className="text-sm text-purple-600">Peserta</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="font-bold text-orange-600">
                        {Math.round((challenge.current / challenge.target) * 100)}%
                      </div>
                      <div className="text-sm text-orange-600">Selesai</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((challenge.current / challenge.target) * 100, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{challenge.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(challenge.endDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="font-medium text-green-600">
                      Reward: {challenge.reward}
                    </div>
                  </div>

                  <button className="w-full py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors">
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
              <h4 className="text-lg font-semibold text-gray-900">Cerita dari Komunitas</h4>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Bagikan Cerita
              </button>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-12 h-12 rounded-full bg-gray-300 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.user)}&background=22c55e&color=fff`;
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-semibold text-gray-900">{post.user}</h5>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                        <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {post.achievement}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      {post.image && post.image.length > 0 && (
                        <div className="w-full h-48 rounded-lg mb-4 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                          <span className="text-6xl">🌱</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg mb-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">
                            Berhasil menghemat {post.carbonSaved} kg CO₂
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
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
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Buat Kampanye Baru</h4>
              <p className="text-gray-600">Ajak komunitas untuk bersama-sama beraksi demi lingkungan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌳</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Kampanye Penanaman</h5>
                <p className="text-sm text-gray-600">Buat kampanye untuk menanam pohon di area tertentu</p>
              </div>

              <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📉</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Challenge Pengurangan</h5>
                <p className="text-sm text-gray-600">Tantang komunitas untuk mengurangi emisi karbon</p>
              </div>

              <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-purple-500 hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Edukasi Lingkungan</h5>
                <p className="text-sm text-gray-600">Kampanye edukasi tentang lingkungan dan iklim</p>
              </div>

              <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-orange-500 hover:bg-orange-50 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧹</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Aksi Bersih-bersih</h5>
                <p className="text-sm text-gray-600">Organisir aksi membersihkan lingkungan</p>
              </div>
            </div>

            <div className="text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-colors">
                Mulai Buat Kampanye
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
