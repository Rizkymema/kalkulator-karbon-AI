'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Bike,
  Bus,
  Train,
  Plane,
  Zap,
  Fuel,
  ArrowRight,
  ArrowLeft,
  Calculator,
  TreePine,
  MapPin,
  Route,
  Wind,
  Home,
  Lightbulb,
  Utensils,
  Trash2,
  Users,
  Plus,
  Minus,
  Bed,
  Bath,
  ChefHat,
  Monitor,
  Fan,
  Refrigerator
} from 'lucide-react';

interface CalculationData {
  transportasi: TransportationData[];
  listrik: HouseholdPowerData[];
  peralatan: ApplianceData[];
  makanan: FoodData[];
  sampah: WasteData[];
}

interface TransportationData {
  type: 'darat' | 'udara';
  vehicle: string;
  fuelType?: string;
  distance: number;
  icon: any;
}

interface HouseholdPowerData {
  occupants: number;
  energySource: string;
  powerRating: number;
  monthlyBill: number;
  monthlyConsumption: number;
  cleanEnergyType: string;
  cleanEnergyGeneration: number;
}

interface ApplianceData {
  room: string;
  appliances: {[applianceId: string]: {count: number, hours: number, watt: number}};
}

interface FoodData {
  foodId: string;
  foodName: string;
  amount: number;
  unit: string;
}

interface WasteData {
  wasteId: string;
  wasteName: string;
  amount: number;
}

interface DayaRumahData {
  jumlahOrang: number;
  sumberEnergi: 'pln' | 'bersih' | 'hybrid';
  dayaTerpasang: number;
  tagihanListrik: number;
  konsumsiListrik: number;
}

interface PeralatanRumahData {
  ruangTamu: { [key: string]: number };
  kamarTidur: { [key: string]: number };
  kamarMandi: { [key: string]: number };
  dapur: { [key: string]: number };
  lainnya: { [key: string]: number };
}

interface MakananData {
  [key: string]: number;
}

interface SampahData {
  [key: string]: number;
}

interface ModernEmissionCalculatorProps {
  onCalculateAction: (results: {
    totalEmission: number;
    categoryResults: any[];
    pohonDibutuhkan: number;
  }) => void;
}

const categories = [
  { id: 'transportasi', name: 'Transportasi', icon: Car, color: 'emerald' },
  { id: 'dayaRumah', name: 'Daya Rumah Tangga', icon: Home, color: 'blue' },
  { id: 'peralatanRumah', name: 'Peralatan Rumah Tangga', icon: Lightbulb, color: 'yellow' },
  { id: 'makanan', name: 'Makanan', icon: Utensils, color: 'orange' },
  { id: 'sampah', name: 'Sampah', icon: Trash2, color: 'red' }
];

const vehicleTypes = {
  darat: [
    { id: 'mobil', name: 'Mobil', icon: Car, emissionFactor: 0.12 },
    { id: 'motor', name: 'Motor', icon: Bike, emissionFactor: 0.08 },
    { id: 'bus', name: 'Bus', icon: Bus, emissionFactor: 0.05 },
    { id: 'kereta_listrik', name: 'Kereta Listrik', icon: Train, emissionFactor: 0.02 },
    { id: 'kereta_uap', name: 'Kereta Uap', icon: Train, emissionFactor: 0.15 }
  ],
  udara: [
    { id: 'pesawat_kecil', name: 'Pesawat Kecil', icon: Plane, emissionFactor: 0.25 },
    { id: 'pesawat_besar', name: 'Pesawat Besar', icon: Plane, emissionFactor: 0.18 },
    { id: 'helicopter', name: 'Helicopter', icon: Wind, emissionFactor: 0.35 }
  ]
};

const fuelTypes = [
  { id: 'listrik', name: 'Listrik', icon: Zap, color: 'bg-blue-500' },
  { id: 'bensin', name: 'Bensin', icon: Fuel, color: 'bg-red-500' },
  { id: 'solar', name: 'Solar', icon: Fuel, color: 'bg-yellow-500' }
];

const peralatanRumahTangga = {
  ruangTamu: [
    { name: 'Lampu Neon', emissionFactor: 0.02 },
    { name: 'Lampu Pijar', emissionFactor: 0.04 },
    { name: 'Lampu LED', emissionFactor: 0.008 },
    { name: 'AC Inverter', emissionFactor: 0.6 },
    { name: 'AC Non Inverter', emissionFactor: 1.2 },
    { name: 'Kipas Angin', emissionFactor: 0.03 },
    { name: 'TV', emissionFactor: 0.1 },
    { name: 'Set Top Box (STB)', emissionFactor: 0.02 }
  ],
  kamarTidur: [
    { name: 'Lampu Neon', emissionFactor: 0.02 },
    { name: 'Lampu LED', emissionFactor: 0.008 },
    { name: 'AC Inverter', emissionFactor: 0.6 },
    { name: 'AC Non Inverter', emissionFactor: 1.2 },
    { name: 'Kipas Angin', emissionFactor: 0.03 }
  ],
  kamarMandi: [
    { name: 'Lampu Neon', emissionFactor: 0.02 },
    { name: 'Lampu LED', emissionFactor: 0.008 },
    { name: 'Water Heater', emissionFactor: 1.5 }
  ],
  dapur: [
    { name: 'Lampu Neon', emissionFactor: 0.02 },
    { name: 'Kulkas', emissionFactor: 0.3 },
    { name: 'Rice Cooker', emissionFactor: 0.35 },
    { name: 'Microwave', emissionFactor: 0.8 },
    { name: 'Blender', emissionFactor: 0.3 }
  ]
};

const makananItems = [
  { name: 'Telur', emissionFactor: 4.2, unit: 'kg/bulan' },
  { name: 'Susu', emissionFactor: 3.2, unit: 'liter/bulan' },
  { name: 'Ikan', emissionFactor: 6.1, unit: 'kg/bulan' },
  { name: 'Beras', emissionFactor: 2.7, unit: 'kg/bulan' },
  { name: 'Seafood', emissionFactor: 18.1, unit: 'kg/bulan' },
  { name: 'Unggas', emissionFactor: 6.9, unit: 'kg/bulan' },
  { name: 'Domba', emissionFactor: 39.2, unit: 'kg/bulan' },
  { name: 'Sapi', emissionFactor: 60, unit: 'kg/bulan' },
  { name: 'Keju', emissionFactor: 13.5, unit: 'kg/bulan' },
  { name: 'Tahu', emissionFactor: 3.0, unit: 'kg/bulan' },
  { name: 'Tempe', emissionFactor: 1.4, unit: 'kg/bulan' }
];

const sampahItems = [
  { name: 'Plastik', emissionFactor: 6.0, unit: 'kg/minggu' },
  { name: 'Kertas', emissionFactor: 3.3, unit: 'kg/minggu' },
  { name: 'Organik', emissionFactor: 0.5, unit: 'kg/minggu' },
  { name: 'Logam', emissionFactor: 1.8, unit: 'kg/minggu' }
];

// Appliance room definitions
const applianceRooms = {
  livingroom: {
    name: 'Ruang Tamu',
    icon: Home,
    color: 'text-blue-500',
    appliances: [
      { id: 'tv', name: 'Televisi', icon: Monitor, watt: 100, defaultHours: 6 },
      { id: 'kipasAngin', name: 'Kipas Angin', icon: Fan, watt: 75, defaultHours: 8 },
      { id: 'ac', name: 'AC', icon: Wind, watt: 350, defaultHours: 8 },
      { id: 'lampuRuangTamu', name: 'Lampu Ruang Tamu', icon: Lightbulb, watt: 20, defaultHours: 12 }
    ]
  },
  bedroom: {
    name: 'Kamar Tidur',
    icon: Bed,
    color: 'text-purple-500',
    appliances: [
      { id: 'lampuTidur', name: 'Lampu Tidur', icon: Lightbulb, watt: 15, defaultHours: 8 },
      { id: 'kipasKamar', name: 'Kipas Angin', icon: Fan, watt: 75, defaultHours: 10 },
      { id: 'stopKontakCharger', name: 'Stop Kontak Charger', icon: Zap, watt: 25, defaultHours: 6 }
    ]
  },
  bathroom: {
    name: 'Kamar Mandi',
    icon: Bath,
    color: 'text-blue-500',
    appliances: [
      { id: 'lampuKamarMandi', name: 'Lampu Kamar Mandi', icon: Lightbulb, watt: 20, defaultHours: 4 },
      { id: 'waterHeater', name: 'Water Heater', icon: Zap, watt: 1500, defaultHours: 2 },
      { id: 'exhaustFan', name: 'Exhaust Fan', icon: Fan, watt: 40, defaultHours: 2 }
    ]
  },
  kitchen: {
    name: 'Dapur',
    icon: ChefHat,
    color: 'text-orange-500',
    appliances: [
      { id: 'kulkas', name: 'Kulkas', icon: Refrigerator, watt: 150, defaultHours: 24 },
      { id: 'riceCooker', name: 'Magic Com/Rice Cooker', icon: ChefHat, watt: 350, defaultHours: 2 },
      { id: 'microwave', name: 'Microwave', icon: ChefHat, watt: 800, defaultHours: 1 },
      { id: 'lampuDapur', name: 'Lampu Dapur', icon: Lightbulb, watt: 20, defaultHours: 8 }
    ]
  }
};

const foodTypes = [
  { 
    id: 'telur', 
    name: 'Telur', 
    unit: 'butir', 
    example: '7', 
    emissionFactor: 0.2, 
    icon: Utensils, 
    color: 'text-yellow-500' 
  },
  { 
    id: 'susu', 
    name: 'Susu', 
    unit: 'gelas', 
    example: '5', 
    emissionFactor: 0.4, 
    icon: Utensils, 
    color: 'text-blue-500' 
  },
  { 
    id: 'ikan', 
    name: 'Ikan', 
    unit: 'porsi', 
    example: '3', 
    emissionFactor: 2.1, 
    icon: Utensils, 
    color: 'text-cyan-500' 
  },
  { 
    id: 'nasi', 
    name: 'Nasi', 
    unit: 'piring', 
    example: '14', 
    emissionFactor: 0.8, 
    icon: Utensils, 
    color: 'text-amber-500' 
  },
  { 
    id: 'daging', 
    name: 'Daging Sapi', 
    unit: 'porsi', 
    example: '2', 
    emissionFactor: 7.2, 
    icon: Utensils, 
    color: 'text-red-500' 
  },
  { 
    id: 'sayuran', 
    name: 'Sayuran', 
    unit: 'porsi', 
    example: '10', 
    emissionFactor: 0.3, 
    icon: Utensils, 
    color: 'text-green-500' 
  }
];

const wasteTypes = [
  { 
    id: 'plastik', 
    name: 'Sampah Plastik', 
    description: 'Botol, kemasan, kantong plastik',
    example: '2', 
    emissionFactor: 0.8, 
    icon: Trash2, 
    color: 'text-red-500' 
  },
  { 
    id: 'kertas', 
    name: 'Sampah Kertas', 
    description: 'Koran, majalah, kardus',
    example: '1.5', 
    emissionFactor: 0.4, 
    icon: Trash2, 
    color: 'text-yellow-500' 
  },
  { 
    id: 'organik', 
    name: 'Sampah Organik', 
    description: 'Sisa makanan, daun',
    example: '3', 
    emissionFactor: 0.2, 
    icon: Trash2, 
    color: 'text-green-500' 
  },
  { 
    id: 'logam', 
    name: 'Sampah Logam', 
    description: 'Kaleng, aluminium',
    example: '0.5', 
    emissionFactor: 1.2, 
    icon: Trash2, 
    color: 'text-gray-500' 
  }
];

export function ModernEmissionCalculator({ onCalculateAction }: ModernEmissionCalculatorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [calculationData, setCalculationData] = useState<CalculationData>({
    transportasi: [],
    listrik: [],
    peralatan: [],
    makanan: [],
    sampah: []
  });

  // Transportation state
  const [transportStep, setTransportStep] = useState(1);
  const [selectedTransportCategory, setSelectedTransportCategory] = useState<'darat' | 'udara' | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [selectedFuel, setSelectedFuel] = useState<any>(null);
  const [distance, setDistance] = useState<number>(0);

  // Household power states
  const [householdData, setHouseholdData] = useState<{
    occupants: number;
    energySource: string;
    powerRating: number;
    monthlyBill: number;
    monthlyConsumption: number;
    cleanEnergyType: string;
    cleanEnergyGeneration: number;
  }>({
    occupants: 1,
    energySource: '',
    powerRating: 0,
    monthlyBill: 0,
    monthlyConsumption: 0,
    cleanEnergyType: '',
    cleanEnergyGeneration: 0
  });

  // Appliance states
  const [applianceData, setApplianceData] = useState<{[room: string]: {[applianceId: string]: {count: number, hours: number, watt: number}}}>({});
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]); // Start empty, living room shown by default

  // Food states
  const [foodData, setFoodData] = useState<{[foodId: string]: number}>({});

  // Waste states
  const [wasteData, setWasteData] = useState<{[wasteId: string]: number}>({});

  // Results state
  const [results, setResults] = useState<any>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Reset transport state when switching categories
    if (categoryId !== 'transportasi') {
      setTransportStep(1);
      setSelectedTransportCategory(null);
      setSelectedVehicle(null);
      setSelectedFuel(null);
      setDistance(0);
    }
    // Smooth scroll to top when changing categories
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation helper functions
  const goToNextCategory = (currentCategory: string) => {
    const categoryOrder = ['transportasi', 'dayaRumah', 'peralatanRumah', 'makanan', 'sampah'];
    const currentIndex = categoryOrder.indexOf(currentCategory);
    if (currentIndex < categoryOrder.length - 1) {
      setSelectedCategory(categoryOrder[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousCategory = (currentCategory: string) => {
    const categoryOrder = ['transportasi', 'dayaRumah', 'peralatanRumah', 'makanan', 'sampah'];
    const currentIndex = categoryOrder.indexOf(currentCategory);
    if (currentIndex > 0) {
      setSelectedCategory(categoryOrder[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedCategory(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler functions for categories
  const handleAddHouseholdPower = () => {
    const newData: HouseholdPowerData = {
      occupants: householdData.occupants,
      energySource: householdData.energySource,
      powerRating: householdData.powerRating,
      monthlyBill: householdData.monthlyBill,
      monthlyConsumption: householdData.monthlyConsumption,
      cleanEnergyType: householdData.cleanEnergyType,
      cleanEnergyGeneration: householdData.cleanEnergyGeneration
    };
    
    setCalculationData(prev => ({
      ...prev,
      listrik: [...prev.listrik, newData]
    }));

    // Reset form
    setHouseholdData({
      occupants: 1,
      energySource: '',
      powerRating: 0,
      monthlyBill: 0,
      monthlyConsumption: 0,
      cleanEnergyType: '',
      cleanEnergyGeneration: 0
    });
  };

  const removeHouseholdPower = (index: number) => {
    setCalculationData(prev => ({
      ...prev,
      listrik: prev.listrik.filter((_, i) => i !== index)
    }));
  };

  const incrementAppliance = (room: string, applianceId: string) => {
    const appliance = applianceRooms[room as keyof typeof applianceRooms]?.appliances.find(a => a.id === applianceId);
    setApplianceData(prev => ({
      ...prev,
      [room]: {
        ...prev[room],
        [applianceId]: {
          count: (prev[room]?.[applianceId]?.count || 0) + 1,
          hours: prev[room]?.[applianceId]?.hours || 1,
          watt: prev[room]?.[applianceId]?.watt || appliance?.watt || 0
        }
      }
    }));
  };

  const decrementAppliance = (room: string, applianceId: string) => {
    setApplianceData(prev => ({
      ...prev,
      [room]: {
        ...prev[room],
        [applianceId]: {
          count: Math.max(0, (prev[room]?.[applianceId]?.count || 0) - 1),
          hours: prev[room]?.[applianceId]?.hours || 1,
          watt: prev[room]?.[applianceId]?.watt || 0
        }
      }
    }));
  };

  const updateApplianceHours = (room: string, applianceId: string, hours: number) => {
    if (hours < 1) return; // Prevent values below 1
    setApplianceData(prev => ({
      ...prev,
      [room]: {
        ...prev[room],
        [applianceId]: {
          ...prev[room]?.[applianceId],
          count: prev[room]?.[applianceId]?.count || 0,
          hours: Math.max(1, Math.floor(hours)), // Ensure minimum 1 and integer
          watt: prev[room]?.[applianceId]?.watt || 0
        }
      }
    }));
  };

  const updateApplianceWatt = (room: string, applianceId: string, watt: number) => {
    if (watt < 1) return; // Prevent values below 1
    setApplianceData(prev => ({
      ...prev,
      [room]: {
        ...prev[room],
        [applianceId]: {
          ...prev[room]?.[applianceId],
          count: prev[room]?.[applianceId]?.count || 0,
          hours: prev[room]?.[applianceId]?.hours || 1,
          watt: Math.max(1, Math.floor(watt)) // Ensure minimum 1 and integer
        }
      }
    }));
  };

  const handleAddAppliances = () => {
    // Validate all appliances have required data
    let hasValidData = false;
    const newData: ApplianceData[] = [];

    Object.entries(applianceData).forEach(([room, appliances]) => {
      const processedAppliances: {[applianceId: string]: {count: number, hours: number, watt: number}} = {};
      
      Object.entries(appliances).forEach(([applianceId, data]) => {
        if (data.count > 0 && data.watt > 0 && data.hours > 0) {
          processedAppliances[applianceId] = {
            count: data.count,
            hours: data.hours,
            watt: data.watt
          };
          hasValidData = true;
        }
      });

      if (Object.keys(processedAppliances).length > 0) {
        const roomInfo = applianceRooms[room as keyof typeof applianceRooms];
        newData.push({
          room: roomInfo?.name || room,
          appliances: processedAppliances
        });
      }
    });

    if (!hasValidData) {
      alert('Mohon lengkapi data peralatan dengan benar. Pastikan jumlah, daya (watt), dan jam pemakaian terisi minimal 1.');
      return;
    }
    
    setCalculationData(prev => ({
      ...prev,
      peralatan: [...prev.peralatan, ...newData]
    }));

    // Reset form
    setApplianceData({});
    setSelectedRooms([]); // Reset to empty, living room always shown
  };

  const handleAddFood = () => {
    const newData: FoodData[] = Object.entries(foodData)
      .filter(([_, amount]) => amount > 0)
      .map(([foodId, amount]) => {
        const food = foodTypes.find(f => f.id === foodId);
        return {
          foodId,
          foodName: food?.name || '',
          amount,
          unit: food?.unit || ''
        };
      });
    
    setCalculationData(prev => ({
      ...prev,
      makanan: [...prev.makanan, ...newData]
    }));

    // Reset form
    setFoodData({});
  };

  const handleAddWaste = () => {
    const newData: WasteData[] = Object.entries(wasteData)
      .filter(([_, amount]) => amount > 0)
      .map(([wasteId, amount]) => {
        const waste = wasteTypes.find(w => w.id === wasteId);
        return {
          wasteId,
          wasteName: waste?.name || '',
          amount
        };
      });
    
    setCalculationData(prev => ({
      ...prev,
      sampah: [...prev.sampah, ...newData]
    }));

    // Reset form
    setWasteData({});
  };

  const calculateAllEmissions = () => {
    let totalEmissions = 0;
    const categoryBreakdown: any = {};

    // Transportation emissions
    let transportEmissions = 0;
    calculationData.transportasi.forEach(data => {
      const vehicle = [...vehicleTypes.darat, ...vehicleTypes.udara]
        .find(v => v.name === data.vehicle);
      if (vehicle) {
        transportEmissions += data.distance * vehicle.emissionFactor;
      }
    });
    
    if (transportEmissions > 0) {
      categoryBreakdown.transportasi = {
        name: 'Transportasi',
        emissions: transportEmissions,
        icon: Car
      };
      totalEmissions += transportEmissions;
    }

    // Household power emissions
    let powerEmissions = 0;
    calculationData.listrik.forEach(data => {
      powerEmissions += data.monthlyConsumption * 0.85; // Emission factor for electricity
    });
    
    if (powerEmissions > 0) {
      categoryBreakdown.listrik = {
        name: 'Listrik Rumah',
        emissions: powerEmissions,
        icon: Zap
      };
      totalEmissions += powerEmissions;
    }

    // Appliance emissions (detailed calculation based on watt and hours)
    let applianceEmissions = 0;
    calculationData.peralatan.forEach(roomData => {
      Object.values(roomData.appliances).forEach(appliance => {
        // Calculate monthly kWh: count * watt * hours per day * 30 days / 1000
        const monthlyKWh = appliance.count * appliance.watt * appliance.hours * 30 / 1000;
        applianceEmissions += monthlyKWh * 0.85; // 0.85 kg CO2 per kWh
      });
    });
    
    if (applianceEmissions > 0) {
      categoryBreakdown.peralatan = {
        name: 'Peralatan',
        emissions: applianceEmissions,
        icon: Home
      };
      totalEmissions += applianceEmissions;
    }

    // Food emissions
    let foodEmissions = 0;
    calculationData.makanan.forEach(data => {
      const food = foodTypes.find(f => f.id === data.foodId);
      if (food) {
        foodEmissions += data.amount * food.emissionFactor * 4.33; // Convert weekly to monthly
      }
    });
    
    if (foodEmissions > 0) {
      categoryBreakdown.makanan = {
        name: 'Makanan',
        emissions: foodEmissions,
        icon: Utensils
      };
      totalEmissions += foodEmissions;
    }

    // Waste emissions
    let wasteEmissions = 0;
    calculationData.sampah.forEach(data => {
      const waste = wasteTypes.find(w => w.id === data.wasteId);
      if (waste) {
        wasteEmissions += data.amount * waste.emissionFactor * 4.33; // Convert weekly to monthly
      }
    });
    
    if (wasteEmissions > 0) {
      categoryBreakdown.sampah = {
        name: 'Sampah',
        emissions: wasteEmissions,
        icon: Trash2
      };
      totalEmissions += wasteEmissions;
    }

    setResults({
      totalEmissions,
      categoryBreakdown
    });
  };

  const calculateTotalEmissions = () => {
    // Redirect to new calculation function
    calculateAllEmissions();
  };

  // Transportation functions (keeping existing logic)
  const handleTransportCategorySelect = (category: 'darat' | 'udara') => {
    setSelectedTransportCategory(category);
    setTransportStep(2);
  };

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    if (vehicle.id.includes('kereta_listrik') || vehicle.id.includes('pesawat') || vehicle.id.includes('helicopter')) {
      setSelectedFuel(fuelTypes[0]);
      setTransportStep(4);
    } else {
      setTransportStep(3);
    }
  };

  const handleFuelSelect = (fuel: any) => {
    setSelectedFuel(fuel);
    setTransportStep(4);
  };

  const handleAddTransportation = () => {
    if (selectedTransportCategory && selectedVehicle && selectedFuel && distance > 0) {
      const newData: TransportationData = {
        type: selectedTransportCategory,
        vehicle: selectedVehicle.name,
        fuelType: selectedFuel.name,
        distance: distance,
        icon: selectedVehicle.icon
      };
      
      setCalculationData(prev => ({
        ...prev,
        transportasi: [...prev.transportasi, newData]
      }));
      
      // Reset for next entry
      setSelectedTransportCategory(null);
      setSelectedVehicle(null);
      setSelectedFuel(null);
      setDistance(0);
      setTransportStep(1);
    }
  };

  const removeTransportation = (index: number) => {
    setCalculationData(prev => ({
      ...prev,
      transportasi: prev.transportasi.filter((_, i) => i !== index)
    }));
  };

  const goBackTransport = () => {
    if (transportStep > 1) {
      setTransportStep(transportStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 py-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300/15 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-300/25 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-emerald-400/20 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mb-6 shadow-lg">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
            Kalkulator Emisi Karbon
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Hitung jejak karbon dari berbagai aktivitas kehidupan Anda dan temukan cara untuk menguranginya
          </p>
        </motion.div>

        {/* Enhanced Category Selection */}
        {!selectedCategory && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 border border-white/40 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-400 rounded-full blur-xl"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-blue-400 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-amber-400 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-18 h-18 bg-orange-400 rounded-full blur-xl"></div>
            </div>
            <div className="text-center mb-10 lg:mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 lg:mb-6">
                Pilih Kategori untuk Dihitung
              </h2>
              <p className="text-gray-600 text-base lg:text-lg max-w-4xl mx-auto leading-relaxed px-4">
                Pilih salah satu kategori di bawah untuk mulai menghitung emisi karbon Anda dan temukan cara untuk menguranginya
              </p>
            </div>
            
            <div className="category-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {categories.map((category, index) => {
                const getCategoryStyles = (color: string) => {
                  const baseStyles = {
                    button: 'category-card group relative h-64 p-6 bg-gradient-to-br border-2 rounded-3xl hover:shadow-2xl transition-all duration-500 text-center overflow-hidden transform hover:-translate-y-3 flex flex-col justify-between',
                    icon: 'w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-all duration-500 drop-shadow-lg filter group-hover:drop-shadow-xl category-icon',
                    gradient: 'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    iconBg: 'category-icon-bg absolute inset-0 bg-opacity-20 rounded-full group-hover:opacity-50 transition-all duration-500 scale-110'
                  };

                  switch (color) {
                    case 'emerald':
                      return {
                        ...baseStyles,
                        button: `${baseStyles.button} from-emerald-50 via-emerald-50 to-emerald-100 border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-200/50`,
                        icon: `${baseStyles.icon} text-emerald-600`,
                        gradient: `${baseStyles.gradient} from-emerald-400/20 to-emerald-600/20`,
                        iconBg: `${baseStyles.iconBg} bg-emerald-100`
                      };
                    case 'blue':
                      return {
                        ...baseStyles,
                        button: `${baseStyles.button} from-blue-50 via-blue-50 to-blue-100 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50`,
                        icon: `${baseStyles.icon} text-blue-600`,
                        gradient: `${baseStyles.gradient} from-blue-400/20 to-blue-600/20`,
                        iconBg: `${baseStyles.iconBg} bg-blue-100`
                      };
                    case 'yellow':
                      return {
                        ...baseStyles,
                        button: `${baseStyles.button} from-amber-50 via-yellow-50 to-yellow-100 border-amber-200 hover:border-amber-400 hover:shadow-amber-200/50`,
                        icon: `${baseStyles.icon} text-amber-600`,
                        gradient: `${baseStyles.gradient} from-amber-400/20 to-yellow-600/20`,
                        iconBg: `${baseStyles.iconBg} bg-amber-100`
                      };
                    case 'orange':
                      return {
                        ...baseStyles,
                        button: `${baseStyles.button} from-orange-50 via-orange-50 to-orange-100 border-orange-200 hover:border-orange-400 hover:shadow-orange-200/50`,
                        icon: `${baseStyles.icon} text-orange-600`,
                        gradient: `${baseStyles.gradient} from-orange-400/20 to-orange-600/20`,
                        iconBg: `${baseStyles.iconBg} bg-orange-100`
                      };
                    case 'red':
                      return {
                        ...baseStyles,
                        button: `${baseStyles.button} from-red-50 via-red-50 to-red-100 border-red-200 hover:border-red-400 hover:shadow-red-200/50`,
                        icon: `${baseStyles.icon} text-red-600`,
                        gradient: `${baseStyles.gradient} from-red-400/20 to-red-600/20`,
                        iconBg: `${baseStyles.iconBg} bg-red-100`
                      };
                    default:
                      return {
                        ...baseStyles,
                        button: `${baseStyles.button} from-gray-50 via-gray-50 to-gray-100 border-gray-200 hover:border-gray-400 hover:shadow-gray-200/50`,
                        icon: `${baseStyles.icon} text-gray-600`,
                        gradient: `${baseStyles.gradient} from-gray-400/20 to-gray-600/20`,
                        iconBg: `${baseStyles.iconBg} bg-gray-100`
                      };
                  }
                };
                
                const styles = getCategoryStyles(category.color);
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.7, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 100
                    }}
                    className="relative w-full"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03, y: -8 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleCategorySelect(category.id)}
                      className={styles.button}
                    >
                      <div className={styles.gradient}></div>
                      
                      {/* Top section - Icon */}
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                          <div className={styles.iconBg}></div>
                          <category.icon className={styles.icon} />
                        </div>
                      </div>
                      
                      {/* Middle section - Content */}
                      <div className="flex-grow flex flex-col justify-center relative z-10 py-2">
                        {/* Title Section */}
                        <div className="mb-2">
                          <h3 className="text-base lg:text-lg xl:text-xl font-bold text-gray-800 leading-tight text-center">
                            {category.name}
                          </h3>
                        </div>
                        
                        {/* Description Section */}
                        <div className="flex-grow flex items-start justify-center">
                          <p className="text-xs lg:text-sm text-gray-600 leading-relaxed text-center">
                            {category.id === 'transportasi' && 'Mobil, motor, pesawat, dan transportasi lainnya'}
                            {category.id === 'dayaRumah' && 'Konsumsi listrik dan energi rumah tangga'}
                            {category.id === 'peralatanRumah' && 'Peralatan elektronik dan listrik'}
                            {category.id === 'makanan' && 'Konsumsi makanan dan pola makan harian'}
                            {category.id === 'sampah' && 'Pengelolaan dan produksi sampah'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Enhanced shine effect */}
                      <div className="shine-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      {/* Additional subtle animations */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-white via-transparent to-white"></div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Enhanced Navigation Button */}
            {(calculationData.transportasi.length > 0 || 
              calculationData.listrik.length > 0 || 
              calculationData.peralatan.length > 0 || 
              calculationData.makanan.length > 0 || 
              calculationData.sampah.length > 0) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={calculateAllEmissions}
                  className="group relative overflow-hidden flex items-center justify-center gap-4 px-16 py-5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-emerald-300/50 transition-all duration-500"
                >
                  {/* Background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <Calculator className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Hitung Total Emisi Karbon</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Enhanced Transportation Section */}
        {selectedCategory === 'transportasi' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
          >
            {/* Enhanced Header with Beautiful Back Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Transportasi</h2>
                  <p className="text-gray-600">Hitung emisi dari kendaraan yang Anda gunakan</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className="group flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                <span className="text-gray-600 group-hover:text-gray-800 font-medium">Kembali</span>
              </motion.button>
            </div>

            {/* Transportation Steps */}
            {transportStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Pilih Jenis Transportasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTransportCategorySelect('darat')}
                    className="p-8 border-2 border-emerald-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"
                  >
                    <Car className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Transportasi Darat</h4>
                    <p className="text-gray-600">Mobil, Motor, Bus, Kereta</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTransportCategorySelect('udara')}
                    className="p-8 border-2 border-blue-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                  >
                    <Plane className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Transportasi Udara</h4>
                    <p className="text-gray-600">Pesawat, Helicopter</p>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {transportStep === 2 && selectedTransportCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Pilih Kendaraan {selectedTransportCategory === 'darat' ? 'Darat' : 'Udara'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {vehicleTypes[selectedTransportCategory].map((vehicle) => (
                    <motion.button
                      key={vehicle.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVehicleSelect(vehicle)}
                      className="p-6 border-2 border-gray-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"
                    >
                      <vehicle.icon className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-800">{vehicle.name}</p>
                    </motion.button>
                  ))}
                </div>
                
                <button
                  onClick={goBackTransport}
                  className="mt-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
              </motion.div>
            )}

            {transportStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Pilih Jenis Bahan Bakar</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {fuelTypes.map((fuel) => (
                    <motion.button
                      key={fuel.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFuelSelect(fuel)}
                      className="p-6 border-2 border-gray-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"
                    >
                      <div className={`w-12 h-12 ${fuel.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <fuel.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm font-medium text-gray-800">{fuel.name}</p>
                    </motion.button>
                  ))}
                </div>
                
                <button
                  onClick={goBackTransport}
                  className="mt-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
              </motion.div>
            )}

            {transportStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Input Jarak Tempuh</h3>
                
                <div className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl p-8 mb-8">
                  <div className="flex items-center justify-center space-x-8 mb-6">
                    <div className="flex flex-col items-center">
                      <MapPin className="w-8 h-8 text-emerald-500 mb-2" />
                      <span className="text-sm text-gray-600">Asal</span>
                    </div>
                    
                    <div className="flex-1 relative">
                      <div className="h-2 bg-emerald-200 rounded-full relative">
                        <div className="h-2 bg-emerald-500 rounded-full" style={{ width: distance > 0 ? '100%' : '0%' }}></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {selectedVehicle && <selectedVehicle.icon className="w-6 h-6 text-emerald-600" />}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <MapPin className="w-8 h-8 text-blue-500 mb-2" />
                      <span className="text-sm text-gray-600">Tujuan</span>
                    </div>
                  </div>
                  
                  <p className="text-lg font-medium text-gray-700">
                    Jarak yang akan ditempuh: <span className="text-emerald-600 font-bold">{distance} km</span>
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <label className="block text-left text-gray-700 font-medium mb-3">
                    Masukkan jarak dalam kilometer
                  </label>
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    placeholder="Contoh: 25"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-center text-lg"
                  />
                  
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={goBackTransport}
                      className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={handleAddTransportation}
                      disabled={distance <= 0}
                      className="flex-1 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Tambahkan
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

                {/* Transportation Summary */}
            {calculationData.transportasi.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Data Transportasi</h4>
                <div className="space-y-3">
                  {calculationData.transportasi.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <data.icon className="w-6 h-6 text-emerald-500" />
                        <div>
                          <p className="font-medium text-gray-800">{data.vehicle}</p>
                          <p className="text-sm text-gray-600">{data.fuelType} • {data.distance} km</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeTransportation(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToPreviousCategory('transportasi')}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Menu
              </motion.button>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setTransportStep(1);
                    setSelectedTransportCategory(null);
                    setSelectedVehicle(null);
                    setSelectedFuel(null);
                    setDistance(0);
                  }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Transportasi Lain
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => goToNextCategory('transportasi')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Lanjut ke Daya Rumah
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Household Power Section */}
        {selectedCategory === 'dayaRumah' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
          >
            {/* Enhanced Header with Beautiful Back Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Daya Rumah Tangga</h2>
                  <p className="text-gray-600">Hitung emisi dari konsumsi listrik rumah Anda</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className="group flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                <span className="text-gray-600 group-hover:text-gray-800 font-medium">Kembali</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Berapa jumlah orang yang tinggal dalam satu rumah?
                  </label>
                  <input
                    type="number"
                    value={householdData.occupants}
                    onChange={(e) => setHouseholdData({...householdData, occupants: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Darimana sumber energi listrik rumah tangga anda?
                  </label>
                  <select
                    value={householdData.energySource}
                    onChange={(e) => setHouseholdData({...householdData, energySource: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih sumber energi</option>
                    <option value="100% PLN">100% PLN</option>
                    <option value="100% Energi Bersih">100% Energi Bersih</option>
                    <option value="Hybrid (Dari PLN dan energi bersih)">Hybrid (Dari PLN dan energi bersih)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Berapa Daya yang terpasang (VA)?
                  </label>
                  <select
                    value={householdData.powerRating}
                    onChange={(e) => setHouseholdData({...householdData, powerRating: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={0}>Pilih daya terpasang</option>
                    <option value={450}>450 VA</option>
                    <option value={900}>900 VA</option>
                    <option value={1300}>1300 VA</option>
                    <option value={2200}>2200 VA</option>
                    <option value={3500}>3500 VA</option>
                    <option value={4400}>4400 VA</option>
                    <option value={5500}>5500 VA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Tagihan Listrik (Rp/bulan)?
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp.</span>
                    <input
                      type="number"
                      value={householdData.monthlyBill}
                      onChange={(e) => setHouseholdData({...householdData, monthlyBill: Number(e.target.value)})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Konsumsi listrik (kWh/bulan)?
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={householdData.monthlyConsumption}
                    onChange={(e) => setHouseholdData({...householdData, monthlyConsumption: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                {(householdData.energySource === '100% Energi Bersih' || householdData.energySource === 'Hybrid (Dari PLN dan energi bersih)') && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-3">
                        Jika memakai sumber energi bersih, energi apa yang digunakan?
                      </label>
                      <select
                        value={householdData.cleanEnergyType}
                        onChange={(e) => setHouseholdData({...householdData, cleanEnergyType: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Pilih jenis energi bersih</option>
                        <option value="Solar Panel">Solar Panel</option>
                        <option value="Wind Power">Wind Power</option>
                        <option value="Hydro Power">Hydro Power</option>
                        <option value="Biogas">Biogas</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-3">
                        Berapa kWh yang dihasilkan dari sumber energi bersih? (kWh/bulan)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={householdData.cleanEnergyGeneration}
                        onChange={(e) => setHouseholdData({...householdData, cleanEnergyGeneration: Number(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={handleAddHouseholdPower}
                  disabled={!householdData.occupants || !householdData.energySource || !householdData.powerRating}
                  className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Hitung Lebih Detail
                </button>
              </div>

              {/* Right Column - Info & Preview */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">💡 Tips Menghemat Listrik</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Gunakan lampu LED untuk menghemat hingga 80% energi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Cabut charger dan perangkat elektronik saat tidak digunakan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Atur suhu AC pada 24-26°C untuk efisiensi optimal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Pertimbangkan instalasi panel surya untuk energi terbarukan
                  </li>
                </ul>

                {householdData.monthlyConsumption > 0 && (
                  <div className="mt-6 p-4 bg-white rounded-xl">
                    <h5 className="font-bold text-gray-800 mb-2">Estimasi Emisi:</h5>
                    <p className="text-2xl font-bold text-blue-600">
                      {(householdData.monthlyConsumption * 0.85).toFixed(2)} kg CO2/bulan
                    </p>
                    {householdData.cleanEnergyGeneration > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        Pengurangan: -{(householdData.cleanEnergyGeneration * 0.85).toFixed(2)} kg CO2/bulan
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Household Power Summary */}
            {calculationData.listrik.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Data Konsumsi Listrik</h4>
                <div className="space-y-3">
                  {calculationData.listrik.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <Zap className="w-6 h-6 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-800">{data.energySource}</p>
                          <p className="text-sm text-gray-600">
                            {data.occupants} penghuni • {data.powerRating} VA • {data.monthlyConsumption} kWh/bulan
                          </p>
                          {data.monthlyBill > 0 && (
                            <p className="text-xs text-gray-500">
                              Tagihan: Rp. {data.monthlyBill.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeHouseholdPower(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToPreviousCategory('dayaRumah')}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Transportasi
              </motion.button>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setHouseholdData({
                    occupants: 1,
                    energySource: '',
                    powerRating: 0,
                    monthlyBill: 0,
                    monthlyConsumption: 0,
                    cleanEnergyType: '',
                    cleanEnergyGeneration: 0
                  })}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Data Rumah Lain
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => goToNextCategory('dayaRumah')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Lanjut ke Peralatan
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Appliances Section */}
        {selectedCategory === 'peralatanRumah' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
          >
            {/* Enhanced Header with Beautiful Back Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Peralatan Rumah Tangga</h2>
                  <p className="text-gray-600">Hitung emisi dari peralatan elektronik di rumah Anda</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className="group flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                <span className="text-gray-600 group-hover:text-gray-800 font-medium">Kembali</span>
              </motion.button>
            </div>

            {/* Living Room Section (Always Visible) */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Ruang Tamu</h3>
                    <p className="text-sm text-gray-600">Peralatan elektronik di ruang keluarga utama</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {applianceRooms.livingroom.appliances.map((appliance) => (
                    <div key={appliance.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <appliance.icon className="w-6 h-6 text-blue-600" />
                        <h5 className="text-lg font-bold text-gray-800">{appliance.name}</h5>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Jumlah Peralatan */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jumlah Peralatan
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => decrementAppliance('livingroom', appliance.id)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-bold text-lg">
                              {applianceData.livingroom?.[appliance.id]?.count || 0}
                            </span>
                            <button
                              onClick={() => incrementAppliance('livingroom', appliance.id)}
                              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                            >
                              +
                            </button>
                            <span className="text-sm text-gray-600 ml-2">Buah</span>
                          </div>
                        </div>

                        {/* Manual Watt Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Daya (Watt)
                          </label>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={applianceData.livingroom?.[appliance.id]?.watt || ''}
                            onChange={(e) => updateApplianceWatt('livingroom', appliance.id, Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Masukkan Daya (Watt)"
                          />
                        </div>

                        {/* Hours Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jam Pemakaian per Hari
                          </label>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={applianceData.livingroom?.[appliance.id]?.hours || ''}
                            onChange={(e) => updateApplianceHours('livingroom', appliance.id, Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Jam per hari (min. 1)"
                          />
                        </div>

                        {/* Energy Calculation Preview */}
                        {(applianceData.livingroom?.[appliance.id]?.count || 0) > 0 && 
                         (applianceData.livingroom?.[appliance.id]?.watt || 0) > 0 && 
                         (applianceData.livingroom?.[appliance.id]?.hours || 0) > 0 && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Konsumsi energi:</span>
                            </p>
                            <p className="text-lg font-bold text-blue-600">
                              {(
                                (applianceData.livingroom?.[appliance.id]?.count || 0) *
                                (applianceData.livingroom?.[appliance.id]?.watt || 0) *
                                (applianceData.livingroom?.[appliance.id]?.hours || 0) *
                                30 / 1000
                              ).toFixed(2)} kWh/bulan
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Rooms Checkboxes */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Ruangan Tambahan</h4>
                <p className="text-sm text-gray-600 mb-4">Centang jika Anda juga menggunakan peralatan elektronik di ruangan berikut:</p>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRooms.includes('bedroom')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRooms(prev => [...prev, 'bedroom']);
                        } else {
                          setSelectedRooms(prev => prev.filter(room => room !== 'bedroom'));
                        }
                      }}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-800">Saya juga menggunakan alat di Kamar Tidur</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRooms.includes('bathroom')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRooms(prev => [...prev, 'bathroom']);
                        } else {
                          setSelectedRooms(prev => prev.filter(room => room !== 'bathroom'));
                        }
                      }}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-800">Saya juga menggunakan alat di Kamar Mandi</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRooms.includes('kitchen')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRooms(prev => [...prev, 'kitchen']);
                        } else {
                          setSelectedRooms(prev => prev.filter(room => room !== 'kitchen'));
                        }
                      }}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <ChefHat className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-gray-800">Saya juga menggunakan alat di Dapur</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional Room Sections */}
              {selectedRooms.filter(roomKey => roomKey !== 'livingroom').map(roomKey => {
                const room = applianceRooms[roomKey as keyof typeof applianceRooms];
                if (!room) return null;
                
                return (
                  <motion.div
                    key={roomKey}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 mb-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <room.icon className={`w-8 h-8 ${room.color}`} />
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                        <p className="text-sm text-gray-600">Peralatan elektronik di {room.name.toLowerCase()}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {room.appliances.map((appliance: any) => (
                        <div key={appliance.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-3 mb-4">
                            <appliance.icon className="w-6 h-6 text-gray-600" />
                            <h5 className="text-lg font-bold text-gray-800">{appliance.name}</h5>
                          </div>
                          
                          <div className="space-y-4">
                            {/* Jumlah Peralatan */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Jumlah Peralatan
                              </label>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => decrementAppliance(roomKey, appliance.id)}
                                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                                >
                                  -
                                </button>
                                <span className="w-12 text-center font-bold text-lg">
                                  {applianceData[roomKey]?.[appliance.id]?.count || 0}
                                </span>
                                <button
                                  onClick={() => incrementAppliance(roomKey, appliance.id)}
                                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                                >
                                  +
                                </button>
                                <span className="text-sm text-gray-600 ml-2">Buah</span>
                              </div>
                            </div>

                            {/* Manual Watt Input */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Daya (Watt)
                              </label>
                              <input
                                type="number"
                                min="1"
                                step="1"
                                value={applianceData[roomKey]?.[appliance.id]?.watt || ''}
                                onChange={(e) => updateApplianceWatt(roomKey, appliance.id, Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan Daya (Watt)"
                              />
                            </div>

                            {/* Hours Input */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Jam Pemakaian per Hari
                              </label>
                              <input
                                type="number"
                                min="1"
                                step="1"
                                value={applianceData[roomKey]?.[appliance.id]?.hours || ''}
                                onChange={(e) => updateApplianceHours(roomKey, appliance.id, Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Jam per hari (min. 1)"
                              />
                            </div>

                            {/* Energy Calculation Preview */}
                            {(applianceData[roomKey]?.[appliance.id]?.count || 0) > 0 && 
                             (applianceData[roomKey]?.[appliance.id]?.watt || 0) > 0 && 
                             (applianceData[roomKey]?.[appliance.id]?.hours || 0) > 0 && (
                              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Konsumsi energi:</span>
                                </p>
                                <p className="text-lg font-bold text-green-600">
                                  {(
                                    (applianceData[roomKey]?.[appliance.id]?.count || 0) *
                                    (applianceData[roomKey]?.[appliance.id]?.watt || 0) *
                                    (applianceData[roomKey]?.[appliance.id]?.hours || 0) *
                                    30 / 1000
                                  ).toFixed(2)} kWh/bulan
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleAddAppliances}
                className="bg-purple-500 text-white px-8 py-3 rounded-xl hover:bg-purple-600 transition-colors font-semibold"
              >
                Hitung Emisi Peralatan
              </button>
            </div>

            {/* Appliances Summary */}
            {calculationData.peralatan.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Data Peralatan Rumah Tangga</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {calculationData.peralatan.map((roomData, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <h5 className="font-medium text-gray-800 mb-2">{roomData.room}</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        {Object.entries(roomData.appliances).map(([applianceId, data]) => {
                          const appliance = Object.values(applianceRooms)
                            .flatMap(room => room.appliances)
                            .find(app => app.id === applianceId);
                          return (
                            <div key={applianceId} className="flex justify-between items-center">
                              <span>{appliance?.name}:</span>
                              <span className="font-medium">
                                {data.count} buah, {data.hours}h, {data.watt}W
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToPreviousCategory('peralatanRumah')}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Daya Rumah
              </motion.button>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setApplianceData({});
                    setSelectedRooms([]);
                  }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Ruangan Lain
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => goToNextCategory('peralatanRumah')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Lanjut ke Makanan
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Food Section */}
        {selectedCategory === 'makanan' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Utensils className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Konsumsi Makanan</h2>
                  <p className="text-gray-600">Hitung emisi dari pola makan Anda</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-300 text-gray-700 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Kembali</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodTypes.map((food) => (
                <div key={food.id} className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <food.icon className={`w-8 h-8 ${food.color}`} />
                    <div>
                      <h4 className="font-bold text-gray-800">{food.name}</h4>
                      <p className="text-xs text-gray-600">{food.unit}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm text-gray-700">
                      Konsumsi per minggu ({food.unit})
                    </label>
                    <input
                      type="number"
                      value={foodData[food.id] || ''}
                      onChange={(e) => setFoodData({...foodData, [food.id]: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder={`Contoh: ${food.example}`}
                    />
                    
                    {foodData[food.id] > 0 && (
                      <div className="text-xs text-gray-600 bg-white rounded-lg p-2">
                        Emisi: <span className="font-medium text-orange-600">
                          {(foodData[food.id] * food.emissionFactor).toFixed(2)} kg CO2/minggu
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleAddFood}
                className="bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors"
              >
                Simpan Data Makanan
              </button>
            </div>

            {/* Food Summary */}
            {calculationData.makanan.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Data Konsumsi Makanan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {calculationData.makanan.map((data, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        {(() => {
                          const foodType = foodTypes.find(f => f.id === data.foodId);
                          return foodType ? <foodType.icon className="w-6 h-6 text-orange-500" /> : null;
                        })()}
                        <div>
                          <p className="font-medium text-gray-800">{data.foodName}</p>
                          <p className="text-sm text-gray-600">{data.amount} {data.unit}/minggu</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToPreviousCategory('makanan')}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Peralatan
              </motion.button>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFoodData({})}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Data Makanan Lain
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => goToNextCategory('makanan')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Lanjut ke Sampah
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Waste Section */}
        {selectedCategory === 'sampah' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Pengelolaan Sampah</h2>
                  <p className="text-gray-600">Hitung emisi dari pengelolaan sampah Anda</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-300 text-gray-700 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Kembali</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wasteTypes.map((waste) => (
                <div key={waste.id} className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <waste.icon className={`w-8 h-8 ${waste.color}`} />
                    <div>
                      <h4 className="font-bold text-gray-800">{waste.name}</h4>
                      <p className="text-sm text-gray-600">{waste.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm text-gray-700">
                      Jumlah per minggu (kg)
                    </label>
                    <input
                      type="number"
                      value={wasteData[waste.id] || ''}
                      onChange={(e) => setWasteData({...wasteData, [waste.id]: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder={`Contoh: ${waste.example}`}
                    />
                    
                    {wasteData[waste.id] > 0 && (
                      <div className="text-xs text-gray-600 bg-white rounded-lg p-2">
                        <div>Per minggu: <span className="font-medium text-red-600">
                          {(wasteData[waste.id] * waste.emissionFactor).toFixed(2)} kg CO2
                        </span></div>
                        <div>Per bulan: <span className="font-medium text-red-600">
                          {(wasteData[waste.id] * waste.emissionFactor * 4.33).toFixed(2)} kg CO2
                        </span></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleAddWaste}
                className="bg-red-500 text-white px-8 py-3 rounded-xl hover:bg-red-600 transition-colors"
              >
                Simpan Data Sampah
              </button>
            </div>

            {/* Waste Summary */}
            {calculationData.sampah.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Data Pengelolaan Sampah</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {calculationData.sampah.map((data, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        {(() => {
                          const wasteType = wasteTypes.find(w => w.id === data.wasteId);
                          return wasteType ? <wasteType.icon className="w-6 h-6 text-red-500" /> : null;
                        })()}
                        <div>
                          <p className="font-medium text-gray-800">{data.wasteName}</p>
                          <p className="text-sm text-gray-600">{data.amount} kg/minggu</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToPreviousCategory('sampah')}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Makanan
              </motion.button>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setWasteData({})}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Data Sampah Lain
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={calculateAllEmissions}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Hitung Total Emisi
                  <Calculator className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Calculate All Button */}
        {(calculationData.transportasi.length > 0 || 
          calculationData.listrik.length > 0 || 
          calculationData.peralatan.length > 0 || 
          calculationData.makanan.length > 0 || 
          calculationData.sampah.length > 0) && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Siap untuk Menghitung Total Emisi?
            </h3>
            <p className="text-gray-600 mb-6">
              Kami akan menghitung jejak karbon dari semua kategori yang telah Anda input
            </p>
            <button
              onClick={calculateAllEmissions}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-12 py-4 rounded-xl font-bold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Calculator className="w-6 h-6" />
              Hitung Total Emisi Karbon
            </button>
          </div>
        )}

        {/* Results Section */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl shadow-xl p-8 text-white"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🌍 Hasil Perhitungan Emisi Karbon</h2>
              <div className="text-6xl font-bold mb-2">{results.totalEmissions.toFixed(2)}</div>
              <div className="text-xl opacity-90">kg CO2 per bulan</div>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(results.categoryBreakdown).map(([category, data]: [string, any]) => (
                data.emissions > 0 && (
                  <div key={category} className="bg-white/20 rounded-2xl p-6 text-center">
                    <data.icon className="w-12 h-12 mx-auto mb-3 text-white" />
                    <h4 className="text-lg font-bold mb-2">{data.name}</h4>
                    <div className="text-2xl font-bold">{data.emissions.toFixed(2)} kg</div>
                    <div className="text-sm opacity-75">{((data.emissions / results.totalEmissions) * 100).toFixed(1)}% dari total</div>
                  </div>
                )
              ))}
            </div>

            {/* Impact Comparison */}
            <div className="bg-white/20 rounded-2xl p-6 mb-6">
              <h4 className="text-xl font-bold mb-4 text-center">📊 Perbandingan Dampak</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{(results.totalEmissions / 2.3).toFixed(1)}</div>
                  <div className="text-sm opacity-75">Setara konsumsi bensin (liter/bulan)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{(results.totalEmissions / 21.77).toFixed(1)}</div>
                  <div className="text-sm opacity-75">Setara menanam pohon (batang/tahun)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{(results.totalEmissions * 12).toFixed(0)}</div>
                  <div className="text-sm opacity-75">Total emisi per tahun (kg CO2)</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 text-center">💡 Rekomendasi Pengurangan</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold mb-2">Transportasi</h5>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Gunakan transportasi umum atau bersepeda</li>
                    <li>• Carpooling untuk perjalanan jauh</li>
                    <li>• Pertimbangkan kendaraan listrik</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold mb-2">Rumah Tangga</h5>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Gunakan peralatan hemat energi</li>
                    <li>• Kurangi konsumsi daging merah</li>
                    <li>• Daur ulang dan kompos sampah organik</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
