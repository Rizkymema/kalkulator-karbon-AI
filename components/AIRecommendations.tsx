'use client';

import { useState, useEffect } from 'react'
import { Brain, Lightbulb, Target, TrendingDown, CheckCircle, Loader2 } from 'lucide-react'

interface AIRecommendationsProps {
  totalEmission?: number
  categories?: string[]
  emissionData?: any // Support for legacy prop
}

interface AIInsight {
  recommendations: string[]
  impactLevel: 'low' | 'medium' | 'high'
  potentialSavings: string
  priorityActions: string[]
  generatedAt: string
  aiVersion: string
}

export function AIRecommendations({ totalEmission, categories, emissionData }: AIRecommendationsProps) {
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Extract data from emissionData if provided
  const effectiveEmission = totalEmission || emissionData?.total || 0
  const effectiveCategories = categories || (emissionData ? Object.keys(emissionData).filter(k => k !== 'total') : ['transportasi', 'listrik', 'makanan', 'sampah'])

  useEffect(() => {
    // Auto-generate on mount if we have emission data
    if (effectiveEmission > 0 || emissionData) {
      generateRecommendations();
    }
  }, [effectiveEmission, emissionData]);

  const generateRecommendations = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulasi API call ke AI service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock AI response based on emission data
      const mockRecommendations = generateMockRecommendations(effectiveEmission, effectiveCategories);
      setAiInsight(mockRecommendations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }
  
  const generateMockRecommendations = (emission: number, cats: string[]): AIInsight => {
    // Impact level based on total emission
    let impactLevel: 'low' | 'medium' | 'high' = 'low';
    if (emission > 300) impactLevel = 'high';
    else if (emission > 150) impactLevel = 'medium';
    
    // Potential savings (20-40% of total emissions)
    const savingsPercent = 20 + Math.floor(Math.random() * 20);
    const potentialSavings = `${savingsPercent}% (${(emission * savingsPercent / 100).toFixed(2)} kg CO₂/bulan)`;
    
    // Generate recommendations based on categories
    const recommendationsByCategory: { [key: string]: string[] } = {
      transportasi: [
        "Gunakan transportasi umum untuk perjalanan harian",
        "Pertimbangkan beralih ke kendaraan listrik atau hybrid",
        "Lakukan carpooling untuk mengurangi penggunaan kendaraan pribadi",
        "Gunakan sepeda untuk perjalanan jarak dekat",
        "Optimalkan rute perjalanan untuk mengurangi jarak tempuh"
      ],
      listrik: [
        "Ganti lampu dengan LED hemat energi",
        "Matikan peralatan elektronik yang tidak digunakan",
        "Atur AC pada suhu optimal (24-26°C)",
        "Pertimbangkan instalasi panel surya untuk energi terbarukan",
        "Gunakan peralatan rumah tangga dengan rating energi tinggi"
      ],
      makanan: [
        "Kurangi konsumsi daging merah menjadi 1-2 kali seminggu",
        "Tingkatkan konsumsi makanan nabati",
        "Beli produk pangan lokal untuk mengurangi emisi transportasi",
        "Hindari food waste dengan perencanaan belanja yang lebih baik",
        "Coba menu vegetarian minimal 1-2 hari per minggu"
      ],
      sampah: [
        "Pisahkan sampah organik dan non-organik",
        "Kurangi penggunaan produk sekali pakai",
        "Kompos sampah organik di rumah",
        "Daur ulang kertas, plastik, dan logam",
        "Gunakan tas belanja reusable"
      ],
      rumah: [
        "Perbaiki kebocoran gas atau air",
        "Gunakan peralatan hemat air",
        "Atur suhu air pemanas pada level optimal",
        "Isolasi rumah dengan baik untuk efisiensi energi",
        "Gunakan cat dan material ramah lingkungan"
      ]
    };
    
    // Select recommendations based on user's categories
    const recommendations: string[] = [];
    const priorityActions: string[] = [];
    
    cats.forEach(cat => {
      if (recommendationsByCategory[cat]) {
        // Add 2-3 recommendations per category
        const catRecs = recommendationsByCategory[cat];
        const numRecs = Math.min(Math.floor(Math.random() * 2) + 2, catRecs.length);
        
        // Shuffle and take random recommendations
        const shuffled = [...catRecs].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, numRecs);
        
        recommendations.push(...selected);
        
        // Add one priority action from this category
        if (shuffled.length > 0) {
          priorityActions.push(shuffled[0]);
        }
      }
    });
    
    // Ensure we have some recommendations even if categories don't match
    if (recommendations.length === 0) {
      recommendations.push(
        "Lakukan audit energi rumah tangga secara reguler",
        "Pertimbangkan investasi pada perangkat hemat energi",
        "Kurangi konsumsi produk dengan kemasan berlebihan"
      );
      
      priorityActions.push("Lakukan audit energi rumah tangga secara reguler");
    }
    
    // Limit to max 6 recommendations and 3 priority actions
    const finalRecommendations = recommendations.slice(0, 6);
    const finalPriorityActions = priorityActions.slice(0, 3);
    
    return {
      recommendations: finalRecommendations,
      impactLevel,
      potentialSavings,
      priorityActions: finalPriorityActions,
      generatedAt: new Date().toISOString(),
      aiVersion: "Karwanua AI 1.0"
    };
  }
  
  const getImpactColor = (level: 'low' | 'medium' | 'high'): string => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getImpactText = (level: 'low' | 'medium' | 'high'): string => {
    switch (level) {
      case 'high': return 'Dampak Tinggi'
      case 'medium': return 'Dampak Sedang'
      case 'low': return 'Dampak Rendah'
      default: return 'Tidak Diketahui'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 rounded-xl">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Rekomendasi AI</h3>
            <p className="text-blue-100">Saran personal untuk mengurangi jejak karbon Anda</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!aiInsight && !loading && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Dapatkan Rekomendasi AI Personal
            </h4>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              AI kami akan menganalisis data jejak karbon Anda dan memberikan rekomendasi yang dipersonalisasi untuk mengurangi emisi.
            </p>
            <button
              onClick={generateRecommendations}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Brain className="w-5 h-5 mr-2" />
              Analisis dengan AI
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              AI Sedang Menganalisis...
            </h4>
            <p className="text-gray-600">
              Memproses data Anda dan menghasilkan rekomendasi personal
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-xl font-semibold text-red-900 mb-2">
              Gagal Menghasilkan Rekomendasi
            </h4>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={generateRecommendations}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {aiInsight && (
          <div className="space-y-6">
            {/* Impact Level */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Level Dampak Perubahan</h4>
                  <p className="text-sm text-gray-600">Potensi pengurangan emisi</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(aiInsight.impactLevel)}`}>
                  {getImpactText(aiInsight.impactLevel)}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Hemat: {aiInsight.potentialSavings}
                </p>
              </div>
            </div>

            {/* Priority Actions */}
            {aiInsight.priorityActions.length > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <TrendingDown className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">Aksi Prioritas</h4>
                    <ul className="space-y-1">
                      {aiInsight.priorityActions.map((action, index) => (
                        <li key={index} className="text-amber-800 text-sm flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <h4 className="text-lg font-semibold text-gray-900">Rekomendasi Personal</h4>
              </div>
              
              <div className="space-y-3">
                {aiInsight.recommendations.map((recommendation, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
                    <p className="text-gray-800 leading-relaxed">
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Attribution */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Rekomendasi dihasilkan oleh {aiInsight.aiVersion} pada{' '}
                {new Date(aiInsight.generatedAt).toLocaleString('id-ID')}
              </p>
            </div>

            {/* Generate New Recommendations */}
            <div className="text-center">
              <button
                onClick={generateRecommendations}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Brain className="w-4 h-4 mr-2" />
                Analisis Ulang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
