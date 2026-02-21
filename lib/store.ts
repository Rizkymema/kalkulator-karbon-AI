import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface EmissionData {
  transportasi: {
    jenisKendaraan: string
    jarakTempuh: number
    frekuensi: number
  }
  listrik: {
    jenisListrik: 'prabayar' | 'pascabayar' | 'panel_surya'
    kwh: number
    tagihan?: number
    persentasePanelSurya?: number
  }
  makanan: {
    dagingMerah: number
    dagingPutih: number
    produkSusu: number
    polaMakan: 'vegan' | 'vegetarian' | 'omnivora'
  }
  sampah: {
    memilahSampah: boolean
    kantongPlastik: number
    produkDaurUlang: boolean
  }
  belanja: {
    pakaian: number
    gadget: number
    belonjaOnline: number
  }
  penerbangan: {
    domestik: number
    internasional: number
  }
}

export interface TebusSummary {
  totalEmisi: number
  pohonDibutuhkan: number
  aksiTebus: 'tanam' | 'donasi' | 'tantangan' | null
  tanggal: string
  emissionData: EmissionData
}

export interface LeaderboardUser {
  id: string
  nama: string
  avatar: string
  totalEmisi: number
  pohonDitanam: number
  posisi: number
  badge: 'gold' | 'silver' | 'bronze'
}

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  date: string
  category: 'berita' | 'pustaka'
  url?: string
}

export interface DampakBaik {
  id: string
  title: string
  description: string
  icon: string
  image: string
}

interface StoreState {
  emissionData: EmissionData
  tebusSummary: TebusSummary | null
  riwayatAktivitas: TebusSummary[]
  totalKarbonDitebus: number
  leaderboard: LeaderboardUser[]
  newsArticles: NewsArticle[]
  dampakBaik: DampakBaik[]
  
  // Actions
  setEmissionData: (data: EmissionData) => void
  setTebusSummary: (summary: TebusSummary) => void
  addRiwayatAktivitas: (aktivitas: TebusSummary) => void
  resetEmissionData: () => void
}

const initialEmissionData: EmissionData = {
  transportasi: {
    jenisKendaraan: '',
    jarakTempuh: 0,
    frekuensi: 0
  },
  listrik: {
    jenisListrik: 'prabayar',
    kwh: 0,
    tagihan: 0,
    persentasePanelSurya: 0
  },
  makanan: {
    dagingMerah: 0,
    dagingPutih: 0,
    produkSusu: 0,
    polaMakan: 'omnivora'
  },
  sampah: {
    memilahSampah: false,
    kantongPlastik: 0,
    produkDaurUlang: false
  },
  belanja: {
    pakaian: 0,
    gadget: 0,
    belonjaOnline: 0
  },
  penerbangan: {
    domestik: 0,
    internasional: 0
  }
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      emissionData: initialEmissionData,
      tebusSummary: null,
      riwayatAktivitas: [
        // Dummy data
        {
          totalEmisi: 45.2,
          pohonDibutuhkan: 3,
          aksiTebus: 'tanam',
          tanggal: '2024-01-15'
        },
        {
          totalEmisi: 32.8,
          pohonDibutuhkan: 2,
          aksiTebus: 'donasi',
          tanggal: '2024-01-08'
        },
        {
          totalEmisi: 28.5,
          pohonDibutuhkan: 2,
          aksiTebus: 'tantangan',
          tanggal: '2024-01-01'
        }
      ],
      totalKarbonDitebus: 106.5,

      // Leaderboard dummy data
      leaderboard: [
        {
          id: '1',
          nama: 'Andi Rahmanto',
          avatar: '/avatars/andi.jpg',
          totalEmisi: 12.5,
          pohonDitanam: 15,
          posisi: 1,
          badge: 'gold'
        },
        {
          id: '2',
          nama: 'Sari Melati',
          avatar: '/avatars/sari.jpg',
          totalEmisi: 18.2,
          pohonDitanam: 12,
          posisi: 2,
          badge: 'silver'
        },
        {
          id: '3',
          nama: 'Budi Santoso',
          avatar: '/avatars/budi.jpg',
          totalEmisi: 22.8,
          pohonDitanam: 10,
          posisi: 3,
          badge: 'bronze'
        }
      ],

      // News articles dummy data
      newsArticles: [
        {
          id: '1',
          title: 'Tips Mengurangi Emisi Karbon Dari Rumah',
          excerpt: 'Pelajari cara-cara sederhana untuk mengurangi jejak karbon...',
          date: '2024-01-20',
          category: 'berita'
        },
        {
          id: '2',
          title: 'Penelitian Terbaru: Dampak Perubahan Iklim',
          excerpt: 'Studi ilmiah menunjukkan dampak perubahan iklim yang...',
          date: '2024-01-18',
          category: 'pustaka'
        },
        {
          id: '3',
          title: 'Indonesia Komitmen Net Zero Emission 2060',
          excerpt: 'Pemerintah Indonesia menetapkan target ambisius...',
          date: '2024-01-15',
          category: 'berita'
        }
      ],

      // Dampak baik dummy data
      dampakBaik: [
        {
          id: '1',
          title: 'Mencegah Pemanasan Global',
          description: 'Mengurangi emisi karbon membantu memperlambat pemanasan global dan menjaga keseimbangan iklim bumi.',
          icon: '🌡️',
          image: '/images/global-warming.jpg'
        },
        {
          id: '2',
          title: 'Menjaga Ketersediaan Air',
          description: 'Dengan mengurangi emisi, kita membantu menjaga siklus air dan ketersediaan air bersih untuk masa depan.',
          icon: '💧',
          image: '/images/water-conservation.jpg'
        },
        {
          id: '3',
          title: 'Mengurangi Risiko Bencana Alam',
          description: 'Emisi yang lebih rendah membantu mengurangi frekuensi dan intensitas bencana alam ekstrem.',
          icon: '🏔️',
          image: '/images/disaster-prevention.jpg'
        },
        {
          id: '4',
          title: 'Meningkatkan Kualitas Kesehatan',
          description: 'Udara yang lebih bersih dari pengurangan emisi berdampak positif pada kesehatan paru-paru dan jantung.',
          icon: '💚',
          image: '/images/health-improvement.jpg'
        }
      ],

      setEmissionData: (data) => set({ emissionData: data }),
      
      setTebusSummary: (summary) => set({ tebusSummary: summary }),
      
      addRiwayatAktivitas: (aktivitas) => set((state) => ({
        riwayatAktivitas: [aktivitas, ...state.riwayatAktivitas],
        totalKarbonDitebus: state.totalKarbonDitebus + aktivitas.totalEmisi
      })),
      
      resetEmissionData: () => set({ emissionData: initialEmissionData })
    }),
    {
      name: 'tebus-karbon-storage',
      storage: createJSONStorage(() => {
        // Fallback to in-memory storage if localStorage is not available
        try {
          return localStorage
        } catch {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {}
          }
        }
      }),
      partialize: (state) => ({
        riwayatAktivitas: state.riwayatAktivitas,
        totalKarbonDitebus: state.totalKarbonDitebus
      })
    }
  )
)
