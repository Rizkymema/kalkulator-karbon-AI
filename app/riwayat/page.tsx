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
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/riwayat')
    }
    
    if (session?.user) {
      fetchEmissions()
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat riwayat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Riwayat Aktivitas
            </h1>
            <button 
              onClick={fetchEmissions}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors mb-4"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <p className="text-gray-600">
            Lihat jejak karbon yang telah Anda hitung dan tebus
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatEmission(totalFromDb || totalKarbonDitebus)}
            </h3>
            <p className="text-gray-600 text-sm">Total Emisi</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TreePine className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {totalTreesFromDb || Math.ceil(totalKarbonDitebus / 15)}
            </h3>
            <p className="text-gray-600 text-sm">Pohon Dibutuhkan</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {allRecords.length}
            </h3>
            <p className="text-gray-600 text-sm">Kalkulasi</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {allRecords.filter(item => item.aksiTebus).length}
            </h3>
            <p className="text-gray-600 text-sm">Aksi Tebus</p>
          </div>
        </div>

        {/* Monthly Chart */}
        {Object.keys(monthlyData).length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Emisi Per Bulan
            </h2>
            <div className="space-y-4">
              {Object.entries(monthlyData).map(([month, emission]) => (
                <div key={month} className="flex items-center space-x-4">
                  <div className="w-24 text-sm text-gray-600 font-medium">
                    {month}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div
                      className="bg-[#3AA17E] h-6 rounded-full flex items-center justify-end pr-2"
                      style={{
                        width: `${Math.min((emission / Math.max(...Object.values(monthlyData))) * 100, 100)}%`,
                      }}
                    >
                      <span className="text-white text-xs font-medium">
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Detail Aktivitas
            </h2>
          </div>

          {allRecords.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum Ada Aktivitas
              </h3>
              <p className="text-gray-600 mb-6">
                Mulai hitung jejak karbon Anda untuk melihat riwayat aktivitas
              </p>
              <a
                href="/kalkulator"
                className="bg-[#3AA17E] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center"
              >
                Mulai Kalkulasi
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {allRecords.map((aktivitas, index) => (
                <div key={aktivitas.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getActionIcon(aktivitas.aksiTebus)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Kalkulasi #{allRecords.length - index}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(aktivitas.tanggal)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatEmission(aktivitas.totalEmisi)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {aktivitas.pohonDibutuhkan} pohon
                        </p>
                      </div>
                      
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(
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
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            💡 Tips untuk Mengurangi Jejak Karbon
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-green-700 text-xs font-bold">1</span>
              </div>
              <p className="text-gray-700 text-sm">
                Gunakan transportasi umum atau bersepeda untuk perjalanan dekat
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-green-700 text-xs font-bold">2</span>
              </div>
              <p className="text-gray-700 text-sm">
                Kurangi konsumsi daging dan pilih makanan lokal
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-green-700 text-xs font-bold">3</span>
              </div>
              <p className="text-gray-700 text-sm">
                Hemat listrik dengan mematikan perangkat yang tidak digunakan
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-green-700 text-xs font-bold">4</span>
              </div>
              <p className="text-gray-700 text-sm">
                Gunakan tas belanja dan botol minum yang dapat digunakan ulang
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
