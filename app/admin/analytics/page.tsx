import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminAnalytics() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Get comprehensive analytics data
  const totalUsers = await prisma.user.count();
  const totalCalculations = await prisma.emissionRecord.count();
  
  // Monthly statistics
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      month: date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      start: new Date(date.getFullYear(), date.getMonth(), 1),
      end: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    };
  }).reverse();

  const monthlyData = await Promise.all(
    last6Months.map(async ({ month, start, end }) => {
      const users = await prisma.user.count({
        where: { createdAt: { gte: start, lte: end } }
      });
      const calculations = await prisma.emissionRecord.count({
        where: { createdAt: { gte: start, lte: end } }
      });
      const emissions = await prisma.emissionRecord.aggregate({
        where: { createdAt: { gte: start, lte: end } },
        _sum: { totalEmisi: true }
      });
      
      return {
        month,
        users,
        calculations,
        emissions: emissions._sum.totalEmisi || 0
      };
    })
  );

  // Category breakdown - using emissionData field to extract categories
  const allEmissions = await prisma.emissionRecord.findMany({
    select: { emissionData: true, totalEmisi: true }
  });

  // Process emission data to get category stats
  const categoryStats = allEmissions.reduce((acc: any[], emission) => {
    try {
      const data = JSON.parse(emission.emissionData);
      const category = Object.keys(data)[0] || 'unknown';
      
      const existing = acc.find(item => item.category === category);
      if (existing) {
        existing._count += 1;
        existing._sum.totalEmisi += emission.totalEmisi;
      } else {
        acc.push({
          category,
          _count: 1,
          _sum: { totalEmisi: emission.totalEmisi },
          _avg: { totalEmisi: emission.totalEmisi }
        });
      }
    } catch (e) {
      const existing = acc.find(item => item.category === 'unknown');
      if (existing) {
        existing._count += 1;
        existing._sum.totalEmisi += emission.totalEmisi;
      } else {
        acc.push({
          category: 'unknown',
          _count: 1,
          _sum: { totalEmisi: emission.totalEmisi },
          _avg: { totalEmisi: emission.totalEmisi }
        });
      }
    }
    return acc;
  }, []);

  // Calculate average emissions
  categoryStats.forEach(stat => {
    stat._avg.totalEmisi = stat._sum.totalEmisi / stat._count;
  });

  // Top users by emissions
  const topUsers = await prisma.user.findMany({
    include: {
      emissions: {
        select: { totalEmisi: true }
      }
    },
    take: 10
  }).then(users => 
    users
      .map(user => ({
        ...user,
        totalEmissions: user.emissions.reduce((sum, e) => sum + e.totalEmisi, 0),
        calculationCount: user.emissions.length
      }))
      .sort((a, b) => b.totalEmissions - a.totalEmissions)
      .slice(0, 5)
  );

  // Emission distribution
  const emissionRanges = [
    { label: '< 100 kg CO₂', min: 0, max: 100 },
    { label: '100-300 kg CO₂', min: 100, max: 300 },
    { label: '300-500 kg CO₂', min: 300, max: 500 },
    { label: '500-1000 kg CO₂', min: 500, max: 1000 },
    { label: '> 1000 kg CO₂', min: 1000, max: 999999 }
  ];

  const distributionData = await Promise.all(
    emissionRanges.map(async (range) => {
      const count = await prisma.emissionRecord.count({
        where: {
          totalEmisi: {
            gte: range.min,
            lt: range.max === 999999 ? undefined : range.max
          }
        }
      });
      return { ...range, count };
    })
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">📊 Analytics Dashboard</h1>
        <p className="text-blue-100">Analisis mendalam tentang penggunaan platform dan emisi karbon</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              👥
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Pengguna</h3>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              🧮
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Kalkulasi</h3>
              <p className="text-2xl font-bold text-gray-900">{totalCalculations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              📈
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Rata-rata per User</h3>
              <p className="text-2xl font-bold text-gray-900">
                {totalUsers > 0 ? (totalCalculations / totalUsers).toFixed(1) : '0'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              🎯
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Engagement Rate</h3>
              <p className="text-2xl font-bold text-gray-900">
                {totalUsers > 0 ? ((totalCalculations / totalUsers) * 100).toFixed(0) : '0'}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📈 Tren 6 Bulan Terakhir</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bulan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengguna Baru
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kalkulasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Emisi (kg CO₂)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    +{data.users}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.calculations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.emissions.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Analysis & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">🏷️ Analisis per Kategori</h2>
          <div className="space-y-4">
            {categoryStats.map((stat) => (
              <div key={stat.category} className="border-l-4 border-emerald-500 pl-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900 capitalize">
                    {stat.category}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {stat._count} kalkulasi
                  </span>
                </div>
                <p className="text-lg font-bold text-emerald-600">
                  {stat._sum.totalEmisi?.toFixed(2) || "0"} kg CO₂
                </p>
                <p className="text-sm text-gray-500">
                  Rata-rata: {stat._avg.totalEmisi?.toFixed(2) || "0"} kg CO₂
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Emission Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Distribusi Emisi</h2>
          <div className="space-y-4">
            {distributionData.map((range, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {range.label}
                    </span>
                    <span className="text-sm text-gray-500">
                      {range.count} kalkulasi
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{
                        width: `${totalCalculations > 0 ? (range.count / totalCalculations) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Users */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">🏆 Top 5 Pengguna Berdasarkan Emisi</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peringkat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Emisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah Kalkulasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rata-rata
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">
                    {user.totalEmissions.toFixed(2)} kg CO₂
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.calculationCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.calculationCount > 0 ? (user.totalEmissions / user.calculationCount).toFixed(2) : '0'} kg CO₂
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
