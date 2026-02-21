'use client'

import { useStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function DampakBaikSection() {
  const { dampakBaik } = useStore()

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              4 Dampak Baik Mengurangi Emisi Karbon
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Setiap tindakan kecil yang Anda lakukan untuk mengurangi emisi karbon 
            memberikan dampak positif yang besar bagi planet dan kehidupan di bumi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dampakBaik.map((dampak, index) => (
            <motion.div
              key={dampak.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center text-3xl">
                    {dampak.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {dampak.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {dampak.description}
                  </p>
                </div>
              </div>

              {/* Visual Enhancement */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">
                    Kontribusi Anda untuk dunia yang lebih baik
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Siap Berkontribusi untuk Planet?
            </h3>
            <p className="text-gray-600 mb-6">
              Mulai perjalanan Anda menuju gaya hidup yang lebih ramah lingkungan. 
              Hitung emisi karbon Anda dan temukan cara untuk menguranginya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
                Hitung Emisi Saya
              </button>
              <button className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors font-medium">
                Pelajari Tips Hijau
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
