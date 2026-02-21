'use client'

import { useState, useEffect } from 'react'
import { Trophy, Star, Target, Zap, Leaf, Award, Crown, Shield, TrendingDown } from 'lucide-react'
import { useStore } from '../lib/store'

interface Badge {
  id: string
  name: string
  description: string
  icon: React.ElementType
  requirement: number
  currentProgress: number
  category: 'emission' | 'action' | 'streak' | 'community'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earned: boolean
  earnedDate?: string
}

export function GamificationBadges() {
  const { riwayatAktivitas, totalKarbonDitebus } = useStore()
  const [badges, setBadges] = useState<Badge[]>([])

  useEffect(() => {
    calculateBadgeProgress()
  }, [riwayatAktivitas, totalKarbonDitebus])

  const calculateBadgeProgress = () => {
    const currentEmission = riwayatAktivitas.length > 0 ? riwayatAktivitas[0].totalEmisi : 0
    const totalSessions = riwayatAktivitas.length
    
    const badgeDefinitions: Omit<Badge, 'currentProgress' | 'earned' | 'earnedDate'>[] = [
      {
        id: 'first_calculation',
        name: 'Pemula Bijak',
        description: 'Menghitung jejak karbon untuk pertama kali',
        icon: Star,
        requirement: 1,
        category: 'action',
        rarity: 'common'
      },
      {
        id: 'low_emitter',
        name: 'Eco Warrior',
        description: 'Memiliki emisi di bawah 200 kg CO₂/bulan',
        icon: Leaf,
        requirement: 200,
        category: 'emission',
        rarity: 'rare'
      },
      {
        id: 'carbon_reducer',
        name: 'Carbon Crusher',
        description: 'Berhasil mengurangi emisi 50% dari perhitungan pertama',
        icon: TrendingDown,
        requirement: 50,
        category: 'emission',
        rarity: 'epic'
      },
      {
        id: 'frequent_user',
        name: 'Konsisten Hero',
        description: 'Melakukan 5 kali perhitungan jejak karbon',
        icon: Target,
        requirement: 5,
        category: 'streak',
        rarity: 'rare'
      },
      {
        id: 'tree_planter',
        name: 'Tree Champion',
        description: 'Menebus total 100 kg CO₂ melalui aksi karbon',
        icon: Trophy,
        requirement: 100,
        category: 'action',
        rarity: 'epic'
      },
      {
        id: 'climate_hero',
        name: 'Climate Hero',
        description: 'Emisi bulanan di bawah 100 kg CO₂',
        icon: Crown,
        requirement: 100,
        category: 'emission',
        rarity: 'legendary'
      },
      {
        id: 'ai_explorer',
        name: 'AI Explorer',
        description: 'Menggunakan rekomendasi AI 3 kali',
        icon: Zap,
        requirement: 3,
        category: 'action',
        rarity: 'rare'
      },
      {
        id: 'planet_protector',
        name: 'Planet Protector',
        description: 'Menebus total 500 kg CO₂',
        icon: Shield,
        requirement: 500,
        category: 'action',
        rarity: 'legendary'
      }
    ]

    const calculatedBadges = badgeDefinitions.map(badge => {
      let currentProgress = 0
      let earned = false

      switch (badge.id) {
        case 'first_calculation':
          currentProgress = totalSessions
          earned = totalSessions >= 1
          break
        case 'low_emitter':
          currentProgress = currentEmission
          earned = currentEmission > 0 && currentEmission <= 200
          break
        case 'carbon_reducer':
          if (riwayatAktivitas.length >= 2) {
            const firstEmission = riwayatAktivitas[riwayatAktivitas.length - 1].totalEmisi
            const reductionPercent = ((firstEmission - currentEmission) / firstEmission) * 100
            currentProgress = Math.max(0, reductionPercent)
            earned = reductionPercent >= 50
          }
          break
        case 'frequent_user':
          currentProgress = totalSessions
          earned = totalSessions >= 5
          break
        case 'tree_planter':
          currentProgress = totalKarbonDitebus
          earned = totalKarbonDitebus >= 100
          break
        case 'climate_hero':
          currentProgress = currentEmission
          earned = currentEmission > 0 && currentEmission <= 100
          break
        case 'ai_explorer':
          // Simulate AI usage tracking
          currentProgress = Math.min(totalSessions, 3)
          earned = totalSessions >= 3
          break
        case 'planet_protector':
          currentProgress = totalKarbonDitebus
          earned = totalKarbonDitebus >= 500
          break
      }

      return {
        ...badge,
        currentProgress,
        earned,
        earnedDate: earned ? new Date().toLocaleDateString('id-ID') : undefined
      }
    })

    setBadges(calculatedBadges)
  }

  const getRarityColor = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-yellow-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getRarityBorder = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-300'
      case 'rare': return 'border-blue-300'
      case 'epic': return 'border-purple-300'
      case 'legendary': return 'border-yellow-300'
      default: return 'border-gray-300'
    }
  }

  const earnedBadges = badges.filter(badge => badge.earned)
  const unearnedBadges = badges.filter(badge => !badge.earned)

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-xl font-bold text-white">Pencapaian</h3>
            <p className="text-purple-100">
              {earnedBadges.length} dari {badges.length} badge telah diraih
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress Badge</span>
            <span className="text-sm text-gray-600">
              {earnedBadges.length}/{badges.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
              Badge yang Diraih
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`relative p-4 rounded-xl border-2 ${getRarityBorder(badge.rarity)} bg-gradient-to-br ${getRarityColor(badge.rarity)} text-white transition-transform hover:scale-105`}
                >
                  <div className="text-center">
                    <badge.icon className="w-8 h-8 mx-auto mb-2" />
                    <h5 className="font-bold text-sm mb-1">{badge.name}</h5>
                    <p className="text-xs opacity-90">{badge.description}</p>
                    {badge.earnedDate && (
                      <p className="text-xs mt-2 opacity-75">
                        Diraih: {badge.earnedDate}
                      </p>
                    )}
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unearned Badges */}
        {unearnedBadges.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 text-gray-500 mr-2" />
              Badge Berikutnya
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unearnedBadges.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 border border-gray-200 rounded-xl bg-gray-50 opacity-75"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-200 rounded-lg">
                      <badge.icon className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-700">{badge.name}</h5>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${getRarityColor(badge.rarity)} h-2 rounded-full transition-all duration-500`}
                          style={{ 
                            width: `${Math.min((badge.currentProgress / badge.requirement) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {badge.currentProgress.toFixed(0)}/{badge.requirement} 
                        {badge.category === 'emission' && ' kg CO₂'}
                        {badge.category === 'action' && ' aksi'}
                        {badge.category === 'streak' && ' kali'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
