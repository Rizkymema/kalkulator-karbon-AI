import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Target,
  BarChart3,
  Calendar,
  TreePine,
  Zap,
  UserCheck,
  Mail
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Get current month stats
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  
  const totalUsers = await prisma.user.count();
  const monthlyUsers = await prisma.user.count({
    where: { createdAt: { gte: startOfMonth } }
  });
  
  const totalEmissions = await prisma.emissionRecord.count();
  const monthlyEmissions = await prisma.emissionRecord.count({
    where: { tanggal: { gte: startOfMonth } }
  });

  // Get total emission amount
  const emissionSum = await prisma.emissionRecord.aggregate({
    _sum: { totalEmisi: true }
  });

  const totalEmissionAmount = emissionSum._sum.totalEmisi || 0;

  // Get total trees needed
  const treeSum = await prisma.emissionRecord.aggregate({
    _sum: { pohonDibutuhkan: true }
  });

  const totalTrees = treeSum._sum.pohonDibutuhkan || 0;

  // Recent users and emissions
  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, createdAt: true, role: true }
  });

  const recentEmissions = await prisma.emissionRecord.findMany({
    take: 5,
    orderBy: { tanggal: 'desc' },
    include: { user: { select: { name: true, email: true } } }
  });

  // Active users (users with emissions in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const activeUsers = await prisma.user.count({
    where: {
      emissions: {
        some: {
          tanggal: { gte: thirtyDaysAgo }
        }
      }
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
            <p className="text-blue-100 text-lg">
              Selamat datang kembali, {session.user.name}
            </p>
            <p className="text-blue-200 text-sm mt-1">
              Pantau dan kelola sistem Karwanua
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{new Date().toLocaleDateString('id-ID')}</div>
              <div className="text-sm text-blue-200">Hari ini</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pengguna</p>
                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                <p className="text-xs text-green-600 mt-1">+{monthlyUsers} bulan ini</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pengguna Aktif</p>
                <p className="text-3xl font-bold text-gray-900">{activeUsers}</p>
                <p className="text-xs text-blue-600 mt-1">30 hari terakhir</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Emissions */}
        <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Emisi</p>
                <p className="text-3xl font-bold text-gray-900">{totalEmissionAmount.toFixed(1)}</p>
                <p className="text-xs text-red-600 mt-1">ton CO₂</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Activity className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trees Needed */}
        <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pohon Dibutuhkan</p>
                <p className="text-3xl font-bold text-gray-900">{totalTrees.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">untuk offset</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TreePine className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Pengguna Terbaru
            </CardTitle>
            <CardDescription>Pengguna yang baru mendaftar</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentUsers.map((user) => (
                <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{user.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(user.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/users">
              <div className="text-center p-3 text-blue-600 hover:text-blue-800 cursor-pointer border-t">
                Lihat semua pengguna →
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Emissions */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-red-600" />
              Emisi Terbaru
            </CardTitle>
            <CardDescription>Kalkulasi emisi terbaru</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentEmissions.map((emission) => (
                <div key={emission.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Activity className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{emission.user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(emission.tanggal).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{emission.totalEmisi.toFixed(2)} ton</p>
                      <p className="text-xs text-gray-500">{emission.pohonDibutuhkan} pohon</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/analytics">
              <div className="text-center p-3 text-red-600 hover:text-red-800 cursor-pointer border-t">
                Lihat analisis lengkap →
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Aksi Cepat
          </CardTitle>
          <CardDescription>Shortcut untuk tugas administrasi umum</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/users">
              <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <p className="font-medium text-sm">Kelola User</p>
                <p className="text-xs text-gray-500">Manage pengguna</p>
              </div>
            </Link>
            
            <Link href="/admin/content">
              <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                <BarChart3 className="h-8 w-8 text-green-600 mb-2" />
                <p className="font-medium text-sm">Konten</p>
                <p className="text-xs text-gray-500">Kelola artikel</p>
              </div>
            </Link>
            
            <Link href="/admin/analytics">
              <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <p className="font-medium text-sm">Analytics</p>
                <p className="text-xs text-gray-500">Lihat statistik</p>
              </div>
            </Link>
            
            <Link href="/admin/settings">
              <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                <Target className="h-8 w-8 text-orange-600 mb-2" />
                <p className="font-medium text-sm">Pengaturan</p>
                <p className="text-xs text-gray-500">Konfigurasi sistem</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
