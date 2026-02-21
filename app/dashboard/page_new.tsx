'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingDown, 
  TrendingUp, 
  Leaf, 
  Zap, 
  Car, 
  Home, 
  Recycle,
  Calendar,
  Target,
  Award,
  BarChart3,
  Users,
  Globe,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Lightbulb,
  Calculator
} from "lucide-react"
import Link from "next/link"

interface EmissionData {
  id: string
  totalEmisi: number
  pohonDibutuhkan: number
  createdAt: string
  emissionData: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [emissions, setEmissions] = useState<EmissionData[]>([])
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

  // Calculate statistics
  const totalEmissions = emissions.reduce((sum, record) => sum + record.totalEmisi, 0)
  const avgEmissions = emissions.length > 0 ? totalEmissions / emissions.length : 0
  const totalTrees = emissions.reduce((sum, record) => sum + record.pohonDibutuhkan, 0)

  // Calculate trend
  const recentEmissions = emissions.slice(0, 5)
  const olderEmissions = emissions.slice(5, 10)
  const recentAvg = recentEmissions.length > 0 ? recentEmissions.reduce((sum, e) => sum + e.totalEmisi, 0) / recentEmissions.length : 0
  const olderAvg = olderEmissions.length > 0 ? olderEmissions.reduce((sum, e) => sum + e.totalEmisi, 0) / olderEmissions.length : 0
  const trend = recentAvg < olderAvg ? 'down' : 'up'
  const trendPercentage = olderAvg > 0 ? Math.abs(((recentAvg - olderAvg) / olderAvg) * 100) : 0

  // Environmental impact
  const carbonSaved = Math.max(0, (2.5 - avgEmissions) * emissions.length)
  const impactLevel = avgEmissions <= 1.5 ? 'low' : avgEmissions <= 2.5 ? 'medium' : 'high'

  const achievements = [
    {
      id: 'first_calculation',
      title: 'First Step',
      description: 'Melakukan perhitungan emisi pertama',
      achieved: emissions.length > 0,
      icon: <Leaf className="h-6 w-6" />
    },
    {
      id: 'consistent_tracker',
      title: 'Consistent Tracker',
      description: 'Melakukan 5 perhitungan emisi',
      achieved: emissions.length >= 5,
      icon: <Target className="h-6 w-6" />
    },
    {
      id: 'eco_warrior',
      title: 'Eco Warrior',
      description: 'Emisi rata-rata di bawah 2 ton',
      achieved: avgEmissions < 2 && emissions.length >= 3,
      icon: <Award className="h-6 w-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Ringkasan Saya
              </h1>
              <p className="text-gray-600">
                Selamat datang, {session.user?.name}! Pantau perjalanan lingkungan Anda.
              </p>
            </div>
            <Link href="/kalkulator">
              <Button className="bg-green-600 hover:bg-green-700">
                <Zap className="h-4 w-4 mr-2" />
                Hitung Emisi Baru
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Perhitungan</p>
                  <p className="text-2xl font-bold text-gray-900">{emissions.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Rata-rata Emisi</p>
                  <p className="text-2xl font-bold text-gray-900">{avgEmissions.toFixed(2)} ton</p>
                  <div className="flex items-center mt-1">
                    {trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
                      {trendPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
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
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Leaf className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Level Dampak</p>
                  <div className="flex items-center mt-1">
                    <Badge 
                      variant={impactLevel === 'low' ? 'default' : impactLevel === 'medium' ? 'secondary' : 'destructive'}
                      className="text-sm"
                    >
                      {impactLevel === 'low' ? 'Rendah' : impactLevel === 'medium' ? 'Sedang' : 'Tinggi'}
                    </Badge>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Progress Menuju Target
                </CardTitle>
                <CardDescription>
                  Target: Kurangi emisi menjadi 1.5 ton CO₂/tahun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Emisi Saat Ini</span>
                      <span>{avgEmissions.toFixed(2)}/1.5 ton</span>
                    </div>
                    <Progress 
                      value={Math.min((1.5 / Math.max(avgEmissions, 0.1)) * 100, 100)} 
                      className="h-3"
                    />
                  </div>
                  
                  {avgEmissions > 1.5 ? (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-red-700">
                        Anda perlu mengurangi emisi sebesar {(avgEmissions - 1.5).toFixed(2)} ton untuk mencapai target.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-700">
                        Selamat! Anda sudah mencapai target emisi rendah.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Aktivitas Terbaru
                </CardTitle>
                <CardDescription>
                  5 perhitungan emisi terakhir Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                {emissions.length === 0 ? (
                  <div className="text-center py-8">
                    <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Belum ada data emisi</p>
                    <Link href="/kalkulator">
                      <Button>Mulai Perhitungan Pertama</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {emissions.slice(0, 5).map((emission, index) => (
                      <div key={emission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {emission.totalEmisi.toFixed(2)} ton CO₂
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(emission.createdAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700">
                            {emission.pohonDibutuhkan} pohon
                          </p>
                          <p className="text-xs text-gray-500">dibutuhkan</p>
                        </div>
                      </div>
                    ))}
                    
                    {emissions.length > 5 && (
                      <Link href="/riwayat">
                        <Button variant="outline" className="w-full mt-4">
                          Lihat Semua Riwayat
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Pencapaian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        achievement.achieved ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        achievement.achieved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${
                          achievement.achieved ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.achieved && (
                        <div className="text-green-600">
                          <ArrowUp className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/kalkulator">
                    <Button className="w-full justify-start" variant="outline">
                      <Calculator className="h-4 w-4 mr-2" />
                      Hitung Emisi Baru
                    </Button>
                  </Link>
                  
                  <Link href="/riwayat">
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Lihat Riwayat Lengkap
                    </Button>
                  </Link>
                  
                  <Link href="/berita">
                    <Button className="w-full justify-start" variant="outline">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Tips Ramah Lingkungan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Dampak Lingkungan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-green-100 text-sm">Total Emisi</p>
                    <p className="text-2xl font-bold">{totalEmissions.toFixed(2)} ton</p>
                  </div>
                  
                  <div>
                    <p className="text-green-100 text-sm">Setara dengan</p>
                    <p className="text-lg font-semibold">{totalTrees} pohon</p>
                    <p className="text-green-100 text-xs">yang perlu ditanam</p>
                  </div>
                  
                  {carbonSaved > 0 && (
                    <div className="bg-white/20 p-3 rounded-lg">
                      <p className="text-sm">
                        Anda sudah menghemat <span className="font-bold">{carbonSaved.toFixed(2)} ton CO₂</span> dengan pola hidup ramah lingkungan!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
