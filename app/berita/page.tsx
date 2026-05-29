"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Calendar, 
  Clock, 
  Leaf, 
  TrendingUp, 
  Users, 
  Globe, 
  Search,
  Filter,
  ChevronRight,
  BookOpen,
  Lightbulb,
  TreePine,
  Recycle,
  Zap,
  Award
} from "lucide-react"

export default function BeritaInfoPage() {
  const [selectedCategory, setSelectedCategory] = useState('semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [tips, setTips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'semua', label: 'Semua Berita', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'tips', label: 'Tips Hemat Emisi', icon: Lightbulb, color: 'bg-yellow-500' },
    { id: 'lingkungan', label: 'Kegiatan Lingkungan', icon: TreePine, color: 'bg-green-500' },
    { id: 'teknologi', label: 'Teknologi Hijau', icon: Zap, color: 'bg-purple-500' },
    { id: 'kebijakan', label: 'Kebijakan Iklim', icon: Globe, color: 'bg-orange-500' },
  ]

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        if (data.success) {
          setArticles(data.articles || [])
          setEvents(data.events || [])
          setTips(data.tips || [])
        }
      } catch (error) {
        console.error('Failed to fetch news data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNewsData()
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'semua' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#030a08] text-slate-200 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#061814] to-slate-950/90 border-b border-white/5 pt-40 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-white mb-6">
              Berita & Informasi Lingkungan
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-3xl mx-auto font-medium">
              Artikel, kabar terkini, tips hemat emisi, dan kegiatan lingkungan untuk mendukung gaya hidup berkelanjutan
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Cari artikel atau tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-950/60 border-white/5 text-white"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 border-white/10 text-white hover:bg-white/10 rounded-xl font-bold">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 rounded-xl font-bold ${
                  selectedCategory === category.id 
                    ? "bg-emerald-650 hover:bg-emerald-700 text-white" 
                    : "border-white/10 text-white hover:bg-white/10"
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="space-y-6">
                {/* Skeleton for Featured Article */}
                <Card className="overflow-hidden border-white/5 shadow-sm animate-pulse bg-slate-900/40">
                  <div className="h-64 bg-slate-850"></div>
                  <CardContent className="p-6 space-y-3">
                    <div className="h-4 bg-slate-800 rounded w-1/4"></div>
                    <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-slate-800 rounded w-2/3"></div>
                  </CardContent>
                </Card>

                {/* Skeletons for other articles */}
                {[1, 2].map((n) => (
                  <Card key={n} className="overflow-hidden border-white/5 shadow-sm animate-pulse p-6 bg-slate-900/40">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 h-32 bg-slate-850 rounded-xl"></div>
                      <div className="md:w-2/3 space-y-3">
                        <div className="h-4 bg-slate-800 rounded w-1/5"></div>
                        <div className="h-5 bg-slate-700 rounded w-5/6"></div>
                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {filteredArticles.find(article => article.featured) && (
                  <Card className="mb-8 overflow-hidden border border-white/5 shadow-lg bg-slate-900/40 backdrop-blur-md group">
                    <div className="relative h-64 bg-slate-950 overflow-hidden">
                      {filteredArticles.find(article => article.featured)?.image && (
                        <img 
                          src={filteredArticles.find(article => article.featured)?.image} 
                          alt="Featured" 
                          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <Badge className="mb-2 bg-amber-500 hover:bg-amber-600 text-black font-extrabold rounded-lg">Featured</Badge>
                        <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                          {filteredArticles.find(article => article.featured)?.title}
                        </h2>
                        <div className="flex items-center gap-4 text-xs text-emerald-300 font-semibold">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(filteredArticles.find(article => article.featured)?.date || '').toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {filteredArticles.find(article => article.featured)?.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-slate-300 mb-4 text-sm leading-relaxed font-medium">
                        {filteredArticles.find(article => article.featured)?.excerpt}
                      </p>
                      <p className="text-slate-400 mb-4 text-xs italic font-medium">
                        {filteredArticles.find(article => article.featured)?.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-semibold">Oleh: {filteredArticles.find(article => article.featured)?.author}</span>
                        <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">
                          Baca Selengkapnya
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Article Grid */}
                <div className="space-y-6">
                  {filteredArticles.filter(article => !article.featured).map((article) => (
                    <Card key={article.id} className="overflow-hidden border border-white/5 shadow-md hover:shadow-lg transition-all duration-350 bg-slate-900/40 backdrop-blur-md group">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-slate-950 flex-shrink-0">
                          {article.image ? (
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-emerald-650 to-green-600"></div>
                          )}
                        </div>
                        <div className="md:w-2/3 flex flex-col justify-between p-6">
                          <CardHeader className="p-0 mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-450 border-0 font-bold rounded-lg text-[10px]">
                                {categories.find(cat => cat.id === article.category)?.label || article.category}
                              </Badge>
                              <span className="text-xs text-slate-500">•</span>
                              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {article.readTime}
                              </span>
                            </div>
                            <CardTitle className="text-lg font-bold text-white group-hover:text-emerald-450 transition-colors leading-snug">{article.title}</CardTitle>
                            <CardDescription className="text-slate-400 text-xs leading-relaxed mt-2 font-medium">{article.excerpt}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-0 pt-3 border-t border-white/5 flex items-center justify-between">
                            <div className="text-[11px] text-slate-500">
                              <p className="font-bold text-slate-400">Oleh {article.author}</p>
                              <p className="font-medium mt-0.5">{new Date(article.date).toLocaleDateString('id-ID')}</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10 rounded-lg font-bold">
                              Baca
                            </Button>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white font-bold text-lg">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                  Kegiatan Mendatang
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-16 bg-slate-800 rounded-lg"></div>
                    <div className="h-16 bg-slate-800 rounded-lg"></div>
                  </div>
                ) : events.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4 font-semibold">Belum ada kegiatan mendatang.</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="border-l-4 border-emerald-500 pl-4 hover:bg-slate-900/30 py-1 transition-colors rounded-r-md">
                      <h4 className="font-bold text-white text-sm leading-snug">{event.title}</h4>
                      <div className="text-xs text-slate-400 space-y-1 mt-1 font-medium">
                        <p className="flex items-center gap-1 text-[11px]">
                          <Calendar className="h-3.5 w-3.5 text-slate-500" />
                          {new Date(event.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-[11px] font-bold text-emerald-450">{event.location}</p>
                        <p className="flex items-center gap-1 text-[10px] text-slate-500">
                          <Users className="h-3 w-3" />
                          {event.participants} peserta terdaftar
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white font-bold text-lg">
                  <Lightbulb className="h-5 w-5 text-amber-400" />
                  Tips Hari Ini
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-20 bg-slate-800 rounded-lg"></div>
                      <div className="h-20 bg-slate-800 rounded-lg"></div>
                    </div>
                  ) : tips.map((tip) => (
                    <div key={tip.id} className="p-4 bg-slate-950/60 hover:bg-emerald-500/10 border border-white/5 rounded-xl transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="h-4 w-4 text-emerald-450" />
                        <span className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">{tip.category}</span>
                      </div>
                      <h4 className="font-bold text-xs text-white mb-1 leading-snug">{tip.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3 font-medium">
                        {tip.description}
                      </p>
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-emerald-450">{tip.impact}</span>
                        <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">{tip.difficulty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card className="border border-white/5 bg-gradient-to-br from-emerald-950/60 to-teal-950/20 text-white shadow-md">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-amber-400" />
                <h3 className="font-bold mb-2">Eco Warrior Badge</h3>
                <p className="text-sm text-slate-300 mb-4 font-medium leading-relaxed">
                  Baca 5 artikel tentang lingkungan untuk mendapatkan badge ini!
                </p>
                <div className="bg-white/10 rounded-full h-2 mb-2">
                  <div className="bg-emerald-500 rounded-full h-2 w-3/5"></div>
                </div>
                <p className="text-xs text-emerald-350 font-bold">3/5 artikel dibaca</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
