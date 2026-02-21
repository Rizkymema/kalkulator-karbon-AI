'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Filter, BookOpen, Newspaper } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export function NewsSection() {
  const { newsArticles } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'berita' | 'pustaka'>('all')

  const filteredArticles = newsArticles.filter(article => 
    selectedCategory === 'all' || article.category === selectedCategory
  )

  const getCategoryIcon = (category: 'berita' | 'pustaka') => {
    return category === 'berita' ? 
      <Newspaper className="w-4 h-4" /> : 
      <BookOpen className="w-4 h-4" />
  }

  const getCategoryColor = (category: 'berita' | 'pustaka') => {
    return category === 'berita' ? 
      'bg-blue-100 text-blue-700' : 
      'bg-purple-100 text-purple-700'
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Informasi Terkini
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dapatkan berita terbaru dan publikasi ilmiah tentang lingkungan, 
            perubahan iklim, dan solusi berkelanjutan.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              Semua
            </button>
            <button
              onClick={() => setSelectedCategory('berita')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'berita'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Newspaper className="w-4 h-4 inline mr-2" />
              Berita
            </button>
            <button
              onClick={() => setSelectedCategory('pustaka')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'pustaka'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Pustaka
            </button>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Article Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {getCategoryIcon(article.category)}
                    {article.category === 'berita' ? 'Berita' : 'Pustaka'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.date)}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                  Baca Selengkapnya
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors font-medium">
            Lihat Artikel Lainnya
          </button>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Tetap Terhubung Bersama Kami
            </h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Dapatkan update terbaru tentang isu lingkungan, tips ramah lingkungan, 
              dan perkembangan Karwanua langsung di email Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-3 bg-white text-green-600 rounded-xl hover:bg-gray-100 transition-colors font-medium">
                Berlangganan
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
