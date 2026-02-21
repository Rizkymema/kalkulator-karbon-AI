import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from '../components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Users, UserCheck, Shield, UserX, Plus } from 'lucide-react'
import UserManagementClient from "./UserManagementClient";

export default async function UserManagementPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Get real users data from database
  const users = await prisma.user.findMany({
    include: {
      emissions: {
        select: {
          totalEmisi: true,
          pohonDibutuhkan: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Transform data for client component
  const usersData = users.map(user => {
    const totalEmissions = user.emissions.reduce((sum, emission) => sum + (emission.totalEmisi || 0), 0);
    const totalTrees = user.emissions.reduce((sum, emission) => sum + (emission.pohonDibutuhkan || 0), 0);
    
    return {
      id: user.id,
      name: user.name || '',
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      totalEmissions: totalEmissions,
      offsetCredits: totalTrees * 0.022, // Approximate offset calculation
    };
  });

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.role === 'USER').length;
  const adminUsers = users.filter(u => u.role === 'ADMIN').length;
  const totalEmissions = usersData.reduce((sum, user) => sum + user.totalEmissions, 0);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pengguna</h1>
            <p className="text-gray-600">Kelola akun pengguna dan hak akses sistem</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Pengguna
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Pengguna</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pengguna Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Administrator</p>
                  <p className="text-2xl font-bold text-gray-900">{adminUsers}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Emisi</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEmissions.toFixed(1)} ton</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <UserX className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List - Pass initial data to client component */}
        <UserManagementClient 
          initialUsers={usersData}
        />
      </div>
    </div>
  )
}
