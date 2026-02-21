'use client'

import Card from './Card'
import { compareEmissions, getEmissionCategory } from '@/lib/utils'
import { BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface EmissionComparisonProps {
  monthlyEmission: number
}

export function EmissionComparisonCard({ monthlyEmission }: EmissionComparisonProps) {
  const comparison = compareEmissions(monthlyEmission)
  const category = getEmissionCategory(comparison.userEmission)

  const getStatusIcon = (status: 'higher' | 'lower' | 'equal') => {
    switch (status) {
      case 'higher':
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case 'lower':
        return <TrendingDown className="w-4 h-4 text-green-500" />
      case 'equal':
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: 'higher' | 'lower' | 'equal') => {
    switch (status) {
      case 'higher':
        return 'text-red-600 bg-red-50'
      case 'lower':
        return 'text-green-600 bg-green-50'
      case 'equal':
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status: 'higher' | 'lower' | 'equal', percentage: number) => {
    switch (status) {
      case 'higher':
        return `${percentage}% lebih tinggi`
      case 'lower':
        return `${percentage}% lebih rendah`
      case 'equal':
        return 'Sama dengan rata-rata'
    }
  }

  return (
    <Card className="bg-white">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Komparasi Emisi Anda
          </h2>
        </div>

        {/* User Emission Category */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border">
          <div className="text-center mb-3">
            <div className="text-3xl font-bold text-gray-800">
              {comparison.userEmission} ton CO₂
            </div>
            <div className="text-sm text-gray-600">emisi tahunan Anda</div>
          </div>
          <div className="text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${category.color} bg-opacity-10`}>
              {category.category}
            </span>
            <p className="text-xs text-gray-600 mt-2">{category.description}</p>
          </div>
        </div>

        {/* Comparisons */}
        <div className="space-y-4">
          {/* Indonesia Comparison */}
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                🇮🇩
              </div>
              <div>
                <div className="font-medium text-gray-800">Indonesia</div>
                <div className="text-sm text-gray-600">{comparison.indonesia.value} ton CO₂</div>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(comparison.indonesia.status)}`}>
              {getStatusIcon(comparison.indonesia.status)}
              {getStatusText(comparison.indonesia.status, comparison.indonesia.percentage)}
            </div>
          </div>

          {/* ASEAN Comparison */}
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                🌏
              </div>
              <div>
                <div className="font-medium text-gray-800">ASEAN</div>
                <div className="text-sm text-gray-600">{comparison.asean.value} ton CO₂</div>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(comparison.asean.status)}`}>
              {getStatusIcon(comparison.asean.status)}
              {getStatusText(comparison.asean.status, comparison.asean.percentage)}
            </div>
          </div>

          {/* Global Comparison */}
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                🌍
              </div>
              <div>
                <div className="font-medium text-gray-800">Global</div>
                <div className="text-sm text-gray-600">{comparison.global.value} ton CO₂</div>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(comparison.global.status)}`}>
              {getStatusIcon(comparison.global.status)}
              {getStatusText(comparison.global.status, comparison.global.percentage)}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            💡 <strong>Tips:</strong> Emisi yang lebih rendah dari rata-rata menunjukkan gaya hidup yang lebih ramah lingkungan. 
            Terus kurangi emisi Anda dengan menggunakan transportasi umum, menghemat energi, dan mengurangi konsumsi daging.
          </p>
        </div>
      </div>
    </Card>
  )
}
