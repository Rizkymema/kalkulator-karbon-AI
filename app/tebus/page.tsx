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

  useEffect(() => {
    if (!tebusSummary) {
      router.push('/kalkulator')
    }
  }, [tebusSummary, router])

  if (!tebusSummary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Silakan hitung emisi Anda terlebih dahulu</p>
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
    'Mengurangi konsumsi daging 50% selama 1 bulan',
    'Mengajak 5 teman untuk menghitung jejak karbon mereka',
    'Membuat kompos dari sampah organik selama 1 bulan',
  ]

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Terima Kasih! 🌱
          </h2>
          <p className="text-gray-600 mb-4">
            Anda telah berhasil mendukung program Karwanua sebesar {formatEmission(tebusSummary.totalEmisi)}
          </p>
          <p className="text-sm text-gray-500">
            Otomatis dialihkan ke halaman riwayat...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Kurangi Jejak Karbon Anda
          </h1>
          <p className="text-gray-600">
            Pilih cara untuk menebus emisi karbon yang telah Anda hasilkan
          </p>
        </div>

        {/* Emission Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Hasil Kalkulasi Emisi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="text-2xl font-bold text-red-600 mb-2">
                {formatEmission(tebusSummary.totalEmisi)}
              </h3>
              <p className="text-gray-600">Total Emisi Karbon</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                {tebusSummary.pohonDibutuhkan} Pohon
              </h3>
              <p className="text-gray-600">Dibutuhkan untuk Menebus</p>
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
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Pilih Aksi Karwanua
          </h2>

          {/* Tanam Pohon */}
          <div
            className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all ${
              selectedAction === 'tanam' 
                ? 'ring-2 ring-[#3AA17E] border-[#3AA17E]' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedAction('tanam')}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TreePine className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tanam Pohon Sendiri
                </h3>
                <p className="text-gray-600 mb-4">
                  Tanam {tebusSummary.pohonDibutuhkan} pohon di sekitar rumah atau berpartisipasi dalam program penanaman pohon
                </p>
                
                {selectedAction === 'tanam' && (
                  <div className="space-y-4 mt-4 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
                    {/* Jumlah Pohon */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jumlah Pohon yang Ditanam
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          min="1"
                          max={tebusSummary.pohonDibutuhkan}
                          value={treeCount}
                          onChange={(e) => setTreeCount(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3AA17E] focus:border-transparent"
                        />
                        <span className="text-sm text-gray-500">
                          dari {tebusSummary.pohonDibutuhkan} pohon yang direkomendasikan
                        </span>
                      </div>
                    </div>

                    {/* Tanggal Penanaman */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Tanggal Penanaman
                      </label>
                      <input
                        type="date"
                        value={plantingDate}
                        onChange={(e) => setPlantingDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3AA17E] focus:border-transparent"
                      />
                    </div>

                    {/* Upload Foto */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Foto Bukti Penanaman
                      </label>
                      <ImageUploader
                        onImageSelect={(image) => setUploadedImage(image)}
                        maxSizeMB={5}
                      />
                    </div>

                    {/* Lokasi Penanaman */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Lokasi Penanaman
                      </label>
                      <LocationPicker
                        onLocationSelect={(location) => setSelectedLocation(location)}
                        initialLocation={selectedLocation || undefined}
                      />
                    </div>

                    {/* Validation Message */}
                    {selectedAction === 'tanam' && (!uploadedImage || !selectedLocation) && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-700">
                          ⚠️ Untuk konfirmasi, mohon lengkapi:
                          {!uploadedImage && <span className="block">• Upload foto bukti penanaman</span>}
                          {!selectedLocation && <span className="block">• Pilih lokasi penanaman</span>}
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
            className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all ${
              selectedAction === 'donasi' 
                ? 'ring-2 ring-[#3AA17E] border-[#3AA17E]' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedAction('donasi')}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Donasi untuk Penanaman
                </h3>
                <p className="text-gray-600 mb-4">
                  Berdonasi kepada organisasi lingkungan untuk menanam {tebusSummary.pohonDibutuhkan} pohon atas nama Anda
                </p>
                
                {selectedAction === 'donasi' && (
                  <div className="space-y-4 mt-4 pt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a
                        href="https://lindungihutan.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <TreePine className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">LindungiHutan</p>
                          <p className="text-sm text-gray-500">Platform donasi lingkungan</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                      
                      <a
                        href="https://kitabisa.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Kitabisa</p>
                          <p className="text-sm text-gray-500">Platform donasi sosial</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tantangan */}
          <div
            className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all ${
              selectedAction === 'tantangan' 
                ? 'ring-2 ring-[#3AA17E] border-[#3AA17E]' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedAction('tantangan')}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ikuti Tantangan Hijau
                </h3>
                <p className="text-gray-600 mb-4">
                  Komitmen untuk mengurangi emisi karbon di masa depan melalui perubahan gaya hidup
                </p>
                
                {selectedAction === 'tantangan' && (
                  <div className="space-y-3 mt-4 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm font-medium text-gray-700">
                      Pilih tantangan yang ingin Anda ikuti (minimal 1):
                    </p>
                    {tantanganOptions.map((tantangan, index) => (
                      <label key={index} className="flex items-start space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
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
                          className="mt-1 rounded border-gray-300 text-[#3AA17E] focus:ring-[#3AA17E]"
                        />
                        <span className="text-gray-700 text-sm">{tantangan}</span>
                      </label>
                    ))}
                    
                    {selectedChallenges.length > 0 && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">
                          ✅ Anda memilih {selectedChallenges.length} tantangan. Terima kasih atas komitmen Anda!
                        </p>
                      </div>
                    )}
                    
                    {selectedAction === 'tantangan' && selectedChallenges.length === 0 && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-700">
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
              className="bg-[#3AA17E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
