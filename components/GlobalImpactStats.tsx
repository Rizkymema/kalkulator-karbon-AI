'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, TreePine, Target } from 'lucide-react'

interface StatsCardProps {
  icon: React.ComponentType<any>
  title: string
  value: string | number
  description: string
  color: string
  delay?: number
}

function StatsCard({ icon: Icon, title, value, description, color, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`p-6 rounded-2xl border-2 border-gray-100 hover:border-${color}-200 hover:shadow-lg transition-all duration-300 bg-white`}
    >
      <div className={`w-12 h-12 rounded-xl bg-${color}-100 flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">
        {value}
      </h3>
      <p className="text-sm font-medium text-gray-700 mb-1">
        {title}
      </p>
      <p className="text-xs text-gray-500">
        {description}
      </p>
    </motion.div>
  )
}

export function GlobalImpactStats() {
  const stats = [
    {
      icon: Users,
      title: 'Pengguna Aktif',
      value: '2,543',
      description: 'Bergabung di Karwanua',
      color: 'blue'
    },
    {
      icon: TreePine,
      title: 'Pohon Ditanam',
      value: '12,458',
      description: 'Melalui program Karwanua',
      color: 'green'
    },
    {
      icon: Target,
      title: 'CO₂ Dikurangi',
      value: '186.7 ton',
      description: 'Total emisi yang sudah dikurangi',
      color: 'orange'
    },
    {
      icon: Trophy,
      title: 'Komunitas',
      value: '45',
      description: 'Grup lokal dan perusahaan',
      color: 'purple'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Dampak Bersama yang Kita Ciptakan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bersama-sama kita telah menciptakan dampak positif untuk lingkungan. 
            Mari terus berkontribusi untuk masa depan yang lebih berkelanjutan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.title}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-green-600 text-white rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Bergabunglah dengan Gerakan Global! 🌍
            </h3>
            <p className="mb-6 opacity-90">
              Setiap aksi kecil yang Anda lakukan berkontribusi pada perubahan besar. 
              Mari bersama-sama menciptakan dunia yang lebih hijau dan berkelanjutan.
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Mulai Kontribusi Saya
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
