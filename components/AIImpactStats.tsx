import { Brain, TrendingDown, Users, Target } from 'lucide-react'

export default function AIImpactStats() {
  const stats = [
    {
      icon: Brain,
      title: 'Rekomendasi AI Diberikan',
      value: '2,847',
      description: 'Total saran personal yang dihasilkan',
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: TrendingDown,
      title: 'Rata-rata Pengurangan',
      value: '2.3 ton',
      description: 'CO₂ berkurang berkat saran AI',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Pengguna Aktif AI',
      value: '1,234',
      description: 'Menggunakan fitur rekomendasi AI',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Target,
      title: 'Akurasi Prediksi',
      value: '94%',
      description: 'Tingkat akurasi rekomendasi AI',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-white" />
          <h3 className="text-lg font-semibold text-white">Dampak AI untuk Keberlanjutan</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {stat.title}
              </div>
              <div className="text-xs text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">AI untuk Kebaikan</h4>
              <p className="text-sm text-blue-700">
                Teknologi AI membantu pengguna membuat keputusan yang lebih berkelanjutan dan mengurangi jejak karbon secara signifikan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
