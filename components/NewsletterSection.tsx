'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Newsletter Karwanua</h2>
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">
              Tetap Update dengan Gerakan Berkelanjutan
            </h3>
            
            <p className="text-green-100 text-lg leading-relaxed mb-6">
              Dapatkan tips eksklusif, berita terbaru tentang lingkungan, 
              dan panduan praktis untuk hidup lebih berkelanjutan langsung di inbox Anda.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-green-100">Tips mingguan hidup berkelanjutan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-green-100">Update terbaru penelitian lingkungan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-green-100">Akses awal ke fitur dan konten baru</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-8 h-8 text-green-600 transform rotate-45" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Terima Kasih!
                  </h3>
                  <p className="text-gray-600">
                    Anda telah berhasil berlangganan newsletter Karwanua. 
                    Periksa email Anda untuk konfirmasi.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Bergabung Sekarang
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Gratis dan bisa berhenti berlangganan kapan saja
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubscribing || !email}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium flex items-center justify-center gap-2 group"
                    >
                      {isSubscribing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Berlangganan...
                        </>
                      ) : (
                        <>
                          Berlangganan Newsletter
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Dengan berlangganan, Anda menyetujui{' '}
                    <a href="#" className="text-green-600 hover:underline">
                      Kebijakan Privasi
                    </a>{' '}
                    kami
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
