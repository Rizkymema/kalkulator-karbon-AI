# 🌱 Karwanua

> **Platform Jejak Karbon Berbasis Web dengan Fitur Gamifikasi**

Karwanua adalah platform web yang membantu pengguna menghitung jejak karbon pribadi dan menebusnya melalui aksi nyata seperti menanam pohon, berdonasi, atau mengikuti tantangan ramah lingkungan.

![Karwanua Preview](https://via.placeholder.com/800x400/3AA17E/FFFFFF?text=Karwanua+Website)

## ✨ Fitur Utama

### 🧮 Kalkulator Jejak Karbon
- **Step-by-step calculator** untuk menghitung emisi dari:
  - 🚗 Transportasi (mobil, motor, transportasi umum, dll.)
  - ⚡ Konsumsi listrik rumah tangga
  - 🍖 Pola konsumsi makanan (daging, produk hewani)
  - 🛍️ Gaya hidup (plastik, belanja online)
- Formula kalkulasi yang akurat berdasarkan standar internasional
- Hasil dalam kg CO₂ dan konversi ke jumlah pohon yang dibutuhkan

### 📊 Komparasi Emisi Global
- **Bandingkan emisi Anda** dengan rata-rata:
  - �🇩 Indonesia (2.3 ton CO₂/tahun)
  - 🌏 ASEAN (4.2 ton CO₂/tahun) 
  - 🌍 Global (4.8 ton CO₂/tahun)
- Kategori emisi (Sangat Rendah, Rendah, Sedang, Tinggi, Sangat Tinggi)
- Persentase perbedaan dan status emisi
- Tips personalisasi berdasarkan kategori

### 🏆 Leaderboard Pengguna
- **Peringkat 3 teratas** pengguna dengan emisi terendah
- Badge sistem (Gold, Silver, Bronze)
- Statistik pohon yang ditanam
- Motivasi untuk berpartisipasi dan kompetisi sehat

### �🌳 Sistem Tebus Karbon
- **3 Pilihan Aksi Tebus:**
  - 🌱 **Tanam Pohon Sendiri** - Upload foto dan lokasi penanaman
  - ❤️ **Donasi** - Link ke platform seperti LindungiHutan dan Kitabisa
  - 🎯 **Tantangan Hijau** - Komitmen perubahan gaya hidup
- Tracking aktivitas tebusan
- Konfirmasi dan notifikasi sukses

### 💚 4 Dampak Baik Mengurangi Emisi
- **Edukasi visual** tentang manfaat mengurangi emisi karbon:
  - 🌡️ **Mencegah Pemanasan Global**
  - 💧 **Menjaga Ketersediaan Air**
  - 🏔️ **Mengurangi Risiko Bencana Alam**
  - 💚 **Meningkatkan Kualitas Kesehatan**
- Penjelasan lengkap dampak dan kontribusi personal

### 📰 Berita & Pustaka Lingkungan
- **Informasi terkini** tentang isu lingkungan dan perubahan iklim
- Filter berdasarkan kategori (Berita, Pustaka)
- Artikel dummy tentang:
  - Tips mengurangi emisi karbon
  - Penelitian perubahan iklim
  - Kebijakan pemerintah
  - Teknologi ramah lingkungan
- **Newsletter subscription** untuk update terbaru

### 📊 Riwayat & Analytics
- Dashboard personal dengan statistik emisi
- Riwayat kalkulasi dan aksi tebusan
- Grafik emisi per bulan
- Total karbon yang sudah ditebus
- Tips untuk mengurangi jejak karbon

### 📚 Edukasi Lingkungan
- Artikel dan tips ramah lingkungan
- Kuis interaktif tentang lingkungan
- Filter berdasarkan kategori (transportasi, energi, sampah, air)
- Fakta menarik tentang perubahan iklim

### ℹ️ Tentang & Kontak
- Informasi misi dan visi
- Profil tim pengembang
- Statistik dampak platform
- Informasi kontak

## 🛠️ Teknologi yang Digunakan

- **Framework:** [Next.js 15](https://nextjs.org/) dengan App Router
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) dengan persist middleware
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Language:** TypeScript

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/karwanua.git
   cd karwanua
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

### Build untuk Production

```bash
npm run build
npm start
```

## 📁 Struktur Project

```
karwanua/
├── app/                    # App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   ├── kalkulator/       # Calculator page
│   ├── tebus/           # Carbon offset page
│   ├── riwayat/         # History page
│   ├── edukasi/         # Education page
│   └── tentang/         # About page
├── components/           # Reusable components
│   ├── Navbar.tsx       # Navigation
│   ├── Footer.tsx       # Footer
│   ├── Card.tsx         # Card component
│   └── Button.tsx       # Button component
├── lib/                 # Utilities
│   ├── store.ts         # Zustand store
│   └── utils.ts         # Helper functions
└── public/             # Static assets
```

## 🧮 Formula Kalkulasi Emisi

### Transportasi (kg CO₂/km)
- Mobil pribadi: 0.21
- Motor: 0.08
- Bus/Angkutan umum: 0.05
- Kereta api: 0.03
- Pesawat: 0.25
- Sepeda/Jalan kaki: 0

### Energi
- Listrik: 0.85 kg CO₂/kWh

### Makanan (kg CO₂/porsi/hari)
- Daging: 3.3
- Produk hewani lainnya: 1.5

### Gaya Hidup (kg CO₂/unit/bulan)
- Penggunaan plastik: 0.8
- Belanja online: 2.5 per paket

### Tebusan
- 1 pohon dapat menyerap ~15 kg CO₂ per tahun

## 💾 Penyimpanan Data

- Menggunakan localStorage untuk persist data
- Data yang disimpan:
  - Riwayat kalkulasi
  - Total karbon yang ditebus
  - Preferensi pengguna
- Fallback ke in-memory storage jika localStorage tidak tersedia

## 🎨 Design System

### Warna Utama
- **Primary Green:** `#3AA17E`
- **Background:** `#FFFFFF`
- **Text:** `#171717`

### Typography
- Font: System UI stack (system-ui, -apple-system, sans-serif)
- Hierarki heading yang jelas
- Readable body text

### Komponen
- Consistent border radius (rounded-lg, rounded-xl)
- Subtle shadows dan hover effects
- Accessible focus states
- Responsive design untuk semua device

## 📱 Responsive Design

- **Mobile First:** Didesain untuk mobile terlebih dahulu
- **Breakpoints:**
  - sm: 640px+
  - md: 768px+
  - lg: 1024px+
  - xl: 1280px+

## ♿ Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus indicators yang jelas
- Alt text untuk images
- ARIA labels untuk complex components

## 🔮 Roadmap & Pengembangan

### Fase 1 (Saat ini)
- ✅ Kalkulator jejak karbon
- ✅ Sistem tebus karbon
- ✅ Riwayat aktivitas
- ✅ Edukasi dan konten
- ✅ UI/UX responsif

### Fase 2 (Future)
- 🔄 Integrasi dengan API real-time
- 🔄 User authentication
- 🔄 Social sharing features
- 🔄 Peta lokasi pohon dengan Leaflet.js
- 🔄 Push notifications untuk reminder
- 🔄 Gamification dengan badges dan achievements

### Fase 3 (Advanced)
- 🔄 Integration dengan payment gateway
- 🔄 Partnership dengan organisasi lingkungan
- 🔄 Mobile app (React Native)
- 🔄 AI recommendations untuk lifestyle changes
- 🔄 Community features dan leaderboard

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Berikut cara berkontribusi:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Development Guidelines

- Gunakan TypeScript untuk type safety
- Follow ESLint dan Prettier configuration
- Tulis unit tests untuk utility functions
- Ensure responsive design
- Maintain accessibility standards

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Tim Pengembang

- **Environmental Scientist** - Dr. Sarah Green
- **Software Engineer** - Ahmad Rizki  
- **Sustainability Expert** - Maya Sari

## 📞 Kontak

- **Email:** info@karwanua.com
- **Website:** [karwanua.com](https://karwanua.com)
- **GitHub:** [github.com/karwanua](https://github.com/karwanua)

---

### 🌍 "Setiap tindakan kecil untuk lingkungan adalah langkah besar untuk masa depan bumi"

**Dibuat dengan ❤️ untuk bumi yang lebih hijau**


