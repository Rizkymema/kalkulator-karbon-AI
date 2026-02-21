'use client';

import Link from 'next/link';
import { useStore } from '../lib/store';
import { formatEmission } from '../lib/utils';
import { motion } from 'framer-motion';
import {
  Calculator,
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { DampakBaikSection } from '../components/DampakBaikSection';
import { NewsSection } from '../components/NewsSection';
import { PublikasiSection } from '../components/PublikasiSection';
import { TipsSection } from '../components/TipsSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { GlobalImpactStats } from '../components/GlobalImpactStats';
import { PartnersSection } from '../components/PartnersSection';

export default function HomePage() {
  const { totalKarbonDitebus, riwayatAktivitas } = useStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* 4 Dampak Baik Section */}
      <DampakBaikSection />

      {/* News & Articles Section */}
      <NewsSection />

      {/* Tips Section */}
      <TipsSection />

      {/* Publikasi & Pustaka Section */}
      <PublikasiSection />

      {/* Global Impact Stats */}
      <GlobalImpactStats />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <section className="py-16 bg-[#3AA17E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap Untuk Memulai?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan orang yang sudah memulai perjalanan menuju
              hidup yang lebih berkelanjutan.
            </p>
            <Link
              href="/kalkulator"
              className="bg-white text-[#3AA17E] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Mulai Kalkulasi
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
