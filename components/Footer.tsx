import { Leaf, Github, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-[#3AA17E]" />
              <span className="text-xl font-bold text-gray-900">Karwanua</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Platform untuk menghitung jejak karbon pribadi dan menebusnya melalui aksi nyata.
              Bersama-sama kita wujudkan lingkungan yang lebih berkelanjutan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Navigasi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/kalkulator" className="text-gray-600 hover:text-[#3AA17E] text-sm transition-colors">
                  Kalkulator Emisi
                </Link>
              </li>
              <li>
                <Link href="/tebus" className="text-gray-600 hover:text-[#3AA17E] text-sm transition-colors">
                  Karwanua
                </Link>
              </li>
              <li>
                <Link href="/edukasi" className="text-gray-600 hover:text-[#3AA17E] text-sm transition-colors">
                  Edukasi
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-gray-600 hover:text-[#3AA17E] text-sm transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Ikuti Kami
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#3AA17E] transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#3AA17E] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#3AA17E] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-gray-500 text-sm text-center">
            © Copyright 2025, All right reserved by ORDERS
          </p>
        </div>
      </div>
    </footer>
  )
}
