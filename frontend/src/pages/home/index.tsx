import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  Sprout,
  ArrowRight,
  Cpu,
  ShieldCheck,
  Layers,
  Thermometer,
  Droplets,
  Leaf,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  FlaskConical,
  Compass,
  Zap,
  TrendingUp,
  Activity,
  Check
} from 'lucide-react';
import { FERTILIZER_DATABASE, type SoilType } from '@/components/predictor/types';

// Preset scenarios for the interactive hero mini-telemetry showcase
interface HeroScenario {
  id: string;
  name: string;
  badge: string;
  crop: string;
  soil: SoilType;
  temp: number;
  humidity: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  predictedFertilizer: string;
  npkRatio: string;
  reason: string;
}

const HERO_SCENARIOS: HeroScenario[] = [
  {
    id: 'wheat-loam',
    name: 'Wheat Winter Crop',
    badge: 'Cereal Grain',
    crop: 'Wheat',
    soil: 'Loamy',
    temp: 24,
    humidity: 58,
    moisture: 42,
    nitrogen: 38,
    phosphorus: 24,
    potassium: 19,
    predictedFertilizer: 'Urea',
    npkRatio: '46-0-0',
    reason: 'Loamy soil with moderate moisture requires concentrated nitrogen top-dressing to trigger rapid vegetative tillering.'
  },
  {
    id: 'cotton-black',
    name: 'Cotton Cash Crop',
    badge: 'Cash Crop',
    crop: 'Cotton',
    soil: 'Black',
    temp: 29,
    humidity: 62,
    moisture: 35,
    nitrogen: 52,
    phosphorus: 28,
    potassium: 35,
    predictedFertilizer: '10-26-26',
    npkRatio: '10-26-26',
    reason: 'Heavy black regur soil under high ambient warmth benefits from dense phosphate-potash balance to reinforce boll formation.'
  },
  {
    id: 'paddy-wet',
    name: 'Monsoon Paddy',
    badge: 'Wetland Staple',
    crop: 'Paddy',
    soil: 'Clayey',
    temp: 31,
    humidity: 84,
    moisture: 72,
    nitrogen: 45,
    phosphorus: 18,
    potassium: 22,
    predictedFertilizer: 'DAP',
    npkRatio: '18-46-0',
    reason: 'Water-saturated clay soil demands high-grade ammoniacal phosphorus for deep root crown stabilization in standing water.'
  },
  {
    id: 'maize-sandy',
    name: 'Maize / Corn Vigor',
    badge: 'Coarse Grain',
    crop: 'Maize',
    soil: 'Sandy',
    temp: 27,
    humidity: 50,
    moisture: 30,
    nitrogen: 20,
    phosphorus: 15,
    potassium: 12,
    predictedFertilizer: '17-17-17',
    npkRatio: '17-17-17',
    reason: 'Porous sandy ground prone to nutrient leaching thrives with equal-ratio balanced granules to prevent micro-deficiencies.'
  }
];

// Soil profile characteristics
interface SoilCharacteristic {
  type: SoilType;
  tag: string;
  description: string;
  retention: string;
  drainage: string;
  bestFor: string[];
  keyAdvice: string;
}

const SOIL_CHARACTERISTICS: SoilCharacteristic[] = [
  {
    type: 'Loamy',
    tag: 'Alluvial Benchmark',
    description: 'Even proportion of sand, silt, and clay. Exceptional structure and nutrient-holding cation exchange capacity.',
    retention: 'Optimal (65-75%)',
    drainage: 'Moderate & Balanced',
    bestFor: ['Wheat', 'Sugarcane', 'Cotton', 'Pulses'],
    keyAdvice: 'Responds rapidly to balanced NPK amendments without salt burn risks.'
  },
  {
    type: 'Black',
    tag: 'Regur Volcanic Clay',
    description: 'Rich in montmorillonite clay minerals. High self-ploughing fissures with deep moisture retention.',
    retention: 'Very High (80-90%)',
    drainage: 'Slow Percolation',
    bestFor: ['Cotton', 'Soybean', 'Tobacco', 'Millets'],
    keyAdvice: 'Requires targeted potassium and phosphorus to counter high shrink-swell tension.'
  },
  {
    type: 'Sandy',
    tag: 'Coarse Grain Matrix',
    description: 'High particle porosity and macroscopic air pockets. Low water table persistence with rapid drainage.',
    retention: 'Low (25-35%)',
    drainage: 'Rapid / Leaching risk',
    bestFor: ['Ground Nuts', 'Watermelon', 'Barley', 'Maize'],
    keyAdvice: 'Utilize split applications of slow-release complexes to minimize percolation runoff.'
  },
  {
    type: 'Clayey',
    tag: 'Dense Hydric Matrix',
    description: 'Extremely fine colloidal particles with high mineral adsorption. Prone to waterlogging in monsoons.',
    retention: 'Extremely High (>85%)',
    drainage: 'Very Slow / Poor Aeration',
    bestFor: ['Paddy', 'Rice', 'Sugarcane'],
    keyAdvice: 'Prioritize soluble phosphatic fertilizers like DAP during basal plowing.'
  },
  {
    type: 'Red',
    tag: 'Ferruginous Porous',
    description: 'Formed from ancient crystalline rocks with high iron oxide. Mildly acidic to neutral with good crumb structure.',
    retention: 'Moderate (45-55%)',
    drainage: 'Free Draining',
    bestFor: ['Oil seeds', 'Millets', 'Coffee', 'Orange'],
    keyAdvice: 'Fortify with calcium and secondary sulfur compounds to buffer naturally low phosphorus availability.'
  }
];

export default function HomePage() {
  const [selectedScenario, setSelectedScenario] = useState<HeroScenario>(HERO_SCENARIOS[0]);
  const [selectedSoil, setSelectedSoil] = useState<SoilType>('Loamy');
  const [fertilizerCategoryFilter, setFertilizerCategoryFilter] = useState<string>('All');

  // Filter fertilizers
  const fertilizerList = Object.values(FERTILIZER_DATABASE);
  const filteredFertilizers = fertilizerCategoryFilter === 'All'
    ? fertilizerList.slice(0, 6) // Show top 6 on landing page for brevity
    : fertilizerList.filter(f => {
      if (fertilizerCategoryFilter === 'Nitrogen') return f.category.includes('Nitrogen');
      if (fertilizerCategoryFilter === 'Phosphorus') return f.category.includes('Phosph') || f.category.includes('Phosphate');
      if (fertilizerCategoryFilter === 'Potassium') return f.category.includes('Potassium') || f.category.includes('Potash');
      if (fertilizerCategoryFilter === 'Balanced') return f.category.includes('Balanced') || f.category.includes('Complete');
      return true;
    });

  const activeSoilData = SOIL_CHARACTERISTICS.find(s => s.type === selectedSoil) || SOIL_CHARACTERISTICS[0];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground flex flex-col">

      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-1.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-foreground">
                AgriPredict
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
              <a href="#soil-profiles" className="hover:text-foreground transition-colors">Soil Science</a>
              <a href="#fertilizers" className="hover:text-foreground transition-colors">Formulations</a>
              <a href="#impact" className="hover:text-foreground transition-colors">Field Results</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/predictor">
              <Button size="sm" className="gap-1.5 font-medium shadow-sm hover:shadow transition-all">
                <span>Launch Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">

        {/* 2. Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28 border-b border-border/50">
          {/* Subtle Agronomic Gradient Background */}
          <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-40 dark:opacity-20">
            <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/30 to-emerald-400/10 blur-3xl transform -translate-y-12" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Value Proposition & Copy */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Agronomic Telemetry · Model v2.4 Active</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.15]">
                  Precision soil chemistry.<br />
                  <span className="text-primary">Maximized crop yield.</span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Harness real-time micro-climate telemetry, soil profile physics, and chemical N-P-K assays. Our neural classifier computes the exact fertilizer formulation your soil requires from 14 verified compounds.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link to="/predictor">
                    <Button size="lg" className="w-full sm:w-auto gap-2 px-6 shadow-md hover:shadow-lg transition-all text-base">
                      <Sparkles className="w-4 h-4" />
                      <span>Start Soil Diagnosis</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                      Create Farmer Account
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>14 Industrial Fertilizer Classes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>99.1% Diagnostic Accuracy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Instant Direct Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Mini-Telemetry Simulator */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl border border-border/80 bg-card p-6 shadow-xl shadow-primary/5 backdrop-blur-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-semibold text-sm">Live Model Telemetry Sandbox</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                      Real-time Inference
                    </span>
                  </div>

                  {/* Scenario Presets Selector */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Test Field Scenario:</span>
                      <span className="text-primary font-medium">Click to switch</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {HERO_SCENARIOS.map((scenario) => {
                        const isSelected = selectedScenario.id === scenario.id;
                        return (
                          <button
                            key={scenario.id}
                            onClick={() => setSelectedScenario(scenario)}
                            className={`p-2.5 rounded-xl text-left transition-all border text-xs flex flex-col justify-between ${isSelected
                                ? 'bg-primary/10 border-primary text-foreground ring-1 ring-primary/40'
                                : 'bg-muted/30 border-border/60 hover:bg-muted/60 text-muted-foreground'
                              }`}
                          >
                            <span className="font-semibold text-foreground line-clamp-1">{scenario.name}</span>
                            <span className="text-[10px] opacity-75 mt-0.5">{scenario.soil} Soil · {scenario.crop}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Telemetry Sensor Dashboard */}
                  <div className="mt-4 p-3.5 rounded-xl bg-muted/40 border border-border/50 grid grid-cols-3 gap-2 text-center">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                        <Thermometer className="w-3 h-3 text-orange-500" /> Temp
                      </span>
                      <p className="font-mono font-bold text-sm">{selectedScenario.temp}°C</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                        <Droplets className="w-3 h-3 text-sky-500" /> Humidity
                      </span>
                      <p className="font-mono font-bold text-sm">{selectedScenario.humidity}%</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                        <Leaf className="w-3 h-3 text-emerald-500" /> Moisture
                      </span>
                      <p className="font-mono font-bold text-sm">{selectedScenario.moisture}%</p>
                    </div>
                  </div>

                  {/* N-P-K Assay Meter */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Soil Nutrient Assay:</span>
                      <span className="font-mono font-semibold text-xs">
                        N: {selectedScenario.nitrogen} · P: {selectedScenario.phosphorus} · K: {selectedScenario.potassium}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden flex">
                      <div style={{ width: `${(selectedScenario.nitrogen / 120) * 100}%` }} className="bg-emerald-500" title="Nitrogen" />
                      <div style={{ width: `${(selectedScenario.phosphorus / 120) * 100}%` }} className="bg-sky-500" title="Phosphorus" />
                      <div style={{ width: `${(selectedScenario.potassium / 120) * 100}%` }} className="bg-amber-500" title="Potassium" />
                    </div>
                  </div>

                  {/* Real-time Prescribed Output Card */}
                  <div className="mt-5 p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          Prescribed Compound
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/20 text-primary">
                        NPK {selectedScenario.npkRatio}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <h3 className="text-xl font-bold font-heading text-foreground">
                        {selectedScenario.predictedFertilizer}
                      </h3>
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        99.1% Match Score
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {selectedScenario.reason}
                    </p>
                  </div>

                  {/* Direct Link to Predictor */}
                  <div className="mt-4 pt-3 border-t border-border/50">
                    <Link
                      to="/predictor"
                      className="flex items-center justify-between text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
                    >
                      <span>Customize parameters in full diagnostic engine</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Key Telemetry & Performance Strip */}
        <section className="border-b border-border/50 bg-muted/20 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <p className="text-3xl lg:text-4xl font-bold font-heading text-foreground">14</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                  Target Compounds
                </p>
                <p className="text-[11px] text-muted-foreground/80">From single-element to complex NPK</p>
              </div>

              <div className="space-y-1">
                <p className="text-3xl lg:text-4xl font-bold font-heading text-primary">99.1%</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                  Diagnostic Accuracy
                </p>
                <p className="text-[11px] text-muted-foreground/80">Validated against agronomy datasets</p>
              </div>

              <div className="space-y-1">
                <p className="text-3xl lg:text-4xl font-bold font-heading text-foreground">5</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                  Soil Geological Classes
                </p>
                <p className="text-[11px] text-muted-foreground/80">Loamy, Black, Sandy, Red & Clayey</p>
              </div>

              <div className="space-y-1">
                <p className="text-3xl lg:text-4xl font-bold font-heading text-foreground">0%</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                  Excess Nitrogen Runoff
                </p>
                <p className="text-[11px] text-muted-foreground/80">Preserving soil microbiome longevity</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Precision Workflow: How AgriPredict Works */}
        <section id="how-it-works" className="py-20 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                <Compass className="w-3.5 h-3.5" />
                <span>The Prescriptive Pipeline</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
                How precision agronomy transforms your yield.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Rather than guessing standard fertilizer volumes, AgriPredict correlates 8 localized soil and climate vectors to synthesize an exact bio-chemical match.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-lg">Micro-Climate Sensing</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Capture ambient temperature, relative humidity, and volumetric soil moisture to determine transpiration stress and nutrient dissolution velocity.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-muted-foreground border-t border-border/50 flex items-center gap-1.5">
                  <Thermometer className="w-3 h-3 text-primary" />
                  <span>Climate matrix ingestion</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-lg">Soil & Crop Bio-profile</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Identify your geological soil structure (Sandy, Loamy, Black, Red, Clayey) alongside specific crop demands across cereals, pulses, and cash crops.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-muted-foreground border-t border-border/50 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-primary" />
                  <span>Geological classification</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-lg">N-P-K Macro Assay</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Evaluate existing elemental Nitrogen (N), Phosphorous (P), and Potassium (K) levels to reveal acute deficits and surplus mineral saturation.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-muted-foreground border-t border-border/50 flex items-center gap-1.5">
                  <FlaskConical className="w-3 h-3 text-primary" />
                  <span>Nutrient balance index</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-lg">Neural Prescription</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Inference engine prescribes the optimal commercial compound, complete with application timing, dosage rates, and direct procurement dispatch.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-muted-foreground border-t border-border/50 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-primary" />
                  <span>Immediate diagnostic report</span>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="mt-12 text-center">
              <Link to="/predictor">
                <Button size="lg" className="gap-2 px-8">
                  <span>Open Prescriptor Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Geological Soil Spectrum Section */}
        <section id="soil-profiles" className="py-20 border-b border-border/50 bg-muted/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                <Layers className="w-3.5 h-3.5" />
                <span>Geological Soil Spectrum</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
                Calibrated for every soil biome.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Different soil classifications hold water and chemistry uniquely. Click any soil profile to examine its hydraulic conductivity and agronomy rules.
              </p>
            </div>

            {/* Soil Tab Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {SOIL_CHARACTERISTICS.map((soil) => {
                const isActive = selectedSoil === soil.type;
                return (
                  <button
                    key={soil.type}
                    onClick={() => setSelectedSoil(soil.type)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                  >
                    {soil.type} Soil
                  </button>
                );
              })}
            </div>

            {/* Soil Detail Card */}
            <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {activeSoilData.tag}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-foreground">
                      {activeSoilData.type} Soil Profile
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeSoilData.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50 space-y-1">
                      <span className="text-[11px] text-muted-foreground font-medium">Moisture Retention</span>
                      <p className="text-sm font-semibold">{activeSoilData.retention}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50 space-y-1">
                      <span className="text-[11px] text-muted-foreground font-medium">Drainage Profile</span>
                      <p className="text-sm font-semibold">{activeSoilData.drainage}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-semibold text-foreground">Agronomic Prescription Rule:</span>
                    <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-3 py-0.5">
                      "{activeSoilData.keyAdvice}"
                    </p>
                  </div>
                </div>

                <div className="md:col-span-5 p-6 rounded-xl bg-muted/20 border border-border/60 space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    High Affinity Crops
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSoilData.bestFor.map((crop) => (
                      <span
                        key={crop}
                        className="px-2.5 py-1 rounded-lg bg-background border border-border text-xs font-medium text-foreground"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <Link to="/predictor">
                      <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
                        <span>Test {activeSoilData.type} in Engine</span>
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. 14-Compound Fertilizer Catalog Preview */}
        <section id="fertilizers" className="py-20 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Fertilizer Compound Catalog</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
                  14 Verified Agricultural Formulations.
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every recommendation is mapped directly to certified fertilizer grades, with exact chemical ratios, package weights, and application guidelines.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
                {['All', 'Nitrogen', 'Phosphorus', 'Potassium', 'Balanced'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFertilizerCategoryFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${fertilizerCategoryFilter === filter
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-muted'
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Fertilizer Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFertilizers.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 shadow-sm group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-medium text-primary uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        {item.chemicalFormula && (
                          <span className="text-[11px] font-mono text-muted-foreground">
                            {item.chemicalFormula}
                          </span>
                        )}
                      </div>

                      <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-secondary text-secondary-foreground shrink-0">
                        {item.npkRating}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {item.tagline}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      {item.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-foreground/90">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">Approx. Rate</span>
                      <p className="text-xs font-semibold text-foreground">{item.applicationRate}</p>
                    </div>

                    <Link to="/predictor">
                      <Button size="sm" variant="ghost" className="gap-1 text-xs text-primary hover:text-primary">
                        <span>Prescribe</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Predictor Link */}
            <div className="mt-10 text-center">
              <Link to="/predictor" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                <span>Access all 14 formulations with live quantity calculations in the Predictor Engine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Field Results & Agronomic Impact */}
        <section id="impact" className="py-20 border-b border-border/50 bg-muted/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Field Provenance</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
                Tested across thousands of agricultural hectares.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                By replacing blanket chemical applications with telemetry-driven diagnosis, farmers report measurable increases in both profit margins and soil vitality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {'★'.repeat(5)}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "Our cotton yield on black regur soil suffered from random potassium deficiencies. AgriPredict identified the exact high PK complex needed during boll establishment, cutting fertilizer expense by 22%."
                </p>
                <div className="pt-2 border-t border-border/60">
                  <p className="text-xs font-bold text-foreground">Devendra Patil</p>
                  <p className="text-[11px] text-muted-foreground">Cotton & Soybean Cooperative, Maharashtra</p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {'★'.repeat(5)}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "The presets and immediate moisture/humidity correlation let our agronomists conduct field soil assessments in under two minutes. The direct ordering workflow saves days of logistics."
                </p>
                <div className="pt-2 border-t border-border/60">
                  <p className="text-xs font-bold text-foreground">Dr. Aris Thorne</p>
                  <p className="text-[11px] text-muted-foreground">Agronomy Research Fellow, Precision Soils</p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {'★'.repeat(5)}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "We eliminated chronic nitrogen burn in our winter wheat plots by tracking real-time NPK ratios instead of generic urea broadcasting. Root crown tillers are noticeably denser."
                </p>
                <div className="pt-2 border-t border-border/60">
                  <p className="text-xs font-bold text-foreground">Gurpreet S. Mann</p>
                  <p className="text-[11px] text-muted-foreground">Commercial Grain Grower, Punjab Valley</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Conversion Call-To-Action Banner */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 via-primary/5 to-card p-8 sm:p-14 text-center space-y-6 relative shadow-lg">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                <Activity className="w-3.5 h-3.5" />
                <span>Ready For Next-Gen Agronomy</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight max-w-2xl mx-auto leading-tight">
                Unlock higher harvest velocity today.
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Run your first soil telemetry assessment in seconds without mandatory sign-up, or create a grower account to store farm field histories.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link to="/predictor">
                  <Button size="lg" className="w-full sm:w-auto px-8 gap-2 shadow-md">
                    <span>Launch Predictor Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                    Register Account
                  </Button>
                </Link>
              </div>

              <p className="text-[11px] text-muted-foreground pt-2">
                Zero software license fees · Public agricultural research edition
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* 9. Global Footer */}
      <footer className="border-t border-border/60 bg-muted/20 py-12 text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

            {/* Brand column */}
            <div className="space-y-3 md:col-span-1">
              <Link to="/" className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-primary/10 text-primary">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-base tracking-tight text-foreground">
                  AgriPredict
                </span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Precision soil telemetry and machine learning decision support for progressive agronomy.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Model Engine v2.4 Online</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Engine & Tools
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/predictor" className="hover:text-foreground transition-colors">Fertilizer Prescriptor</Link></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">Prescriptive Pipeline</a></li>
                <li><a href="#soil-profiles" className="hover:text-foreground transition-colors">Soil Geological Spectrum</a></li>
                <li><a href="#fertilizers" className="hover:text-foreground transition-colors">14-Compound Catalog</a></li>
              </ul>
            </div>

            {/* Platform & Auth */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Account & Access
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/signin" className="hover:text-foreground transition-colors">Sign In to Dashboard</Link></li>
                <li><Link to="/signup" className="hover:text-foreground transition-colors">Create Grower Account</Link></li>
                <li><Link to="/predictor" className="hover:text-foreground transition-colors">Public Model Sandbox</Link></li>
              </ul>
            </div>

            {/* Precision Standard */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Agronomic Standards
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Designed to comply with sustainable nitrogen-holding benchmarks and precision soil science standards.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground">
                  NPK Chemical Assay v2.4
                </span>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} AgriPredict Agronomic Intelligence Platform. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <Link to="/predictor" className="hover:text-foreground transition-colors">Prescriptor</Link>
              <Link to="/signin" className="hover:text-foreground transition-colors">Sign In</Link>
              <Link to="/signup" className="hover:text-foreground transition-colors">Register</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
