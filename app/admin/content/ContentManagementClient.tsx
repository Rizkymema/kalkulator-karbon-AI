'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Eye, Edit3, Calendar, User, FileText, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ContentData {
  id: string
  title: string
  excerpt: string
  category: string
  status: 'published' | 'draft' | 'archived'
  author: string
  publishDate: string
  views: number
  createdAt: string
  updatedAt: string
}

interface ContentManagementClientProps {
  initialContent: ContentData[]
}

export default function ContentManagementClient({ 
  initialContent
}: ContentManagementClientProps) {
  const router = useRouter()
  const [content, setContent] = useState<ContentData[]>(initialContent)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [loading, setLoading] = useState<string | null>(null)

  const statuses = ['all', 'published', 'draft', 'archived']
  const categories = ['all', 'Tips Lingkungan', 'Teknologi', 'Edukasi', 'Tutorial', 'Berita']

  // Filter content based on search and filters
  const filteredContent = useMemo(() => {
    return content.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory
      
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [content, searchTerm, filterStatus, filterCategory])

  const handleStatusChange = async (contentId: string, newStatus: string) => {
    setLoading(contentId)
    try {
      // TODO: Implement API call to update content status
      // For now, just update local state
      setContent(content.map(item => 
        item.id === contentId ? { ...item, status: newStatus as any } : item
      ))
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log(`Content ${contentId} status changed to ${newStatus}`)
    } catch (error) {
      console.error('Error updating content status:', error)
      alert('Terjadi kesalahan saat mengubah status')
    }
    setLoading(null)
  }

  const handleDeleteContent = async (contentId: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus konten "${title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return
    }

    setLoading(contentId)
    try {
      // TODO: Implement API call to delete content
      setContent(content.filter(item => item.id !== contentId))
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log(`Content ${contentId} deleted`)
    } catch (error) {
      console.error('Error deleting content:', error)
      alert('Terjadi kesalahan saat menghapus konten')
    }
    setLoading(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Dipublikasi'
      case 'draft':
        return 'Draft'
      case 'archived':
        return 'Diarsipkan'
      default:
        return status
    }
  }

  return (
    <>
      {/* Filters and Search */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari konten..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'Semua Status' : getStatusLabel(status)}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Content List */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Daftar Konten</CardTitle>
          <CardDescription>
            Menampilkan {filteredContent.length} dari {content.length} konten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContent.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                        <FileText className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.excerpt}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusLabel(item.status)}
                          </Badge>
                          <Badge variant="outline">{item.category}</Badge>
                          <span className="text-sm text-gray-500">{item.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Penulis: {item.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Dipublikasi: {new Date(item.publishDate).toLocaleDateString('id-ID')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Diperbarui: {new Date(item.updatedAt).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled={loading === item.id}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" disabled={loading === item.id}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={loading === item.id}
                        onClick={() => handleDeleteContent(item.id, item.title)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      disabled={loading === item.id}
                      className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Dipublikasi</option>
                      <option value="archived">Diarsipkan</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {filteredContent.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tidak ada konten yang ditemukan</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
