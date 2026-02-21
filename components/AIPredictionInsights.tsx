'use client'

import { useState, useEffect } from 'react'
import { Brain, TrendingUp, Calendar, Target, Lightbulb, BarChart3, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface PredictionData {
  timeframe: '1month' | '3months' | '6months' | '1year'
  currentEmission: number
  predictedEmission: number
  reductionPotential: number
  confidenceLevel: number
  factors: {
    factor: string
    impact: 'high' | 'medium' | 'low'
    description: string
    recommendation: string
  }[]
  milestones: {
    month: number
    target: number
    probability: number
  }[]
}

interface PersonalizedInsight {
  id: string
  type: 'recommendation' | 'warning' | 'achievement' | 'trend'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
  priority: number
}

export function AIPredictionInsights({ currentEmission, historicalData }: { 
  currentEmission: number; 
  historicalData: number[] 
}) {
  const [activeTimeframe, setActiveTimeframe] = useState<PredictionData['timeframe']>('3months')
  const [predictions, setPredictions] = useState<Record<string, PredictionData>>({})
  const [insights, setInsights] = useState<PersonalizedInsight[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generatePredictions()
    generatePersonalizedInsights()
  }, [currentEmission, historicalData])

  const generatePredictions = async () => {
    setLoading(true)
    
    // Simulate AI prediction generation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const timeframes: PredictionData['timeframe'][] = ['1month', '3months', '6months', '1year']
    const predictionData: Record<string, PredictionData> = {}
    
    timeframes.forEach(timeframe => {
      const months = timeframe === '1month' ? 1 : timeframe === '3months' ? 3 : timeframe === '6months' ? 6 : 12
      
      // Calculate trend from historical data
      const trend = historicalData.length > 1 
        ? (historicalData[historicalData.length - 1] - historicalData[0]) / historicalData.length
        : 0
      
      // Generate prediction based on current trend and improvement potential
      const improvementFactor = Math.max(0.05, Math.min(0.4, months * 0.05))
      const predictedEmission = Math.max(
        currentEmission * 0.3, // Minimum realistic emission
        currentEmission * (1 + trend * months * 0.1) * (1 - improvementFactor)
      )
      
      const reductionPotential = ((currentEmission - predictedEmission) / currentEmission) * 100
      
      predictionData[timeframe] = {
        timeframe,
        currentEmission,
        predictedEmission: Math.round(predictedEmission),
        reductionPotential: Math.round(reductionPotential),
        confidenceLevel: Math.max(60, 95 - months * 5), // Confidence decreases with time
        factors: [
          {
            factor: 'Transportasi',
            impact: 'high',
            description: 'Penggunaan transportasi pribadi yang tinggi',
            recommendation: 'Beralih ke transportasi umum 3x seminggu'
          },
          {
            factor: 'Konsumsi Listrik',
            impact: 'medium',
            description: 'Pola penggunaan listrik yang dapat dioptimalkan',
            recommendation: 'Pasang panel surya atau gunakan perangkat hemat energi'
          },
          {
            factor: 'Pola Makan',
            impact: months <= 3 ? 'low' : 'medium',
            description: 'Konsumsi protein hewani yang bisa dikurangi',
            recommendation: 'Kurangi konsumsi daging merah 2x per minggu'
          }
        ],
        milestones: Array.from({ length: months }, (_, i) => ({
          month: i + 1,
          target: Math.round(currentEmission - (currentEmission - predictedEmission) * ((i + 1) / months)),
          probability: Math.max(50, 85 - i * 5)
        }))
      }
    })
    
    setPredictions(predictionData)
    setLoading(false)
  }

  const generatePersonalizedInsights = () => {
    const insights: PersonalizedInsight[] = []
    
    // Trend analysis
    if (historicalData.length >= 3) {
      const recentTrend = historicalData.slice(-3).reduce((acc, val, i, arr) => {
        if (i > 0) acc += val - arr[i - 1]
        return acc
      }, 0) / (historicalData.length - 1)
      
      if (recentTrend < -10) {
        insights.push({
          id: 'positive_trend',
          type: 'achievement',
          title: 'Tren Positif Terdeteksi! 🎉',
          description: `Emisi Anda mengalami penurunan konsisten. Rata-rata berkurang ${Math.abs(recentTrend).toFixed(1)} kg CO₂ per bulan.`,
          impact: 'high',
          actionable: false,
          priority: 1
        })
      } else if (recentTrend > 10) {
        insights.push({
          id: 'negative_trend',
          type: 'warning',
          title: 'Emisi Cenderung Meningkat ⚠️',
          description: `Emisi Anda naik ${recentTrend.toFixed(1)} kg CO₂ per bulan. Mari identifikasi penyebab dan buat strategi pengurangan.`,
          impact: 'high',
          actionable: true,
          priority: 1
        })
      }
    }
    
    // Emission level analysis
    if (currentEmission > 300) {
      insights.push({
        id: 'high_emission',
        type: 'recommendation',
        title: 'Potensi Pengurangan Besar',
        description: 'Emisi Anda di atas rata-rata. Fokus pada transportasi dan energi rumah bisa menghemat hingga 40% emisi.',
        impact: 'high',
        actionable: true,
        priority: 2
      })
    } else if (currentEmission < 150) {
      insights.push({
        id: 'low_emission',
        type: 'achievement',
        title: 'Low Carbon Champion! 🌟',
        description: 'Emisi Anda sudah sangat rendah. Pertahankan gaya hidup ini dan bantu edukasi orang lain.',
        impact: 'medium',
        actionable: false,
        priority: 3
      })
    }
    
    // Seasonal recommendations
    const currentMonth = new Date().getMonth()
    if (currentMonth >= 5 && currentMonth <= 7) { // June-August (dry season)
      insights.push({
        id: 'seasonal_tip',
        type: 'recommendation',
        title: 'Tips Musim Kemarau',
        description: 'Musim kemarau = AC bekerja lebih keras. Gunakan kipas angin dan buka jendela saat malam untuk hemat listrik.',
        impact: 'medium',
        actionable: true,
        priority: 4
      })
    }
    
    setInsights(insights.sort((a, b) => a.priority - b.priority))
  }

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
    }
  }

  const getInsightIcon = (type: PersonalizedInsight['type']) => {
    switch (type) {
      case 'recommendation': return Lightbulb
      case 'warning': return AlertCircle
      case 'achievement': return Target
      case 'trend': return TrendingUp
    }
  }

  const getInsightColor = (type: PersonalizedInsight['type']) => {
    switch (type) {
      case 'recommendation': return 'from-blue-500 to-purple-500'
      case 'warning': return 'from-red-500 to-orange-500'
      case 'achievement': return 'from-green-500 to-emerald-500'
      case 'trend': return 'from-indigo-500 to-blue-500'
    }
  }

  const activePrediction = predictions[activeTimeframe]

  return (
    <div className="space-y-8">
      {/* AI Prediction Engine */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-xl font-bold text-white">Prediksi AI Emisi Masa Depan</h3>
              <p className="text-blue-100">Proyeksi emisi dan rekomendasi berdasarkan data Anda</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-blue-500 animate-pulse mx-auto mb-4" />
              <p className="text-gray-600">AI sedang menganalisis data dan membuat prediksi...</p>
            </div>
          ) : (
            <>
              {/* Timeframe Selection */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { key: '1month', label: '1 Bulan' },
                  { key: '3months', label: '3 Bulan' },
                  { key: '6months', label: '6 Bulan' },
                  { key: '1year', label: '1 Tahun' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTimeframe(key as PredictionData['timeframe'])}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTimeframe === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {activePrediction && (
                <motion.div
                  key={activeTimeframe}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Prediction Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {activePrediction.currentEmission} kg
                      </div>
                      <div className="text-sm text-blue-700">Emisi Saat Ini</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {activePrediction.predictedEmission} kg
                      </div>
                      <div className="text-sm text-green-700">
                        Prediksi {activeTimeframe === '1month' ? '1 Bulan' : 
                                 activeTimeframe === '3months' ? '3 Bulan' : 
                                 activeTimeframe === '6months' ? '6 Bulan' : '1 Tahun'}
                      </div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {activePrediction.reductionPotential}%
                      </div>
                      <div className="text-sm text-purple-700">Potensi Pengurangan</div>
                    </div>
                  </div>

                  {/* Confidence Level */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Tingkat Kepercayaan Prediksi</span>
                      <span className="font-bold text-gray-900">{activePrediction.confidenceLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${activePrediction.confidenceLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Key Factors */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Faktor Utama</h4>
                    <div className="space-y-4">
                      {activePrediction.factors.map((factor, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{factor.factor}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(factor.impact)}`}>
                              {factor.impact === 'high' ? 'Tinggi' : factor.impact === 'medium' ? 'Sedang' : 'Rendah'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                          <p className="text-sm text-blue-600 font-medium">
                            💡 {factor.recommendation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Target Bulanan</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {activePrediction.milestones.map((milestone, index) => (
                        <div key={index} className="text-center p-3 border border-gray-200 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">
                            Bulan {milestone.month}
                          </div>
                          <div className="text-lg font-bold text-blue-600 mb-1">
                            {milestone.target}kg
                          </div>
                          <div className="text-xs text-gray-500">
                            {milestone.probability}% kemungkinan
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Personalized Insights */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-xl font-bold text-white">Insights Personal</h3>
              <p className="text-emerald-100">Wawasan yang disesuaikan khusus untuk Anda</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight) => {
                const Icon = getInsightIcon(insight.type)
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getInsightColor(insight.type)} text-white`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                            Impact {insight.impact === 'high' ? 'Tinggi' : insight.impact === 'medium' ? 'Sedang' : 'Rendah'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{insight.description}</p>
                        {insight.actionable && (
                          <button className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                            Lihat Rekomendasi Aksi →
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Lakukan beberapa perhitungan untuk mendapatkan insights personal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
