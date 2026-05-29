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
      jumlahPenghuni: 1,
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

  // State details for Transportation to allow highly accurate custom formulas
  const [transportDetails, setTransportDetails] = useState<Record<string, { jarak: number; penumpang: number; frekuensi: number }>>({
    mobilBensin: { jarak: 0, penumpang: 1, frekuensi: 0 },
    mobilSolar: { jarak: 0, penumpang: 1, frekuensi: 0 },
    mobilListrik: { jarak: 0, penumpang: 1, frekuensi: 0 },
    motorBensin: { jarak: 0, penumpang: 1, frekuensi: 0 },
    motorListrik: { jarak: 0, penumpang: 1, frekuensi: 0 },
    busTransportUmum: { jarak: 0, penumpang: 1, frekuensi: 0 },
    pesawat: { jarak: 0, penumpang: 1, frekuensi: 0 }
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
      color: 'text-blue-400',
      bgColor: 'bg-blue-950/20 border-blue-500/10 text-blue-300',
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
          factor: 0.050, // kg CO₂ per km
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
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/20 border-amber-500/10 text-amber-300',
      inputs: [
        { 
          id: 'jumlahPenghuni', 
          label: 'Jumlah Penghuni Rumah', 
          placeholder: '1', 
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
            { value: 'hybrid', label: 'Hybrid (PLN & Energi Bersih)', icon: 'hybrid' }
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
          factor: 0.794, // kg CO₂ per kWh
          type: 'number'
        }
      ]
    },
    {
      id: 'rumah',
      name: 'Alat Rumah Tangga',
      icon: <Home className="w-6 h-6" />,
      description: 'Perhitungan emisi dari kebutuhan rumah tangga lainnya',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-950/20 border-indigo-500/10 text-indigo-300',
      inputs: [
        // Lampu
        { 
          id: 'lampuNeon', 
          label: 'Lampu Neon', 
          placeholder: '0', 
          unit: 'buah',
          helper: 'Jumlah lampu neon di rumah (36 Watt)',
          factor: 36, // 36W
          type: 'appliance',
          category: 'lighting',
          icon: 'lampuNeon'
        },
        { 
          id: 'lampuPijar', 
          label: 'Lampu Pijar', 
          placeholder: '0', 
          unit: 'buah',
          helper: 'Jumlah lampu pijar di rumah (60 Watt)',
          factor: 60, // 60W
          type: 'appliance',
          category: 'lighting',
          icon: 'lampuPijar'
        },
        { 
          id: 'lampuLED', 
          label: 'Lampu LED', 
          placeholder: '0', 
          unit: 'buah',
          helper: 'Jumlah lampu LED di rumah (10 Watt)',
          factor: 10, // 10W
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
          helper: 'Jumlah AC inverter di rumah (900 Watt)',
          factor: 900, // 900W
          type: 'appliance',
          category: 'cooling',
          icon: 'acInverter'
        },
        { 
          id: 'acNonInverter', 
          label: 'AC Non Inverter', 
          placeholder: '0', 
          unit: 'unit',
          helper: 'Jumlah AC non-inverter di rumah (1500 Watt)',
          factor: 1500, // 1500W
          type: 'appliance',
          category: 'cooling',
          icon: 'acNonInverter'
        },
        { 
          id: 'kipasAngin', 
          label: 'Kipas Angin', 
          placeholder: '0', 
          unit: 'unit',
          helper: 'Jumlah kipas angin di rumah (75 Watt)',
          factor: 75, // 75W
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
          helper: 'Jumlah TV di rumah (150 Watt)',
          factor: 150, // 150W
          type: 'appliance',
          category: 'electronics',
          icon: 'tv'
        },
        { 
          id: 'setTopBox', 
          label: 'Set Top Box (STB)', 
          placeholder: '0', 
          unit: 'unit',
          helper: 'Jumlah set top box di rumah (20 Watt)',
          factor: 20, // 20W
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
      color: 'text-red-400',
      bgColor: 'bg-red-950/20 border-red-500/10 text-red-300',
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
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/20 border-emerald-500/10 text-emerald-300',
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

  // Dedicated handler to store detailed transportation parameters and compute total monthly distance
  const handleTransportDetailChange = (inputId: string, field: 'jarak' | 'penumpang' | 'frekuensi', value: string) => {
    const numericValue = value === '' ? (field === 'penumpang' ? 1 : 0) : parseFloat(value);
    
    setTransportDetails(prev => {
      const updated = {
        ...prev,
        [inputId]: {
          ...prev[inputId],
          [field]: numericValue
        }
      };
      
      // Calculate total monthly distance based on: (jarak * frekuensi * 4.28) / penumpang
      let calculatedTotal = updated[inputId].jarak;
      if (inputId === 'busTransportUmum') {
        if (updated[inputId].frekuensi > 0) {
          calculatedTotal = updated[inputId].jarak * updated[inputId].frekuensi * 4.28;
        }
      } else if (updated[inputId].frekuensi > 0) {
        calculatedTotal = (updated[inputId].jarak * updated[inputId].frekuensi * 4.28) / (updated[inputId].penumpang || 1);
      } else {
        // Fallback to sharing distance by passengers if frequency is not defined
        calculatedTotal = updated[inputId].jarak / (updated[inputId].penumpang || 1);
      }
      
      if (inputId === 'pesawat') {
        calculatedTotal = updated[inputId].jarak; // flight hours per year
      }

      setInputs(prevInputs => ({
        ...prevInputs,
        transportasi: {
          ...prevInputs.transportasi,
          [inputId]: calculatedTotal
        }
      }));
      
      return updated;
    });
  };

  const calculateEmissions = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const categoryResults: CategoryResult[] = [];
      let totalEmission = 0;
      
      categories.forEach(category => {
        const detailedEmissions: {[key: string]: number} = {};
        let categoryTotal = 0;
        
        if (category.id === 'transportasi') {
          category.inputs.forEach(input => {
            // Jarak is the calculated monthly distance (or yearly flight hours) synced to inputs.transportasi
            let distance = inputs.transportasi[input.id as keyof typeof inputs.transportasi] || 0;
            
            if (input.id === 'pesawat') {
              distance = distance / 12; // divide yearly hours by 12 to get monthly hours
            }
            
            const emission = distance * input.factor;
            detailedEmissions[input.id] = emission;
            categoryTotal += emission;
          });
        } 
        else if (category.id === 'listrik') {
          let kWh = inputs.listrik.pemakaianListrik;
          // Estimate kWh from bill if user only inputted tagihanListrik
          if (kWh === 0 && inputs.listrik.tagihanListrik > 0) {
            kWh = inputs.listrik.tagihanListrik / 1500;
          }
          // Personal footprint is shared among household occupants
          const occupants = inputs.listrik.jumlahPenghuni || 1;
          const personalKWh = kWh / occupants;
          
          let gridFactor = 0.794; // PLN emission factor (kg CO₂ / kWh)
          if (inputs.listrik.sumberEnergi === 'energi_bersih') {
            gridFactor = 0;
          } else if (inputs.listrik.sumberEnergi === 'hybrid') {
            gridFactor = 0.794 * 0.5;
          }
          
          const emission = personalKWh * gridFactor;
          detailedEmissions['pemakaianListrik'] = emission;
          categoryTotal = emission;
        } 
        else if (category.id === 'rumah') {
          const occupants = inputs.listrik.jumlahPenghuni || 1;
          let gridFactor = 0.794;
          if (inputs.listrik.sumberEnergi === 'energi_bersih') {
            gridFactor = 0;
          } else if (inputs.listrik.sumberEnergi === 'hybrid') {
            gridFactor = 0.794 * 0.5;
          }
          
          // 1. Calculate lighting monthly kWh: count * (W / 1000) * standard_hours_daily * 30_days
          const neonKWh = inputs.rumah.lampuNeon * (36 / 1000) * 6 * 30; // 36W, 6h/day
          const pijarKWh = inputs.rumah.lampuPijar * (60 / 1000) * 6 * 30; // 60W, 6h/day
          const ledKWh = inputs.rumah.lampuLED * (10 / 1000) * 6 * 30; // 10W, 6h/day
          
          // 2. Calculate cooling monthly kWh
          const acInvKWh = inputs.rumah.acInverter * (900 / 1000) * 8 * 30; // 900W, 8h/day
          const acNonInvKWh = inputs.rumah.acNonInverter * (1500 / 1000) * 8 * 30; // 1500W, 8h/day
          const kipasKWh = inputs.rumah.kipasAngin * (75 / 1000) * 10 * 30; // 75W, 10h/day
          
          // 3. Calculate electronics monthly kWh
          const tvKWh = inputs.rumah.tv * (150 / 1000) * 4 * 30; // 150W, 4h/day
          const stbKWh = inputs.rumah.setTopBox * (20 / 1000) * 6 * 30; // 20W, 6h/day
          
          // If electricity bill or direct kWh is provided in the main category, electronics' electricity emissions are already included in that bill.
          const hasDirectElectricity = inputs.listrik.pemakaianListrik > 0 || inputs.listrik.tagihanListrik > 0;
          
          const totalAppliancesKWh = hasDirectElectricity 
            ? 0 
            : (neonKWh + pijarKWh + ledKWh + acInvKWh + acNonInvKWh + kipasKWh + tvKWh + stbKWh) / occupants;
          
          detailedEmissions['peralatanListrik'] = totalAppliancesKWh * gridFactor;
          
          // 4. Gas & Air (divide monthly impact by household occupants)
          const gasEmission = (inputs.rumah.gasLPG / occupants) * 2.93; // 2.93 kg CO₂ / kg LPG
          const airEmission = (inputs.rumah.airPAM / occupants) * 0.376; // 0.376 kg CO₂ / m³ PDAM
          
          detailedEmissions['gasLPG'] = gasEmission;
          detailedEmissions['airPAM'] = airEmission;
          
          categoryTotal = Object.values(detailedEmissions).reduce((sum, val) => sum + val, 0);
        }
        else if (category.id === 'sampah') {
          const occupants = inputs.listrik.jumlahPenghuni || 1;
          category.inputs.forEach(input => {
            const inputId = input.id;
            const inputValue = (inputs.sampah as any)[inputId] || 0;
            
            if (typeof inputValue === 'number' && input.factor > 0) {
              // Share household waste among occupants
              const emission = (inputValue / occupants) * input.factor;
              detailedEmissions[inputId] = emission;
              categoryTotal += emission;
            }
          });
        }
        else {
          // Food (makanan) is calculated directly per person
          category.inputs.forEach(input => {
            const inputId = input.id;
            const inputValue = (inputs[category.id as keyof EmissionInputs] as any)[inputId] || 0;
            
            if (typeof inputValue === 'number' && input.factor > 0) {
              const emission = inputValue * input.factor;
              detailedEmissions[inputId] = emission;
              categoryTotal += emission;
            }
          });
        }
        
        categoryResults.push({
          category: category.id,
          totalEmission: categoryTotal,
          detailedEmissions
        });
        
        totalEmission += categoryTotal;
      });
      
      // Average 1 tree absorbs 20kg CO2 per year or 1.67kg per month
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
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-950/20 px-5 py-2.5 rounded-full mb-3.5 border border-emerald-500/10">
            <Calculator className="w-5 h-5 text-emerald-450" />
            <h1 className="text-base font-bold text-emerald-400 tracking-tight leading-none uppercase">
              Kalkulator Emisi Karbon
            </h1>
          </div>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed font-semibold">
            Hitung jejak karbon personal Anda dengan mudah dan dapatkan rekomendasi untuk mengurangi emisi.
          </p>
        </div>

        {/* Progress and Navigation - Clean Card */}
        <div className="bg-slate-950/30 border border-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl mb-8">
          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-emerald-500 rounded-full"></div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progress Pengisian</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-500/10 px-3 py-1 rounded-full">
                {Math.round((categories.filter(cat => 
                  Object.values(inputs[cat.id as keyof EmissionInputs]).some(val => typeof val === 'number' && val > 0)
                ).length / categories.length) * 100)}% Selesai
              </span>
            </div>
            <div className="w-full bg-slate-900/60 border border-white/5 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(categories.filter(cat => 
                    Object.values(inputs[cat.id as keyof EmissionInputs]).some(val => typeof val === 'number' && val > 0)
                  ).length / categories.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Compact Category Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {categories.map((category, index) => {
              const totalFields = category.inputs.length;
              const filledFields = Object.keys(inputs[category.id as keyof EmissionInputs] || {}).filter(key => {
                const val = (inputs[category.id as keyof EmissionInputs] as any)[key];
                return typeof val === 'number' && val > 0;
              }).length;
              const hasData = filledFields > 0;
              const isActive = activeCategory === category.id;

              const themeColorMap: Record<string, { bg: string, text: string, border: string, bgActive: string }> = {
                transportasi: { bg: 'bg-blue-950/20 border-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/10', bgActive: 'bg-blue-950/30 border-blue-500/30 ring-blue-500/20 text-blue-400' },
                listrik: { bg: 'bg-amber-950/20 border-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/10', bgActive: 'bg-amber-950/30 border-amber-500/30 ring-amber-500/20 text-amber-400' },
                rumah: { bg: 'bg-indigo-950/20 border-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/10', bgActive: 'bg-indigo-950/30 border-indigo-500/30 ring-indigo-500/20 text-indigo-400' },
                makanan: { bg: 'bg-red-950/20 border-red-500/10', text: 'text-red-400', border: 'border-red-500/10', bgActive: 'bg-red-950/30 border-red-500/30 ring-red-500/20 text-red-400' },
                sampah: { bg: 'bg-emerald-950/20 border-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/10', bgActive: 'bg-emerald-950/30 border-emerald-500/30 ring-emerald-500/20 text-emerald-400' },
              };
              const theme = themeColorMap[category.id] || themeColorMap.sampah;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative rounded-2xl p-4 cursor-pointer transition-all duration-300 border flex flex-col justify-between items-center text-center ${
                    isActive 
                      ? `${theme.bgActive} border ring-2 scale-102 shadow-lg` 
                      : 'bg-slate-900/40 hover:bg-slate-900/60 border-white/5 hover:border-emerald-500/20 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {/* Icon Container */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto transition-all duration-300 group-hover:scale-105 ${
                    isActive || hasData ? theme.bg : 'bg-slate-950/60 border border-white/5'
                  }`}>
                    <div className={`transition-all duration-300 ${
                      isActive || hasData ? theme.text : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      {category.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center w-full">
                    <h3 className="font-bold text-slate-200 text-xs sm:text-sm group-hover:text-white transition-colors mb-2">
                      {category.name}
                    </h3>
                    
                    {/* Progress pill */}
                    <div className="inline-flex items-center justify-center">
                      {hasData ? (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.bg} ${theme.text}`}>
                          {filledFields} / {totalFields} Terisi
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-950/60 text-slate-500 border border-white/5">
                          {totalFields} Parameter
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Back to Overview Button when category is active */}
          {activeCategory && (
            <div className="mt-5 pt-4 border-t border-white/5 text-center">
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-2 bg-slate-900/60 hover:bg-slate-900/80 text-slate-200 border border-white/5 px-4 py-2 rounded-xl transition-all duration-200 font-bold text-xs"
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
                className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="mt-12 bg-slate-950/30 border border-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-xl font-black text-white mb-8 text-center uppercase tracking-wider relative z-10">💡 Tips Penggunaan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-455 font-black">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Lengkapi Data</h4>
                    <p className="text-sm text-slate-400 font-medium">Klik setiap kategori di atas dan isi data konsumsi Anda secara berurutan.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-405 font-black">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Gunakan Data Akurat</h4>
                    <p className="text-sm text-slate-400 font-medium">Gunakan riwayat tagihan listrik, air, atau catatan perjalanan untuk akurasi data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 text-purple-400 font-black">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Pantau Progress</h4>
                    <p className="text-sm text-slate-400 font-medium">Lihat indikator progress persentase pengisian di bagian atas untuk kesiapan hitung.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-400 font-black">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Analisis Hasil</h4>
                    <p className="text-sm text-slate-400 font-medium">Setelah tombol kalkulasi ditekan, Anda akan mendapatkan rekomendasi AI secara otomatis.</p>
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
            className="bg-slate-950/30 border border-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {categories.filter(cat => cat.id === activeCategory).map(category => (
              <div key={category.id} className="relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${category.bgColor} border`}>
                      <div className={`${category.color} scale-125`}>
                        {category.icon}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-wider">{category.name}</h2>
                      <p className="text-slate-400 text-sm font-semibold">{category.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900/60 hover:bg-slate-900/80 border border-white/5 rounded-xl transition-colors text-slate-200 font-bold self-start sm:self-auto text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                  </button>
                </div>
                
                {/* Form Inputs Container */}
                <div className="bg-slate-950/40 rounded-2xl p-6 border border-white/5">
                  {category.id === 'transportasi' ? (
                    // Special layout for transportation category
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-sm font-black text-emerald-400 mb-2 uppercase tracking-widest">
                          HITUNG LEBIH DETAIL
                        </h3>
                        <h4 className="text-xl font-bold text-white mb-2">
                          EMISI KARBON TRANSPORTASI KAMU
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">
                          Masukkan data di bawah untuk menghitung secara presisi per orang per bulan.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.inputs.map((input, index) => (
                          <motion.div
                            key={input.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-slate-950/60 rounded-2xl p-5 border border-white/10 hover:border-emerald-500/30 hover:bg-slate-950/80 transition-all duration-200 hover:shadow-lg"
                          >
                            <div className="flex flex-col items-center text-center space-y-4">
                              {/* Transport Icon */}
                              <div className="text-emerald-400">
                                <TransportIcon type={(input as any).icon || input.id} />
                              </div>
                              
                              {/* Vehicle Name */}
                              <h5 className="font-bold text-white text-sm">
                                {input.label}
                              </h5>
                              
                              {/* Input Fields */}
                              <div className="w-full space-y-3">
                                {input.id === 'pesawat' ? (
                                  // Flights special simple inputs
                                  <div className="space-y-2">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase block text-left">Total Jam Terbang</label>
                                    <div className="flex items-center bg-slate-950/80 border border-white/5 rounded-xl px-2 py-2">
                                      <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={transportDetails[input.id]?.jarak || ''}
                                        onChange={(e) => handleTransportDetailChange(input.id, 'jarak', e.target.value)}
                                        className="bg-transparent text-sm w-full focus:outline-none text-center text-white font-bold"
                                      />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-semibold block text-center">Jam / Tahun</span>
                                  </div>
                                ) : input.id === 'busTransportUmum' ? (
                                  // Public transport inputs (distance and frequency, no passengers)
                                  <>
                                    <div className="space-y-2">
                                      <label className="text-[10px] text-slate-500 font-bold uppercase block text-left">Jarak Trip</label>
                                      <div className="flex items-center bg-slate-950/80 border border-white/5 rounded-xl px-2 py-2" title="Jarak per satu kali perjalanan">
                                        <input
                                          type="number"
                                          min="0"
                                          placeholder="Jarak (km)"
                                          value={transportDetails[input.id]?.jarak || ''}
                                          onChange={(e) => handleTransportDetailChange(input.id, 'jarak', e.target.value)}
                                          className="bg-transparent text-sm w-full focus:outline-none text-center text-white font-bold"
                                        />
                                      </div>
                                      <span className="text-[10px] text-slate-500 font-semibold block text-center">km / trip</span>
                                    </div>
                                    
                                    <div className="border-t border-white/5 pt-3">
                                      <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                                        <span>Frek. Trip/Minggu</span>
                                      </div>
                                      <div className="bg-slate-950/80 border border-white/5 rounded-xl px-2 py-2">
                                        <input
                                          type="number"
                                          min="0"
                                          placeholder="Frekuensi (trip)"
                                          value={transportDetails[input.id]?.frekuensi || ''}
                                          onChange={(e) => handleTransportDetailChange(input.id, 'frekuensi', e.target.value)}
                                          className="bg-transparent text-sm w-full focus:outline-none text-center text-white font-bold"
                                        />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  // Standard vehicle inputs
                                  <>
                                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                      <span>Jarak Trip</span>
                                      <span>Penumpang</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="flex items-center bg-slate-950/80 border border-white/5 rounded-xl px-2 py-2" title="Jarak per satu kali perjalanan">
                                        <input
                                          type="number"
                                          min="0"
                                          placeholder="Jarak (km)"
                                          value={transportDetails[input.id]?.jarak || ''}
                                          onChange={(e) => handleTransportDetailChange(input.id, 'jarak', e.target.value)}
                                          className="bg-transparent text-sm w-full focus:outline-none text-center text-white font-bold"
                                        />
                                      </div>
                                      <div className="flex items-center bg-slate-950/80 border border-white/5 rounded-xl px-2 py-2" title="Jumlah orang di dalam kendaraan (termasuk Anda)">
                                        <input
                                          type="number"
                                          min="1"
                                          placeholder="1"
                                          value={transportDetails[input.id]?.penumpang || ''}
                                          onChange={(e) => handleTransportDetailChange(input.id, 'penumpang', e.target.value)}
                                          className="bg-transparent text-sm w-full focus:outline-none text-center text-white font-bold"
                                        />
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-semibold">
                                      <div className="text-center">
                                        <span>km / trip</span>
                                      </div>
                                      <div className="text-center">
                                        <span>Orang</span>
                                      </div>
                                    </div>
                                    
                                    <div className="border-t border-white/5 pt-3">
                                      <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                                        <span>Frek. Trip/Minggu</span>
                                      </div>
                                      <div className="bg-slate-950/80 border border-white/5 rounded-xl px-2 py-2">
                                        <input
                                          type="number"
                                          min="0"
                                          placeholder="Frekuensi (trip)"
                                          value={transportDetails[input.id]?.frekuensi || ''}
                                          onChange={(e) => handleTransportDetailChange(input.id, 'frekuensi', e.target.value)}
                                          className="bg-transparent text-sm w-full focus:outline-none text-center text-white font-bold"
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}

                                <div className="border-t border-white/5 pt-3">
                                  <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                                    <span>Total (Pribadi)</span>
                                    <span>{input.unit}</span>
                                  </div>
                                  <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-xl px-2 py-2">
                                    <div className="text-sm font-bold text-emerald-400 text-center">
                                      {((inputs.transportasi as any)[input.id] || 0).toFixed(1)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Check status */}
                              <div className="w-6 h-6 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-emerald-450" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : category.id === 'listrik' ? (
                    // Special layout for household energy category
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-black text-emerald-400 uppercase tracking-wider">
                          DAYA RUMAH TANGGA
                        </h3>
                      </div>
                      
                      {/* Jumlah Penghuni */}
                      <div className="mb-8">
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-blue-950/20 border border-blue-500/10 p-4 rounded-3xl">
                            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-400">
                                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.47.53-1.71 1.26L13.5 15H12v3h8v2h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1.5 2h-2C4.45 8 4 8.45 4 9v5.5c0 .28.22.5.5.5S5 14.78 5 14.5V13h1v6h2v-6h1v1.5c0 .28.22.5.5.5s.5-.22.5-.5V9c0-.55-.45-1-1-1z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="max-w-md mx-auto space-y-3">
                          <label className="block text-center font-bold text-slate-200">
                            Berapa jumlah orang yang tinggal dalam satu rumah?
                          </label>
                          <div className="bg-slate-950/60 rounded-2xl border border-white/10 p-3">
                            <input
                              type="number"
                              min="1"
                              placeholder="1"
                              value={(inputs.listrik as any).jumlahPenghuni || ''}
                              onChange={(e) => handleInputChange('listrik', 'jumlahPenghuni', e.target.value)}
                              className="w-full text-center text-2xl font-black text-white bg-transparent border-none outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sumber Energi */}
                      <div className="mb-8">
                        <h4 className="text-center font-bold text-slate-200 mb-6">
                          Darimana sumber energi listrik rumah tangga anda?
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            {
                              value: 'PLN',
                              label: '100% PLN',
                              icon: (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-slate-400">
                                  <path d="M14.69 2.21L4.33 11.49c-.64.58-.28 1.65.58 1.73L13 14l-4.85 6.76c-.22.31-.04.74.31.74.13 0 .25-.06.33-.16l10.36-9.28c.64-.58.28-1.65-.58-1.73L11 9l4.85-6.76c.22-.31.04-.74-.31-.74-.13 0-.25.06-.33.16z"/>
                                </svg>
                              ),
                              bg: 'bg-slate-900/60 border border-white/5'
                            },
                            {
                              value: 'energi_bersih',
                              label: '100% Energi Bersih',
                              icon: (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-400">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 4.24L10.18 9.7 7.16 10.14l2.32 2.26-.55 3.18L12 14.08l3.07 1.5-.55-3.18 2.32-2.26-3.02-.44L12 6.24z"/>
                                </svg>
                              ),
                              bg: 'bg-blue-950/20 border border-blue-500/10'
                            },
                            {
                              value: 'hybrid',
                              label: 'Hybrid (PLN & Energi Bersih)',
                              icon: (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-emerald-400">
                                  <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7zm0 3.24L11.01 8H8.21l2.27 1.65-.86 2.65L12 10.66l2.38 1.64-.86-2.65L15.79 8h-2.8L12 5.24z"/>
                                  <circle cx="6" cy="18" r="2"/>
                                  <circle cx="18" cy="18" r="2"/>
                                </svg>
                              ),
                              bg: 'bg-emerald-950/20 border border-emerald-500/10'
                            }
                          ].map((option) => (
                            <motion.div
                              key={option.value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleInputChange('listrik', 'sumberEnergi', option.value)}
                              className={`cursor-pointer border-2 rounded-2xl p-5 transition-all duration-200 text-center ${
                                (inputs.listrik as any).sumberEnergi === option.value
                                  ? 'border-emerald-500 bg-emerald-950/20 text-emerald-455'
                                  : 'border-white/10 bg-slate-950/60 hover:border-emerald-500/30 hover:bg-slate-950/85 text-white'
                              }`}
                            >
                              <div className={`${option.bg} rounded-2xl p-4 mx-auto mb-3 w-fit`}>
                                {option.icon}
                              </div>
                              <h5 className="font-bold text-sm">
                                {option.label}
                              </h5>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tagihan dan Konsumsi */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tagihan Listrik */}
                        <div className="bg-slate-950/60 rounded-2xl p-6 border border-white/10">
                          <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-red-950/20 border border-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-400">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.13-7.73c-.07.4-.35.72-.68.92l-.5.35c-.31.21-.51.51-.51.86V13h-2v-.5c0-.82.4-1.54 1-2l.5-.35c.1-.08.2-.2.2-.35 0-.48-.4-.8-.85-.8s-.85.32-.85.8H8c0-1.48 1.2-2.8 2.85-2.8S13.7 8.52 13.7 10c0 .7-.35 1.3-.87 1.67l-.7.6z"/>
                              </svg>
                            </div>
                            <label className="font-bold text-slate-200">Tagihan Listrik (Rp/bulan)?</label>
                          </div>
                          <div className="relative space-y-2">
                            <input
                              type="number"
                              min="0"
                              placeholder="0"
                              value={(inputs.listrik as any).tagihanListrik || ''}
                              onChange={(e) => handleInputChange('listrik', 'tagihanListrik', e.target.value)}
                              className="w-full text-center text-lg font-black border border-white/10 bg-slate-950/80 rounded-xl p-3 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 text-white"
                            />
                            <div className="text-center text-xs text-slate-400 font-medium">
                              Rp. {((inputs.listrik as any).tagihanListrik || 0).toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>

                        {/* Konsumsi Listrik */}
                        <div className="bg-slate-950/60 rounded-2xl p-6 border border-white/10">
                          <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-emerald-400">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                <path d="M12 6v3l4 2-1 1.5-5-3V6z"/>
                              </svg>
                            </div>
                            <label className="font-bold text-slate-200">Konsumsi listrik (kWh/bulan)?</label>
                          </div>
                          <div className="relative space-y-2">
                            <input
                              type="number"
                              min="0"
                              step="0.1"
                              placeholder="0.00"
                              value={(inputs.listrik as any).pemakaianListrik || ''}
                              onChange={(e) => handleInputChange('listrik', 'pemakaianListrik', e.target.value)}
                              className="w-full text-center text-lg font-black border border-white/10 bg-slate-950/80 rounded-xl p-3 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 text-white"
                            />
                            <div className="text-center text-xs text-slate-400 font-medium">
                              {((inputs.listrik as any).pemakaianListrik || 0)} kWh
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : category.id === 'rumah' ? (
                    // Special layout for household appliances category
                    <div className="space-y-8">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                          Pilih Peralatan Rumah Tangga
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-1">
                          Pilih peralatan yang ada di rumah Anda dan masukkan jumlahnya
                        </p>
                        <div className="mt-3.5 bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-3 max-w-2xl mx-auto text-left">
                          <p className="text-xs text-slate-350 leading-relaxed font-semibold">
                            💡 <strong>Catatan Akurasi:</strong> Jika Anda sudah mengisi Tagihan/Konsumsi Listrik di kategori <strong>Daya Rumah Tangga</strong>, konsumsi listrik dari alat elektronik di bawah otomatis dihitung dalam tagihan tersebut agar tidak terhitung ganda.
                          </p>
                        </div>
                      </div>

                      {/* Lampu Section */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          💡 Pencahayaan
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {category.inputs.filter(input => (input as any).category === 'lighting').map((appliance) => (
                            <motion.div
                              key={appliance.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[appliance.id] > 0
                                  ? 'border-emerald-500 bg-emerald-950/20 shadow-lg'
                                  : 'border-white/10 bg-slate-950/60 hover:border-emerald-500/20'
                              }`}
                            >
                              <div className="text-center space-y-4">
                                <div className="text-4xl">
                                  {appliance.id === 'lampuNeon' && '🔆'}
                                  {appliance.id === 'lampuPijar' && '💡'}
                                  {appliance.id === 'lampuLED' && '✨'}
                                </div>
                                <h5 className="font-bold text-white">{appliance.label}</h5>
                                <p className="text-xs text-slate-455 font-medium leading-relaxed">{appliance.helper}</p>
                                <div className="space-y-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[appliance.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, appliance.id, e.target.value)}
                                    placeholder={appliance.placeholder}
                                    className="w-full p-3 border border-white/10 bg-slate-950/80 rounded-xl text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white font-bold"
                                  />
                                  <div className="text-[10px] text-slate-500 font-bold uppercase">{appliance.unit}</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Pendingin Section */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          ❄️ Pendingin & Kipas
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {category.inputs.filter(input => (input as any).category === 'cooling').map((appliance) => (
                            <motion.div
                              key={appliance.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[appliance.id] > 0
                                  ? 'border-blue-500 bg-blue-950/20 shadow-lg'
                                  : 'border-white/10 bg-slate-950/60 hover:border-blue-500/20'
                              }`}
                            >
                              <div className="text-center space-y-4">
                                <div className="text-4xl">
                                  {appliance.id === 'acInverter' && '❄️'}
                                  {appliance.id === 'acNonInverter' && '🏠'}
                                  {appliance.id === 'kipasAngin' && '💨'}
                                </div>
                                <h5 className="font-bold text-white">{appliance.label}</h5>
                                <p className="text-xs text-slate-455 font-medium leading-relaxed">{appliance.helper}</p>
                                <div className="space-y-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[appliance.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, appliance.id, e.target.value)}
                                    placeholder={appliance.placeholder}
                                    className="w-full p-3 border border-white/10 bg-slate-950/80 rounded-xl text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white font-bold"
                                  />
                                  <div className="text-[10px] text-slate-500 font-bold uppercase">{appliance.unit}</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Elektronik Section */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          📺 Elektronik
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {category.inputs.filter(input => (input as any).category === 'electronics').map((appliance) => (
                            <motion.div
                              key={appliance.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[appliance.id] > 0
                                  ? 'border-purple-500 bg-purple-950/20 shadow-lg'
                                  : 'border-white/10 bg-slate-950/60 hover:border-purple-500/20'
                              }`}
                            >
                              <div className="text-center space-y-4">
                                <div className="text-4xl">
                                  {appliance.id === 'tv' && '📺'}
                                  {appliance.id === 'setTopBox' && '📡'}
                                </div>
                                <h5 className="font-bold text-white">{appliance.label}</h5>
                                <p className="text-xs text-slate-455 font-medium leading-relaxed">{appliance.helper}</p>
                                <div className="space-y-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[appliance.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, appliance.id, e.target.value)}
                                    placeholder={appliance.placeholder}
                                    className="w-full p-3 border border-white/10 bg-slate-950/80 rounded-xl text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white font-bold"
                                  />
                                  <div className="text-[10px] text-slate-500 font-bold uppercase">{appliance.unit}</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Utilitas Section */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          🔥 Gas & Air
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {category.inputs.filter(input => (input as any).type === 'utility').map((appliance) => (
                            <motion.div
                              key={appliance.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[appliance.id] > 0
                                  ? 'border-orange-500 bg-orange-950/20 shadow-lg'
                                  : 'border-white/10 bg-slate-950/60 hover:border-orange-500/20'
                              }`}
                            >
                              <div className="text-center space-y-4">
                                <div className="text-4xl">
                                  {appliance.id === 'gasLPG' && '🔥'}
                                  {appliance.id === 'airPAM' && '💧'}
                                </div>
                                <h5 className="font-bold text-white">{appliance.label}</h5>
                                <p className="text-xs text-slate-455 font-medium leading-relaxed">{appliance.helper}</p>
                                <div className="space-y-2">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[appliance.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, appliance.id, e.target.value)}
                                    placeholder={appliance.placeholder}
                                    className="w-full p-3 border border-white/10 bg-slate-950/80 rounded-xl text-center focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-bold"
                                  />
                                  <div className="text-[10px] text-slate-500 font-bold uppercase">{appliance.unit}</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Progress indicator for rumah */}
                      <div className="bg-slate-950/60 rounded-2xl p-6 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-slate-350">Progress Pengisian</span>
                          <span className="text-sm text-slate-455 font-semibold">
                            {category.inputs.filter(input => 
                              (inputs[category.id as keyof EmissionInputs] as any)[input.id] > 0
                            ).length} / {category.inputs.length}
                          </span>
                        </div>
                        <div className="w-full bg-slate-900/60 border border-white/5 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
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
                    <div className="space-y-8">
                      <div className="text-center mb-4">
                        <h3 className="text-sm font-black text-emerald-400 mb-2 uppercase tracking-widest">
                          HITUNG LEBIH DETAIL
                        </h3>
                        <h4 className="text-xl font-bold text-white mb-2">
                          EMISI KARBON MAKANAN KAMU
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">
                          Pilih jenis makanan dan minuman yang sering kamu konsumsi
                        </p>
                      </div>

                      {/* Frekuensi Makan */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-200 text-center uppercase tracking-wider">
                          Berapa kali kamu makan dalam sehari?
                        </h4>
                        <div className="flex justify-center gap-4">
                          {['2x', '3x', '4x', '5x+'].map((freq) => (
                            <motion.button
                              key={freq}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleInputChange('makanan', 'frekuensiMakan', freq)}
                              className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                                (inputs.makanan as any).frekuensiMakan === freq
                                  ? 'bg-emerald-600 text-white shadow-lg'
                                  : 'bg-slate-900/60 text-slate-305 hover:bg-slate-900/80 border border-white/5'
                              }`}
                            >
                              {freq}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Protein Hewani Section */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          🥩 Protein Hewani
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'hewani').map((food, index) => (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-slate-950/60 rounded-2xl p-4 border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[food.id] > 0
                                  ? 'border-red-500 bg-red-950/20 shadow-lg'
                                  : 'border-white/10 hover:border-red-500/20 hover:shadow-md'
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
                                <h5 className="font-bold text-white text-sm">{food.label}</h5>
                                <div className="space-y-2">
                                  <p className="text-[10px] text-slate-500 font-bold uppercase">Frekuensi</p>
                                  <div className="text-[10px] text-slate-400 font-medium">{food.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[food.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, food.id, e.target.value)}
                                    placeholder={food.placeholder}
                                    className="w-full p-2 border border-white/10 bg-slate-950/80 rounded-xl text-center text-sm focus:ring-2 focus:ring-red-500 text-white font-bold"
                                  />
                                  <div className="text-xs text-emerald-455 font-bold">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[food.id] || 0)} {food.unit.split('/')[0]}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Protein Nabati & Buah/Sayur */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          🌱 Protein Nabati & Buah/Sayur
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'nabati').map((food, index) => (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-slate-950/60 rounded-2xl p-4 border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[food.id] > 0
                                  ? 'border-emerald-500 bg-emerald-950/20 shadow-lg'
                                  : 'border-white/10 hover:border-emerald-500/20 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-3xl mb-2">
                                  {food.id === 'tahu' && '🧈'}
                                  {food.id === 'tempe' && '🍘'}
                                  {food.id === 'buahSayur' && '🥗'}
                                </div>
                                <h5 className="font-bold text-white text-sm">{food.label}</h5>
                                <div className="space-y-2">
                                  <p className="text-[10px] text-slate-500 font-bold uppercase">Frekuensi</p>
                                  <div className="text-[10px] text-slate-400 font-medium">{food.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[food.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, food.id, e.target.value)}
                                    placeholder={food.placeholder}
                                    className="w-full p-2 border border-white/10 bg-slate-950/80 rounded-xl text-center text-sm focus:ring-2 focus:ring-emerald-500 text-white font-bold"
                                  />
                                  <div className="text-xs text-emerald-455 font-bold">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[food.id] || 0)} {food.unit.split('/')[0]}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Makanan Pokok */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          🍚 Makanan Pokok
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'pokok').map((food, index) => (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-slate-950/60 rounded-2xl p-4 border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[food.id] > 0
                                  ? 'border-amber-500 bg-amber-950/20 shadow-lg'
                                  : 'border-white/10 hover:border-amber-500/20 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-3xl mb-2">
                                  {food.id === 'nasi' && '🍚'}
                                  {food.id === 'roti' && '🍞'}
                                  {food.id === 'mieInstan' && '🍜'}
                                </div>
                                <h5 className="font-bold text-white text-sm">{food.label}</h5>
                                <div className="space-y-2">
                                  <p className="text-[10px] text-slate-500 font-bold uppercase">Frekuensi</p>
                                  <div className="text-[10px] text-slate-400 font-medium">{food.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step={food.id === 'mieInstan' ? '1' : '0.1'}
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[food.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, food.id, e.target.value)}
                                    placeholder={food.placeholder}
                                    className="w-full p-2 border border-white/10 bg-slate-950/80 rounded-xl text-center text-sm focus:ring-2 focus:ring-amber-500 text-white font-bold"
                                  />
                                  <div className="text-xs text-emerald-450 font-bold">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[food.id] || 0)} {food.unit.split('/')[0]}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Minuman */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          ☕ Minuman
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'minuman').map((food, index) => (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-slate-950/60 rounded-2xl p-4 border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[food.id] > 0
                                  ? 'border-amber-500 bg-amber-950/20 shadow-lg'
                                  : 'border-white/10 hover:border-amber-500/20 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-3xl mb-2">
                                  {food.id === 'kopi' && '☕'}
                                  {food.id === 'teh' && '🍵'}
                                </div>
                                <h5 className="font-bold text-white text-sm">{food.label}</h5>
                                <div className="space-y-2">
                                  <p className="text-[10px] text-slate-500 font-bold uppercase">Frekuensi</p>
                                  <div className="text-[10px] text-slate-400 font-medium">{food.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[food.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, food.id, e.target.value)}
                                    placeholder={food.placeholder}
                                    className="w-full p-2 border border-white/10 bg-slate-950/80 rounded-xl text-center text-sm focus:ring-2 focus:ring-amber-500 text-white font-bold"
                                  />
                                  <div className="text-xs text-emerald-450 font-bold">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[food.id] || 0)} {food.unit.split('/')[0]}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Progress indicator for makanan */}
                      <div className="bg-slate-950/60 rounded-2xl p-6 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-slate-350">Progress Pengisian</span>
                          <span className="text-sm text-slate-455 font-semibold">
                            {category.inputs.filter(input => 
                              (inputs[category.id as keyof EmissionInputs] as any)[input.id] > 0
                            ).length} / {category.inputs.length}
                          </span>
                        </div>
                        <div className="w-full bg-slate-900/60 border border-white/5 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-300"
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
                    <div className="space-y-8">
                      <div className="text-center mb-4">
                        <h3 className="text-sm font-black text-emerald-400 mb-2 uppercase tracking-widest">
                          HITUNG LEBIH DETAIL
                        </h3>
                        <h4 className="text-xl font-bold text-white mb-2">
                          EMISI KARBON SAMPAH RUMAH TANGGA
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">
                          Pilih jenis sampah yang diproduksi rumah tangga Anda
                        </p>
                      </div>

                      {/* Sampah Organik Section */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          🍃 Sampah Organik
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'organik').map((waste, index) => (
                            <motion.div
                              key={waste.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-slate-950/60 rounded-2xl p-6 border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[waste.id] > 0
                                  ? 'border-emerald-500 bg-emerald-950/20 shadow-lg'
                                  : 'border-white/10 hover:border-emerald-500/20 hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="text-4xl">
                                  {waste.id === 'sampahOrganik' && '🍎'}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-bold text-white text-lg">{waste.label}</h5>
                                  <p className="text-xs text-slate-400 mb-3">{waste.helper}</p>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex-1">
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.1"
                                        value={(inputs[category.id as keyof EmissionInputs] as any)[waste.id] || ''}
                                        onChange={(e) => handleInputChange(category.id, waste.id, e.target.value)}
                                        placeholder={waste.placeholder}
                                        className="w-full p-3 border border-white/10 bg-slate-950/80 rounded-xl text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white font-bold"
                                      />
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase">{waste.unit}</div>
                                    <div className="text-sm font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-center">
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
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          ♻️ Sampah Anorganik (Dapat Didaur Ulang)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'anorganik').map((waste, index) => (
                            <motion.div
                              key={waste.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-slate-950/60 rounded-2xl p-4 border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[waste.id] > 0
                                  ? 'border-blue-500 bg-blue-950/20 shadow-lg'
                                  : 'border-white/10 hover:border-blue-500/20 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center space-y-3">
                                <div className="text-3xl mb-2">
                                  {waste.id === 'sampahPlastik' && '🥤'}
                                  {waste.id === 'sampahKertas' && '📄'}
                                  {waste.id === 'sampahLogam' && '🥫'}
                                  {waste.id === 'sampahKaca' && '🍺'}
                                </div>
                                <h5 className="font-bold text-white text-sm">{waste.label}</h5>
                                <p className="text-[10px] text-slate-455 font-medium leading-tight">{waste.helper}</p>
                                <div className="space-y-2">
                                  <div className="text-[10px] text-slate-500 font-bold uppercase">{waste.unit}</div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={(inputs[category.id as keyof EmissionInputs] as any)[waste.id] || ''}
                                    onChange={(e) => handleInputChange(category.id, waste.id, e.target.value)}
                                    placeholder={waste.placeholder}
                                    className="w-full p-2 border border-white/10 bg-slate-950/80 rounded-xl text-center text-sm focus:ring-2 focus:ring-blue-500 text-white font-bold"
                                  />
                                  <div className="text-xs text-emerald-450 font-bold">
                                    {((inputs[category.id as keyof EmissionInputs] as any)[waste.id] || 0)} kg
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Sampah Berbahaya */}
                      <div className="space-y-4">
                        <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                          ⚠️ Sampah Berbahaya
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {category.inputs.filter(input => (input as any).category === 'berbahaya').map((waste, index) => (
                            <motion.div
                              key={waste.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`bg-slate-950/60 rounded-2xl p-6 border-2 transition-all duration-200 cursor-pointer ${
                                (inputs[category.id as keyof EmissionInputs] as any)[waste.id] > 0
                                  ? 'border-red-500 bg-red-950/20 shadow-lg'
                                  : 'border-white/10 hover:border-red-500/20 hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="text-4xl">
                                  {waste.id === 'sampahElektronik' && '📱'}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-bold text-white text-lg">{waste.label}</h5>
                                  <p className="text-sm text-slate-400 mb-3">{waste.helper}</p>
                                  <div className="bg-amber-950/20 border border-amber-500/10 rounded-xl p-3 mb-3">
                                    <p className="text-xs text-amber-305 font-semibold">
                                      ⚠️ <strong>Tinggi emisi!</strong> Sebaiknya bawa ke tempat daur ulang khusus.
                                    </p>
                                  </div>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex-1">
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={(inputs[category.id as keyof EmissionInputs] as any)[waste.id] || ''}
                                        onChange={(e) => handleInputChange(category.id, waste.id, e.target.value)}
                                        placeholder={waste.placeholder}
                                        className="w-full p-3 border border-white/10 bg-slate-950/80 rounded-xl text-center focus:ring-2 focus:ring-red-500 focus:border-transparent text-white font-bold"
                                      />
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase">{waste.unit}</div>
                                    <div className="text-sm font-bold text-red-400 bg-red-950/30 border border-red-500/20 px-3 py-1.5 rounded-lg text-center">
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
                      <div className="bg-emerald-950/10 rounded-2xl p-6 border border-emerald-500/10">
                        <h4 className="text-base font-bold text-emerald-355 mb-4 flex items-center gap-2">
                          🌱 Tips Mengurangi Sampah & Emisi
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mt-0.5 text-sm flex-shrink-0">
                                ♻️
                              </div>
                              <div>
                                <h6 className="font-bold text-emerald-300 text-sm">Pisahkan Sampah</h6>
                                <p className="text-xs text-emerald-450 font-medium">Pisahkan sampah organik, plastik, kertas, dan logam untuk daur ulang mudah.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mt-0.5 text-sm flex-shrink-0">
                                🌱
                              </div>
                              <div>
                                <h6 className="font-bold text-emerald-300 text-sm">Kompos Organik</h6>
                                <p className="text-xs text-emerald-450 font-medium">Ubah sisa makanan dan bahan organik menjadi kompos tanaman di rumah.</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mt-0.5 text-sm flex-shrink-0">
                                🛍️
                              </div>
                              <div>
                                <h6 className="font-bold text-emerald-300 text-sm">Kurangi Kantong Plastik</h6>
                                <p className="text-xs text-emerald-450 font-medium">Selalu bawa tas belanja sendiri untuk meminimalkan sampah kemasan plastik sekali pakai.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mt-0.5 text-sm flex-shrink-0">
                                🔄
                              </div>
                              <div>
                                <h6 className="font-bold text-emerald-300 text-sm">Daur Ulang Kreatif</h6>
                                <p className="text-xs text-emerald-450 font-medium">Manfaatkan barang bekas menjadi kreasi bermanfaat atau salurkan ke Bank Sampah.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress indicator for sampah */}
                      <div className="bg-slate-950/60 rounded-2xl p-6 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-slate-350">Progress Pengisian</span>
                          <span className="text-sm text-slate-455 font-semibold">
                            {category.inputs.filter(input => 
                              (inputs[category.id as keyof EmissionInputs] as any)[input.id] > 0
                            ).length} / {category.inputs.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200/20 rounded-full h-2">
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
                      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
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
                            <label htmlFor={input.id} className="block text-sm font-bold text-slate-205">
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
                                className="block w-full px-4 py-4 rounded-xl border border-white/10 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-200 bg-slate-950/80 text-white font-bold"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <span className="text-xs font-bold text-slate-400 bg-slate-900/60 border border-white/5 px-2.5 py-1.5 rounded-lg">
                                  {input.unit}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 bg-slate-950/50 border border-white/5 p-2.5 rounded-xl font-medium">
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
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
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