'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../lib/store'
import { formatEmission, formatDate } from '../../lib/utils'
import { Calendar, TreePine, Heart, Target, TrendingUp, BarChart3, Loader2, RefreshCw } from 'lucide-react'

interface EmissionRecord {
  id: string
  totalEmisi: number
  pohonDibutuhkan: number
  aksiTebus: string | null
  tanggal: string
  createdAt: string
  emissionData?: any
}

export default function RiwayatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [dbRecords, setDbRecords] = useState<EmissionRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { riwayatAktivitas, totalKarbonDitebus } = useStore()

  useEffect(() => {
    if (session?.user) {
      fetchEmissions()
    } else if (status !== 'loading') {
      setIsLoading(false)
    }
  }, [session, status, router])

  const fetchEmissions = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/user/emissions')
      if (response.ok) {
        const data = await response.json()
        setDbRecords(data)
      }
    } catch (error) {
      console.error('Error fetching emissions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Combine database records with local store (prioritize database)
  const allRecords = dbRecords.length > 0 ? dbRecords : riwayatAktivitas.map((item, index) => ({
    id: `local-${index}`,
    totalEmisi: item.totalEmisi,
    pohonDibutuhkan: item.pohonDibutuhkan,
    aksiTebus: item.aksiTebus,
    tanggal: item.tanggal,
    createdAt: item.tanggal,
  }))

  const getActionIcon = (aksi: string | null) => {
    switch (aksi) {
      case 'tanam':
        return <TreePine className="w-5 h-5 text-green-600" />
      case 'donasi':
        return <Heart className="w-5 h-5 text-blue-600" />
      case 'tantangan':
        return <Target className="w-5 h-5 text-purple-600" />
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />
    }
  }

  const getActionText = (aksi: string | null) => {
    switch (aksi) {
      case 'tanam':
        return 'Tanam Pohon'
      case 'donasi':
        return 'Donasi'
      case 'tantangan':
        return 'Tantangan Hijau'
      default:
        return 'Belum Ditebus'
    }
  }

  const getActionColor = (aksi: string | null) => {
    switch (aksi) {
      case 'tanam':
        return 'bg-green-100 text-green-800'
      case 'donasi':
        return 'bg-blue-100 text-blue-800'
      case 'tantangan':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const monthlyData = allRecords.reduce((acc, item) => {
    const month = new Date(item.tanggal).toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long' 
    })
    if (!acc[month]) {
      acc[month] = 0
    }
    acc[month] += item.totalEmisi
    return acc
  }, {} as Record<string, number>)

  // Calculate totals from database records
  const totalFromDb = allRecords.reduce((sum, r) => sum + (r.totalEmisi || 0), 0)
  const totalTreesFromDb = allRecords.reduce((sum, r) => sum + (r.pohonDibutuhkan || 0), 0)

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-[#030a08] flex items-center justify-center text-slate-200">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-400 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">Memuat riwayat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 pt-36 pb-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white mb-4">
              Riwayat Aktivitas
            </h1>
            <button 
              onClick={fetchEmissions}
              className="p-2 hover:bg-slate-900/80 rounded-full transition-colors mb-4 border border-white/5 bg-slate-900/40"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5 text-slate-300" />
            </button>
          </div>
          <p className="text-slate-400 font-medium">
            Lihat jejak karbon yang telah Anda hitung dan tebus
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {formatEmission(totalFromDb || totalKarbonDitebus)}
            </h3>
            <p className="text-slate-400 text-sm font-medium">Total Emisi</p>
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TreePine className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {totalTreesFromDb || Math.ceil(totalKarbonDitebus / 15)}
            </h3>
            <p className="text-slate-400 text-sm font-medium">Pohon Dibutuhkan</p>
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {allRecords.length}
            </h3>
            <p className="text-slate-400 text-sm font-medium">Kalkulasi</p>
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {allRecords.filter(item => item.aksiTebus).length}
            </h3>
            <p className="text-slate-400 text-sm font-medium">Aksi Tebus</p>
          </div>
        </div>

        {/* Monthly Chart */}
        {Object.keys(monthlyData).length > 0 && (
          <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">
              Emisi Per Bulan
            </h2>
            <div className="space-y-4">
              {Object.entries(monthlyData).map(([month, emission]) => (
                <div key={month} className="flex items-center space-x-4">
                  <div className="w-24 text-sm text-slate-400 font-bold">
                    {month}
                  </div>
                  <div className="flex-1 bg-slate-950/60 border border-white/5 rounded-full h-6 relative">
                    <div
                      className="bg-[#3AA17E] h-6 rounded-full flex items-center justify-end pr-2"
                      style={{
                        width: `${Math.min((emission / Math.max(...Object.values(monthlyData))) * 100, 100)}%`,
                      }}
                    >
                      <span className="text-white text-xs font-bold">
                        {formatEmission(emission)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity List */}
        <div className="bg-slate-900/40 border border-white/5 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-xl font-bold text-white">
              Detail Aktivitas
            </h2>
          </div>

          {allRecords.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Belum Ada Aktivitas
              </h3>
              <p className="text-slate-400 mb-6 font-medium">
                Mulai hitung jejak karbon Anda untuk melihat riwayat aktivitas
              </p>
              <a
                href="/kalkulator"
                className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center"
              >
                Mulai Kalkulasi
              </a>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {allRecords.map((aktivitas, index) => (
                <div key={aktivitas.id} className="px-6 py-4 hover:bg-slate-900/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-950/60 border border-white/5 rounded-lg flex items-center justify-center">
                        {getActionIcon(aktivitas.aksiTebus)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          Kalkulasi #{allRecords.length - index}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {formatDate(aktivitas.tanggal)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-white">
                          {formatEmission(aktivitas.totalEmisi)}
                        </p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                          {aktivitas.pohonDibutuhkan} pohon
                        </p>
                      </div>
                      
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getActionColor(
                          aktivitas.aksiTebus
                        )}`}
                      >
                        {getActionText(aktivitas.aksiTebus)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-slate-900/60 to-emerald-950/20 border border-white/5 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">
            💡 Tips untuk Mengurangi Jejak Karbon
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">1</span>
              </div>
              <p className="text-slate-300 text-sm font-medium">
                Gunakan transportasi umum atau bersepeda untuk perjalanan dekat
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">2</span>
              </div>
              <p className="text-slate-300 text-sm font-medium">
                Kurangi konsumsi daging dan pilih makanan lokal
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">3</span>
              </div>
              <p className="text-slate-300 text-sm font-medium">
                Hemat listrik dengan mematikan perangkat yang tidak digunakan
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-emerald-400 text-xs font-bold">4</span>
              </div>
              <p className="text-slate-300 text-sm font-medium">
                Gunakan tas belanja dan botol minum yang dapat digunakan ulang
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
