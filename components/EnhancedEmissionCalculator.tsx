// Redirect to working EmissionCalculator
export { EmissionCalculator as default } from './EmissionCalculator';
  const icons = {
    motor: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C8.69 2 6 4.69 6 8c0 1.5.57 2.87 1.5 3.91L9 15v2h2v-1.5l1.5-3.09C13.43 10.87 14 9.5 14 8c0-3.31-2.69-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm7.5 8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-15 0C3.67 18.5 3 19.17 3 20s.67 1.5 1.5 1.5S6 20.83 6 20s-.67-1.5-1.5-1.5zm6.5-3.5h-2l-1-4h10l-1 4h-2v2h-4v-2z"/>
      </svg>
    ),
    mobil: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.84 0-1.4.42-1.6 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-1.92-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
      </svg>
    ),
    bus: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
      </svg>
    ),
    kereta: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4 15.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V5c0-3.5-3.58-4-8-4s-8 .5-8 4v10.5zm8 1.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-6-7h12V5H6v5z"/>
      </svg>
    ),
    pesawat: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    ),
    kapal: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.32-.42-.58-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V3c0-.55-.45-1-1-1H10c-.55 0-1 .45-1 1v1H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.46.26-.58.5s-.14.52-.06.78L3.95 19z"/>
      </svg>
    )
  };
  
  return icons[type as keyof typeof icons] || icons.mobil;
};

// Custom Energy Icons
const EnergyIcon = ({ type, className }: { type: string; className?: string }) => {
  const icons = {
    pln: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14.69 2.21L4.33 11.49c-.64.58-.28 1.65.58 1.73L13 14l-4.85 6.76c-.22.31-.04.74.31.74.13 0 .25-.06.33-.16l10.36-9.28c.64-.58.28-1.65-.58-1.73L11 9l4.85-6.76c.22-.31.04-.74-.31-.74-.13 0-.25.06-.33.16z"/>
      </svg>
    ),
    renewable: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm8 15.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-16 0C3.17 17.5 2.5 18.17 2.5 19s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
      </svg>
    ),
    hybrid: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M15 6l-1.41 1.41L16.17 10H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h2v-2H7c-1.66 0-3-1.34-3-3s1.34-3 3-3h9.17l-2.58 2.59L15 16l5-5-5-5zm-4 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
      </svg>
    )
  };
  
  return icons[type as keyof typeof icons] || icons.pln;
};

// Custom Appliance Icons  
const ApplianceIcon = ({ type, className }: { type: string; className?: string }) => {
  const icons = {
    lampu: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
      </svg>
    ),
    ac: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 3H2v6h20V3zM4 7V5h16v2H4zm18 4H2v10h20V11zm-2 8H4v-6h16v6zm-9-4.5c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5zm2 0c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5zm2 0c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5z"/>
      </svg>
    ),
    tv: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 1v1h8v-1l-1-1h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H3V5h18v10z"/>
      </svg>
    ),
    kulkas: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9 2H7v2h2V2zm10 7h-3V7h3v2zm0 5h-3v-2h3v2zM9 9H7V7h2v2zm10-7H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H5V4h14v16z"/>
      </svg>
    ),
    kipas: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.01 6c1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.31-.73 1.76l3.73 3.73c1.28.19 2.49-.39 2.49-1.99 0-1.38-1.12-2.5-2.5-2.5-.69 0-1.31.28-1.76.73L11.01 6.5c-.19-1.28.39-2.49 1.99-2.49zm.99 6c0-1.38-1.12-2.5-2.5-2.5-.69 0-1.31.28-1.76.73L5.01 6.5c-.19-1.28.39-2.49 1.99-2.49 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.31-.73 1.76l3.73 3.73c1.28.19 2.49-.39 2.49-1.99z"/>
      </svg>
    )
  };
  
  return icons[type as keyof typeof icons] || icons.lampu;
};

// Custom Food Icons
const FoodIcon = ({ type, className }: { type: string; className?: string }) => {
  const icons = {
    telur: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 3C8.5 3 6 6.5 6 10.5S8.5 18 12 18s6-3.5 6-7.5S15.5 3 12 3zm0 13c-2.21 0-4-2.24-4-5s1.79-5 4-5 4 2.24 4 5-1.79 5-4 5z"/>
      </svg>
    ),
    susu: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M5 2v6h.18L6 10v11c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V10l.82-2H19V2H5zm12 15H7v-7h10v7z"/>
      </svg>
    ),
    daging: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99h1.66c.84 0 1.53-.64 1.63-1.46L6 4.05H1V2.05C1 1.48 1.45 1 2.05 1h4.9C7.55 1 8 1.48 8 2.05v2h3l-.3 2.34c-1.71.47-3.31 1.32-4.27 2.26C5 9.07 4 10.54 4 12.94v9.05z"/>
      </svg>
    ),
    sayur: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C9.24 2 7 4.24 7 7c0 1.01.3 1.95.81 2.75L9 12v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-7l1.19-2.25c.51-.8.81-1.74.81-2.75 0-2.76-2.24-5-5-5zm-1 15h2v2h-2v-2zm0-3h2v2h-2v-2zm1-8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
      </svg>
    ),
    nasi: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18 3H6C4.9 3 4 3.9 4 5v11c0 1.1.9 2 2 2h2l-1 3h10l-1-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
      </svg>
    )
  };
  
  return icons[type as keyof typeof icons] || icons.nasi;
};

// Custom Waste Icons
const WasteIcon = ({ type, className }: { type: string; className?: string }) => {
  const icons = {
    plastik: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
    kertas: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
    ),
    organik: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.21 9l-4.38-6.56c-.39-.59-1.15-.59-1.54 0L6.91 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27C22.99 10.18 23 10.09 23 10c0-.55-.45-1-1-1h-4.79z"/>
      </svg>
    ),
    logam: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M2 16h20v2H2zm1.15-4.05L4 11l.85 1.05.98-.42L6 10l.17 1.63.98.42.85-1.05L9 11l.85-1.05.98.42L11 10l.17 1.63.98.42.85-1.05L14 11l.85-1.05.98.42L16 10l.17 1.63.98.42.85-1.05L19 11l.85-1.05.98.42L21 10l.17 1.63.98.42.85-1.05L24 11l-1 1-.85-1.05-.98.42L21 10l-.17 1.63-.98-.42L19 12l-1-1-.85 1.05-.98-.42L16 10l-.17 1.63-.98-.42L14 12l-1-1-.85 1.05-.98-.42L11 10l-.17 1.63-.98-.42L9 12l-1-1-.85 1.05-.98-.42L6 10l-.17 1.63-.98-.42L4 12l-1-1z"/>
      </svg>
    )
  };
  
  return icons[type as keyof typeof icons] || icons.organik;
};

interface TransportationItem {
  id: string;
  name: string;
  icon: string;
  emissionFactor: number;
  distance?: number;
  frequency?: number;
}

interface EnergySource {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface ApplianceItem {
  id: string;
  name: string;
  icon: string;
  watt?: number;
  hours?: number;
  count?: number;
}

interface FoodItem {
  id: string;
  name: string;
  icon: string;
  frequency?: number;
  portion?: number;
}

interface WasteItem {
  id: string;
  name: string;
  icon: string;
  amount?: number;
}

interface CalculationResult {
  totalEmission: number;
  breakdown: {
    transportation: number;
    energy: number;
    appliances: number;
    food: number;
    waste: number;
  };
  comparison: {
    global: number;
    asean: number;
    indonesia: number;
  };
}

const EnhancedEmissionCalculator = () => {
  const [currentStep, setCurrentStep] = useState<'category' | 'transportation' | 'energy' | 'appliances' | 'food' | 'waste' | 'result'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [transportationData, setTransportationData] = useState<TransportationItem[]>([]);
  const [energyData, setEnergyData] = useState<any>({});
  const [appliancesData, setAppliancesData] = useState<ApplianceItem[]>([]);
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [wasteData, setWasteData] = useState<WasteItem[]>([]);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  // Transportation options (all in one view)
  const transportationOptions = [
    { id: 'motor', name: 'Motor', icon: 'motor', emissionFactor: 0.08 },
    { id: 'mobil', name: 'Mobil', icon: 'mobil', emissionFactor: 0.12 },
    { id: 'bus', name: 'Bus', icon: 'bus', emissionFactor: 0.05 },
    { id: 'kereta', name: 'Kereta', icon: 'kereta', emissionFactor: 0.02 },
    { id: 'pesawat', name: 'Pesawat', icon: 'pesawat', emissionFactor: 0.18 },
    { id: 'kapal', name: 'Kapal', icon: 'kapal', emissionFactor: 0.15 }
  ];

  // Energy source options
  const energySources = [
    { 
      id: 'pln', 
      name: '100% PLN', 
      icon: 'pln',
      description: 'Menggunakan listrik PLN sepenuhnya'
    },
    { 
      id: 'renewable', 
      name: '100% Energi Bersih', 
      icon: 'renewable',
      description: 'Solar panel, angin, atau energi terbarukan'
    },
    { 
      id: 'hybrid', 
      name: 'Hybrid', 
      icon: 'hybrid',
      description: 'Kombinasi PLN dan energi bersih'
    }
  ];

  // Appliance options
  const applianceOptions = [
    { id: 'lampu', name: 'Lampu', icon: 'lampu' },
    { id: 'ac', name: 'AC', icon: 'ac' },
    { id: 'tv', name: 'TV', icon: 'tv' },
    { id: 'kulkas', name: 'Kulkas', icon: 'kulkas' },
    { id: 'kipas', name: 'Kipas Angin', icon: 'kipas' }
  ];

  // Food options
  const foodOptions = [
    { id: 'telur', name: 'Telur', icon: 'telur' },
    { id: 'susu', name: 'Susu', icon: 'susu' },
    { id: 'daging', name: 'Daging', icon: 'daging' },
    { id: 'sayur', name: 'Sayuran', icon: 'sayur' },
    { id: 'nasi', name: 'Nasi', icon: 'nasi' }
  ];

  // Waste options
  const wasteOptions = [
    { id: 'plastik', name: 'Plastik', icon: 'plastik' },
    { id: 'kertas', name: 'Kertas', icon: 'kertas' },
    { id: 'organik', name: 'Organik', icon: 'organik' },
    { id: 'logam', name: 'Logam', icon: 'logam' }
  ];

  const categories = [
    { id: 'transportasi', name: 'Transportasi', color: 'emerald' },
    { id: 'energy', name: 'Daya Rumah Tangga', color: 'blue' },
    { id: 'appliances', name: 'Peralatan Rumah Tangga', color: 'yellow' },
    { id: 'food', name: 'Makanan', color: 'orange' },
    { id: 'waste', name: 'Sampah', color: 'red' }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentStep(categoryId as any);
  };

  const calculateEmissions = () => {
    // Calculate total emissions based on collected data
    const transportEmission = transportationData.reduce((total, item) => 
      total + (item.emissionFactor * (item.distance || 0) * (item.frequency || 1)), 0);
    
    const energyEmission = energyData.monthlyConsumption * 0.85 || 0; // PLN emission factor
    
    const applianceEmission = appliancesData.reduce((total, item) => 
      total + ((item.watt || 0) * (item.hours || 0) * (item.count || 0) * 0.85 / 1000), 0);
    
    const foodEmission = foodData.reduce((total, item) => 
      total + ((item.frequency || 0) * (item.portion || 0) * 0.05), 0);
    
    const wasteEmission = wasteData.reduce((total, item) => 
      total + ((item.amount || 0) * 0.5), 0);

    const totalEmission = transportEmission + energyEmission + applianceEmission + foodEmission + wasteEmission;

    const result: CalculationResult = {
      totalEmission,
      breakdown: {
        transportation: transportEmission,
        energy: energyEmission,
        appliances: applianceEmission,
        food: foodEmission,
        waste: wasteEmission
      },
      comparison: {
        global: 6.26,
        asean: 7.8,
        indonesia: 3.62
      }
    };

    setCalculationResult(result);
    setCurrentStep('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white p-4">
      <div className="max-w-5xl mx-auto">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Kalkulator Emisi Karbon</h1>
            <div className="flex items-center gap-2">
              {currentStep !== 'category' && currentStep !== 'result' && (
                <button
                  onClick={() => setCurrentStep('category')}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
              style={{ 
                width: currentStep === 'category' ? '20%' : 
                       currentStep === 'transportation' ? '40%' :
                       currentStep === 'energy' ? '60%' :
                       currentStep === 'appliances' ? '80%' :
                       currentStep === 'food' ? '90%' : '100%'
              }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Category Selection */}
          {currentStep === 'category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Pilih Kategori Emisi</h2>
                <p className="text-gray-600">Mulai dengan memilih kategori yang ingin Anda hitung</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`
                      category-card group relative h-64 p-6 bg-gradient-to-br border-2 rounded-3xl 
                      hover:shadow-2xl transition-all duration-500 text-center overflow-hidden 
                      transform hover:-translate-y-3 flex flex-col justify-between
                      ${category.color === 'emerald' ? 'from-emerald-50 via-emerald-50 to-emerald-100 border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-200/50' :
                        category.color === 'blue' ? 'from-blue-50 via-blue-50 to-blue-100 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50' :
                        category.color === 'yellow' ? 'from-amber-50 via-yellow-50 to-yellow-100 border-amber-200 hover:border-amber-400 hover:shadow-amber-200/50' :
                        category.color === 'orange' ? 'from-orange-50 via-orange-50 to-orange-100 border-orange-200 hover:border-orange-400 hover:shadow-orange-200/50' :
                        'from-red-50 via-red-50 to-red-100 border-red-200 hover:border-red-400 hover:shadow-red-200/50'}
                    `}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                        {category.id === 'transportasi' && <TransportIcon type="mobil" className="w-full h-full text-emerald-600" />}
                        {category.id === 'energy' && <EnergyIcon type="pln" className="w-full h-full text-blue-600" />}
                        {category.id === 'appliances' && <ApplianceIcon type="lampu" className="w-full h-full text-amber-600" />}
                        {category.id === 'food' && <FoodIcon type="nasi" className="w-full h-full text-orange-600" />}
                        {category.id === 'waste' && <WasteIcon type="organik" className="w-full h-full text-red-600" />}
                      </div>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-center relative z-10 py-2">
                      <div className="mb-2">
                        <h3 className="text-base lg:text-lg xl:text-xl font-bold text-gray-800 leading-tight text-center">
                          {category.name}
                        </h3>
                      </div>
                      
                      <div className="flex-grow flex items-start justify-center">
                        <p className="text-xs lg:text-sm text-gray-600 leading-relaxed text-center">
                          {category.id === 'transportasi' && 'Mobil, motor, pesawat, dan transportasi lainnya'}
                          {category.id === 'energy' && 'Konsumsi listrik dan energi rumah tangga'}
                          {category.id === 'appliances' && 'Peralatan elektronik dan listrik'}
                          {category.id === 'food' && 'Konsumsi makanan dan pola makan harian'}
                          {category.id === 'waste' && 'Pengelolaan dan produksi sampah'}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Transportation Step */}
          {currentStep === 'transportasi' && (
            <motion.div
              key="transportation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Transportasi</h2>
                <p className="text-gray-600">Pilih jenis transportasi yang Anda gunakan</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {transportationOptions.map((transport, index) => (
                  <motion.div
                    key={transport.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-3 hover:bg-green-50 transition-all cursor-pointer border-2 border-gray-200 hover:border-green-400"
                    onClick={() => {
                      const newItem = { ...transport, distance: 0, frequency: 1 };
                      setTransportationData([...transportationData, newItem]);
                    }}
                  >
                    <div className="text-center">
                      <TransportIcon type={transport.icon} className="w-10 h-10 mx-auto mb-2 text-green-600" />
                      <h3 className="font-semibold text-gray-800 text-xs">{transport.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Selected Transportation Items */}
              {transportationData.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Transportasi Dipilih</h3>
                  <div className="space-y-3">
                    {transportationData.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <TransportIcon type={item.icon} className="w-8 h-8 text-green-600" />
                        <div className="flex-grow">
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="Jarak (km)"
                            className="w-24 px-2 py-1 border rounded text-sm"
                            onChange={(e) => {
                              const updated = [...transportationData];
                              updated[index].distance = parseFloat(e.target.value) || 0;
                              setTransportationData(updated);
                            }}
                          />
                          <button
                            onClick={() => {
                              const updated = transportationData.filter((_, i) => i !== index);
                              setTransportationData(updated);
                            }}
                            className="p-1 text-red-500 hover:bg-red-100 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep('category')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
                <button
                  onClick={() => setCurrentStep('energy')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                >
                  Lanjut
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Energy Step */}
          {currentStep === 'energy' && (
            <motion.div
              key="energy"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Daya Rumah Tangga</h2>
                <p className="text-gray-600">Masukkan konsumsi listrik bulanan Anda</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {energyOptions.map((energy, index) => (
                  <motion.div
                    key={energy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      energyData.type === energy.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50 hover:border-green-300'
                    }`}
                    onClick={() => setEnergyData({...energyData, type: energy.id})}
                  >
                    <div className="text-center">
                      <EnergyIcon type={energy.icon} className="w-10 h-10 mx-auto mb-2 text-green-600" />
                      <h3 className="font-semibold text-gray-800 text-sm">{energy.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konsumsi Listrik Bulanan (kWh)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 120"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={(e) => setEnergyData({...energyData, monthlyConsumption: parseFloat(e.target.value) || 0})}
                />
                <p className="text-xs text-gray-500 mt-1">Lihat di tagihan listrik PLN Anda</p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep('transportasi')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
                <button
                  onClick={() => setCurrentStep('appliances')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                >
                  Lanjut
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Daya Rumah Tangga</h2>
                <p className="text-gray-600">Pilih sumber energi yang Anda gunakan</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {energySources.map((source, index) => (
                  <motion.button
                    key={source.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEnergyData({ ...energyData, source: source.id })}
                    className={`
                      p-6 rounded-xl border-2 transition-all text-center
                      ${energyData.source === source.id 
                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'}
                    `}
                  >
                    <EnergyIcon type={source.icon} className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-semibold mb-2">{source.name}</h3>
                    <p className="text-sm text-gray-600">{source.description}</p>
                  </motion.button>
                ))}
              </div>

              {energyData.source && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Detail Konsumsi Energi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Jumlah Penghuni</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg"
                        onChange={(e) => setEnergyData({...energyData, occupants: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Konsumsi Bulanan (kWh)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg"
                        onChange={(e) => setEnergyData({...energyData, monthlyConsumption: parseFloat(e.target.value)})}
                      />
                    </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Appliances Step */}
          {currentStep === 'appliances' && (
            <motion.div
              key="appliances"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Peralatan Rumah Tangga</h2>
                <p className="text-gray-600">Klik peralatan yang Anda gunakan untuk mengisi data</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {applianceOptions.map((appliance, index) => (
                  <motion.div
                    key={appliance.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-3 hover:bg-yellow-50 transition-all cursor-pointer border-2 border-gray-200 hover:border-yellow-400"
                    onClick={() => {
                      const newItem = { ...appliance, watt: 0, hours: 0, count: 1 };
                      setAppliancesData([...appliancesData, newItem]);
                    }}
                  >
                    <div className="text-center">
                      <ApplianceIcon type={appliance.icon} className="w-10 h-10 mx-auto mb-2 text-yellow-600" />
                      <h3 className="font-semibold text-gray-800 text-xs">{appliance.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Selected Appliances */}
              {appliancesData.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Peralatan Dipilih</h3>
                  <div className="space-y-3">
                    {appliancesData.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <ApplianceIcon type={item.icon} className="w-8 h-8 text-yellow-600" />
                        <div className="flex-grow">
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="Jumlah"
                            className="w-20 px-2 py-1 border rounded text-sm"
                            onChange={(e) => {
                              const updated = [...appliancesData];
                              updated[index].count = parseInt(e.target.value) || 0;
                              setAppliancesData(updated);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Watt"
                            className="w-20 px-2 py-1 border rounded text-sm"
                            onChange={(e) => {
                              const updated = [...appliancesData];
                              updated[index].watt = parseInt(e.target.value) || 0;
                              setAppliancesData(updated);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Jam/hari"
                            className="w-24 px-2 py-1 border rounded text-sm"
                            onChange={(e) => {
                              const updated = [...appliancesData];
                              updated[index].hours = parseFloat(e.target.value) || 0;
                              setAppliancesData(updated);
                            }}
                          />
                          <button
                            onClick={() => {
                              const updated = appliancesData.filter((_, i) => i !== index);
                              setAppliancesData(updated);
                            }}
                            className="p-1 text-red-500 hover:bg-red-100 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              const updated = appliancesData.filter((_, i) => i !== index);
                              setAppliancesData(updated);
                            }}
                            className="p-1 text-red-500 hover:bg-red-100 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep('energy')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
                <button
                  onClick={() => setCurrentStep('food')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                >
                  Lanjut
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Food Step */}
          {currentStep === 'food' && (
            <motion.div
              key="food"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Makanan</h2>
                <p className="text-gray-600">Klik jenis makanan untuk mengisi frekuensi konsumsi</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {foodOptions.map((food, index) => (
                  <motion.div
                    key={food.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-3 hover:bg-orange-50 transition-all cursor-pointer border-2 border-gray-200 hover:border-orange-400"
                    onClick={() => {
                      const newItem = { ...food, frequency: 0, portion: 0 };
                      setFoodData([...foodData, newItem]);
                    }}
                  >
                    <div className="text-center">
                      <FoodIcon type={food.icon} className="w-10 h-10 mx-auto mb-2 text-orange-600" />
                      <h3 className="font-semibold text-gray-800 text-xs">{food.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Selected Food Items */}
              {foodData.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Makanan Dipilih</h3>
                  <div className="space-y-3">
                    {foodData.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <FoodIcon type={item.icon} className="w-8 h-8 text-orange-600" />
                        <div className="flex-grow">
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="Frekuensi/Minggu"
                            className="w-32 px-2 py-1 border rounded text-sm"
                            onChange={(e) => {
                              const updated = [...foodData];
                              updated[index].frequency = parseFloat(e.target.value) || 0;
                              setFoodData(updated);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Gram/Porsi"
                            className="w-24 px-2 py-1 border rounded text-sm"
                            onChange={(e) => {
                              const updated = [...foodData];
                              updated[index].portion = parseFloat(e.target.value) || 0;
                              setFoodData(updated);
                            }}
                          />
                          <button
                            onClick={() => {
                              const updated = foodData.filter((_, i) => i !== index);
                              setFoodData(updated);
                            }}
                            className="p-1 text-red-500 hover:bg-red-100 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep('appliances')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
                <button
                  onClick={() => setCurrentStep('waste')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                >
                  Lanjut
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Waste Step */}
          {currentStep === 'waste' && (
            <motion.div
              key="waste"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Sampah</h2>
                <p className="text-gray-600">Klik jenis sampah untuk mengisi jumlah produksi</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {wasteOptions.map((waste, index) => (
                  <motion.div
                    key={waste.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-3 hover:bg-red-50 transition-all cursor-pointer border-2 border-gray-200 hover:border-red-400"
                    onClick={() => {
                      const newItem = { ...waste, amount: 0 };
                      setWasteData([...wasteData, newItem]);
                    }}
                  >
                    <div className="text-center">
                      <WasteIcon type={waste.icon} className="w-10 h-10 mx-auto mb-2 text-red-600" />
                      <h3 className="font-semibold text-gray-800 text-xs">{waste.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Selected Waste Items */}
              {wasteData.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Sampah Dipilih</h3>
                  <div className="space-y-3">
                    {wasteData.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <WasteIcon type={item.icon} className="w-8 h-8 text-red-600" />
                        <div className="flex-grow">
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="Kg/minggu"
                            className="w-24 px-2 py-1 border rounded text-sm"
                            onChange={(e) => {
                              const updated = [...wasteData];
                              updated[index].amount = parseFloat(e.target.value) || 0;
                              setWasteData(updated);
                            }}
                          />
                          <button
                            onClick={() => {
                              const updated = wasteData.filter((_, i) => i !== index);
                              setWasteData(updated);
                            }}
                            className="p-1 text-red-500 hover:bg-red-100 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep('food')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
                <button
                  onClick={calculateEmissions}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                >
                  <Calculator className="w-4 h-4" />
                  Hitung Emisi
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Result Step */}
          {currentStep === 'result' && calculationResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hasil Perhitungan Emisi</h2>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Total Emisi Karbon Anda</h3>
                  <div className="text-3xl font-bold text-green-600 mb-4">
                    {calculationResult.totalEmission.toFixed(3)} Ton CO2-eq/Tahun
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">{calculationResult.comparison.global}</div>
                    <div className="text-sm text-gray-600">Rata-rata Global</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">{calculationResult.comparison.asean}</div>
                    <div className="text-sm text-gray-600">Rata-rata ASEAN</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">{calculationResult.comparison.indonesia}</div>
                    <div className="text-sm text-gray-600">Rata-rata Indonesia</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm">
                    <Share2 className="w-4 h-4" />
                    Bagikan
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm">
                    <Save className="w-4 h-4" />
                    Simpan
                  </button>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Rincian Emisi Per Kategori</h3>
                <div className="space-y-3">
                  {Object.entries(calculationResult.breakdown).map(([category, value]) => (
                    <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium capitalize">{category}</span>
                      <span className="font-bold">{value.toFixed(3)} Ton CO2</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Over Button */}
              <div className="text-center">
                <button 
                  onClick={() => {
                    setCurrentStep('category');
                    setCalculationResult(null);
                    setTransportationData([]);
                    setEnergyData({ type: '', monthlyConsumption: 0 });
                    setAppliancesData([]);
                    setFoodData([]);
                    setWasteData([]);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  Hitung Ulang
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculate Button (when not in result) */}
        {currentStep !== 'category' && currentStep !== 'result' && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={calculateEmissions}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Calculator className="w-5 h-5" />
              Hitung Emisi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedEmissionCalculator;
