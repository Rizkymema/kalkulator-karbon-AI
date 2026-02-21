"use client"

import { useState } from "react"
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

  const categories = [
    { id: 'semua', label: 'Semua Berita', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'tips', label: 'Tips Hemat Emisi', icon: Lightbulb, color: 'bg-yellow-500' },
    { id: 'lingkungan', label: 'Kegiatan Lingkungan', icon: TreePine, color: 'bg-green-500' },
    { id: 'teknologi', label: 'Teknologi Hijau', icon: Zap, color: 'bg-purple-500' },
    { id: 'kebijakan', label: 'Kebijakan Iklim', icon: Globe, color: 'bg-orange-500' },
  ]

  const articles = [
    {
      id: 1,
      title: '5 Tips Mudah Hemat Emisi di Rumah',
      category: 'tips',
      excerpt: 'Langkah sederhana yang bisa Anda lakukan setiap hari untuk mengurangi jejak karbon rumah tangga dan menghemat biaya listrik.',
      content: 'Mengurangi emisi karbon di rumah tidak harus sulit. Berikut 5 tips mudah yang bisa diterapkan: 1) Ganti lampu dengan LED, 2) Cabut perangkat elektronik yang tidak digunakan, 3) Gunakan AC secara bijak, 4) Manfaatkan cahaya alami, 5) Kurangi penggunaan air panas.',
      author: 'Tim Karwanua',
      date: '2025-01-15',
      readTime: '3 menit',
      tags: ['Hemat Energi', 'Rumah Tangga', 'Tips'],
      image: '/api/placeholder/400/250',
      featured: true
    },
    {
      id: 2,
      title: 'Kampanye Tanam Pohon Sulawesi Utara 2025',
      category: 'lingkungan',
      excerpt: 'Program penanaman 10.000 pohon di berbagai daerah Sulawesi Utara untuk mengurangi emisi karbon dan melestarikan lingkungan.',
      content: 'Pemerintah Sulawesi Utara meluncurkan program ambisius untuk menanam 10.000 pohon sepanjang tahun 2025. Program ini melibatkan masyarakat, sekolah, dan organisasi lingkungan.',
      author: 'Dinas Lingkungan Hidup Sulut',
      date: '2025-01-10',
      readTime: '5 menit',
      tags: ['Konservasi', 'Sulawesi Utara', 'Pohon'],
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Transportasi Listrik: Masa Depan Mobilitas Ramah Lingkungan',
      category: 'teknologi',
      excerpt: 'Perkembangan kendaraan listrik dan infrastruktur charging station sebagai solusi mengurangi emisi dari sektor transportasi.',
      content: 'Kendaraan listrik menjadi solusi utama untuk mengurangi emisi transportasi. Dengan efisiensi energi yang tinggi dan emisi nol, kendaraan listrik dapat mengurangi jejak karbon hingga 60%.',
      author: 'Dr. Eko Santoso',
      date: '2025-01-08',
      readTime: '7 menit',
      tags: ['Teknologi', 'Transportasi', 'Listrik'],
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: 'Cara Mengelola Sampah untuk Mengurangi Emisi Metana',
      category: 'tips',
      excerpt: 'Panduan praktis mengelola sampah rumah tangga dengan composting dan reduce-reuse-recycle untuk mengurangi emisi gas metana.',
      content: 'Sampah organik menghasilkan gas metana yang 25 kali lebih berbahaya dari CO2. Dengan composting dan pengurangan sampah, kita bisa mengurangi emisi signifikan.',
      author: 'Greenpeace Indonesia',
      date: '2025-01-05',
      readTime: '4 menit',
      tags: ['Sampah', 'Composting', 'Metana'],
      image: '/api/placeholder/400/250'
    },
    {
      id: 5,
      title: 'Kebijakan Net Zero Emission Indonesia 2060',
      category: 'kebijakan',
      excerpt: 'Strategi pemerintah Indonesia mencapai target net zero emission pada 2060 melalui berbagai sektor dan kebijakan.',
      content: 'Indonesia berkomitmen mencapai net zero emission pada 2060. Strategi ini meliputi transisi energi, konservasi hutan, dan pengembangan teknologi hijau.',
      author: 'Kementerian ESDM',
      date: '2025-01-03',
      readTime: '6 menit',
      tags: ['Kebijakan', 'Net Zero', 'Indonesia'],
      image: '/api/placeholder/400/250'
    }
  ]

  const events = [
    {
      id: 1,
      title: 'Workshop Penghitungan Jejak Karbon',
      date: '2025-02-15',
      location: 'Manado, Sulawesi Utara',
      type: 'Workshop',
      participants: 50
    },
    {
      id: 2,
      title: 'Aksi Bersih Pantai Bunaken',
      date: '2025-02-20',
      location: 'Pulau Bunaken',
      type: 'Aksi Lingkungan',
      participants: 200
    },
    {
      id: 3,
      title: 'Seminar Teknologi Hijau',
      date: '2025-02-25',
      location: 'UNSRAT Manado',
      type: 'Seminar',
      participants: 100
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'semua' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Berita & Informasi Lingkungan
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Artikel, kabar terkini, tips hemat emisi, dan kegiatan lingkungan untuk mendukung gaya hidup berkelanjutan
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Cari artikel atau tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
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
                className="flex items-center gap-2"
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
            {/* Featured Article */}
            {filteredArticles.find(article => article.featured) && (
              <Card className="mb-8 overflow-hidden">
                <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-green-500">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge className="mb-2 bg-yellow-500">Featured</Badge>
                    <h2 className="text-2xl font-bold mb-2">
                      {filteredArticles.find(article => article.featured)?.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-emerald-100">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(filteredArticles.find(article => article.featured)?.date || '').toLocaleDateString('id-ID')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {filteredArticles.find(article => article.featured)?.readTime}
                      </span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    {filteredArticles.find(article => article.featured)?.excerpt}
                  </p>
                  <Button className="flex items-center gap-2">
                    Baca Selengkapnya
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Article Grid */}
            <div className="space-y-6">
              {filteredArticles.filter(article => !article.featured).map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-emerald-400 to-green-500"></div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{categories.find(cat => cat.id === article.category)?.label}</Badge>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <p>Oleh {article.author}</p>
                            <p>{new Date(article.date).toLocaleDateString('id-ID')}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Baca
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  Kegiatan Mendatang
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString('id-ID')}
                      </p>
                      <p>{event.location}</p>
                      <p className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.participants} peserta
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Tips Hari Ini
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium">Hemat Energi</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Cabut charger handphone setelah selesai mengisi. Ini bisa menghemat 10% listrik rumah.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TreePine className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Transportasi</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Gunakan sepeda untuk jarak dekat. Bersepeda 5 km menghemat 1 kg CO₂.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Recycle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Sampah</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Pisahkan sampah organik untuk kompos. Mengurangi 30% limbah rumah tangga.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card className="bg-gradient-to-br from-emerald-500 to-green-500 text-white">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Eco Warrior Badge</h3>
                <p className="text-sm text-emerald-100 mb-4">
                  Baca 5 artikel tentang lingkungan untuk mendapatkan badge ini!
                </p>
                <div className="bg-white/20 rounded-full h-2 mb-2">
                  <div className="bg-white rounded-full h-2 w-3/5"></div>
                </div>
                <p className="text-xs text-emerald-100">3/5 artikel dibaca</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
