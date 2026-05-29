'use client';

import { useState, useEffect } from 'react';
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

const kategoriColors = {
  "Politik Lingkungan": "bg-blue-950/40 border border-blue-500/20 text-blue-300",
  "Tips & Panduan": "bg-green-950/40 border border-green-500/20 text-green-300", 
  "Teknologi": "bg-purple-950/40 border border-purple-500/20 text-purple-300",
  "Berita Utama": "bg-red-950/40 border border-red-500/20 text-red-300"
}

const tagColors = {
  "trending": "bg-orange-950/40 border border-orange-500/20 text-orange-300",
  "popular": "bg-pink-950/40 border border-pink-500/20 text-pink-300",
  "new": "bg-emerald-950/40 border border-emerald-500/20 text-emerald-300",
  "featured": "bg-yellow-950/40 border border-yellow-500/20 text-yellow-300"
}

export default function BeritaTerbaruPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedKategori, setSelectedKategori] = useState<string>("all")

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        if (data.success && data.articles) {
          const mapped = data.articles.map((art: any) => {
            let indCategory = "Berita Utama"
            if (art.category === 'tips') indCategory = "Tips & Panduan"
            else if (art.category === 'teknologi') indCategory = "Teknologi"
            else if (art.category === 'kebijakan') indCategory = "Politik Lingkungan"
            else if (art.category === 'lingkungan') indCategory = "Berita Utama"

            const artDate = new Date(art.date)
            const today = new Date()
            const diffTime = Math.abs(today.getTime() - artDate.getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            const waktuStr = diffDays <= 1 ? "Hari ini" : `${diffDays} hari yang lalu`

            return {
              id: art.id,
              judul: art.title,
              kategori: indCategory,
              tanggal: art.date,
              waktu: waktuStr,
              cuplikan: art.excerpt,
              gambar: art.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
              views: art.views || Math.floor(Math.random() * 1000) + 100,
              tag: art.featured ? "trending" : "new",
              content: art.content
            }
          })
          setArticles(mapped)
        }
      } catch (error) {
        console.error('Failed to fetch profile news:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const kategoriList = ["all", ...Array.from(new Set(articles.map(item => item.kategori)))]
  
  const filteredBerita = selectedKategori === "all" 
    ? articles 
    : articles.filter(item => item.kategori === selectedKategori)

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 pt-36 pb-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white mb-2 flex items-center gap-3">
                <Newspaper className="h-8 w-8 text-emerald-400" />
                Berita Terbaru
              </h1>
              <p className="text-slate-400 font-medium">
                Update terkini seputar lingkungan dan emisi karbon
              </p>
            </div>
            <Link href="/berita">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">
                <ExternalLink className="h-4 w-4 mr-2" />
                Lihat Semua Berita
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Kategori */}
        <div className="mb-8">
          <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                {kategoriList.map((kategori) => (
                  <button
                    key={kategori}
                    onClick={() => setSelectedKategori(kategori)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      selectedKategori === kategori
                        ? 'bg-emerald-605 text-white shadow-lg shadow-emerald-900/30'
                        : 'bg-slate-950/40 text-slate-400 hover:bg-white/5 border border-white/5'
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
            <Card key={berita.id} className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg hover:border-white/10 transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                  {/* Gambar */}
                  <div className="md:col-span-1 h-48 md:h-full relative overflow-hidden bg-slate-950/40 flex items-center justify-center min-h-[160px]">
                    {berita.gambar ? (
                      <img 
                        src={berita.gambar} 
                        alt={berita.judul} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500"></div>
                    )}
                    <div className="absolute inset-0 bg-black/45 z-0"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center text-white p-2">
                        <Globe className="h-10 w-10 mx-auto mb-1.5 opacity-90 text-emerald-400" />
                        <p className="text-xs font-semibold">Berita #{berita.id}</p>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="absolute top-4 left-4 z-20">
                      <Badge variant="outline" className={`${tagColors[berita.tag as keyof typeof tagColors]} border-0 shadow-sm font-semibold`}>
                        {berita.tag}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <Badge variant="outline" className={kategoriColors[berita.kategori as keyof typeof kategoriColors]}>
                            {berita.kategori}
                          </Badge>
                          <div className="flex items-center text-xs text-slate-400 gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-emerald-400" />
                              {new Date(berita.tanggal).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-emerald-400" />
                              {berita.waktu}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4 text-emerald-400" />
                              {berita.views.toLocaleString()} views
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 hover:text-emerald-450 transition-colors cursor-pointer leading-tight">
                          {berita.judul}
                        </h3>
                        
                        <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                          {berita.cuplikan}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {index === 0 && (
                          <div className="flex items-center gap-1 text-orange-400 font-semibold text-sm">
                            <TrendingUp className="h-4 w-4 animate-bounce" />
                            <span>Trending</span>
                          </div>
                        )}
                        {berita.kategori === "Tips & Panduan" && (
                          <div className="flex items-center gap-1 text-green-400 font-semibold text-sm">
                            <Leaf className="h-4 w-4" />
                            <span>Tips Ramah Lingkungan</span>
                          </div>
                        )}
                      </div>
                      
                      <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 rounded-xl cursor-pointer">
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
          <Card className="border border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 to-blue-955/40 text-white backdrop-blur-md">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-black mb-4 font-display uppercase tracking-tight">Ingin Membaca Lebih Banyak?</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
                Jelajahi koleksi lengkap artikel, tips, dan berita terbaru seputar lingkungan di halaman utama Berita & Info
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/berita">
                  <Button className="bg-white text-[#030a08] hover:bg-white/90 font-bold rounded-xl">
                    <Newspaper className="h-4 w-4 mr-2" />
                    Semua Berita & Info
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 rounded-xl font-bold">
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
