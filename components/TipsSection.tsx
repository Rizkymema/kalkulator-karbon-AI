'use client';

import { motion } from 'framer-motion';
import { 
  Car, 
  Zap, 
  Utensils, 
  ShoppingBag, 
  Plane, 
  Home, 
  Recycle,
  Lightbulb,
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

interface Tip {
  id: number;
  category: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  color: string;
}

export function TipsSection() {
  const tips: Tip[] = [
    {
      id: 1,
      category: 'Transportasi',
      icon: <Car className="w-6 h-6" />,
      title: 'Gunakan Transportasi Umum',
      description: 'Naik bus, kereta, atau MRT untuk mengurangi emisi kendaraan pribadi',
      impact: 'Hemat 2.6 kg CO₂/hari',
      difficulty: 'Mudah',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 2,
      category: 'Energi',
      icon: <Zap className="w-6 h-6" />,
      title: 'Matikan Peralatan Elektronik',
      description: 'Cabut colokan charger dan peralatan elektronik yang tidak digunakan',
      impact: 'Hemat 0.8 kg CO₂/hari',
      difficulty: 'Mudah',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      category: 'Makanan',
      icon: <Utensils className="w-6 h-6" />,
      title: 'Kurangi Konsumsi Daging',
      description: 'Coba diet plant-based 2-3 hari dalam seminggu',
      impact: 'Hemat 3.2 kg CO₂/hari',
      difficulty: 'Sedang',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      category: 'Belanja',
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Beli Produk Lokal',
      description: 'Pilih produk lokal untuk mengurangi emisi transportasi barang',
      impact: 'Hemat 1.5 kg CO₂/hari',
      difficulty: 'Mudah',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 5,
      category: 'Perjalanan',
      icon: <Plane className="w-6 h-6" />,
      title: 'Kurangi Penerbangan',
      description: 'Pilih liburan lokal atau virtual meeting untuk perjalanan bisnis',
      impact: 'Hemat 50+ kg CO₂/trip',
      difficulty: 'Sedang',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 6,
      category: 'Rumah',
      icon: <Home className="w-6 h-6" />,
      title: 'Gunakan AC Seperlunya',
      description: 'Set suhu AC di 24-26°C dan gunakan kipas angin sebagai pendamping',
      impact: 'Hemat 2.1 kg CO₂/hari',
      difficulty: 'Mudah',
      color: 'from-teal-500 to-green-500'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah': return 'bg-green-100 text-green-700';
      case 'Sedang': return 'bg-yellow-100 text-yellow-700';
      case 'Sulit': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900">
              Tips Mengurangi Emisi Karbon
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mulai dengan langkah-langkah sederhana untuk mengurangi jejak karbon Anda. 
            Setiap aksi kecil berkontribusi pada perubahan besar!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className={`h-2 bg-gradient-to-r ${tip.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${tip.color} rounded-xl flex items-center justify-center text-white`}>
                    {tip.icon}
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {tip.category}
                    </span>
                    <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {tip.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                    {tip.difficulty}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {tip.impact}
                  </span>
                </div>

                <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm group-hover:bg-green-50 group-hover:text-green-700">
                  Coba Sekarang
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Recycle className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Tantangan 30 Hari
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Ikuti tantangan 30 hari untuk mengurangi emisi karbon Anda dengan tips harian dan tracking progress
            </p>
            <Link
              href="/challenge"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Mulai Tantangan
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
