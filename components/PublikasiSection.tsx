'use client';

import { motion } from 'framer-motion';
import { BookOpen, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function PublikasiSection() {
  const publikasi = [
    {
      id: 1,
      title: 'Panduan Hidup Berkelanjutan 2024',
      type: 'PDF Guide',
      description: 'Panduan lengkap untuk memulai gaya hidup berkelanjutan dengan tips praktis dan mudah diimplementasikan.',
      cover: '/api/placeholder/300/200',
      downloadUrl: '#',
      isNew: true
    },
    {
      id: 2,
      title: 'Riset Emisi Karbon Indonesia',
      type: 'Research Paper',
      description: 'Hasil penelitian terbaru tentang tingkat emisi karbon di Indonesia dan perbandingannya dengan negara ASEAN.',
      cover: '/api/placeholder/300/200',
      downloadUrl: '#',
      isNew: false
    },
    {
      id: 3,
      title: 'Infografis Perubahan Iklim',
      type: 'Infographic',
      description: 'Visualisasi data dampak perubahan iklim terhadap Indonesia dalam format yang mudah dipahami.',
      cover: '/api/placeholder/300/200',
      downloadUrl: '#',
      isNew: true
    },
    {
      id: 4,
      title: 'Laporan Tahunan Karwanua 2023',
      type: 'Annual Report',
      description: 'Laporan komprehensif pencapaian dan dampak positif platform Karwanua sepanjang tahun 2023.',
      cover: '/api/placeholder/300/200',
      downloadUrl: '#',
      isNew: false
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Publikasi & Pustaka
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Akses berbagai sumber daya edukatif, penelitian, dan panduan untuk mendukung 
            perjalanan berkelanjutan Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {publikasi.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-green-600" />
                </div>
                {item.isNew && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Baru
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-black/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {item.type}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Link
                    href={item.downloadUrl}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm group-hover:gap-3 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Link>
                  <Link
                    href={item.downloadUrl}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/publikasi"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <BookOpen className="w-5 h-5" />
            Lihat Semua Publikasi
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
