'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useStore } from '../../lib/store'
import EmissionCalculator from '../../components/EmissionCalculator'
import { AIRecommendations } from '../../components/AIRecommendations'
import { ArrowLeft, Save, LogIn } from 'lucide-react'

export default function KalkulatorPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [calculationCompleted, setCalculationCompleted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [result, setResult] = useState<{
    totalEmission: number;
    categoryResults: {
      category: string;
      totalEmission: number;
      detailedEmissions: Record<string, number>;
    }[];
    pohonDibutuhkan: number;
  } | null>(null)
  const { addRiwayatAktivitas } = useStore()

  const handleCalculation = (results: {
    totalEmission: number;
    categoryResults: {
      category: string;
      totalEmission: number;
      detailedEmissions: Record<string, number>;
    }[];
    pohonDibutuhkan: number;
  }) => {
    setResult(results)
    setCalculationCompleted(true)
    
    // Scroll to result
    setTimeout(() => {
      const resultElement = document.getElementById('result-section')
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleSaveResults = async () => {
    if (!result) return

    // Jika user belum login, arahkan ke login
    if (!session) {
      router.push('/login?redirect=/kalkulator')
      return
    }

    setIsSaving(true)
    
    try {
      // Create emission data object
      const emissionData = {
        categoryResults: result.categoryResults,
      }
      
      // Simpan ke database via API
      const response = await fetch('/api/user/emissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalEmisi: result.totalEmission,
          pohonDibutuhkan: result.pohonDibutuhkan,
          aksiTebus: null,
          emissionData: emissionData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Gagal menyimpan data')
      }

      // Juga simpan ke local store untuk akses cepat
      const tebusSummary = {
        totalEmisi: result.totalEmission,
        pohonDibutuhkan: result.pohonDibutuhkan,
        aksiTebus: null,
        tanggal: new Date().toISOString(),
        emissionData: {
          transportasi: { jenisKendaraan: '', jarakTempuh: 0, frekuensi: 0 },
          listrik: { jenisListrik: 'prabayar' as const, kwh: 0 },
          makanan: { dagingMerah: 0, dagingPutih: 0, produkSusu: 0, polaMakan: 'omnivora' as const },
          sampah: { memilahSampah: false, kantongPlastik: 0, produkDaurUlang: false },
          belanja: { pakaian: 0, gadget: 0, belonjaOnline: 0 },
          penerbangan: { domestik: 0, internasional: 0 }
        }
      }
      addRiwayatAktivitas(tebusSummary)
      
      // Show success message
      alert('✅ Hasil perhitungan berhasil disimpan ke database!')
      
      // Redirect to riwayat
      router.push('/riwayat')
    } catch (error) {
      console.error('Failed to save emission data:', error)
      alert('Gagal menyimpan data. ' + (error instanceof Error ? error.message : 'Silakan coba lagi.'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-blue-50/80 relative overflow-hidden">
      {/* Background Nature Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-40 h-40 bg-emerald-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-40 right-24 w-32 h-32 bg-green-400/15 rounded-full animate-wave blur-lg"></div>
        <div className="absolute top-1/2 left-8 w-20 h-20 bg-blue-400/10 rounded-full animate-pulse blur-md"></div>
        <div className="absolute top-20 right-32 w-24 h-24 bg-emerald-300/10 rounded-full animate-bounce blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-white hover:text-gray-200 mb-6 transition-all duration-300 bg-emerald-600/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500 hover:bg-emerald-700/80 hover:shadow-lg hover:-translate-y-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </button>

        <div className="mb-10">
          <EmissionCalculator onCalculateAction={handleCalculation} />
        </div>

      {calculationCompleted && result && (
        <div id="result-section" className="bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-3xl shadow-2xl shadow-emerald-500/10 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
              Hasil Perhitungan Jejak Karbon
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-800 mb-1">Total Emisi Karbon</h3>
              <p className="text-3xl font-bold text-green-900">
                {result.totalEmission.toFixed(2)} <span className="text-lg font-normal">kg CO₂/bulan</span>
              </p>
              <p className="text-sm text-green-700 mt-1">
                {(result.totalEmission * 12).toFixed(2)} kg CO₂/tahun
              </p>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-indigo-800 mb-1">Pohon Dibutuhkan</h3>
              <p className="text-3xl font-bold text-indigo-900">
                {result.pohonDibutuhkan} <span className="text-lg font-normal">pohon</span>
              </p>
              <p className="text-sm text-indigo-700 mt-1">
                Untuk menyerap emisi karbon Anda per bulan
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Dibandingkan Rata-rata</h3>
              <p className="text-3xl font-bold text-blue-900">
                {result.totalEmission > 250 ? 'Di atas' : 'Di bawah'}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Rata-rata emisi warga Indonesia (~250 kg CO₂/bulan)
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Rincian Emisi per Kategori</h3>
          <div className="space-y-4 mb-8">
            {result.categoryResults
              .filter(cat => cat.totalEmission > 0)
              .sort((a, b) => b.totalEmission - a.totalEmission)
              .map((category, index) => {
                const percentage = (category.totalEmission / result.totalEmission * 100).toFixed(1);
                
                // Pilih warna berdasarkan kategori
                const getColor = (catId: string) => {
                  const colors = {
                    transportasi: 'blue',
                    listrik: 'yellow',
                    makanan: 'red',
                    sampah: 'green',
                    rumah: 'indigo'
                  };
                  return colors[catId as keyof typeof colors] || 'gray';
                };
                
                const color = getColor(category.category);
                
                return (
                  <div key={index} className={`border border-${color}-200 rounded-lg p-4 bg-${color}-50`}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-medium text-${color}-900 capitalize`}>
                        {category.category}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-${color}-700 font-semibold`}>
                          {category.totalEmission.toFixed(2)} kg CO₂
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-800`}>
                          {percentage}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className={`bg-${color}-500 h-2 rounded-full`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {Object.entries(category.detailedEmissions)
                        .filter(([, value]) => (value as number) > 0)
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className={`text-${color}-700 capitalize`}>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="text-gray-700 font-medium">{(value as number).toFixed(2)} kg CO₂</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                );
              })}
          </div>
          
          <div className="mb-8">
            <AIRecommendations 
              totalEmission={result.totalEmission} 
              categories={result.categoryResults.map(cat => cat.category)}
            />
          </div>

          <div className="flex gap-4 justify-center">
            {session ? (
              <button
                onClick={handleSaveResults}
                disabled={isSaving}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-2xl hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    🌿 Simpan Hasil Perhitungan
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => router.push('/login?redirect=/kalkulator')}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
              >
                <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Login untuk Menyimpan Hasil
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}