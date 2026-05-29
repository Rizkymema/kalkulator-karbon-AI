'use client'

import { useState } from 'react'
import Image from 'next/image'
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
    <div className="min-h-screen bg-[#030a08] text-slate-200 pt-36 pb-12 relative overflow-hidden">
      {/* Background Nature Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[620px] overflow-hidden">
          <Image
            src="/images/begraund pohon.png"
            alt="Latar pepohonan untuk halaman kalkulator emisi"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35 md:opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,8,0.18)_0%,rgba(3,10,8,0.42)_24%,rgba(3,10,8,0.72)_58%,rgba(3,10,8,0.97)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,222,128,0.2),transparent_34%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_24%)]" />
        </div>
        <div className="absolute top-32 left-20 w-40 h-40 bg-emerald-400/5 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-40 right-24 w-32 h-32 bg-green-400/5 rounded-full animate-wave blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-1.5 text-slate-350 hover:text-emerald-400 hover:bg-slate-900/60 mb-6 transition-all duration-200 bg-slate-900/40 border border-white/5 px-4 py-2 rounded-xl shadow-sm transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </button>

        <div className="relative">
            <div className="mb-10">
              <EmissionCalculator onCalculateAction={handleCalculation} />
            </div>

            {calculationCompleted && result && (
              <div id="result-section" className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-xl">
                    📊
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Hasil Perhitungan Jejak Karbon
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                    <h3 className="text-xs font-bold text-emerald-400 mb-1">Total Emisi Karbon</h3>
                    <p className="text-2xl font-extrabold text-white">
                      {result.totalEmission.toFixed(2)} <span className="text-xs font-medium text-emerald-400">kg CO₂/bln</span>
                    </p>
                    <p className="text-[10px] text-emerald-500 font-semibold mt-1">
                      {(result.totalEmission * 12).toFixed(2)} kg CO₂/tahun
                    </p>
                  </div>
                  
                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                    <h3 className="text-xs font-bold text-indigo-400 mb-1">Pohon Dibutuhkan</h3>
                    <p className="text-2xl font-extrabold text-white">
                      {result.pohonDibutuhkan} <span className="text-xs font-medium text-indigo-400">pohon</span>
                    </p>
                    <p className="text-[10px] text-indigo-500 font-semibold mt-1">
                      Untuk menyerap emisi karbon Anda
                    </p>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <h3 className="text-xs font-bold text-blue-400 mb-1">Dibandingkan Rata-rata</h3>
                    <p className="text-2xl font-extrabold text-white">
                      {result.totalEmission > 250 ? 'Di atas' : 'Di bawah'}
                    </p>
                    <p className="text-[10px] text-blue-500 font-semibold mt-1">
                      Rata-rata emisi RI (~250 kg CO₂/bulan)
                    </p>
                  </div>
                </div>
                
                <h3 className="text-base font-bold text-white mb-3.5">Rincian Emisi per Kategori</h3>
                <div className="space-y-3.5 mb-8">
                  {result.categoryResults
                    .filter(cat => cat.totalEmission > 0)
                    .sort((a, b) => b.totalEmission - a.totalEmission)
                    .map((category, index) => {
                      const percentage = (category.totalEmission / result.totalEmission * 100).toFixed(1);
                      
                      const categoryColorMap: Record<string, { border: string, bg: string, bgBar: string, textTitle: string, textSub: string, bgBadge: string, textBadge: string }> = {
                        transportasi: {
                          border: 'border-blue-500/20',
                          bg: 'bg-blue-500/5',
                          bgBar: 'bg-blue-500',
                          textTitle: 'text-blue-200',
                          textSub: 'text-blue-400',
                          bgBadge: 'bg-blue-500/20',
                          textBadge: 'text-blue-300',
                        },
                        listrik: {
                          border: 'border-amber-500/20',
                          bg: 'bg-amber-500/5',
                          bgBar: 'bg-amber-500',
                          textTitle: 'text-amber-200',
                          textSub: 'text-amber-400',
                          bgBadge: 'bg-amber-500/20',
                          textBadge: 'text-amber-300',
                        },
                        makanan: {
                          border: 'border-red-500/20',
                          bg: 'bg-red-500/5',
                          bgBar: 'bg-red-500',
                          textTitle: 'text-red-200',
                          textSub: 'text-red-400',
                          bgBadge: 'bg-red-500/20',
                          textBadge: 'text-red-300',
                        },
                        sampah: {
                          border: 'border-emerald-500/20',
                          bg: 'bg-emerald-500/5',
                          bgBar: 'bg-emerald-500',
                          textTitle: 'text-emerald-200',
                          textSub: 'text-emerald-400',
                          bgBadge: 'bg-emerald-500/20',
                          textBadge: 'text-emerald-300',
                        },
                        rumah: {
                          border: 'border-indigo-500/20',
                          bg: 'bg-indigo-500/5',
                          bgBar: 'bg-indigo-500',
                          textTitle: 'text-indigo-200',
                          textSub: 'text-indigo-400',
                          bgBadge: 'bg-indigo-500/20',
                          textBadge: 'text-indigo-300',
                        },
                      };

                      const map = categoryColorMap[category.category] || categoryColorMap.sampah;
                      
                      return (
                        <div key={index} className={`border ${map.border} rounded-xl p-5 ${map.bg}`}>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-sm text-white capitalize">
                              {category.category === 'rumah' ? 'Peralatan Rumah' : category.category === 'listrik' ? 'Daya Rumah Tangga' : category.category}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-350">
                                {category.totalEmission.toFixed(2)} kg CO₂
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${map.bgBadge} ${map.textBadge}`}>
                                {percentage}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3.5">
                            <div 
                              className={`${map.bgBar} h-1.5 rounded-full`} 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {Object.entries(category.detailedEmissions)
                              .filter(([, value]) => (value as number) > 0)
                              .map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-slate-400 font-medium capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <span className="text-slate-200 font-bold">{(value as number).toFixed(2)} kg CO₂</span>
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

                <div className="flex gap-3 justify-center">
                  {session ? (
                    <button
                      onClick={handleSaveResults}
                      disabled={isSaving}
                      className="group flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Simpan Hasil Perhitungan
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push('/login?redirect=/kalkulator')}
                      className="group flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      <LogIn className="w-4 h-4" />
                      Login untuk Menyimpan Hasil
                    </button>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}