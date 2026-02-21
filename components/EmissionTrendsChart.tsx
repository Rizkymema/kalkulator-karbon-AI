'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, BarChart } from 'lucide-react';

interface EmissionTrend {
  month: string;
  emission: number;
  target: number;
}

export function EmissionTrendsChart() {
  // Mock data - in real app this would come from user's historical data
  const trends: EmissionTrend[] = [
    { month: 'Jan', emission: 78.5, target: 75.0 },
    { month: 'Feb', emission: 74.2, target: 72.5 },
    { month: 'Mar', emission: 69.8, target: 70.0 },
    { month: 'Apr', emission: 71.3, target: 67.5 },
    { month: 'Mei', emission: 64.9, target: 65.0 },
    { month: 'Jun', emission: 62.1, target: 62.5 }
  ];

  const currentEmission = trends[trends.length - 1].emission;
  const previousEmission = trends[trends.length - 2].emission;
  const isImproving = currentEmission < previousEmission;
  const changePercentage = Math.abs(((currentEmission - previousEmission) / previousEmission) * 100);

  const maxValue = Math.max(...trends.map(t => Math.max(t.emission, t.target)));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Tren Emisi 6 Bulan Terakhir
          </h3>
        </div>
        
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
          isImproving 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {isImproving ? (
            <TrendingDown className="w-4 h-4" />
          ) : (
            <TrendingUp className="w-4 h-4" />
          )}
          {changePercentage.toFixed(1)}% dari bulan lalu
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 mb-6">
        <div className="absolute inset-0 flex items-end justify-between gap-4">
          {trends.map((trend, index) => (
            <motion.div
              key={trend.month}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              {/* Emission Bar */}
              <div className="w-full relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(trend.emission / maxValue) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg min-h-8"
                  style={{ maxHeight: '180px' }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-900 whitespace-nowrap">
                    {trend.emission.toFixed(1)}
                  </div>
                </motion.div>

                {/* Target Line */}
                <div 
                  className="absolute w-full border-t-2 border-dashed border-red-400"
                  style={{ 
                    bottom: `${(trend.target / maxValue) * 180}px`,
                    left: 0
                  }}
                >
                  <div className="absolute -right-2 -top-3 text-xs text-red-600 font-medium">
                    T
                  </div>
                </div>
              </div>

              {/* Month Label */}
              <div className="text-sm font-medium text-gray-600">
                {trend.month}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue.toFixed(0)}</span>
          <span>{(maxValue * 0.75).toFixed(0)}</span>
          <span>{(maxValue * 0.5).toFixed(0)}</span>
          <span>{(maxValue * 0.25).toFixed(0)}</span>
          <span>0</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded"></div>
          <span className="text-gray-600">Emisi Aktual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 border-t-2 border-dashed border-red-400"></div>
          <span className="text-gray-600">Target</span>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Rata-rata Bulanan</div>
          <div className="text-2xl font-bold text-blue-900">
            {(trends.reduce((sum, t) => sum + t.emission, 0) / trends.length).toFixed(1)} kg
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${isImproving ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className={`text-sm font-medium ${isImproving ? 'text-green-600' : 'text-red-600'}`}>
            Tren Bulan Ini
          </div>
          <div className={`text-2xl font-bold ${isImproving ? 'text-green-900' : 'text-red-900'}`}>
            {isImproving ? 'Membaik' : 'Naik'}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 font-medium">Target Tercapai</div>
          <div className="text-2xl font-bold text-gray-900">
            {trends.filter(t => t.emission <= t.target).length}/{trends.length}
          </div>
        </div>
      </div>
    </div>
  );
}
