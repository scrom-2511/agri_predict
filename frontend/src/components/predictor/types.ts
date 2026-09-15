export type SoilType = 'Sandy' | 'Loamy' | 'Black' | 'Red' | 'Clayey';

export type CropType = 
  | 'Maize' 
  | 'Sugarcane' 
  | 'Cotton' 
  | 'Tobacco' 
  | 'Paddy' 
  | 'Barley' 
  | 'Wheat' 
  | 'Millets' 
  | 'Oil seeds' 
  | 'Pulses' 
  | 'Ground Nuts'
  | 'rice'
  | 'pomegranate'
  | 'coffee'
  | 'watermelon'
  | 'kidneybeans'
  | 'orange'
  | 'Rice'
  | 'Pomegranate'
  | 'Coffee'
  | 'Watermelon'
  | 'Kidneybeans'
  | 'Orange';

export interface PredictorFormData {
  temperature: number;
  humidity: number;
  moisture: number;
  soilType: SoilType;
  cropType: CropType;
  nitrogen: number;
  potassium: number;
  phosphorous: number;
}

export interface FertilizerPredictionPayload {
  temperature: number;
  humidity: number;
  moisture: number;
  soil_type: SoilType;
  crop_type: string;
  nitrogen: number;
  potassium: number;
  phosphorous: number;
}

export interface FertilizerPredictionResponse {
  fertilizer: string;
}

export interface FertilizerDetails {
  name: string;
  chemicalFormula?: string;
  npkRating: string;
  category: string;
  pricePerBag: number;
  packageWeight: string;
  rating: number;
  reviewsCount: number;
  tagline: string;
  description: string;
  features: string[];
  applicationRate: string;
  safetyInterval: string;
}

export const FERTILIZER_DATABASE: Record<string, FertilizerDetails> = {
  'Urea': {
    name: 'Urea',
    chemicalFormula: 'CO(NH₂)₂',
    npkRating: '46-0-0',
    category: 'High Nitrogen Fertilizer',
    pricePerBag: 28.50,
    packageWeight: '50 kg',
    rating: 4.9,
    reviewsCount: 342,
    tagline: 'High-density nitrogen supplement for robust vegetative growth.',
    description: 'Urea is the most concentrated solid nitrogen fertilizer available. Fast-dissolving white prills stimulate rapid leaf expansion, chlorophyll synthesis, and early season vigor.',
    features: ['46% Pure Elemental Nitrogen', 'Rapid vegetative surge', '100% water-soluble white prills', 'Optimized for top-dressing'],
    applicationRate: '45 - 65 kg / hectare',
    safetyInterval: 'Apply 10 days before active tillering'
  },
  'DAP': {
    name: 'DAP (Di-Ammonium Phosphate)',
    chemicalFormula: '(NH₄)₂HPO₄',
    npkRating: '18-46-0',
    category: 'Phosphatic Fertilizer',
    pricePerBag: 39.00,
    packageWeight: '50 kg',
    rating: 4.8,
    reviewsCount: 512,
    tagline: 'Essential root developer and early crop establishment booster.',
    description: 'DAP delivers the ideal balance of nitrogen and high phosphorus. Perfect for basal dressing during sowing to promote profound root structures and vigorous seedling emergence.',
    features: ['46% Readily Available P₂O₅', '18% Ammoniacal Nitrogen', 'Accelerates deep root rooting', 'Excellent soil granule persistence'],
    applicationRate: '50 - 75 kg / hectare',
    safetyInterval: 'Basal placement directly at seed bed'
  },
  'TSP': {
    name: 'TSP (Triple Superphosphate)',
    chemicalFormula: 'Ca(H₂PO₄)₂·H₂O',
    npkRating: '0-46-0',
    category: 'Concentrated Phosphorus',
    pricePerBag: 34.00,
    packageWeight: '50 kg',
    rating: 4.7,
    reviewsCount: 189,
    tagline: 'Pure non-nitrogen phosphorus booster for flowering & seed set.',
    description: 'High-grade Triple Superphosphate gives crops pure phosphorus without nitrogen bias. Stimulates root proliferation, uniform flowering, and early maturity.',
    features: ['46% Available Phosphate', 'Nitrogen-free formulation', 'Increases drought resistance', 'Enhances flowering uniformity'],
    applicationRate: '40 - 60 kg / hectare',
    safetyInterval: 'Incorporate during initial plowing'
  },
  'Superphosphate': {
    name: 'Single Superphosphate (SSP)',
    chemicalFormula: 'Ca(H₂PO₄)₂ + CaSO₄',
    npkRating: '0-16-0 + 11% S + 19% Ca',
    category: 'Phosphorus + Sulfur + Calcium',
    pricePerBag: 22.00,
    packageWeight: '50 kg',
    rating: 4.6,
    reviewsCount: 204,
    tagline: 'Triple-nutrient powerhouse delivering phosphorus, sulfur, and calcium.',
    description: 'Enriched with vital secondary nutrients (Sulfur and Calcium), SSP boosts oilseed content and improves soil flocculation while furnishing essential phosphate.',
    features: ['16% Soluble P₂O₅', '11% Essential Plant Sulfur', '19% Soil-conditioning Calcium', 'Superior for oilseeds and legumes'],
    applicationRate: '60 - 90 kg / hectare',
    safetyInterval: 'Pre-sowing broadcast or furrow banding'
  },
  'Potassium sulfate': {
    name: 'Potassium Sulfate (SOP)',
    chemicalFormula: 'K₂SO₄',
    npkRating: '0-0-50 + 17% S',
    category: 'Chloride-Free Potassium',
    pricePerBag: 52.00,
    packageWeight: '50 kg',
    rating: 4.9,
    reviewsCount: 175,
    tagline: 'Premium chloride-free potassium for fruit quality, sugar, and drought defense.',
    description: 'Sulfate of Potash (SOP) is ideal for chlorine-sensitive crops like tobacco, potato, and orchard fruits. Maximizes starch accumulation, color density, and post-harvest shelf life.',
    features: ['50% Water Soluble Potash (K₂O)', '17% Bio-available Sulfur', 'Virtually zero chloride index (<1%)', 'Increases frost and drought resilience'],
    applicationRate: '35 - 55 kg / hectare',
    safetyInterval: 'Split applications at tuber/fruit formation'
  },
  'Potassium chloride': {
    name: 'Potassium Chloride (MOP)',
    chemicalFormula: 'KCl',
    npkRating: '0-0-60',
    category: 'Standard Potassium (Muriate of Potash)',
    pricePerBag: 36.00,
    packageWeight: '50 kg',
    rating: 4.8,
    reviewsCount: 420,
    tagline: 'Most economical potassium source for stem strength and disease immunity.',
    description: 'MOP furnishes high-test 60% potassium oxide. Thickens plant cell walls to guard against lodging and activates over 60 essential enzymatic plant reactions.',
    features: ['60% Concentrated K₂O', 'Reduces lodging in cereal grains', 'Regulates leaf stomata transpiration', 'Enhances drought resistance'],
    applicationRate: '40 - 70 kg / hectare',
    safetyInterval: 'Apply during pre-sowing or early vegetative split'
  },
  '28-28': {
    name: 'Complex NPK 28-28-0',
    chemicalFormula: 'Granular Homogenous N-P',
    npkRating: '28-28-0',
    category: 'High-Strength Balanced Starter',
    pricePerBag: 42.00,
    packageWeight: '50 kg',
    rating: 4.7,
    reviewsCount: 142,
    tagline: 'Equal-ratio nitrogen and phosphorus for explosive initial vegetative burst.',
    description: 'A 1:1 ratio formulation supplying substantial nitrogen for tillering alongside heavy phosphorus for vigorous root crowns in sugarcane and cereal grains.',
    features: ['28% Balanced Nitrogen', '28% Total Phosphorus', 'Homogenous granules prevent nutrient segregation', 'Fast dissolving'],
    applicationRate: '50 - 75 kg / hectare',
    safetyInterval: 'Early tillering stage application'
  },
  '20-20': {
    name: 'Complex NPK 20-20-0 + 13% S',
    chemicalFormula: 'Ammonium Phosphate Sulfate',
    npkRating: '20-20-0 + 13% S',
    category: 'Balanced Starter with Sulfur',
    pricePerBag: 37.00,
    packageWeight: '50 kg',
    rating: 4.8,
    reviewsCount: 260,
    tagline: 'Reliable starter fertilizer fortified with high plant-available sulfur.',
    description: 'Supplies ammonium nitrogen, water-soluble phosphate, and 13% sulfur. Highly effective in sulfur-depleted sandy and loamy soils.',
    features: ['20% Total Nitrogen', '20% Phosphate', '13% Soluble Sulfur', 'Excellent drillability in modern seeders'],
    applicationRate: '60 - 80 kg / hectare',
    safetyInterval: 'Basal placement at planting'
  },
  '17-17-17': {
    name: 'Complete NPK 17-17-17',
    chemicalFormula: 'Equi-Balanced NPK Compound',
    npkRating: '17-17-17',
    category: 'All-Round Balanced Fertilizer',
    pricePerBag: 44.00,
    packageWeight: '50 kg',
    rating: 4.9,
    reviewsCount: 310,
    tagline: 'Perfect universal balance providing equal N, P, and K for all growth phases.',
    description: 'Universal balanced ratio guarantees uniform plant development. Leaves no nutrient deficiency gaps throughout vegetative and reproductive transitions.',
    features: ['17% Nitrogen, 17% Phosphorus, 17% Potassium', 'Uniform nutrient delivery per granule', 'Suitable for both cereals and cash crops', 'Minimal leaching loss'],
    applicationRate: '60 - 90 kg / hectare',
    safetyInterval: 'Mid-vegetative top dressing'
  },
  '15-15-15': {
    name: 'Complete NPK 15-15-15',
    chemicalFormula: 'Triple 15 Homogenous Granules',
    npkRating: '15-15-15',
    category: 'Classic Balanced Multi-Nutrient',
    pricePerBag: 40.00,
    packageWeight: '50 kg',
    rating: 4.8,
    reviewsCount: 285,
    tagline: 'Time-tested balanced nutrition for steady sustained crop development.',
    description: 'The global benchmark for multi-nutrient nutrition. Provides safe, sustained nutrition with low salt index, minimizing root burn risks.',
    features: ['15-15-15 Tri-balanced composition', 'Gentle on emerging seedlings', 'Low salt index formulation', 'Sustained nutrient release profile'],
    applicationRate: '70 - 100 kg / hectare',
    safetyInterval: 'Sowing or early side-dressing'
  },
  '14-35-14': {
    name: 'High-Phos NPK 14-35-14',
    chemicalFormula: 'Crown & Root Booster',
    npkRating: '14-35-14',
    category: 'Root and Tiller Accelerator',
    pricePerBag: 47.00,
    packageWeight: '50 kg',
    rating: 4.9,
    reviewsCount: 198,
    tagline: 'Heavy phosphorus formulation engineered for strong root tillers and flowering.',
    description: 'Designed specifically for soils hungry for phosphorus while sustaining foundational nitrogen and potassium support.',
    features: ['35% High Phosphate', '14% Nitrogen & 14% Potash', 'Rapid seedling stand establishment', 'Reduces seed drop shock'],
    applicationRate: '50 - 75 kg / hectare',
    safetyInterval: 'Basal placement directly in seed furrow'
  },
  '14-14-14': {
    name: 'Standard NPK 14-14-14',
    chemicalFormula: 'Triple 14 Controlled Release',
    npkRating: '14-14-14',
    category: 'Even-Release Garden & Field Blend',
    pricePerBag: 38.00,
    packageWeight: '50 kg',
    rating: 4.7,
    reviewsCount: 164,
    tagline: 'Reliable equal-portion nutrition for steady vegetative and root maintenance.',
    description: 'Standard triple-14 formulation delivering balanced nutrition suited for maintenance, perennial crops, and balanced crop cycles.',
    features: ['14-14-14 Complete analysis', 'Safe and stable granule integrity', 'Reduces volatilization losses', 'All-weather stability'],
    applicationRate: '65 - 95 kg / hectare',
    safetyInterval: 'Early tillering or branching stage'
  },
  '10-26-26': {
    name: 'High PK Complex 10-26-26',
    chemicalFormula: 'Low N / High PK Grain Builder',
    npkRating: '10-26-26',
    category: 'Grain Filling & Panicle Multiplier',
    pricePerBag: 49.00,
    packageWeight: '50 kg',
    rating: 4.9,
    reviewsCount: 380,
    tagline: 'Elite phosphorus and potassium complex for dense grain filling and high test weights.',
    description: 'High phosphate and potash ratio boosts panicle emergence, fruit enlargement, and grain test weight without excess vegetative lodging.',
    features: ['26% Phosphorus & 26% Potassium', 'Low 10% starter Nitrogen', 'Improves grain weight and seed quality', 'Exceptional yield maximization'],
    applicationRate: '50 - 80 kg / hectare',
    safetyInterval: 'Pre-flowering or boot-leaf stage'
  },
  '10-10-10': {
    name: 'Gentle NPK 10-10-10',
    chemicalFormula: 'Mild Triple-10 Base Blend',
    npkRating: '10-10-10',
    category: 'Mild Balanced Base Fertilizer',
    pricePerBag: 30.00,
    packageWeight: '50 kg',
    rating: 4.6,
    reviewsCount: 118,
    tagline: 'Gentle, balanced nutrition ideal for young seedlings and delicate crop roots.',
    description: 'A mild 10-10-10 composition providing foundational macro-nutrients with minimal burn risk for young shoots and specialty horticulture.',
    features: ['10-10-10 Mild macro-profile', 'Zero leaf burn under normal moisture', 'Ideal for organic-transition soils', 'Easy even distribution'],
    applicationRate: '80 - 120 kg / hectare',
    safetyInterval: 'Broadcast before sowing'
  }
};
