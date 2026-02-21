'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface ImageUploaderProps {
  onChange?: (imageData: ImageData) => void
  onImageSelect?: (imageData: ImageData) => void // Legacy support
  maxSizeMB?: number
  acceptedTypes?: string[]
  className?: string
}

export interface ImageData {
  file: File
  preview: string
  name: string
  size: number
  type: string
}

export default function ImageUploader({
  onChange,
  onImageSelect,
  maxSizeMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = ''
}: ImageUploaderProps) {
  // Support both onChange and onImageSelect for flexibility
  const handleImageChange = (imageData: ImageData) => {
    onChange?.(imageData)
    onImageSelect?.(imageData)
  }
  const [isDragging, setIsDragging] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `Format tidak didukung. Gunakan: ${acceptedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}`
    }
    
    if (file.size > maxSizeBytes) {
      return `Ukuran file terlalu besar. Maksimal ${maxSizeMB}MB`
    }
    
    return null
  }

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true)
    setError(null)
    
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setIsProcessing(false)
      return
    }

    try {
      // Create preview URL
      const preview = URL.createObjectURL(file)
      
      const imageData: ImageData = {
        file,
        preview,
        name: file.name,
        size: file.size,
        type: file.type
      }
      
      setSelectedImage(imageData)
      handleImageChange(imageData)
    } catch (err) {
      setError('Gagal memproses gambar. Silakan coba lagi.')
      console.error('Image processing error:', err)
    } finally {
      setIsProcessing(false)
    }
  }, [maxSizeBytes, acceptedTypes, handleImageChange])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleRemoveImage = () => {
    if (selectedImage?.preview) {
      URL.revokeObjectURL(selectedImage.preview)
    }
    setSelectedImage(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        id="image-upload"
      />
      
      {!selectedImage ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
            ${isDragging 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50/50'
            }
            ${error ? 'border-red-300 bg-red-50/50' : ''}
          `}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
              <p className="text-sm text-gray-600">Memproses gambar...</p>
            </div>
          ) : (
            <>
              <div className={`
                w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center
                ${isDragging ? 'bg-green-100' : 'bg-gray-100'}
              `}>
                <Upload className={`w-7 h-7 ${isDragging ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
              
              <p className="text-sm font-medium text-gray-700 mb-1">
                {isDragging ? 'Lepaskan gambar di sini' : 'Klik atau seret gambar ke sini'}
              </p>
              <p className="text-xs text-gray-500">
                {acceptedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')} • Maks {maxSizeMB}MB
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-gray-200">
          {/* Image Preview */}
          <div className="relative aspect-video bg-gray-100">
            <img
              src={selectedImage.preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            
            {/* Success Badge */}
            <div className="absolute top-2 left-2 flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              <span>Berhasil diunggah</span>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Hapus gambar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* File Info */}
          <div className="p-3 bg-gray-50 flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ImageIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedImage.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(selectedImage.size)} • {selectedImage.type.split('/')[1].toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="mt-2 flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {/* Tips */}
      <div className="mt-3 space-y-1">
        <p className="text-xs text-gray-500">💡 Tips untuk foto bukti penanaman:</p>
        <ul className="text-xs text-gray-400 space-y-0.5 pl-4">
          <li>• Foto pohon yang ditanam dengan jelas</li>
          <li>• Pastikan pencahayaan cukup</li>
          <li>• Sertakan lingkungan sekitar sebagai referensi</li>
        </ul>
      </div>
    </div>
  )
}
