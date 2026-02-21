'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Search, Loader2, X, Check } from 'lucide-react'

interface LocationPickerProps {
  onChange?: (location: LocationData) => void
  onLocationSelect?: (location: LocationData) => void // Legacy support
  initialLocation?: LocationData
}

export interface LocationData {
  address: string
  latitude: number
  longitude: number
  placeName?: string
}

// Komponen Map sederhana menggunakan OpenStreetMap (tanpa library external)
export default function LocationPicker({ onChange, onLocationSelect, initialLocation }: LocationPickerProps) {
  // Support both onChange and onLocationSelect for flexibility
  const handleLocationChange = (location: LocationData) => {
    onChange?.(location)
    onLocationSelect?.(location)
  }
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<LocationData[]>([])
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(initialLocation || null)
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Predefined locations in Indonesia for quick selection
  const popularLocations: LocationData[] = [
    { address: 'Jakarta, Indonesia', latitude: -6.2088, longitude: 106.8456, placeName: 'DKI Jakarta' },
    { address: 'Manado, Sulawesi Utara', latitude: 1.4748, longitude: 124.8421, placeName: 'Manado' },
    { address: 'Bandung, Jawa Barat', latitude: -6.9175, longitude: 107.6191, placeName: 'Bandung' },
    { address: 'Surabaya, Jawa Timur', latitude: -7.2575, longitude: 112.7521, placeName: 'Surabaya' },
    { address: 'Yogyakarta, DIY', latitude: -7.7956, longitude: 110.3695, placeName: 'Yogyakarta' },
    { address: 'Bali, Indonesia', latitude: -8.3405, longitude: 115.0920, placeName: 'Bali' },
    { address: 'Medan, Sumatera Utara', latitude: 3.5952, longitude: 98.6722, placeName: 'Medan' },
    { address: 'Makassar, Sulawesi Selatan', latitude: -5.1477, longitude: 119.4327, placeName: 'Makassar' },
  ]

  // Search location using Nominatim (OpenStreetMap) API
  const searchLocation = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setError(null)
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=id&limit=5`,
        {
          headers: {
            'Accept-Language': 'id'
          }
        }
      )
      
      if (!response.ok) throw new Error('Failed to search location')
      
      const data = await response.json()
      
      const results: LocationData[] = data.map((item: any) => ({
        address: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        placeName: item.name || item.display_name.split(',')[0]
      }))
      
      setSearchResults(results)
      
      if (results.length === 0) {
        setError('Lokasi tidak ditemukan. Coba kata kunci lain.')
      }
    } catch (err) {
      setError('Gagal mencari lokasi. Silakan coba lagi.')
      console.error('Search error:', err)
    } finally {
      setIsSearching(false)
    }
  }

  // Get current location using browser geolocation
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation tidak didukung oleh browser Anda')
      return
    }
    
    setIsGettingCurrentLocation(true)
    setError(null)
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        })
      })
      
      const { latitude, longitude } = position.coords
      
      // Reverse geocoding to get address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'Accept-Language': 'id'
          }
        }
      )
      
      if (!response.ok) throw new Error('Failed to get address')
      
      const data = await response.json()
      
      const location: LocationData = {
        address: data.display_name || `${latitude}, ${longitude}`,
        latitude,
        longitude,
        placeName: data.name || data.address?.suburb || data.address?.city || 'Lokasi Saya'
      }
      
      handleSelectLocation(location)
    } catch (err: any) {
      if (err.code === 1) {
        setError('Akses lokasi ditolak. Silakan izinkan akses lokasi.')
      } else if (err.code === 2) {
        setError('Lokasi tidak tersedia. Silakan coba lagi.')
      } else if (err.code === 3) {
        setError('Waktu habis. Silakan coba lagi.')
      } else {
        setError('Gagal mendapatkan lokasi saat ini.')
      }
      console.error('Geolocation error:', err)
    } finally {
      setIsGettingCurrentLocation(false)
    }
  }

  const handleSelectLocation = (location: LocationData) => {
    setSelectedLocation(location)
    handleLocationChange(location)
    setIsOpen(false)
    setSearchResults([])
    setSearchQuery('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchLocation()
    }
  }

  return (
    <div className="relative">
      {/* Selected Location Display / Trigger Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
      >
        <MapPin className={`w-5 h-5 ${selectedLocation ? 'text-green-600' : 'text-gray-400'}`} />
        <div className="flex-1 min-w-0">
          {selectedLocation ? (
            <div>
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedLocation.placeName || 'Lokasi Terpilih'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {selectedLocation.address}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Pilih lokasi penanaman pohon...</p>
          )}
        </div>
        {selectedLocation && (
          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
        )}
      </div>

      {/* Location Picker Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Pilih Lokasi Penanaman
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Cari lokasi (contoh: Jakarta, Taman, dll)"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
                  )}
                </div>
                <button
                  onClick={searchLocation}
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Current Location Button */}
              <button
                onClick={getCurrentLocation}
                disabled={isGettingCurrentLocation}
                className="mt-3 w-full flex items-center justify-center space-x-2 px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 disabled:opacity-50"
              >
                {isGettingCurrentLocation ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
                <span>{isGettingCurrentLocation ? 'Mendapatkan lokasi...' : 'Gunakan Lokasi Saat Ini'}</span>
              </button>

              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Search Results or Popular Locations */}
            <div className="overflow-y-auto max-h-80">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  <p className="px-2 py-1 text-xs font-medium text-gray-500 uppercase">
                    Hasil Pencarian
                  </p>
                  {searchResults.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectLocation(location)}
                      className="w-full flex items-start space-x-3 p-3 rounded-lg hover:bg-green-50 text-left transition-colors"
                    >
                      <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">
                          {location.placeName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {location.address}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-2">
                  <p className="px-2 py-1 text-xs font-medium text-gray-500 uppercase">
                    Lokasi Populer
                  </p>
                  {popularLocations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectLocation(location)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 text-left transition-colors"
                    >
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {location.placeName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {location.address}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Map Preview (Static) */}
            {selectedLocation && (
              <div className="p-4 border-t bg-gray-50">
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={`https://staticmap.openstreetmap.de/staticmap.php?center=${selectedLocation.latitude},${selectedLocation.longitude}&zoom=14&size=400x160&maptype=mapnik&markers=${selectedLocation.latitude},${selectedLocation.longitude},red-pushpin`}
                    alt="Map Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
                    📍 {selectedLocation.placeName}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
