'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export function PartnersSection() {
  const [isPaused, setIsPaused] = useState(false);

  const partners = [
    {
      name: "Baciraro Recycle",
      description: "Pengembang ekosistem dan produksi kriya berbahan daur ulang",
      logo: "/images/logo Baciraro Recycle.png",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      name: "Cita Makatana Lestari", 
      description: "Penyedia bahan baku produk daur ulang dan trading bahan daur ulang",
      logo: "/images/logo Cita Makatana Lestari.png",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      name: "ORDERS",
      description: "Pengembang aplikasi dan website berbasis AI",
      logo: "/images/logo ORDERS.png",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200"
    },
    {
      name: "ELMAST BioEnergy",
      description: "Pengembang energi baru terbarukan dan pupuk organik dari pengolahan sampah rumah tangga",
      logo: "/images/logo ELMAST BioEnergy .png",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      name: "Yayasan Tana Nyiur Lestari",
      description: "Program edukasi pengelolaan sampah berbasis masyarakat termasuk bank sampah",
      logo: "/images/logo Yayasan Tana Nyiur Lestari .png",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            SUPPORT BY :
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Karwanua bekerja sama dengan berbagai organisasi untuk menciptakan ekosistem berkelanjutan 
            dan memberikan dampak positif bagi lingkungan
          </p>
        </motion.div>

        {/* Animated Logo Carousel */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex space-x-8"
              animate={{
                x: isPaused ? 0 : [0, -1920], // Move from 0 to negative width of one set
              }}
              transition={{
                duration: isPaused ? 0 : 30,
                repeat: isPaused ? 0 : Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              onClick={() => setIsPaused(!isPaused)}
              style={{ cursor: 'pointer', width: '3840px' }} // Double width for seamless loop
            >
              {/* First set of partners */}
              {partners.map((partner, index) => (
                <motion.div
                  key={`set1-${partner.name}-${index}`}
                  className={`flex-shrink-0 w-48 h-32 ${partner.bgColor} rounded-2xl border-2 ${partner.borderColor} flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Logo */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      width={120}
                      height={80}
                      className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                      }}
                    />
                  </div>

                  {/* Hover Overlay with Info */}
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-bold text-gray-800 text-sm text-center mb-2">
                      {partner.name}
                    </h4>
                    <p className="text-xs text-gray-600 text-center leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Second set of partners for seamless loop */}
              {partners.map((partner, index) => (
                <motion.div
                  key={`set2-${partner.name}-${index}`}
                  className={`flex-shrink-0 w-48 h-32 ${partner.bgColor} rounded-2xl border-2 ${partner.borderColor} flex items-center justify-center p-4 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Logo */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      width={120}
                      height={80}
                      className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                      }}
                    />
                  </div>

                  {/* Hover Overlay with Info */}
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-bold text-gray-800 text-sm text-center mb-2">
                      {partner.name}
                    </h4>
                    <p className="text-xs text-gray-600 text-center leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-emerald-50 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
}
