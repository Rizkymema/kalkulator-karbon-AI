'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../lib/store'
import { formatEmission } from '../../lib/utils'
import { TreePine, Heart, Target, Upload, MapPin, ExternalLink, Check, Share2, Download, Calendar } from 'lucide-react'
import { EmissionComparisonCard } from '../../components/EmissionComparison'
import { AIRecommendations } from '../../components/AIRecommendations'
import LocationPicker, { LocationData } from '../../components/LocationPicker'
import ImageUploader, { ImageData } from '../../components/ImageUploader'

export default function TebusPage() {
  const [selectedAction, setSelectedAction] = useState<'tanam' | 'donasi' | 'tantangan' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [uploadedImage, setUploadedImage] = useState<ImageData | null>(null)
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([])
  const [plantingDate, setPlantingDate] = useState<string>('')
  const [treeCount, setTreeCount] = useState<number>(1)
  const { tebusSummary, setTebusSummary, addRiwayatAktivitas } = useStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !tebusSummary) {
      router.push('/kalkulator')
    }
  }, [tebusSummary, router, mounted])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#030a08] text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3AA17E] inline-block mb-4"></div>
          <p className="text-slate-400">Memuat halaman...</p>
        </div>
      </div>
    )
  }

  if (!tebusSummary) {
    return (
      <div className="min-h-screen bg-[#030a08] text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Silakan hitung emisi Anda terlebih dahulu</p>
          <button
            onClick={() => router.push('/kalkulator')}
            className="bg-[#3AA17E] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Mulai Kalkulasi
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (!selectedAction) return
    
    // Validasi berdasarkan action yang dipilih
    if (selectedAction === 'tanam') {
      if (!uploadedImage || !selectedLocation) {
        alert('Mohon lengkapi foto bukti dan lokasi penanaman')
        return
      }
    }
    
    if (selectedAction === 'tantangan' && selectedChallenges.length === 0) {
      alert('Mohon pilih minimal 1 tantangan')
      return
    }

    setIsSubmitting(true)
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const updatedSummary = {
      ...tebusSummary,
      aksiTebus: selectedAction,
      // Tambahan data untuk tanam pohon
      ...(selectedAction === 'tanam' && {
        tanamPohon: {
          jumlahPohon: treeCount,
          tanggal: plantingDate,
          lokasi: selectedLocation,
          buktiUpload: uploadedImage?.name
        }
      }),
      // Tambahan data untuk tantangan
      ...(selectedAction === 'tantangan' && {
        tantanganDipilih: selectedChallenges
      })
    }
    
    setTebusSummary(updatedSummary)
    addRiwayatAktivitas(updatedSummary)
    
    setIsSubmitting(false)
    setShowSuccess(true)
    
    setTimeout(() => {
      router.push('/riwayat')
    }, 3000)
  }

  // Check if form is valid for submission
  const isFormValid = () => {
    if (!selectedAction) return false
    if (selectedAction === 'tanam') {
      return uploadedImage && selectedLocation
    }
    if (selectedAction === 'tantangan') {
      return selectedChallenges.length > 0
    }
    return true // donasi selalu valid
  }

  const tantanganOptions = [
    'Tidak menggunakan plastik sekali pakai selama 1 minggu',
    'Menggunakan transportasi umum/bersepeda selama 1 minggu',
    'Mengurangi konsumsi daging 50% selama 1 minggu',
    'Mengajak 5 teman untuk menghitung jejak karbon mereka',
    'Membuat kompos dari sampah organik selama 1 bulan',
  ]

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#030a08] text-slate-200 flex items-center justify-center">
        <div className="bg-slate-900/80 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-950/40 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Terima Kasih! 🌱
          </h2>
          <p className="text-slate-300 mb-4">
            Anda telah berhasil mendukung program Karwanua sebesar {formatEmission(tebusSummary.totalEmisi)}
          </p>
          <p className="text-sm text-slate-500">
            Otomatis dialihkan ke halaman riwayat...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 pt-36 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white mb-4">
            Kurangi Jejak Karbon Anda
          </h1>
          <p className="text-slate-400 font-medium">
            Pilih cara untuk menebus emisi karbon yang telah Anda hasilkan
          </p>
        </div>

        {/* Emission Summary */}
        <div className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Hasil Kalkulasi Emisi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-red-950/20 border border-red-500/10 rounded-xl">
              <h3 className="text-2xl font-black text-red-400 mb-2">
                {formatEmission(tebusSummary.totalEmisi)}
              </h3>
              <p className="text-slate-450 text-sm font-medium">Total Emisi Karbon</p>
            </div>
            <div className="text-center p-4 bg-green-950/20 border border-green-500/10 rounded-xl">
              <h3 className="text-2xl font-black text-green-400 mb-2">
                {tebusSummary.pohonDibutuhkan} Pohon
              </h3>
              <p className="text-slate-455 text-sm font-medium">Dibutuhkan untuk Menebus</p>
            </div>
          </div>
        </div>

        {/* Emission Comparison */}
        <div className="mb-8">
          <EmissionComparisonCard monthlyEmission={tebusSummary.totalEmisi} />
        </div>

        {/* AI Recommendations */}
        <div className="mb-8">
          <AIRecommendations emissionData={tebusSummary.emissionData} />
        </div>

        {/* Action Options */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white text-center mb-4">
            Pilih Aksi Karwanua
          </h2>

          {/* Tanam Pohon */}
          <div
            className={`bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 cursor-pointer transition-all ${
              selectedAction === 'tanam' 
                ? 'ring-2 ring-emerald-500 border-transparent' 
                : 'hover:border-white/10'
            }`}
            onClick={() => setSelectedAction('tanam')}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-950/40 border border-green-500/20 rounded-xl flex items-center justify-center">
                <TreePine className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  Tanam Pohon Sendiri
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Tanam {tebusSummary.pohonDibutuhkan} pohon di sekitar rumah atau berpartisipasi dalam program penanaman pohon
                </p>
                
                {selectedAction === 'tanam' && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                    {/* Jumlah Pohon */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Jumlah Pohon yang Ditanam
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          min="1"
                          max={tebusSummary.pohonDibutuhkan}
                          value={treeCount}
                          onChange={(e) => setTreeCount(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-24 px-3 py-2 border border-white/10 bg-slate-950/60 text-white rounded-xl focus:ring-2 focus:ring-[#3AA17E] focus:border-transparent outline-none"
                        />
                        <span className="text-sm text-slate-500">
                          dari {tebusSummary.pohonDibutuhkan} pohon yang direkomendasikan
                        </span>
                      </div>
                    </div>

                    {/* Tanggal Penanaman */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1 text-emerald-400" />
                        Tanggal Penanaman
                      </label>
                      <input
                        type="date"
                        value={plantingDate}
                        onChange={(e) => setPlantingDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-white/10 bg-slate-950/60 text-white rounded-xl focus:ring-2 focus:ring-[#3AA17E] focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Upload Foto */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Upload Foto Bukti Penanaman
                      </label>
                      <ImageUploader
                        onImageSelect={(image) => setUploadedImage(image)}
                        maxSizeMB={5}
                      />
                    </div>

                    {/* Lokasi Penanaman */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1 text-emerald-400" />
                        Lokasi Penanaman
                      </label>
                      <LocationPicker
                        onLocationSelect={(location) => setSelectedLocation(location)}
                        initialLocation={selectedLocation || undefined}
                      />
                    </div>

                    {/* Validation Message */}
                    {selectedAction === 'tanam' && (!uploadedImage || !selectedLocation) && (
                      <div className="p-3 bg-yellow-950/20 border border-yellow-500/10 text-yellow-300 rounded-xl">
                        <p className="text-sm">
                          ⚠️ Untuk konfirmasi, mohon lengkapi:
                          {!uploadedImage && <span className="block ml-2">• Upload foto bukti penanaman</span>}
                          {!selectedLocation && <span className="block ml-2">• Pilih lokasi penanaman</span>}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Donasi */}
          <div
            className={`bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 cursor-pointer transition-all ${
              selectedAction === 'donasi' 
                ? 'ring-2 ring-emerald-500 border-transparent' 
                : 'hover:border-white/10'
            }`}
            onClick={() => setSelectedAction('donasi')}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-950/40 border border-blue-500/20 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-405" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  Donasi untuk Penanaman
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Berdonasi kepada organisasi lingkungan untuk menanam {tebusSummary.pohonDibutuhkan} pohon atas nama Anda
                </p>
                
                {selectedAction === 'donasi' && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a
                        href="https://lindungihutan.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 border border-white/5 bg-slate-950/40 rounded-xl hover:bg-slate-900/40 transition-colors"
                      >
                        <div className="w-8 h-8 bg-green-950/40 border border-green-500/20 rounded-lg flex items-center justify-center">
                          <TreePine className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white text-sm">LindungiHutan</p>
                          <p className="text-xs text-slate-400">Platform donasi lingkungan</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-500" />
                      </a>
                      
                      <a
                        href="https://kitabisa.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 border border-white/5 bg-slate-950/40 rounded-xl hover:bg-slate-900/40 transition-colors"
                      >
                        <div className="w-8 h-8 bg-orange-955/30 border border-orange-500/20 rounded-lg flex items-center justify-center">
                          <Heart className="w-4 h-4 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white text-sm">Kitabisa</p>
                          <p className="text-xs text-slate-400">Platform donasi sosial</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-500" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tantangan */}
          <div
            className={`bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 cursor-pointer transition-all ${
              selectedAction === 'tantangan' 
                ? 'ring-2 ring-emerald-500 border-transparent' 
                : 'hover:border-white/10'
            }`}
            onClick={() => setSelectedAction('tantangan')}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-950/40 border border-purple-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  Ikuti Tantangan Hijau
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Komitmen untuk mengurangi emisi karbon di masa depan melalui perubahan gaya hidup
                </p>
                
                {selectedAction === 'tantangan' && (
                  <div className="space-y-3 mt-4 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm font-semibold text-slate-300 mb-2">
                      Pilih tantangan yang ingin Anda ikuti (minimal 1):
                    </p>
                    {tantanganOptions.map((tantangan, index) => (
                      <label key={index} className="flex items-start space-x-3 cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedChallenges.includes(tantangan)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedChallenges([...selectedChallenges, tantangan])
                            } else {
                              setSelectedChallenges(selectedChallenges.filter(c => c !== tantangan))
                            }
                          }}
                          className="mt-1 rounded border-white/10 bg-slate-950/60 text-[#3AA17E] focus:ring-[#3AA17E] cursor-pointer"
                        />
                        <span className="text-slate-300 text-sm">{tantangan}</span>
                      </label>
                    ))}
                    
                    {selectedChallenges.length > 0 && (
                      <div className="p-3 bg-green-950/20 border border-green-500/10 text-green-300 rounded-xl">
                        <p className="text-sm">
                          ✅ Anda memilih {selectedChallenges.length} tantangan. Terima kasih atas komitmen Anda!
                        </p>
                      </div>
                    )}
                    
                    {selectedAction === 'tantangan' && selectedChallenges.length === 0 && (
                      <div className="p-3 bg-yellow-950/20 border border-yellow-500/10 text-yellow-300 rounded-xl">
                        <p className="text-sm">
                          ⚠️ Pilih minimal 1 tantangan untuk melanjutkan
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {selectedAction && (
          <div className="mt-8 text-center space-y-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid()}
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                  Memproses...
                </>
              ) : (
                'Konfirmasi Karwanua'
              )}
            </button>
            
            {/* Share Button */}
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Karwanua - Tebus Karbon',
                      text: `Saya baru saja menebus ${formatEmission(tebusSummary.totalEmisi)} emisi karbon melalui Karwanua! 🌱`,
                      url: window.location.href
                    })
                  } else {
                    // Fallback untuk browser yang tidak support Web Share API
                    const shareText = `Saya baru saja menebus ${formatEmission(tebusSummary.totalEmisi)} emisi karbon melalui Karwanua! 🌱 ${window.location.href}`
                    navigator.clipboard.writeText(shareText)
                    alert('Link berhasil disalin!')
                  }
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-white/10 bg-white/5 rounded-xl text-slate-300 hover:bg-white/10 cursor-pointer transition-colors"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
