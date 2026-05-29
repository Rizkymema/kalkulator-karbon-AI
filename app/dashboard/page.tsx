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
  Calculator,
  MessageCircle
} from "lucide-react"
import Link from "next/link"
import Chatbot from "@/components/Chatbot"

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
    if (session?.user?.role === "ADMIN") {
      router.push("/admin")
    }

    if (session?.user) {
      fetchEmissions()
    } else if (status !== "loading") {
      setIsLoading(false)
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
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

  // Context for AI chatbot
  const chatContext = `User emissions data: 
  - Total calculations: ${emissions.length}
  - Average emissions: ${avgEmissions.toFixed(2)} tons CO2/year
  - Trees needed: ${totalTrees}
  - Impact level: ${impactLevel}
  - Recent trend: ${trend}
  - Carbon saved: ${carbonSaved.toFixed(2)} tons`

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
    <div className="min-h-screen bg-[#030a08] pt-36 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black font-display tracking-tight text-white mb-2 uppercase">
                Dasbor Emisi Karbon
              </h1>
              <p className="text-slate-400 font-medium">
                Selamat datang, {session?.user?.name || 'Pengguna'}! Pantau perjalanan lingkungan Anda.
              </p>
            </div>
            <Link href="/kalkulator">
              <Button className="bg-emerald-600 hover:bg-emerald-750 text-white font-bold rounded-xl">
                <Zap className="h-4 w-4 mr-2" />
                Hitung Emisi Baru
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Perhitungan</p>
                  <p className="text-2xl font-bold text-white">{emissions.length}</p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Rata-rata Emisi</p>
                  <p className="text-2xl font-bold text-white">{avgEmissions.toFixed(2)} ton</p>
                  <div className="flex items-center mt-1">
                    {trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-emerald-450 mr-1" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-rose-450 mr-1" />
                    )}
                    <span className={`text-sm ${trend === 'down' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {trendPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <Globe className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Pohon Dibutuhkan</p>
                  <p className="text-2xl font-bold text-white">{totalTrees}</p>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-full">
                  <Leaf className="h-6 w-6 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Level Dampak</p>
                  <div className="flex items-center mt-1">
                    <Badge 
                      variant={impactLevel === 'low' ? 'default' : 'secondary'}
                      className={`text-sm font-bold border-0 ${
                        impactLevel === 'low' 
                          ? 'bg-emerald-500/20 text-emerald-300' 
                          : impactLevel === 'medium' 
                            ? 'bg-amber-500/20 text-amber-300' 
                            : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {impactLevel === 'low' ? 'Rendah' : impactLevel === 'medium' ? 'Sedang' : 'Tinggi'}
                    </Badge>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-full">
                  <Target className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-emerald-450" />
                  Progress Menuju Target
                </CardTitle>
                <CardDescription className="text-slate-400 font-medium">
                  Target: Kurangi emisi menjadi 1.5 ton CO₂/tahun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-slate-350 mb-2 font-medium">
                      <span>Emisi Saat Ini</span>
                      <span>{avgEmissions.toFixed(2)}/1.5 ton</span>
                    </div>
                    <Progress 
                      value={Math.min((1.5 / Math.max(avgEmissions, 0.1)) * 100, 100)} 
                      className="h-3"
                    />
                  </div>
                  
                  {avgEmissions > 1.5 ? (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                      <p className="text-sm text-red-400 font-medium">
                        Anda perlu mengurangi emisi sebesar {(avgEmissions - 1.5).toFixed(2)} ton untuk mencapai target.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg">
                      <p className="text-sm text-emerald-400 font-medium">
                        Selamat! Anda sudah mencapai target emisi rendah.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Aktivitas Terbaru
                </CardTitle>
                <CardDescription className="text-slate-400 font-medium">
                  5 perhitungan emisi terakhir Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                {emissions.length === 0 ? (
                  <div className="text-center py-8">
                    <Lightbulb className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400 mb-4 font-medium">Belum ada data emisi</p>
                    <Link href="/kalkulator">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">Mulai Perhitungan Pertama</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {emissions.slice(0, 5).map((emission) => (
                      <div key={emission.id} className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                          <div>
                            <p className="font-bold text-white">
                              {emission.totalEmisi.toFixed(2)} ton CO₂
                            </p>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">
                              {new Date(emission.createdAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-300">
                            {emission.pohonDibutuhkan} pohon
                          </p>
                          <p className="text-[10px] text-slate-450 uppercase tracking-wider font-semibold">dibutuhkan</p>
                        </div>
                      </div>
                    ))}
                    
                    {emissions.length > 5 && (
                      <Link href="/riwayat">
                        <Button variant="outline" className="w-full mt-4 border-white/10 text-white hover:bg-white/10 rounded-xl font-bold">
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
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Award className="h-5 w-5 text-amber-400" />
                  Pencapaian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                        achievement.achieved 
                          ? 'bg-emerald-500/10 border-emerald-500/20' 
                          : 'bg-slate-950/60 border-white/5'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        achievement.achieved 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-slate-900 text-slate-500'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${
                          achievement.achieved ? 'text-emerald-400' : 'text-slate-400'
                        }`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-slate-450 font-medium">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.achieved && (
                        <div className="text-emerald-400">
                          <ArrowUp className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/kalkulator">
                    <Button className="w-full justify-start border-white/10 text-white hover:bg-white/10 rounded-xl font-bold" variant="outline">
                      <Calculator className="h-4 w-4 mr-2 text-emerald-400" />
                      Hitung Emisi Baru
                    </Button>
                  </Link>
                  
                  <Link href="/hasil-lengkap">
                    <Button className="w-full justify-start border-white/10 text-white hover:bg-white/10 rounded-xl font-bold" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2 text-blue-400" />
                      Lihat Hasil Lengkap
                    </Button>
                  </Link>
                  
                  <Link href="/riwayat">
                    <Button className="w-full justify-start border-white/10 text-white hover:bg-white/10 rounded-xl font-bold" variant="outline">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      Riwayat Lengkap
                    </Button>
                  </Link>
                  
                  <Link href="/berita">
                    <Button className="w-full justify-start border-white/10 text-white hover:bg-white/10 rounded-xl font-bold" variant="outline">
                      <Lightbulb className="h-4 w-4 mr-2 text-amber-400" />
                      Tips Ramah Lingkungan
                    </Button>
                  </Link>
                  
                  <Button 
                    className="w-full justify-start border-white/10 text-white hover:bg-white/10 rounded-xl font-bold" 
                    variant="outline"
                    onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}
                  >
                    <MessageCircle className="h-4 w-4 mr-2 text-teal-400" />
                    Tanya AI Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card className="border border-white/5 bg-gradient-to-br from-emerald-900/60 to-blue-950/30 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Dampak Lingkungan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-emerald-350 text-sm font-medium">Total Emisi</p>
                    <p className="text-2xl font-extrabold">{totalEmissions.toFixed(2)} ton</p>
                  </div>
                  
                  <div>
                    <p className="text-emerald-350 text-sm font-medium">Setara dengan</p>
                    <p className="text-lg font-bold text-emerald-300">{totalTrees} pohon</p>
                    <p className="text-emerald-350 text-xs font-semibold mt-0.5">yang perlu ditanam</p>
                  </div>
                  
                  {carbonSaved > 0 && (
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-slate-100">
                        Anda sudah menghemat <span className="font-extrabold text-emerald-450">{carbonSaved.toFixed(2)} ton CO₂</span> dengan pola hidup ramah lingkungan!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips of the Day */}
            <Card className="border border-white/5 bg-gradient-to-br from-orange-950/60 to-pink-950/30 text-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  💡 Tips Hari Ini
                </h3>
                <p className="text-sm text-orange-200 mb-4 font-medium leading-relaxed">
                  Gunakan transportasi umum atau bersepeda untuk mengurangi emisi karbon dari kendaraan pribadi hingga 50%.
                </p>
                <Badge className="bg-white/10 border border-white/10 text-white rounded-lg">
                  Transportasi Hijau
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
      
      {/* Dashboard-specific Chatbot with context */}
      <Chatbot context={chatContext} className="bottom-6 right-6" />
    </div>
  )
}
