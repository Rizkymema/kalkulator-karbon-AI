'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Eye, Edit3, Mail, Calendar, User, Users, Trash2, Plus, Shield, UserCheck, Phone, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UserData {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
  totalEmissions: number
  offsetCredits: number
  status?: string
  phone?: string
  location?: string
  joinDate?: string
  lastActivity?: string
}

interface UserManagementClientProps {
  initialUsers: UserData[]
}

export default function UserManagementClient({ initialUsers }: UserManagementClientProps) {
  const [users] = useState<UserData[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Calculate stats
  const totalUsers = users.length
  const activeUsers = users.filter(user => user.status === 'active').length
  const adminUsers = users.filter(user => user.role === 'admin').length
  const totalEmissions = users.reduce((sum, user) => sum + user.totalEmissions, 0)

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || (user.status && user.status === filterStatus)
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />
      case 'moderator': return <UserCheck className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return <Badge variant="destructive">Admin</Badge>
      case 'moderator': return <Badge variant="secondary">Moderator</Badge>
      default: return <Badge variant="outline">Pengguna</Badge>
    }
  }

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'active': return <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>
      case 'inactive': return <Badge variant="secondary">Tidak Aktif</Badge>
      case 'suspended': return <Badge variant="destructive">Ditangguhkan</Badge>
      default: return <Badge variant="outline">Aktif</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Manajemen Pengguna</h1>
        <p className="text-blue-100">
          Kelola akun pengguna dan hak akses sistem
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengguna Aktif</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrator</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{adminUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emisi</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalEmissions.toFixed(1)} ton</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>Menampilkan {filteredUsers.length} dari {totalUsers} pengguna</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari pengguna..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Role</option>
              <option value="user">Pengguna</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
              <option value="suspended">Ditangguhkan</option>
            </select>
          </div>

          {/* Users List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {user.name}
                          </h3>
                          {getRoleBadge(user.role)}
                          {getStatusBadge(user.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              {user.phone}
                            </div>
                          )}
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {user.location || 'Lokasi tidak tersedia'}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            Bergabung: {user.joinDate ? new Date(user.joinDate).toLocaleDateString('id-ID') : new Date(user.createdAt).toLocaleDateString('id-ID')}
                          </div>
                          <div className="flex items-center">
                            <UserCheck className="h-4 w-4 mr-2 text-gray-400" />
                            Aktivitas terakhir: {user.lastActivity ? new Date(user.lastActivity).toLocaleDateString('id-ID') : new Date(user.updatedAt).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-orange-600">
                              {user.totalEmissions.toFixed(1)} ton CO₂
                            </div>
                            <div className="text-xs text-gray-500">Total Emisi</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-green-600">
                              {user.offsetCredits.toFixed(1)} ton CO₂
                            </div>
                            <div className="text-xs text-gray-500">Kredit Offset</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
