'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  Leaf, 
  Zap, 
  Car, 
  Home, 
  UtensilsCrossed,
  Trash2,
  ShoppingBag,
  Target,
  Award,
  Filter,
  Download,
  Share2,
  Eye,
  PieChart,
  LineChart
} from "lucide-react"
import Link from "next/link"

interface EmissionData {
  id: string
  totalEmisi: number
  pohonDibutuhkan: number
  createdAt: string
  emissionData: string
}

interface DetailedEmission {
  category: string
  value: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
  recommendations: string[]
}

export default function HasilLengkapPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [emissions, setEmissions] = useState<EmissionData[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')
  const [selectedView, setSelectedView] = useState<'overview' | 'breakdown' | 'trends' | 'comparison'>('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
    
    if (session?.user?.role === "ADMIN") {
      router.push("/admin")
    }

    if (session?.user) {
      fetchEmissions()
    }
  }, [session, status, router])

  const fetchEmissions = async () => {
    try {
      const response = await fetch('/api/user/emissions')
      if (response.ok) {
        const data = await response.json()
        setEmissions(data)
      }
    } catch (error) {
      console.error('Error fetching emissions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  // Calculate detailed statistics
  const totalEmissions = emissions.reduce((sum, record) => sum + record.totalEmisi, 0)
  const avgEmissions = emissions.length > 0 ? totalEmissions / emissions.length : 0
  const totalTrees = emissions.reduce((sum, record) => sum + record.pohonDibutuhkan, 0)

  // Mock detailed breakdown data (in real app this would come from detailed emission data)
  const detailedBreakdown: DetailedEmission[] = [
    {
      category: 'Transportasi',
      value: avgEmissions * 0.35,
      percentage: 35,
      trend: 'down',
      recommendations: [
        'Gunakan transportasi umum lebih sering',
        'Pertimbangkan kendaraan listrik atau hybrid',
        'Lakukan carpooling atau bike sharing'
      ]
    },
    {
      category: 'Konsumsi Listrik',
      value: avgEmissions * 0.28,
      percentage: 28,
      trend: 'stable',
      recommendations: [
        'Ganti ke lampu LED',
        'Gunakan peralatan hemat energi',
        'Matikan peralatan saat tidak digunakan'
      ]
    },
    {
      category: 'Makanan',
      value: avgEmissions * 0.22,
      percentage: 22,
      trend: 'up',
      recommendations: [
        'Kurangi konsumsi daging merah',
        'Pilih makanan lokal dan organik',
        'Kurangi food waste'
      ]
    },
    {
      category: 'Pengelolaan Sampah',
      value: avgEmissions * 0.10,
      percentage: 10,
      trend: 'down',
      recommendations: [
        'Tingkatkan daur ulang',
        'Kurangi penggunaan plastik sekali pakai',
        'Kompos sampah organik'
      ]
    },
    {
      category: 'Belanja & Konsumsi',
      value: avgEmissions * 0.05,
      percentage: 5,
      trend: 'stable',
      recommendations: [
        'Beli produk ramah lingkungan',
        'Kurangi konsumsi impulsif',
        'Pilih produk dengan kemasan minimal'
      ]
    }
  ]

  const categoryIcons = {
    'Transportasi': Car,
    'Konsumsi Listrik': Zap,
    'Makanan': UtensilsCrossed,
    'Pengelolaan Sampah': Trash2,
    'Belanja & Konsumsi': ShoppingBag
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getImpactLevel = (emissions: number) => {
    if (emissions <= 1.5) return { level: 'Rendah', color: 'bg-green-100 text-green-800', desc: 'Sangat baik! Anda sudah ramah lingkungan' }
    if (emissions <= 2.5) return { level: 'Sedang', color: 'bg-yellow-100 text-yellow-800', desc: 'Baik, masih bisa ditingkatkan' }
    return { level: 'Tinggi', color: 'bg-red-100 text-red-800', desc: 'Perlu perbaikan signifikan' }
  }

  const impact = getImpactLevel(avgEmissions)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                Hasil Lengkap
              </h1>
              <p className="text-gray-600">
                Analisis mendalam emisi karbon dan rekomendasi personalisasi
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
              <Link href="/kalkulator">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Hitung Ulang
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Emisi</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEmissions.toFixed(2)} ton</p>
                </div>
                <PieChart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Rata-rata</p>
                  <p className="text-2xl font-bold text-gray-900">{avgEmissions.toFixed(2)} ton</p>
                </div>
                <LineChart className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pohon Dibutuhkan</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTrees}</p>
                </div>
                <Leaf className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Level Dampak</p>
                  <Badge className={impact.color}>{impact.level}</Badge>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="breakdown">Detail</TabsTrigger>
            <TabsTrigger value="trends">Tren</TabsTrigger>
            <TabsTrigger value="comparison">Perbandingan</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Impact Assessment */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Penilaian Dampak Lingkungan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                          <span className="text-2xl font-bold text-white">{avgEmissions.toFixed(1)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Emisi Rata-rata per Tahun</h3>
                        <p className="text-gray-600">{impact.desc}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">1.5</p>
                          <p className="text-sm text-green-700">Target Global</p>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg">
                          <p className="text-2xl font-bold text-yellow-600">2.3</p>
                          <p className="text-sm text-yellow-700">Rata-rata Indonesia</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{avgEmissions.toFixed(1)}</p>
                          <p className="text-sm text-blue-700">Emisi Anda</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Aksi Rekomendasi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Target className="h-4 w-4 mr-2" />
                        Set Target Pribadi
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Jadwal Evaluasi
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Bagikan Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">💡 Tips Hari Ini</h3>
                    <p className="text-sm text-green-100 mb-4">
                      Matikan peralatan elektronik saat tidak digunakan untuk menghemat energi hingga 10%
                    </p>
                    <Badge className="bg-white/20 text-white">
                      Hemat Listrik
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Breakdown Tab */}
          <TabsContent value="breakdown" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Breakdown Detail per Kategori</CardTitle>
                <CardDescription>
                  Analisis mendalam kontribusi setiap kategori terhadap total emisi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {detailedBreakdown.map((item, index) => {
                    const IconComponent = categoryIcons[item.category as keyof typeof categoryIcons]
                    return (
                      <div key={index} className="p-6 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg">
                              <IconComponent className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{item.category}</h3>
                              <p className="text-sm text-gray-500">{item.value.toFixed(2)} ton CO₂ ({item.percentage}%)</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(item.trend)}
                            <Badge variant="outline">{item.percentage}%</Badge>
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Rekomendasi Perbaikan:</h4>
                          <ul className="space-y-1">
                            {item.recommendations.map((rec, recIndex) => (
                              <li key={recIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Analisis Tren Emisi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <LineChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Grafik Tren Akan Tersedia</h3>
                  <p className="text-gray-500 mb-6">Lakukan beberapa perhitungan emisi untuk melihat tren perubahan</p>
                  <Link href="/kalkulator">
                    <Button>Tambah Data Emisi</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Perbandingan Benchmark</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-2">Target Ideal</h3>
                      <p className="text-3xl font-bold text-green-600">1.5 ton</p>
                      <p className="text-sm text-green-700">Paris Agreement</p>
                    </div>
                    <div className="text-center p-6 bg-yellow-50 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-2">Rata-rata Indonesia</h3>
                      <p className="text-3xl font-bold text-yellow-600">2.3 ton</p>
                      <p className="text-sm text-yellow-700">Data Nasional</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-2">Emisi Anda</h3>
                      <p className="text-3xl font-bold text-blue-600">{avgEmissions.toFixed(1)} ton</p>
                      <p className="text-sm text-blue-700">Perhitungan Personal</p>
                    </div>
                  </div>

                  {avgEmissions <= 1.5 ? (
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h3 className="font-bold text-green-800 mb-2">🎉 Selamat!</h3>
                      <p className="text-green-700">Emisi Anda sudah di bawah target global. Pertahankan pola hidup ramah lingkungan ini!</p>
                    </div>
                  ) : (
                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h3 className="font-bold text-orange-800 mb-2">🎯 Target Perbaikan</h3>
                      <p className="text-orange-700 mb-3">
                        Anda perlu mengurangi {(avgEmissions - 1.5).toFixed(1)} ton CO₂ untuk mencapai target global.
                      </p>
                      <p className="text-sm text-orange-600">
                        Fokus pada kategori dengan emisi tertinggi untuk hasil maksimal.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
