import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CalculatorManagement() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Get calculator statistics
  const totalCalculations = await prisma.emissionRecord.count();
  const recentCalculations = await prisma.emissionRecord.findMany({
    include: {
      user: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  // Get category breakdown - using emissionData field to extract categories
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

  // Get today's calculations
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayCalculations = await prisma.emissionRecord.count({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow
      }
    }
  });

  // Get this week's calculations
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const weeklyCalculations = await prisma.emissionRecord.count({
    where: {
      createdAt: {
        gte: weekAgo
      }
    }
  });

  // Configuration templates (could be moved to database later)
  const calculatorTemplates = [
    {
      id: 1,
      name: "Rumah Tangga Standard",
      categories: ["listrik", "transportasi", "makanan", "sampah"],
      description: "Template kalkulasi untuk rumah tangga biasa"
    },
    {
      id: 2,
      name: "Perusahaan Kecil",
      categories: ["listrik", "transportasi", "operasional", "waste"],
      description: "Template untuk bisnis kecil dan menengah"
    },
    {
      id: 3,
      name: "Individu Minimalis",
      categories: ["transportasi", "makanan"],
      description: "Template sederhana untuk individu"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">🧮 Manajemen Kalkulator</h1>
        <p className="text-emerald-100">
          Kelola pengaturan kalkulator emisi karbon dan monitor penggunaan
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              📊
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Kalkulasi</h3>
              <p className="text-2xl font-bold text-gray-900">{totalCalculations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              📈
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Hari Ini</h3>
              <p className="text-2xl font-bold text-gray-900">{todayCalculations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              🗓️
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Minggu Ini</h3>
              <p className="text-2xl font-bold text-gray-900">{weeklyCalculations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              🏷️
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Kategori Aktif</h3>
              <p className="text-2xl font-bold text-gray-900">{categoryStats.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Templates & Category Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Templates */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">📋 Template Kalkulator</h2>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
              + Buat Template
            </button>
          </div>
          <div className="space-y-4">
            {calculatorTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Hapus
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.categories.map((category) => (
                    <span
                      key={category}
                      className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Statistik Kategori</h2>
          <div className="space-y-4">
            {categoryStats.map((stat) => (
              <div key={stat.category} className="border-l-4 border-emerald-500 pl-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-gray-900 capitalize">
                    {stat.category}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {stat._count} kalkulasi
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-red-600 ml-1">
                      {stat._sum.totalEmisi?.toFixed(2) || "0"} kg CO₂
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Rata-rata:</span>
                    <span className="font-bold text-blue-600 ml-1">
                      {stat._avg.totalEmisi?.toFixed(2) || "0"} kg CO₂
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">⚙️ Pengaturan Kalkulator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Faktor Emisi</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Listrik (kg CO₂/kWh)</span>
                <span className="font-medium">0.85</span>
                <button className="text-blue-600 text-sm">Edit</button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Bensin (kg CO₂/L)</span>
                <span className="font-medium">2.31</span>
                <button className="text-blue-600 text-sm">Edit</button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Gas LPG (kg CO₂/kg)</span>
                <span className="font-medium">3.00</span>
                <button className="text-blue-600 text-sm">Edit</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Validasi Input</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Wajib semua kategori</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Validasi range nilai</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">Simpan otomatis</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Notifikasi hasil tinggi</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Tampilan</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Tampilkan progress bar</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Animasi transisi</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700">Mode dark theme</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-gray-700">Tooltip bantuan</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              Reset Default
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
              Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>

      {/* Recent Calculations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">🕒 Kalkulasi Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengguna
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Emisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCalculations.map((calculation) => (
                <tr key={calculation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {calculation.user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {calculation.user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full capitalize">
                      {(() => {
                        try {
                          const data = JSON.parse(calculation.emissionData);
                          return Object.keys(data)[0] || 'unknown';
                        } catch {
                          return 'unknown';
                        }
                      })()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    {calculation.totalEmisi.toFixed(2)} kg CO₂
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(calculation.createdAt).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Detail
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Hapus
                    </button>
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
