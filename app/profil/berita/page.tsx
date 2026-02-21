'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  TrendingUp, 
  Leaf, 
  Globe,
  ArrowRight,
  Newspaper,
  Eye
} from "lucide-react"
import Link from "next/link"

// Sample data - dalam implementasi nyata ini akan dari database atau API
const beritaTerbaru = [
  {
    id: 1,
    judul: "Indonesia Komitmen Net Zero Emission 2060",
    kategori: "Politik Lingkungan",
    tanggal: "2024-12-20",
    waktu: "2 hari yang lalu",
    cuplikan: "Pemerintah Indonesia menegaskan komitmen untuk mencapai target net zero emission pada tahun 2060 melalui berbagai program strategis...",
    gambar: "/images/news1.jpg",
    views: 1250,
    tag: "trending"
  },
  {
    id: 2,
    judul: "5 Tips Mudah Kurangi Emisi Karbon di Rumah",
    kategori: "Tips & Panduan",
    tanggal: "2024-12-19",
    waktu: "3 hari yang lalu",
    cuplikan: "Mulai dari menggunakan lampu LED hingga mengurangi penggunaan plastik, simak tips praktis yang bisa diterapkan sehari-hari...",
    gambar: "/images/tips1.jpg",
    views: 2100,
    tag: "popular"
  },
  {
    id: 3,
    judul: "Teknologi Carbon Capture Terbaru 2024",
    kategori: "Teknologi",
    tanggal: "2024-12-18",
    waktu: "4 hari yang lalu",
    cuplikan: "Inovasi terbaru dalam teknologi carbon capture and storage (CCS) menunjukkan perkembangan yang menjanjikan untuk masa depan...",
    gambar: "/images/tech1.jpg",
    views: 890,
    tag: "new"
  },
  {
    id: 4,
    judul: "Program Reboisasi Nasional Capai 1 Juta Pohon",
    kategori: "Berita Utama",
    tanggal: "2024-12-17",
    waktu: "5 hari yang lalu",
    cuplikan: "Program reboisasi nasional berhasil mencapai target penanaman 1 juta pohon dengan melibatkan masyarakat dari berbagai daerah...",
    gambar: "/images/forest1.jpg",
    views: 1680,
    tag: "featured"
  },
  {
    id: 5,
    judul: "Kendaraan Listrik: Masa Depan Transportasi Hijau",
    kategori: "Teknologi",
    tanggal: "2024-12-16",
    waktu: "6 hari yang lalu",
    cuplikan: "Adopsi kendaraan listrik semakin meningkat di Indonesia dengan dukungan infrastruktur charging station yang berkembang...",
    gambar: "/images/ev1.jpg",
    views: 1420,
    tag: "trending"
  }
]

const kategoriColors = {
  "Politik Lingkungan": "bg-blue-100 text-blue-800",
  "Tips & Panduan": "bg-green-100 text-green-800", 
  "Teknologi": "bg-purple-100 text-purple-800",
  "Berita Utama": "bg-red-100 text-red-800"
}

const tagColors = {
  "trending": "bg-orange-100 text-orange-800",
  "popular": "bg-pink-100 text-pink-800",
  "new": "bg-emerald-100 text-emerald-800",
  "featured": "bg-yellow-100 text-yellow-800"
}

export default function BeritaTerbaruPage() {
  const [selectedKategori, setSelectedKategori] = useState<string>("all")

  const kategoriList = ["all", ...Array.from(new Set(beritaTerbaru.map(item => item.kategori)))]
  
  const filteredBerita = selectedKategori === "all" 
    ? beritaTerbaru 
    : beritaTerbaru.filter(item => item.kategori === selectedKategori)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Newspaper className="h-8 w-8 text-blue-600" />
                Berita Terbaru
              </h1>
              <p className="text-gray-600">
                Update terkini seputar lingkungan dan emisi karbon
              </p>
            </div>
            <Link href="/berita">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Lihat Semua Berita
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Kategori */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                {kategoriList.map((kategori) => (
                  <button
                    key={kategori}
                    onClick={() => setSelectedKategori(kategori)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedKategori === kategori
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {kategori === "all" ? "Semua Kategori" : kategori}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Berita Feed */}
        <div className="space-y-6">
          {filteredBerita.map((berita, index) => (
            <Card key={berita.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                  {/* Gambar */}
                  <div className="md:col-span-1 h-48 md:h-full bg-gradient-to-br from-green-400 to-blue-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Globe className="h-12 w-12 mx-auto mb-2 opacity-80" />
                        <p className="text-sm font-medium">Berita #{berita.id}</p>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${tagColors[berita.tag as keyof typeof tagColors]} border-0`}>
                        {berita.tag}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="secondary" className={kategoriColors[berita.kategori as keyof typeof kategoriColors]}>
                            {berita.kategori}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500 gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(berita.tanggal).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {berita.waktu}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {berita.views.toLocaleString()} views
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                          {berita.judul}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {berita.cuplikan}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {index === 0 && (
                          <div className="flex items-center gap-1 text-orange-600">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm font-medium">Trending</span>
                          </div>
                        )}
                        {berita.kategori === "Tips & Panduan" && (
                          <div className="flex items-center gap-1 text-green-600">
                            <Leaf className="h-4 w-4" />
                            <span className="text-sm font-medium">Tips Ramah Lingkungan</span>
                          </div>
                        )}
                      </div>
                      
                      <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                        Baca Selengkapnya
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More / Quick Links */}
        <div className="mt-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ingin Membaca Lebih Banyak?</h3>
              <p className="text-blue-100 mb-6">
                Jelajahi koleksi lengkap artikel, tips, dan berita terbaru seputar lingkungan di halaman utama Berita & Info
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/berita">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    <Newspaper className="h-4 w-4 mr-2" />
                    Semua Berita & Info
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Kembali ke Dasbor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
