import { FlaskConical, Plus, Minus } from 'lucide-react';

interface NutrientMatrixProps {
  nitrogen: number;
  phosphorous: number;
  potassium: number;
  onChange: (field: 'nitrogen' | 'phosphorous' | 'potassium', value: number) => void;
}

export function NutrientMatrix({
  nitrogen,
  phosphorous,
  potassium,
  onChange
}: NutrientMatrixProps) {
  const total = (nitrogen + phosphorous + potassium) || 1;
  const nPercent = Math.round((nitrogen / total) * 100);
  const pPercent = Math.round((phosphorous / total) * 100);
  const kPercent = Math.round((potassium / total) * 100);

  const handleStep = (field: 'nitrogen' | 'phosphorous' | 'potassium', current: number, delta: number) => {
    const nextVal = Math.max(0, Math.min(140, current + delta));
    onChange(field, nextVal);
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-tight">Macro-Nutrient Assay (N-P-K)</h3>
            <p className="text-xs text-muted-foreground">Available soil test parts-per-ratio or kg/ha assay</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-xl border border-border/50 text-xs font-mono">
          <span className="text-muted-foreground">Ratio:</span>
          <span className="text-emerald-500 font-bold">{nitrogen}</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-amber-500 font-bold">{phosphorous}</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-sky-500 font-bold">{potassium}</span>
        </div>
      </div>

      {/* Proportional Balance Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
          <span>Relative Nutrient Distribution</span>
          <span>N: {nPercent}% · P: {pPercent}% · K: {kPercent}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-muted p-0.5 gap-0.5">
          <div style={{ width: `${nPercent}%` }} className="bg-emerald-500 rounded-l-full transition-all duration-300" />
          <div style={{ width: `${pPercent}%` }} className="bg-amber-500 transition-all duration-300" />
          <div style={{ width: `${kPercent}%` }} className="bg-sky-500 rounded-r-full transition-all duration-300" />
        </div>
      </div>

      {/* 3 Nutrient Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Nitrogen (N) */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-foreground">Nitrogen (N)</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">
              Vegetative
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-heading text-foreground">
              {nitrogen}
              <span className="text-xs font-normal text-muted-foreground ml-1">ppm</span>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleStep('nitrogen', nitrogen, -5)}
                className="w-6 h-6 rounded border border-border bg-background flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => handleStep('nitrogen', nitrogen, 5)}
                className="w-6 h-6 rounded border border-border bg-background flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={140}
            value={nitrogen}
            onChange={(e) => onChange('nitrogen', Number(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-muted rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>0</span>
            <span>70</span>
            <span>140</span>
          </div>
        </div>

        {/* Phosphorous (P) */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold text-foreground">Phosphorous (P)</span>
            </div>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono bg-amber-500/10 px-1.5 py-0.5 rounded">
              Roots & Blooms
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-heading text-foreground">
              {phosphorous}
              <span className="text-xs font-normal text-muted-foreground ml-1">ppm</span>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleStep('phosphorous', phosphorous, -5)}
                className="w-6 h-6 rounded border border-border bg-background flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => handleStep('phosphorous', phosphorous, 5)}
                className="w-6 h-6 rounded border border-border bg-background flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={140}
            value={phosphorous}
            onChange={(e) => onChange('phosphorous', Number(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-muted rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>0</span>
            <span>70</span>
            <span>140</span>
          </div>
        </div>

        {/* Potassium (K) */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span className="text-xs font-semibold text-foreground">Potassium (K)</span>
            </div>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-mono bg-sky-500/10 px-1.5 py-0.5 rounded">
              Cell Immunity
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-heading text-foreground">
              {potassium}
              <span className="text-xs font-normal text-muted-foreground ml-1">ppm</span>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleStep('potassium', potassium, -5)}
                className="w-6 h-6 rounded border border-border bg-background flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => handleStep('potassium', potassium, 5)}
                className="w-6 h-6 rounded border border-border bg-background flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={140}
            value={potassium}
            onChange={(e) => onChange('potassium', Number(e.target.value))}
            className="w-full accent-sky-500 h-1.5 bg-muted rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>0</span>
            <span>70</span>
            <span>140</span>
          </div>
        </div>
      </div>
    </div>
  );
}
