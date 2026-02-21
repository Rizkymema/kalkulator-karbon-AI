'use client'

import Card from './Card'
import { useStore } from '@/lib/store'
import { Trophy, Medal, Award } from 'lucide-react'

export function Leaderboard() {
  const { leaderboard } = useStore()

  const getBadgeIcon = (badge: 'gold' | 'silver' | 'bronze') => {
    switch (badge) {
      case 'gold':
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 'silver':
        return <Medal className="w-6 h-6 text-gray-400" />
      case 'bronze':
        return <Award className="w-6 h-6 text-orange-600" />
    }
  }

  const getBadgeColor = (badge: 'gold' | 'silver' | 'bronze') => {
    switch (badge) {
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      case 'silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-500'
      case 'bronze':
        return 'bg-gradient-to-r from-orange-400 to-orange-600'
    }
  }

  return (
    <Card className="bg-white">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">
            Peringkat Teratas
          </h2>
        </div>

        <div className="space-y-4">
          {leaderboard.map((user, index) => (
            <div 
              key={user.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                index === 0 ? 'border-yellow-300 bg-yellow-50' :
                index === 1 ? 'border-gray-300 bg-gray-50' :
                index === 2 ? 'border-orange-300 bg-orange-50' :
                'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Position & Badge */}
                  <div className="flex items-center gap-2">
                    <div className={`w-12 h-12 rounded-full ${getBadgeColor(user.badge)} flex items-center justify-center text-white font-bold text-lg`}>
                      {user.posisi}
                    </div>
                    {getBadgeIcon(user.badge)}
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {user.nama}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {user.totalEmisi} kg CO₂ • {user.pohonDitanam} pohon ditanam
                    </p>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">
                    Emisi Terendah
                  </div>
                  <div className="text-xs text-gray-500">
                    Bulan ini
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Ingin masuk peringkat? Kurangi emisi karbon Anda!
          </p>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Hitung Emisi Saya
          </button>
        </div>
      </div>
    </Card>
  )
}
