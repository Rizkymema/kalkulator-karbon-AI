'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Zap, 
  Utensils, 
  ShoppingBag, 
  Plane, 
  Trash2,
  Check,
  X,
  Calculator,
  BarChart3,
  Home,
  Flame,
  Bus,
  Train,
  ArrowLeft
} from 'lucide-react';

interface EmissionInputs {
  transportasi: {
    mobilBensin: number; // km per bulan
    mobilSolar: number; // km per bulan
    mobilListrik: number; // km per bulan
    motorBensin: number; // km per bulan
    motorListrik: number; // km per bulan
    busTransportUmum: number; // km per bulan
    pesawat: number; // jam terbang per tahun
  };
  listrik: {
    jumlahPenghuni: number; // jumlah orang dalam rumah
    sumberEnergi: string; // PLN, energi_bersih, hybrid
    tagihanListrik: number; // Rp per bulan
    pemakaianListrik: number; // kWh per bulan
  };
  makanan: {
    dagingMerah: number; // kg per bulan
    dagingAyam: number; // kg per bulan
    ikanSeafood: number; // kg per bulan
    produkSusu: number; // kg per bulan
    buahSayur: number; // kg per bulan
    telur: number; // kg per bulan
    nasi: number; // kg per bulan
    roti: number; // kg per bulan
    mieInstan: number; // bungkus per bulan
    tahu: number; // kg per bulan
    tempe: number; // kg per bulan
    kopi: number; // kg per bulan
    teh: number; // kg per bulan
    frekuensiMakan: string; // frequency per day
  };
  sampah: {
    sampahOrganik: number; // kg per bulan
    sampahPlastik: number; // kg per bulan
    sampahKertas: number; // kg per bulan
    sampahLogam: number; // kg per bulan
    sampahKaca: number; // kg per bulan
    sampahElektronik: number; // kg per bulan
  };
  rumah: {
    // Lampu
    lampuNeon: number; // jumlah lampu
    lampuPijar: number; // jumlah lampu  
    lampuLED: number; // jumlah lampu
    // AC dan Kipas
    acInverter: number; // jumlah unit
    acNonInverter: number; // jumlah unit
    kipasAngin: number; // jumlah unit
    // Elektronik
    tv: number; // jumlah unit
    setTopBox: number; // jumlah unit
    // Lainnya
    gasLPG: number; // kg per bulan
    airPAM: number; // m³ per bulan
  };
}

interface CategoryResult {
  category: string;
  totalEmission: number;
  detailedEmissions: {[key: string]: number};
}

interface EmissionCalculatorProps {
  onCalculateAction?: (
    results: {
      totalEmission: number;
      categoryResults: CategoryResult[];
      pohonDibutuhkan: number;
    }
  ) => void;
}

export function EmissionCalculator({ onCalculateAction }: EmissionCalculatorProps = {}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [inputs, setInputs] = useState<EmissionInputs>({
    transportasi: {
      mobilBensin: 0,
      mobilSolar: 0,
      mobilListrik: 0,
      motorBensin: 0,
      motorListrik: 0,
      busTransportUmum: 0,
      pesawat: 0
    },
    listrik: {
      jumlahPenghuni: 0,
      sumberEnergi: 'PLN',
      tagihanListrik: 0,
      pemakaianListrik: 0
    },
    makanan: {
      dagingMerah: 0,
      dagingAyam: 0,
      ikanSeafood: 0,
      produkSusu: 0,
      buahSayur: 0,
      telur: 0,
      nasi: 0,
      roti: 0,
      mieInstan: 0,
      tahu: 0,
      tempe: 0,
      kopi: 0,
      teh: 0,
      frekuensiMakan: '3x'
    },
    sampah: {
      sampahOrganik: 0,
      sampahPlastik: 0,
      sampahKertas: 0,
      sampahLogam: 0,
      sampahKaca: 0,
      sampahElektronik: 0
    },
    rumah: {
      lampuNeon: 0,
      lampuPijar: 0,
      lampuLED: 0,
      acInverter: 0,
      acNonInverter: 0,
      kipasAngin: 0,
      tv: 0,
      setTopBox: 0,
      gasLPG: 0,
      airPAM: 0
    }
  });

  // Custom transport icons
  const TransportIcon = ({ type }: { type: string }) => {
    const iconMap = {
      mobilBensin: (
        <div className="text-4xl">🚗</div>
      ),
      mobilSolar: (
        <div className="text-4xl">🚙</div>
      ),
      mobilListrik: (
        <div className="text-4xl">🔋</div>
      ),
      motorBensin: (
        <div className="text-4xl">🏍️</div>
      ),
      motorListrik: (
        <div className="text-4xl">🛵</div>
      ),
      busTransportUmum: (
        <div className="text-4xl">🚌</div>
      ),
      pesawat: (
        <div className="text-4xl">✈️</div>
      )
    };
    return iconMap[type as keyof typeof iconMap] || iconMap.mobilBensin;
  };

  const categories = [
    {
      id: 'transportasi',
      name: 'Transportasi',
      icon: <Car className="w-6 h-6" />,
      description: 'Hitung lebih detail emisi karbon transportasi kamu',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      inputs: [
        { 
          id: 'mobilBensin', 
          label: 'Mobil Bensin', 
          placeholder: '0', 
          unit: 'km/bulan',
          helper: 'Jarak tempuh mobil bensin per bulan',
          factor: 0.192, // kg CO₂ per km
          icon: 'mobilBensin'
        },
        { 
          id: 'mobilSolar', 
          label: 'Mobil Solar', 
          placeholder: '0', 
          unit: 'km/bulan',
          helper: 'Jarak tempuh mobil diesel per bulan',
          factor: 0.171, // kg CO₂ per km
          icon: 'mobilSolar'
        },
        { 
          id: 'mobilListrik', 
          label: 'Mobil Listrik', 
          placeholder: '0', 
          unit: 'km/bulan',
          helper: 'Jarak tempuh mobil listrik per bulan',
          factor: 0.050, // kg CO₂ per km (lebih rendah)
          icon: 'mobilListrik'
        },
        { 
          id: 'motorBensin', 
          label: 'Motor Bensin', 
          placeholder: '0', 
          unit: 'km/bulan',
          helper: 'Jarak tempuh sepeda motor bensin per bulan',
          factor: 0.103, // kg CO₂ per km
          icon: 'motorBensin'
        },
        { 
          id: 'motorListrik', 
          label: 'Motor Listrik', 
          placeholder: '0', 
          unit: 'km/bulan',
          helper: 'Jarak tempuh sepeda motor listrik per bulan',
          factor: 0.025, // kg CO₂ per km
          icon: 'motorListrik'
        },
        { 
          id: 'busTransportUmum', 
          label: 'Bus/Transport Umum', 
          placeholder: '0', 
          unit: 'km/bulan',
          helper: 'Jarak tempuh menggunakan transportasi umum per bulan',
          factor: 0.068, // kg CO₂ per km (rata-rata bus dan kereta)
          icon: 'busTransportUmum'
        },
        { 
          id: 'pesawat', 
          label: 'Pesawat', 
          placeholder: '0', 
          unit: 'jam/tahun',
          helper: 'Total jam terbang dalam setahun',
          factor: 90, // kg CO₂ per jam penerbangan
          icon: 'pesawat'
        }
      ]
    },
    {
      id: 'listrik',
      name: 'Daya Rumah Tangga',
      icon: <Zap className="w-6 h-6" />,
      description: 'Perhitungan emisi dari konsumsi listrik rumah tangga',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 border-yellow-200',
      inputs: [
        { 
          id: 'jumlahPenghuni', 
          label: 'Jumlah Penghuni Rumah', 
          placeholder: '0', 
          unit: 'orang',
          helper: 'Berapa jumlah orang yang tinggal dalam satu rumah?',
          factor: 0,
          type: 'number'
        },
        { 
          id: 'sumberEnergi', 
          label: 'Sumber Energi Listrik', 
          placeholder: 'PLN', 
          unit: '',
          helper: 'Darimana sumber energi listrik rumah tangga anda?',
          factor: 0,
          type: 'select',
          options: [
            { value: 'PLN', label: '100% PLN', icon: 'pln' },
            { value: 'energi_bersih', label: '100% Energi Bersih', icon: 'solar' },
            { value: 'hybrid', label: 'Hybrid (Dari PLN dan energi bersih)', icon: 'hybrid' }
          ]
        },
        { 
          id: 'tagihanListrik', 
          label: 'Tagihan Listrik', 
          placeholder: '0', 
          unit: 'Rp/bulan',
          helper: 'Berapa tagihan listrik per bulan?',
          factor: 0,
          type: 'number'
        },
        { 
          id: 'pemakaianListrik', 
          label: 'Konsumsi Listrik', 
          placeholder: '0', 
          unit: 'kWh/bulan',
          helper: 'Total pemakaian listrik bulanan dari tagihan PLN',
          factor: 0.794, // kg CO₂ per kWh (faktor emisi listrik Indonesia)
          type: 'number'
        }
      ]
    },
    {
      id: 'rumah',
      name: 'Alat Rumah Tangga',
      icon: <Home className="w-6 h-6" />,
      description: 'Perhitungan emisi dari kebutuhan rumah tangga lainnya',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-200',
      inputs: [
        // Lampu
        { 
          id: 'lampuNeon', 
          label: 'Lampu Neon', 
          placeholder: '0', 
          unit: 'buah',
          helper: 'Jumlah lampu neon di rumah',
          factor: 36, // 36W average
          type: 'appliance',
          category: 'lighting',
          icon: 'lampuNeon'
        },
        { 
          id: 'lampuPijar', 
          label: 'Lampu Pijar', 
          placeholder: '0', 
          unit: 'buah',
          helper: 'Jumlah lampu pijar di rumah',
          factor: 60, // 60W average
          type: 'appliance',
          category: 'lighting',
          icon: 'lampuPijar'
        },
        { 
          id: 'lampuLED', 
          label: 'Lampu LED', 
          placeholder: '0', 
          unit: 'buah',
          helper: 'Jumlah lampu LED di rumah',
          factor: 10, // 10W average
          type: 'appliance',
          category: 'lighting',
          icon: 'lampuLED'
        },
        // AC dan Kipas
        { 
          id: 'acInverter', 
          label: 'AC Inverter', 
          placeholder: '0', 
          unit: 'unit',
          helper: 'Jumlah AC inverter di rumah',
          factor: 900, // 900W average
          type: 'appliance',
          category: 'cooling',
          icon: 'acInverter'
        },
        { 
          id: 'acNonInverter', 
          label: 'AC Non Inverter', 
          placeholder: '0', 
          unit: 'unit',
          helper: 'Jumlah AC non-inverter di rumah',
          factor: 1500, // 1500W average
          type: 'appliance',
          category: 'cooling',
          icon: 'acNonInverter'
        },
        { 
          id: 'kipasAngin', 
          label: 'Kipas Angin', 
          placeholder: '0', 
          unit: 'unit',
          helper: 'Jumlah kipas angin di rumah',
          factor: 75, // 75W average
          type: 'appliance',
          category: 'cooling',
          icon: 'kipasAngin'
        },
        // Elektronik
        { 
          id: 'tv', 
          label: 'TV', 
          placeholder: '0', 
          unit: 'unit',
          helper: 'Jumlah TV di rumah',
          factor: 150, // 150W average
          type: 'appliance',
          category: 'electronics',
          icon: 'tv'
        },
        { 
          id: 'setTopBox', 
          label: 'Set Top Box (STB)', 
          placeholder: '0', 
          unit: 'unit',
          helper: 'Jumlah set top box di rumah',
          factor: 20, // 20W average
          type: 'appliance',
          category: 'electronics',
          icon: 'setTopBox'
        },
        // Gas dan Air
        { 
          id: 'gasLPG', 
          label: 'Gas LPG', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Penggunaan gas LPG per bulan (tabung 3kg = 3kg, tabung 12kg = 12kg)',
          factor: 2.93, // kg CO₂ per kg LPG
          type: 'utility'
        },
        { 
          id: 'airPAM', 
          label: 'Konsumsi Air', 
          placeholder: '0', 
          unit: 'm³/bulan',
          helper: 'Penggunaan air PDAM per bulan dari tagihan',
          factor: 0.376, // kg CO₂ per m³ air
          type: 'utility'
        }
      ]
    },
    {
      id: 'makanan',
      name: 'Makanan',
      icon: <Utensils className="w-6 h-6" />,
      description: 'Perhitungan emisi dari pola makan',
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      inputs: [
        // Protein Hewani
        { 
          id: 'dagingMerah', 
          label: 'Daging Merah', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi daging sapi, kambing, dll per bulan',
          factor: 27, // kg CO₂ per kg daging merah
          type: 'protein',
          category: 'hewani',
          icon: 'dagingMerah'
        },
        { 
          id: 'dagingAyam', 
          label: 'Daging Ayam', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi daging ayam per bulan',
          factor: 6.9, // kg CO₂ per kg daging ayam
          type: 'protein',
          category: 'hewani',
          icon: 'dagingAyam'
        },
        { 
          id: 'ikanSeafood', 
          label: 'Ikan & Seafood', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi ikan dan seafood per bulan',
          factor: 5.4, // kg CO₂ per kg ikan/seafood
          type: 'protein',
          category: 'hewani',
          icon: 'ikanSeafood'
        },
        { 
          id: 'telur', 
          label: 'Telur', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi telur per bulan',
          factor: 4.2, // kg CO₂ per kg telur
          type: 'protein',
          category: 'hewani',
          icon: 'telur'
        },
        { 
          id: 'produkSusu', 
          label: 'Produk Susu', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi susu, keju, yogurt, dll per bulan',
          factor: 2.5, // kg CO₂ per kg produk susu
          type: 'dairy',
          category: 'hewani',
          icon: 'produkSusu'
        },
        // Protein Nabati
        { 
          id: 'tahu', 
          label: 'Tahu', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi tahu per bulan',
          factor: 2.0, // kg CO₂ per kg tahu
          type: 'protein',
          category: 'nabati',
          icon: 'tahu'
        },
        { 
          id: 'tempe', 
          label: 'Tempe', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi tempe per bulan',
          factor: 1.5, // kg CO₂ per kg tempe
          type: 'protein',
          category: 'nabati',
          icon: 'tempe'
        },
        // Karbohidrat
        { 
          id: 'nasi', 
          label: 'Nasi', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi nasi per bulan',
          factor: 2.7, // kg CO₂ per kg beras
          type: 'carbs',
          category: 'pokok',
          icon: 'nasi'
        },
        { 
          id: 'roti', 
          label: 'Roti', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi roti per bulan',
          factor: 1.2, // kg CO₂ per kg roti
          type: 'carbs',
          category: 'pokok',
          icon: 'roti'
        },
        { 
          id: 'mieInstan', 
          label: 'Mie Instan', 
          placeholder: '0', 
          unit: 'bungkus/bulan',
          helper: 'Konsumsi mie instan per bulan',
          factor: 0.8, // kg CO₂ per bungkus
          type: 'processed',
          category: 'pokok',
          icon: 'mieInstan'
        },
        // Buah & Sayur
        { 
          id: 'buahSayur', 
          label: 'Buah & Sayur', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi buah dan sayur per bulan',
          factor: 0.5, // kg CO₂ per kg buah/sayur
          type: 'fresh',
          category: 'nabati',
          icon: 'buahSayur'
        },
        // Minuman
        { 
          id: 'kopi', 
          label: 'Kopi', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi kopi per bulan',
          factor: 17, // kg CO₂ per kg kopi
          type: 'beverage',
          category: 'minuman',
          icon: 'kopi'
        },
        { 
          id: 'teh', 
          label: 'Teh', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Konsumsi teh per bulan',
          factor: 4.6, // kg CO₂ per kg teh
          type: 'beverage',
          category: 'minuman',
          icon: 'teh'
        }
      ]
    },
    {
      id: 'sampah',
      name: 'Sampah',
      icon: <Trash2 className="w-6 h-6" />,
      description: 'Perhitungan emisi dari sampah rumah tangga',
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      inputs: [
        { 
          id: 'sampahOrganik', 
          label: 'Sampah Organik', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Sisa makanan, daun, kulit buah per bulan',
          factor: 0.95, // kg CO₂ per kg sampah organik
          type: 'organic',
          category: 'organik',
          icon: 'sampahOrganik'
        },
        { 
          id: 'sampahPlastik', 
          label: 'Sampah Plastik', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Botol, kantong, kemasan plastik per bulan',
          factor: 2.7, // kg CO₂ per kg sampah plastik
          type: 'recyclable',
          category: 'anorganik',
          icon: 'sampahPlastik'
        },
        { 
          id: 'sampahKertas', 
          label: 'Sampah Kertas', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Koran, kardus, kertas bekas per bulan',
          factor: 1.5, // kg CO₂ per kg sampah kertas
          type: 'recyclable',
          category: 'anorganik',
          icon: 'sampahKertas'
        },
        { 
          id: 'sampahLogam', 
          label: 'Sampah Logam', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Kaleng, aluminium, besi bekas per bulan',
          factor: 3.2, // kg CO₂ per kg sampah logam
          type: 'recyclable',
          category: 'anorganik',
          icon: 'sampahLogam'
        },
        { 
          id: 'sampahKaca', 
          label: 'Sampah Kaca', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'Botol kaca, pecahan kaca per bulan',
          factor: 0.8, // kg CO₂ per kg sampah kaca
          type: 'recyclable',
          category: 'anorganik',
          icon: 'sampahKaca'
        },
        { 
          id: 'sampahElektronik', 
          label: 'Sampah Elektronik', 
          placeholder: '0', 
          unit: 'kg/bulan',
          helper: 'HP bekas, baterai, elektronik per bulan',
          factor: 15.5, // kg CO₂ per kg sampah elektronik
          type: 'hazardous',
          category: 'berbahaya',
          icon: 'sampahElektronik'
        }
      ]
    }
  ];

  const handleInputChange = (category: string, inputId: string, value: string) => {
    // For string inputs like sumberEnergi, keep as string
    // For numeric inputs, convert to number
    let processedValue: any;
    if (inputId === 'sumberEnergi') {
      processedValue = value;
    } else {
      processedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setInputs(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof EmissionInputs],
        [inputId]: processedValue
      }
    }));
  };

  const calculateEmissions = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const categoryResults: CategoryResult[] = [];
      let totalEmission = 0;
      
      // Hitung emisi per kategori
      categories.forEach(category => {
        const detailedEmissions: {[key: string]: number} = {};
        let categoryTotal = 0;
        
        category.inputs.forEach(input => {
          const inputId = input.id;
          const inputValue = (inputs[category.id as keyof EmissionInputs] as any)[inputId] || 0;
          
          // Only calculate emissions for numeric inputs with factors
          if (typeof inputValue === 'number' && input.factor > 0) {
            const emission = inputValue * input.factor;
            detailedEmissions[inputId] = emission;
            categoryTotal += emission;
          }
        });
        
        // Sesuaikan kategori pesawat dari per tahun ke per bulan
        if (category.id === 'transportasi') {
          detailedEmissions['pesawat'] = detailedEmissions['pesawat'] / 12;
          categoryTotal = Object.values(detailedEmissions).reduce((sum, val) => sum + val, 0);
        }
        
        categoryResults.push({
          category: category.id,
          totalEmission: categoryTotal,
          detailedEmissions
        });
        
        totalEmission += categoryTotal;
      });
      
      // Hitung jumlah pohon yang dibutuhkan untuk mengimbangi emisi
      // Rata-rata 1 pohon menyerap 20kg CO2 per tahun atau 1.67kg per bulan
      const pohonDibutuhkan = Math.ceil(totalEmission / 1.67);
      
      setIsCalculating(false);
      if (onCalculateAction) {
        onCalculateAction({
          totalEmission,
          categoryResults,
          pohonDibutuhkan
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-4">
            <Calculator className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Kalkulator Emisi Karbon
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Hitung jejak karbon personal Anda dengan mudah dan dapatkan rekomendasi untuk mengurangi emisi
          </p>
        </div>

        {/* Sticky Progress and Navigation - Always Visible */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-emerald-600/95 via-blue-600/95 to-teal-600/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 border border-white/20">
          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Progress Pengisian</h3>
              <span className="text-sm font-medium text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                {Math.round((categories.filter(cat => 
                  Object.values(inputs[cat.id as keyof EmissionInputs]).some(val => typeof val === 'number' && val > 0)
                ).length / categories.length) * 100)}% Selesai
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-white to-emerald-200 rounded-full transition-all duration-500 shadow-sm"
                style={{ 
                  width: `${(categories.filter(cat => 
                    Object.values(inputs[cat.id as keyof EmissionInputs]).some(val => typeof val === 'number' && val > 0)
                  ).length / categories.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Compact Category Navigation */}
          <div className="grid grid-cols-5 gap-3">
            {categories.map((category, index) => {
              const hasData = Object.values(inputs[category.id as keyof EmissionInputs]).some(val => typeof val === 'number' && val > 0);
              const isActive = activeCategory === category.id;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 border ${
                    isActive 
                      ? 'bg-white/25 border-white/60 shadow-lg scale-105' 
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="absolute top-2 right-2">
                    {hasData ? (
                      <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse shadow-sm"></div>
                    ) : (
                      <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                    )}
                  </div>

                  {/* Icon Container */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto transition-all duration-300 group-hover:scale-110 ${
                    isActive ? 'bg-white/30' : 'bg-white/20'
                  }`}>
                    <div className={`text-white transition-all duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                      {category.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className={`font-bold mb-2 text-sm transition-colors ${
                      isActive ? 'text-white' : 'text-white/90 group-hover:text-white'
                    }`}>
                      {category.name}
                    </h3>
                    
                    {/* Compact Stats */}
                    <div className="flex justify-center items-center gap-2 text-xs">
                      <span className="bg-white/20 text-white/90 px-2 py-1 rounded-full backdrop-blur-sm">
                        {category.inputs.length}
                      </span>
                      {hasData ? (
                        <span className="bg-emerald-400/30 text-white px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                          ✓
                        </span>
                      ) : (
                        <span className="bg-orange-400/30 text-white/80 px-2 py-1 rounded-full backdrop-blur-sm">
                          !
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-emerald-300/20 rounded-xl"></div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Back to Overview Button when category is active */}
          {activeCategory && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/30"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Overview
              </button>
            </div>
          )}
        </div>

        {!activeCategory ? (
          <>
            {/* Action Button */}
            <div className="text-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={calculateEmissions}
                disabled={isCalculating || Object.keys(inputs).every(key => 
                  Object.values(inputs[key as keyof EmissionInputs]).every(val => val === 0)
                )}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCalculating ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin inline-block mr-2"></div>
                    Menghitung Emisi...
                  </>
                ) : (
                  <>
                    <Calculator className="w-6 h-6 inline-block mr-2" />
                    Hitung Total Emisi Karbon
                  </>
                )}
              </motion.button>
            </div>

            {/* Tips Section */}
            <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">💡 Tips Penggunaan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Lengkapi Data</h4>
                    <p className="text-sm text-gray-600">Klik setiap kategori dan isi data konsumsi Anda</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Data Akurat</h4>
                    <p className="text-sm text-gray-600">Gunakan tagihan atau catatan untuk data yang tepat</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Lihat Progress</h4>
                    <p className="text-sm text-gray-600">Monitor progress pengisian di bagian atas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Analisis Hasil</h4>
                    <p className="text-sm text-gray-600">Dapatkan rekomendasi untuk mengurangi emisi</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Tampilan form input untuk kategori yang dipilih
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          >
            {categories.filter(cat => cat.id === activeCategory).map(category => (
              <div key={category.id}>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${category.bgColor}`}>
                      <div className={`${category.color} scale-125`}>
                        {category.icon}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                  </button>
                </div>
                
                {/* Form Inputs */}
                <div className="bg-white/50 rounded-xl p-6 border border-gray-200/50">
                  {category.id === 'transportasi' ? (
                    // Special layout for transportation category
                    <div>
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-bold text-green-600 mb-2">
                          HITUNG LEBIH DETAIL
                        </h3>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">
                          EMISI KARBON TRANSPORTASI KAMU
                        </h4>
                        <p className="text-sm text-gray-600">
                          Pilih jenis kendaraan kamu (dapat memilih lebih dari satu jenis kendaraan)
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.inputs.map((input, index) => (
                          <motion.div
                            key={input.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-green-400 transition-all duration-200 hover:shadow-md"
                          >
                            <div className="flex flex-col items-center text-center space-y-3">
                              {/* Transport Icon */}
                              <div className="text-blue-600">
                                <TransportIcon type={(input as any).icon || input.id} />
                              </div>
                              
                              {/* Vehicle Name */}
                              <h5 className="font-semibold text-gray-800 text-sm">
                                {input.label}
                              </h5>
                              
                              {/* Input Fields */}
                              <div className="w-full space-y-2">
                                <div className="flex items-center justify-between text-xs text-gray-600">
                                  <span>Jarak</span>
                                  <span>Penumpang</span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1">
                                    <input
                                      type="number"
                                      min="0"
                                      placeholder="0"
                                      value={(inputs[category.id as keyof EmissionInputs] as any)[input.id] || ''}
                                      onChange={(e) => handleInputChange(category.id, input.id, e.target.value)}
                                      className="bg-transparent text-sm w-full focus:outline-none text-center"
                                    />
                                  </div>
                                  <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1">
                                    <input
                                      type="number"
                                      min="1"
                                      placeholder="1"
                                      className="bg-transparent text-sm w-full focus:outline-none text-center"
                                    />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                                  <div className="text-center">
                                    <span>{input.unit.split('/')[0]}</span>
                                  </div>
                                  <div className="text-center">
                                    <span>Orang</span>
                                  </div>
                                </div>
                                
                                <div className="border-t pt-2">
                                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Total</span>
                                    <span>{input.unit}</span>
                                  </div>
                                  <div className="bg-green-50 rounded-lg px-2 py-1">
                                    <div className="text-sm font-medium text-green-700 text-center">
                                      {((inputs[category.id as keyof EmissionInputs] as any)[input.id] || 0)}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="border-t pt-2">
                                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Frek.</span>
                                    <span>Trip/Minggu</span>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg px-2 py-1">
                                    <input
                                      type="number"
                                      min="0"
                                      placeholder="0"
                                      className="bg-transparent text-sm w-full focus:outline-none text-center"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Info Icon */}
                              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-green-600" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : category.id === 'listrik' ? (
                    // Special layout for household energy category
                    <div>
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-green-600 mb-4">
                          DAYA RUMAH TANGGA
                        </h3>
                      </div>
                      
                      {/* Jumlah Penghuni */}
                      <div className="mb-8">
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-blue-50 p-4 rounded-2xl">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
                                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.47.53-1.71 1.26L13.5 15H12v3h8v2h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1.5 2h-2C4.45 8 4 8.45 4 9v5.5c0 .28.22.5.5.5S5 14.78 5 14.5V13h1v6h2v-6h1v1.5c0 .28.22.5.5.5s.5-.22.5-.5V9c0-.55-.45-1-1-1z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="max-w-md mx-auto">
                          <label className="block text-center font-medium text-gray-800 mb-3">
                            Berapa jumlah orang yang tinggal dalam satu rumah?
                          </label>
                          <div className="bg-white rounded-xl border-2 border-gray-200 p-3">
                            <input
                              type="number"
                              min="1"
                              placeholder="1"
                              value={(inputs.listrik as any).jumlahPenghuni || ''}
                              onChange={(e) => handleInputChange('listrik', 'jumlahPenghuni', e.target.value)}
                              className="w-full text-center text-2xl font-bold text-gray-800 bg-transparent border-none outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sumber Energi */}
                      <div className="mb-8">
                        <h4 className="text-center font-semibold text-gray-800 mb-6">
                          Darimana sumber energi listrik rumah tangga anda?
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            {
                              value: 'PLN',
                              label: '100% PLN',
                              icon: (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-gray-600">
                                  <path d="M14.69 2.21L4.33 11.49c-.64.58-.28 1.65.58 1.73L13 14l-4.85 6.76c-.22.31-.04.74.31.74.13 0 .25-.06.33-.16l10.36-9.28c.64-.58.28-1.65-.58-1.73L11 9l4.85-6.76c.22-.31.04-.74-.31-.74-.13 0-.25.06-.33.16z"/>
                                </svg>
                              ),
                              bg: 'bg-gray-100'
                            },
                            {
                              value: 'energi_bersih',
                              label: '100% Energi Bersih',
                              icon: (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-600">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 4.24L10.18 9.7 7.16 10.14l2.32 2.26-.55 3.18L12 14.08l3.07 1.5-.55-3.18 2.32-2.26-3.02-.44L12 6.24z"/>
                                </svg>
                              ),
                              bg: 'bg-blue-100'
                            },
                            {
                              value: 'hybrid',
                              label: 'Hybrid (Dari PLN dan energi bersih)',
                              icon: (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-green-600">
                                  <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7zm0 3.24L11.01 8H8.21l2.27 1.65-.86 2.65L12 10.66l2.38 1.64-.86-2.65L15.79 8h-2.8L12 5.24z"/>
                                  <circle cx="6" cy="18" r="2"/>
                                  <circle cx="18" cy="18" r="2"/>
                                </svg>
                              ),
                              bg: 'bg-green-100'
                            }
                          ].map((option) => (
                            <motion.div
                              key={option.value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleInputChange('listrik', 'sumberEnergi', option.value)}
                              className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 text-center ${
                                (inputs.listrik as any).sumberEnergi === option.value
                                  ? 'border-emerald-500 bg-emerald-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className={`${option.bg} rounded-xl p-4 mx-auto mb-3 w-fit`}>
                                {option.icon}
                              </div>
                              <h5 className="font-medium text-gray-800 text-sm">
                                {option.label}
                              </h5>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tagihan dan Konsumsi */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tagihan Listrik */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.13-7.73c-.07.4-.35.72-.68.92l-.5.35c-.31.21-.51.51-.51.86V13h-2v-.5c0-.82.4-1.54 1-2l.5-.35c.1-.08.2-.2.2-.35 0-.48-.4-.8-.85-.8s-.85.32-.85.8H8c0-1.48 1.2-2.8 2.85-2.8S13.7 8.52 13.7 10c0 .7-.35 1.3-.87 1.67l-.7.6z"/>
                              </svg>
                            </div>
                            <label className="font-medium text-gray-800">Tagihan Listrik (Rp/bulan)?</label>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              placeholder="0"
                              value={(inputs.listrik as any).tagihanListrik || ''}
                              onChange={(e) => handleInputChange('listrik', 'tagihanListrik', e.target.value)}
                              className="w-full text-center text-lg font-bold border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                            />
                            <div className="text-center mt-2 text-sm text-gray-600">
                              Rp. {((inputs.listrik as any).tagihanListrik || 0).toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>

                        {/* Konsumsi Listrik */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                <path d="M12 6v3l4 2-1 1.5-5-3V6z"/>
                              </svg>
                            </div>
                            <label className="font-medium text-gray-800">Konsumsi listrik (kWh/bulan)?</label>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              step="0.1"
                              placeholder="0.00"
                              value={(inputs.listrik as any).pemakaianListrik || ''}
                              onChange={(e) => handleInputChange('listrik', 'pemakaianListrik', e.target.value)}
                              className="w-full text-center text-lg font-bold border-2 border-gray-200 rounded-xl p-3 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                            />
                            <div className="text-center mt-2 text-sm text-gray-600">
                              {((inputs.listrik as any).pemakaianListrik || 0)} kWh
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : category.id === 'rumah' ? (
                    // Special layout for household appliances category
                    <div>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                          Pilih Peralatan Rumah Tangga
                        </h3>
                        <p className="text-gray-600">
                          Pilih peralatan yang ada di rumah Anda dan masukkan jumlahnya
                        </p>
                      </div>

                      {/* Lampu Section */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
                          💡 Pencahayaan
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'lighting').map((appliance) => (
                            <motion.div
                              key={appliance.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[appliance.id] > 0
                                  ? 'border-green-500 bg-green-50 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-4xl">
                                  {appliance.id === 'lampuNeon' && '🔆'}
                                  {appliance.id === 'lampuPijar' && '💡'}
                                  {appliance.id === 'lampuLED' && '✨'}
                                </div>
                                <h5 className="font-semibold text-gray-800">{appliance.label}</h5>
                                <p className="text-sm text-gray-500">{appliance.helper}</p>
                                <div className="space-y-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[appliance.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, appliance.id, e.target.value)}
                                    placeholder={appliance.placeholder}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                  />
                                  <span className="text-xs text-gray-400">{appliance.unit}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Pendingin Section */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
                          ❄️ Pendingin & Kipas
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'cooling').map((appliance) => (
                            <motion.div
                              key={appliance.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[appliance.id] > 0
                                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-4xl">
                                  {appliance.id === 'acInverter' && '❄️'}
                                  {appliance.id === 'acNonInverter' && '🏠'}
                                  {appliance.id === 'kipasAngin' && '💨'}
                                </div>
                                <h5 className="font-semibold text-gray-800">{appliance.label}</h5>
                                <p className="text-sm text-gray-500">{appliance.helper}</p>
                                <div className="space-y-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[appliance.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, appliance.id, e.target.value)}
                                    placeholder={appliance.placeholder}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                  <span className="text-xs text-gray-400">{appliance.unit}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Elektronik Section */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
                          📺 Elektronik
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'electronics').map((appliance) => (
                            <motion.div
                              key={appliance.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[appliance.id] > 0
                                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-4xl">
                                  {appliance.id === 'tv' && '📺'}
                                  {appliance.id === 'setTopBox' && '📡'}
                                </div>
                                <h5 className="font-semibold text-gray-800">{appliance.label}</h5>
                                <p className="text-sm text-gray-500">{appliance.helper}</p>
                                <div className="space-y-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[appliance.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, appliance.id, e.target.value)}
                                    placeholder={appliance.placeholder}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  />
                                  <span className="text-xs text-gray-400">{appliance.unit}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Utilitas Section */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
                          🏠 Gas & Air
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.inputs.filter(input => (input as any).type === 'utility').map((appliance) => (
                            <motion.div
                              key={appliance.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[appliance.id] > 0
                                  ? 'border-orange-500 bg-orange-50 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-4xl">
                                  {appliance.id === 'gasLPG' && '🔥'}
                                  {appliance.id === 'airPAM' && '💧'}
                                </div>
                                <h5 className="font-semibold text-gray-800">{appliance.label}</h5>
                                <p className="text-sm text-gray-500">{appliance.helper}</p>
                                <div className="space-y-2">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[appliance.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, appliance.id, e.target.value)}
                                    placeholder={appliance.placeholder}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                  />
                                  <span className="text-xs text-gray-400">{appliance.unit}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Progress indicator for rumah */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress Pengisian</span>
                          <span className="text-sm text-gray-500">
                            {category.inputs.filter(input => 
                              (inputs[category.id as keyof EmissionInputs] as any)[input.id] > 0
                            ).length} / {category.inputs.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${(category.inputs.filter(input => 
                                (inputs[category.id as keyof EmissionInputs] as any)[input.id] > 0
                              ).length / category.inputs.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : category.id === 'makanan' ? (
                    // Special layout for food category
                    <div>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-green-600 mb-3">
                          HITUNG LEBIH DETAIL
                        </h3>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">
                          EMISI KARBON MAKANAN KAMU
                        </h4>
                        <p className="text-gray-600">
                          Pilih jenis makanan dan minuman yang sering kamu konsumsi
                        </p>
                      </div>

                      {/* Frekuensi Makan */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 text-center mb-4">
                          Berapa kali kamu makan dalam sehari?
                        </h4>
                        <div className="flex justify-center gap-4">
                          {['2x', '3x', '4x', '5x+'].map((freq) => (
                            <motion.button
                              key={freq}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleInputChange('makanan', 'frekuensiMakan', freq)}
                              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                                (inputs.makanan as any).frekuensiMakan === freq
                                  ? 'bg-emerald-500 text-white shadow-lg'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {freq}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Protein Hewani Section */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
                          🥩 Protein Hewani
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'hewani').map((food, index) => (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-white rounded-xl p-4 border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[food.id] > 0
                                  ? 'border-red-400 bg-red-50 shadow-lg'
                                  : 'border-gray-200 hover:border-red-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-3xl mb-2">
                                  {food.id === 'dagingMerah' && '🥩'}
                                  {food.id === 'dagingAyam' && '🍗'}
                                  {food.id === 'ikanSeafood' && '🐟'}
                                  {food.id === 'telur' && '🥚'}
                                  {food.id === 'produkSusu' && '🥛'}
                                </div>
                                <h5 className="font-semibold text-gray-800 text-sm">{food.label}</h5>
                                <div className="space-y-2">
                                  <p className="text-xs text-gray-500">Frekuensi</p>
                                  <div className="text-xs text-gray-400">{food.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[food.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, food.id, e.target.value)}
                                    placeholder={food.placeholder}
                                    className="w-full p-2 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                  />
                                  <div className="text-xs text-green-600 font-medium">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[food.id] || 0)} {food.unit.split('/')[0]}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Protein Nabati & Buah/Sayur */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
                          🌱 Protein Nabati & Buah/Sayur
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'nabati').map((food, index) => (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-white rounded-xl p-4 border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[food.id] > 0
                                  ? 'border-green-400 bg-green-50 shadow-lg'
                                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-3xl mb-2">
                                  {food.id === 'tahu' && '🧈'}
                                  {food.id === 'tempe' && '🍘'}
                                  {food.id === 'buahSayur' && '🥗'}
                                </div>
                                <h5 className="font-semibold text-gray-800 text-sm">{food.label}</h5>
                                <div className="space-y-2">
                                  <p className="text-xs text-gray-500">Frekuensi</p>
                                  <div className="text-xs text-gray-400">{food.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[food.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, food.id, e.target.value)}
                                    placeholder={food.placeholder}
                                    className="w-full p-2 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                  />
                                  <div className="text-xs text-green-600 font-medium">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[food.id] || 0)} {food.unit.split('/')[0]}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Makanan Pokok */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
                          🍚 Makanan Pokok
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'pokok').map((food, index) => (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-white rounded-xl p-4 border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[food.id] > 0
                                  ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                                  : 'border-gray-200 hover:border-yellow-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-3xl mb-2">
                                  {food.id === 'nasi' && '🍚'}
                                  {food.id === 'roti' && '🍞'}
                                  {food.id === 'mieInstan' && '🍜'}
                                </div>
                                <h5 className="font-semibold text-gray-800 text-sm">{food.label}</h5>
                                <div className="space-y-2">
                                  <p className="text-xs text-gray-500">Frekuensi</p>
                                  <div className="text-xs text-gray-400">{food.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step={food.id === 'mieInstan' ? '1' : '0.1'}
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[food.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, food.id, e.target.value)}
                                    placeholder={food.placeholder}
                                    className="w-full p-2 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                  />
                                  <div className="text-xs text-green-600 font-medium">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[food.id] || 0)} {food.unit.split('/')[0]}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Minuman */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
                          ☕ Minuman
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'minuman').map((food, index) => (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-white rounded-xl p-4 border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[food.id] > 0
                                  ? 'border-amber-400 bg-amber-50 shadow-lg'
                                  : 'border-gray-200 hover:border-amber-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-3xl mb-2">
                                  {food.id === 'kopi' && '☕'}
                                  {food.id === 'teh' && '🍵'}
                                </div>
                                <h5 className="font-semibold text-gray-800 text-sm">{food.label}</h5>
                                <div className="space-y-2">
                                  <p className="text-xs text-gray-500">Frekuensi</p>
                                  <div className="text-xs text-gray-400">{food.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[food.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, food.id, e.target.value)}
                                    placeholder={food.placeholder}
                                    className="w-full p-2 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                                  />
                                  <div className="text-xs text-green-600 font-medium">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[food.id] || 0)} {food.unit.split('/')[0]}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Add Makanan Button */}
                      <div className="text-center mb-8">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          + Tambah Makanan
                        </motion.button>
                      </div>

                      {/* Progress indicator for makanan */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress Pengisian</span>
                          <span className="text-sm text-gray-500">
                            {category.inputs.filter(input => 
                              (inputs[category.id as keyof EmissionInputs] as any)[input.id] > 0
                            ).length} / {category.inputs.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${(category.inputs.filter(input => 
                                (inputs[category.id as keyof EmissionInputs] as any)[input.id] > 0
                              ).length / category.inputs.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : category.id === 'sampah' ? (
                    // Special layout for waste category
                    <div>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-green-600 mb-3">
                          HITUNG LEBIH DETAIL
                        </h3>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">
                          EMISI KARBON SAMPAH RUMAH TANGGA
                        </h4>
                        <p className="text-gray-600">
                          Pilih jenis sampah yang diproduksi rumah tangga Anda
                        </p>
                      </div>

                      {/* Sampah Organik Section */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
                          🍃 Sampah Organik
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'organik').map((waste, index) => (
                            <motion.div
                              key={waste.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[waste.id] > 0
                                  ? 'border-green-400 bg-green-50 shadow-lg'
                                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="text-4xl">
                                  {waste.id === 'sampahOrganik' && '🍎'}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-800 text-lg">{waste.label}</h5>
                                  <p className="text-sm text-gray-500 mb-3">{waste.helper}</p>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.1"
                                        value={(inputs[category.id as keyof EmissionInputs] as any)[waste.id] || ''}
                                        onChange={(e) => handleInputChange(category.id, waste.id, e.target.value)}
                                        placeholder={waste.placeholder}
                                        className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                      />
                                    </div>
                                    <div className="text-sm text-gray-400">{waste.unit}</div>
                                    <div className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-lg">
                                      {((inputs[category.id as keyof EmissionInputs] as any)[waste.id] || 0)} kg
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Sampah Anorganik (Dapat Didaur Ulang) */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
                          ♻️ Sampah Anorganik (Dapat Didaur Ulang)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'anorganik').map((waste, index) => (
                            <motion.div
                              key={waste.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-white rounded-xl p-4 border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[waste.id] > 0
                                  ? 'border-blue-400 bg-blue-50 shadow-lg'
                                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-3xl mb-2">
                                  {waste.id === 'sampahPlastik' && '🥤'}
                                  {waste.id === 'sampahKertas' && '📄'}
                                  {waste.id === 'sampahLogam' && '🥫'}
                                  {waste.id === 'sampahKaca' && '🍺'}
                                </div>
                                <h5 className="font-semibold text-gray-800 text-sm">{waste.label}</h5>
                                <p className="text-xs text-gray-500">{waste.helper}</p>
                                <div className="space-y-2">
                                  <div className="text-xs text-gray-400">{waste.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[waste.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, waste.id, e.target.value)}
                                    placeholder={waste.placeholder}
                                    className="w-full p-2 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                  />
                                  <div className="text-xs text-green-600 font-medium">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[waste.id] || 0)} kg
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Sampah Berbahaya */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
                          ⚠️ Sampah Berbahaya
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'berbahaya').map((waste, index) => (
                            <motion.div
                              key={waste.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[waste.id] > 0
                                  ? 'border-red-400 bg-red-50 shadow-lg'
                                  : 'border-gray-200 hover:border-red-300 hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="text-4xl">
                                  {waste.id === 'sampahElektronik' && '📱'}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-800 text-lg">{waste.label}</h5>
                                  <p className="text-sm text-gray-500 mb-3">{waste.helper}</p>
                                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                                    <p className="text-xs text-yellow-700">
                                      ⚠️ <strong>Tinggi emisi!</strong> Sebaiknya bawa ke tempat daur ulang khusus
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={(inputs[category.id as keyof EmissionInputs] as any)[waste.id] || ''}
                                        onChange={(e) => handleInputChange(category.id, waste.id, e.target.value)}
                                        placeholder={waste.placeholder}
                                        className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-400 focus:border-transparent"
                                      />
                                    </div>
                                    <div className="text-sm text-gray-400">{waste.unit}</div>
                                    <div className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-lg">
                                      {((inputs[category.id as keyof EmissionInputs] as any)[waste.id] || 0)} kg
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tips Pengurangan Sampah */}
                      <div className="mb-8 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                        <h4 className="text-lg font-semibold text-emerald-800 mb-4">
                          💡 Tips Mengurangi Sampah & Emisi
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center mt-1">
                                <span className="text-emerald-700 text-sm">♻️</span>
                              </div>
                              <div>
                                <h6 className="font-medium text-emerald-800">Pisahkan Sampah</h6>
                                <p className="text-sm text-emerald-700">Organik, plastik, kertas, logam</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center mt-1">
                                <span className="text-emerald-700 text-sm">🌱</span>
                              </div>
                              <div>
                                <h6 className="font-medium text-emerald-800">Kompos Organik</h6>
                                <p className="text-sm text-emerald-700">Ubah sisa makanan jadi pupuk</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center mt-1">
                                <span className="text-emerald-700 text-sm">🛍️</span>
                              </div>
                              <div>
                                <h6 className="font-medium text-emerald-800">Kurangi Plastik</h6>
                                <p className="text-sm text-emerald-700">Pakai tas belanja sendiri</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center mt-1">
                                <span className="text-emerald-700 text-sm">🔄</span>
                              </div>
                              <div>
                                <h6 className="font-medium text-emerald-800">Daur Ulang</h6>
                                <p className="text-sm text-emerald-700">Jual ke bank sampah</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress indicator for sampah */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress Pengisian</span>
                          <span className="text-sm text-gray-500">
                            {category.inputs.filter(input => 
                              (inputs[category.id as keyof EmissionInputs] as any)[input.id] > 0
                            ).length} / {category.inputs.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${(category.inputs.filter(input => 
                                (inputs[category.id as keyof EmissionInputs] as any)[input.id] > 0
                              ).length / category.inputs.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Default layout for other categories
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Data Konsumsi {category.name}
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {category.inputs.map((input, index) => (
                          <motion.div
                            key={input.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="space-y-3"
                          >
                            <label htmlFor={input.id} className="block text-sm font-semibold text-gray-800">
                              {input.label}
                            </label>
                            <div className="relative group">
                              <input
                                id={input.id}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder={input.placeholder}
                                value={(inputs[category.id as keyof EmissionInputs] as any)[input.id] || ''}
                                onChange={(e) => handleInputChange(category.id, input.id, e.target.value)}
                                className="block w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-200 bg-white/80 backdrop-blur-sm group-hover:border-gray-300"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                  {input.unit}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 bg-gray-50/80 p-2 rounded-lg">
                              💡 {input.helper}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="mt-8 text-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCategory(null)}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Check className="w-5 h-5 inline-block mr-2" />
                    Simpan Data {category.name}
                  </motion.button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default EmissionCalculator;