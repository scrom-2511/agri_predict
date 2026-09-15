import { useState, useEffect } from 'react';
import type { SoilType, CropType } from './types';
import { Layers, Sprout } from 'lucide-react';

interface SoilCropSelectorProps {
  selectedSoil: SoilType;
  selectedCrop: CropType;
  onSoilChange: (soil: SoilType) => void;
  onCropChange: (crop: CropType) => void;
}

interface SoilOption {
  type: SoilType;
  title: string;
  dotColor: string;
  texture: string;
  drainage: string;
}

const SOIL_OPTIONS: SoilOption[] = [
  { type: 'Sandy', title: 'Sandy Soil', dotColor: 'bg-amber-400', texture: 'Coarse & Gritty', drainage: 'Rapid drainage' },
  { type: 'Loamy', title: 'Loamy Soil', dotColor: 'bg-emerald-700', texture: 'Optimal Crumbly', drainage: 'Balanced moisture' },
  { type: 'Black', title: 'Black Soil', dotColor: 'bg-stone-800', texture: 'Regur Clay Rich', drainage: 'High retention' },
  { type: 'Red', title: 'Red Soil', dotColor: 'bg-rose-700', texture: 'Iron / Ferrous', drainage: 'Moderate drain' },
  { type: 'Clayey', title: 'Clayey Soil', dotColor: 'bg-amber-900', texture: 'Dense & Compact', drainage: 'High water-table' }
];

interface CropOption {
  type: CropType;
  label: string;
  category: 'Cereal' | 'Cash Crop' | 'Legume' | 'Oilseed' | 'Fruit';
  iconEmoji: string;
}

const CROP_OPTIONS: CropOption[] = [
  { type: 'Wheat', label: 'Wheat', category: 'Cereal', iconEmoji: '🌾' },
  { type: 'Paddy', label: 'Paddy', category: 'Cereal', iconEmoji: '🌱' },
  { type: 'Maize', label: 'Maize', category: 'Cereal', iconEmoji: '🌽' },
  { type: 'Barley', label: 'Barley', category: 'Cereal', iconEmoji: '🌾' },
  { type: 'Millets', label: 'Millets', category: 'Cereal', iconEmoji: '🥣' },
  { type: 'rice', label: 'Rice', category: 'Cereal', iconEmoji: '🍚' },
  { type: 'Cotton', label: 'Cotton', category: 'Cash Crop', iconEmoji: '☁️' },
  { type: 'Sugarcane', label: 'Sugarcane', category: 'Cash Crop', iconEmoji: '🎋' },
  { type: 'Tobacco', label: 'Tobacco', category: 'Cash Crop', iconEmoji: '🍂' },
  { type: 'coffee', label: 'Coffee', category: 'Cash Crop', iconEmoji: '☕' },
  { type: 'Pulses', label: 'Pulses', category: 'Legume', iconEmoji: '🫘' },
  { type: 'kidneybeans', label: 'Kidneybeans', category: 'Legume', iconEmoji: '🫘' },
  { type: 'Ground Nuts', label: 'Ground Nuts', category: 'Oilseed', iconEmoji: '🥜' },
  { type: 'Oil seeds', label: 'Oil seeds', category: 'Oilseed', iconEmoji: '🌻' },
  { type: 'pomegranate', label: 'Pomegranate', category: 'Fruit', iconEmoji: '🍎' },
  { type: 'watermelon', label: 'Watermelon', category: 'Fruit', iconEmoji: '🍉' },
  { type: 'orange', label: 'Orange', category: 'Fruit', iconEmoji: '🍊' },
];

export function SoilCropSelector({
  selectedSoil,
  selectedCrop,
  onSoilChange,
  onCropChange
}: SoilCropSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Update selected category if selectedCrop changes from outside (e.g., presets)
  useEffect(() => {
    const crop = CROP_OPTIONS.find(c => c.type.toLowerCase() === selectedCrop.toLowerCase());
    if (crop) {
      setSelectedCategory(prev => {
        if (prev !== 'All' && crop.category !== prev) {
          return crop.category;
        }
        return prev;
      });
    }
  }, [selectedCrop]);

  const categories = ['All', ...Array.from(new Set(CROP_OPTIONS.map(c => c.category)))];

  const filteredCrops = selectedCategory === 'All'
    ? CROP_OPTIONS
    : CROP_OPTIONS.filter(c => c.category === selectedCategory);

  const selectedCropOption = CROP_OPTIONS.find(c => c.type.toLowerCase() === selectedCrop.toLowerCase());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Soil Type Modular Selection */}
      <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-tight">Soil Profile</h3>
            <p className="text-xs text-muted-foreground">Select current field soil composition</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SOIL_OPTIONS.map((soil) => {
            const isSelected = selectedSoil === soil.type;
            return (
              <button
                key={soil.type}
                type="button"
                onClick={() => onSoilChange(soil.type)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 ring-1 ring-primary/30 shadow-sm'
                    : 'border-border/60 bg-muted/20 hover:bg-muted/50 hover:border-border'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 ${soil.dotColor} ring-2 ring-background`} />
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-foreground tracking-tight">
                      {soil.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {soil.texture}
                  </p>
                  <span className="inline-block text-[10px] text-primary/80 font-medium">
                    {soil.drainage}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Crop Modular Selection */}
      <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-start sm:items-center justify-between border-b border-border/50 pb-3 flex-col sm:flex-row gap-3 sm:gap-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-tight">Target Crop</h3>
              <p className="text-xs text-muted-foreground">Cultivar requiring fertilizer optimization</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-medium bg-secondary text-secondary-foreground border border-border/50 rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground hidden sm:inline-block">
              {selectedCropOption?.label || selectedCrop}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {filteredCrops.map((crop) => {
            const isSelected = selectedCrop.toLowerCase() === crop.type.toLowerCase();
            return (
              <button
                key={crop.type}
                type="button"
                onClick={() => onCropChange(crop.type)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-150 ${
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                    : 'border-border/60 bg-muted/20 hover:bg-muted/60 text-foreground hover:border-border'
                }`}
              >
                <span>{crop.iconEmoji}</span>
                <span>{crop.label}</span>
                <span className={`text-[9px] px-1 rounded ${
                  isSelected ? 'bg-black/20 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {crop.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
