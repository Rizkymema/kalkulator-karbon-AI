import AdminSidebar from '../components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, FileText, TrendingUp, BarChart3, Users } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ContentManagementClient from './ContentManagementClient'

// Since we don't have a content table yet, we'll simulate content data
// In a real app, you would create a content/articles table in Prisma

const mockContent = [
  {
    id: '1',
    title: 'Tips Mengurangi Emisi Karbon di Rumah',
    excerpt: 'Panduan praktis untuk mengurangi jejak karbon dalam kehidupan sehari-hari',
    category: 'Tips Lingkungan',
    status: 'published' as const,
    author: 'Admin',
    publishDate: '2024-01-15',
    views: 1250,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '2', 
    title: 'Teknologi Hijau untuk Masa Depan',
    excerpt: 'Inovasi teknologi ramah lingkungan yang akan mengubah dunia',
    category: 'Teknologi',
    status: 'published' as const,
    author: 'Admin',
    publishDate: '2024-01-20',
    views: 980,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z'
  },
  {
    id: '3',
    title: 'Program Kompensasi Karbon Global',
    excerpt: 'Memahami bagaimana program offset karbon bekerja secara global',
    category: 'Edukasi',
    status: 'draft' as const,
    author: 'Admin',
    publishDate: '2024-02-01',
    views: 0,
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  },
  {
    id: '4',
    title: 'Panduan Kalkulator Emisi Karbon',
    excerpt: 'Cara menggunakan kalkulator emisi karbon untuk mengukur jejak karbon Anda',
    category: 'Tutorial',
    status: 'published' as const,
    author: 'Admin',
    publishDate: '2024-01-28',
    views: 756,
    createdAt: '2024-01-28T00:00:00Z',
    updatedAt: '2024-01-30T00:00:00Z'
  }
]

export default async function ContentManagementPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  // Simulate database queries - replace with real Prisma queries when content table is created
  const content = mockContent
  
  // Calculate statistics
  const totalContent = content.length
  const publishedContent = content.filter(item => item.status === 'published').length
  const draftContent = content.filter(item => item.status === 'draft').length
  const totalViews = content.reduce((sum, item) => sum + item.views, 0)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Konten</h1>
            <p className="text-gray-600">Kelola artikel, berita, dan konten edukatif</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Konten
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Konten</p>
                  <p className="text-2xl font-bold text-gray-900">{totalContent}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{publishedContent}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{draftContent}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <FileText className="h-6 w-6 text-orange-600" />
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

        {/* Content List - Pass initial data to client component */}
        <ContentManagementClient 
          initialContent={content}
        />
      </div>
    </div>
  )
}
