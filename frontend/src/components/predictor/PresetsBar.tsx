import { PRESET_SCENARIOS, type PresetScenario } from './presets';
import { Sparkles } from 'lucide-react';

interface PresetsBarProps {
  onSelectPreset: (preset: PresetScenario) => void;
  activePresetId?: string;
}

export function PresetsBar({ onSelectPreset, activePresetId }: PresetsBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Quick Diagnostic Scenarios</span>
        </div>
        <span className="text-[11px] text-muted-foreground hidden sm:inline">Click to pre-fill test data</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PRESET_SCENARIOS.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? 'border-primary bg-primary/10 text-foreground shadow-sm ring-1 ring-primary/30'
                  : 'border-border/70 bg-card/60 hover:bg-muted/60 hover:border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground tracking-tight line-clamp-1">
                  {preset.name}
                </span>
              </div>
              <p className="text-[11px] opacity-75 line-clamp-1 leading-tight">
                {preset.subtitle}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono">
                  {preset.data.soilType} · {preset.data.cropType}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
