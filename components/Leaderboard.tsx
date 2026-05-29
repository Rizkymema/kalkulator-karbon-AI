'use client'

import Card from './Card'
import { useStore } from '@/lib/store'
import { Trophy, Medal, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Leaderboard() {
  const { leaderboard } = useStore()
  const router = useRouter()

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
    <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-yellow-500 animate-pulse" />
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">
            Peringkat Teratas
          </h2>
        </div>

        <div className="space-y-4">
          {leaderboard.map((user, index) => (
            <div 
              key={user.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                index === 0 ? 'border-yellow-500/50 bg-yellow-950/20 shadow-[0_0_15px_rgba(234,179,8,0.08)]' :
                index === 1 ? 'border-slate-500/40 bg-slate-800/20' :
                index === 2 ? 'border-orange-500/40 bg-orange-950/20' :
                'border-white/5 bg-slate-950/40 hover:border-white/10'
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
                    <h3 className={`font-semibold text-lg ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>
                      {user.nama}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {user.totalEmisi} kg CO₂ • {user.pohonDitanam} pohon ditanam
                    </p>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-300">
                    Emisi Terendah
                  </div>
                  <div className="text-xs text-slate-500">
                    Bulan ini
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400 mb-3">
            Ingin masuk peringkat? Kurangi emisi karbon Anda!
          </p>
          <button 
            onClick={() => router.push('/kalkulator')}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Hitung Emisi Saya
          </button>
        </div>
      </div>
    </Card>
  )
}
