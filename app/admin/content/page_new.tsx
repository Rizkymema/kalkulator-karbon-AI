'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  TrendingUp,
  BarChart3
} from "lucide-react"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  status: 'draft' | 'published' | 'archived'
  author: string
  publishDate: string
  views: number
  tags: string[]
}

export default function ContentManagementPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockArticles: Article[] = [
      {
        id: '1',
        title: 'Tips Mengurangi Emisi Karbon di Rumah',
        excerpt: 'Panduan praktis untuk mengurangi jejak karbon dalam kehidupan sehari-hari',
        content: 'Lorem ipsum...',
        category: 'Tips Lingkungan',
        status: 'published',
        author: 'Admin',
        publishDate: '2025-01-15',
        views: 1234,
        tags: ['tips', 'rumah', 'lingkungan']
      },
      {
        id: '2',
        title: 'Dampak Transportasi terhadap Lingkungan',
        excerpt: 'Analisis mendalam tentang emisi karbon dari berbagai jenis transportasi',
        content: 'Lorem ipsum...',
        category: 'Edukasi',
        status: 'published',
        author: 'Admin',
        publishDate: '2025-01-10',
        views: 856,
        tags: ['transportasi', 'edukasi', 'analisis']
      },
      {
        id: '3',
        title: 'Program Reforestasi Kawanua 2025',
        excerpt: 'Program penanaman pohon untuk mengurangi emisi karbon di Sulawesi Utara',
        content: 'Lorem ipsum...',
        category: 'Program',
        status: 'draft',
        author: 'Admin',
        publishDate: '2025-01-20',
        views: 0,
        tags: ['program', 'reforestasi', 'kawanua']
      },
      {
        id: '4',
        title: 'Teknologi Carbon Capture and Storage',
        excerpt: 'Inovasi terbaru dalam teknologi penangkapan dan penyimpanan karbon',
        content: 'Lorem ipsum...',
        category: 'Teknologi',
        status: 'published',
        author: 'Dr. Green',
        publishDate: '2025-01-12',
        views: 967,
        tags: ['teknologi', 'CCS', 'inovasi']
      },
      {
        id: '5',
        title: 'Panduan Offsetting Emisi Karbon',
        excerpt: 'Cara efektif melakukan offset emisi karbon melalui berbagai program',
        content: 'Lorem ipsum...',
        category: 'Panduan',
        status: 'archived',
        author: 'Admin',
        publishDate: '2024-12-20',
        views: 543,
        tags: ['offset', 'panduan', 'program']
      }
    ]
    setArticles(mockArticles)
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))]
  const statuses = ['all', 'published', 'draft', 'archived']

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0)
  const publishedCount = articles.filter(a => a.status === 'published').length
  const draftCount = articles.filter(a => a.status === 'draft').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Konten</h1>
            <p className="text-gray-600">Kelola artikel, berita, dan konten edukasi</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Buat Artikel Baru
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Artikel</p>
                  <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Dipublikasi</p>
                  <p className="text-2xl font-bold text-gray-900">{publishedCount}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Draft</p>
                  <p className="text-2xl font-bold text-gray-900">{draftCount}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Edit3 className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'Semua Status' : 
                     status === 'published' ? 'Dipublikasi' :
                     status === 'draft' ? 'Draft' : 'Diarsipkan'}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Semua Kategori' : category}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Daftar Artikel</CardTitle>
            <CardDescription>
              Menampilkan {filteredArticles.length} dari {articles.length} artikel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{article.title}</h3>
                        <Badge 
                          variant={
                            article.status === 'published' ? 'default' :
                            article.status === 'draft' ? 'secondary' : 'destructive'
                          }
                        >
                          {article.status === 'published' ? 'Dipublikasi' :
                           article.status === 'draft' ? 'Draft' : 'Diarsipkan'}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{article.excerpt}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(article.publishDate).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {article.views} views
                        </div>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        {article.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredArticles.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada artikel yang ditemukan</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
