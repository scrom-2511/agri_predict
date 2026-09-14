import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { PredictorFormData, SoilType, CropType } from './types';
import { PresetsBar } from './PresetsBar';
import { EnvironmentalMetrics } from './EnvironmentalMetrics';
import { SoilCropSelector } from './SoilCropSelector';
import { NutrientMatrix } from './NutrientMatrix';
import type { PresetScenario } from './presets';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface PredictionFormProps {
  onSubmit: (data: PredictorFormData) => void;
  isLoading?: boolean;
}

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<PredictorFormData>({
    temperature: 26,
    humidity: 55,
    moisture: 38,
    soilType: 'Loamy',
    cropType: 'Wheat',
    nitrogen: 37,
    potassium: 20,
    phosphorous: 25
  });

  const [activePresetId, setActivePresetId] = useState<string | undefined>('wheat-loam');

  const handlePresetSelect = (preset: PresetScenario) => {
    setFormData(preset.data);
    setActivePresetId(preset.id);
  };

  const handleEnvChange = (field: 'temperature' | 'humidity' | 'moisture', value: number) => {
    setActivePresetId(undefined);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSoilChange = (soil: SoilType) => {
    setActivePresetId(undefined);
    setFormData((prev) => ({ ...prev, soilType: soil }));
  };

  const handleCropChange = (crop: CropType) => {
    setActivePresetId(undefined);
    setFormData((prev) => ({ ...prev, cropType: crop }));
  };

  const handleNutrientChange = (field: 'nitrogen' | 'phosphorous' | 'potassium', value: number) => {
    setActivePresetId(undefined);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Presets Toolbar */}
      <PresetsBar onSelectPreset={handlePresetSelect} activePresetId={activePresetId} />

      {/* 2. Environmental Metrics Module */}
      <EnvironmentalMetrics
        temperature={formData.temperature}
        humidity={formData.humidity}
        moisture={formData.moisture}
        onChange={handleEnvChange}
      />

      {/* 3. Soil & Crop Type Module */}
      <SoilCropSelector
        selectedSoil={formData.soilType}
        selectedCrop={formData.cropType}
        onSoilChange={handleSoilChange}
        onCropChange={handleCropChange}
      />

      {/* 4. Macro-Nutrient Assay Matrix */}
      <NutrientMatrix
        nitrogen={formData.nitrogen}
        phosphorous={formData.phosphorous}
        potassium={formData.potassium}
        onChange={handleNutrientChange}
      />

      {/* 5. Modern Submit CTA Bar */}
      <div className="pt-2 sticky bottom-4 z-20">
        <div className="p-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/80 shadow-lg">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-xl text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all flex items-center justify-between px-6 group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5 text-primary-foreground/90 animate-pulse" />
              )}
              <span className="font-semibold tracking-wide">
                {isLoading ? 'Computing Agronomic Model...' : 'Analyze Telemetry & Predict Fertilizer'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-normal opacity-90">
              <span className="hidden sm:inline">Run inference</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        </div>
      </div>
    </form>
  );
}
