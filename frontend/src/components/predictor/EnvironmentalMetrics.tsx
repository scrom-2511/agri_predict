import { Thermometer, Droplets, CloudRain } from 'lucide-react';

interface EnvironmentalMetricsProps {
  temperature: number;
  humidity: number;
  moisture: number;
  onChange: (field: 'temperature' | 'humidity' | 'moisture', value: number) => void;
}

export function EnvironmentalMetrics({
  temperature,
  humidity,
  moisture,
  onChange
}: EnvironmentalMetricsProps) {
  const getTempStatus = (t: number) => {
    if (t < 15) return { label: 'Cool', color: 'text-sky-500 bg-sky-500/10' };
    if (t <= 30) return { label: 'Optimal', color: 'text-primary bg-primary/10' };
    return { label: 'High Heat', color: 'text-amber-500 bg-amber-500/10' };
  };

  const getHumidityStatus = (h: number) => {
    if (h < 40) return { label: 'Arid', color: 'text-amber-500 bg-amber-500/10' };
    if (h <= 75) return { label: 'Favorable', color: 'text-primary bg-primary/10' };
    return { label: 'Humid', color: 'text-sky-500 bg-sky-500/10' };
  };

  const getMoistureStatus = (m: number) => {
    if (m < 25) return { label: 'Deficient', color: 'text-amber-500 bg-amber-500/10' };
    if (m <= 60) return { label: 'Adequate', color: 'text-primary bg-primary/10' };
    return { label: 'Waterlogged', color: 'text-sky-500 bg-sky-500/10' };
  };

  const tempStatus = getTempStatus(temperature);
  const humidityStatus = getHumidityStatus(humidity);
  const moistureStatus = getMoistureStatus(moisture);

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-tight">Environmental Dynamics</h3>
            <p className="text-xs text-muted-foreground">Ambient field and soil moisture parameters</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Temperature Card */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Thermometer className="w-3.5 h-3.5 text-red-500" />
              <span>Temperature</span>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tempStatus.color}`}>
              {tempStatus.label}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-foreground font-heading">
              {temperature}
              <span className="text-sm font-normal text-muted-foreground ml-1">°C</span>
            </span>
            <input
              type="number"
              min={0}
              max={50}
              value={temperature}
              onChange={(e) => onChange('temperature', Number(e.target.value))}
              className="w-16 text-right px-2 py-1 text-xs rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <input
            type="range"
            min={5}
            max={45}
            value={temperature}
            onChange={(e) => onChange('temperature', Number(e.target.value))}
            className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>5°C</span>
            <span>25°C</span>
            <span>45°C</span>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <span>Air Humidity</span>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${humidityStatus.color}`}>
              {humidityStatus.label}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-foreground font-heading">
              {humidity}
              <span className="text-sm font-normal text-muted-foreground ml-1">%</span>
            </span>
            <input
              type="number"
              min={0}
              max={100}
              value={humidity}
              onChange={(e) => onChange('humidity', Number(e.target.value))}
              className="w-16 text-right px-2 py-1 text-xs rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <input
            type="range"
            min={10}
            max={100}
            value={humidity}
            onChange={(e) => onChange('humidity', Number(e.target.value))}
            className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>10%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Moisture Card */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <CloudRain className="w-3.5 h-3.5 text-emerald-500" />
              <span>Soil Moisture</span>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${moistureStatus.color}`}>
              {moistureStatus.label}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-foreground font-heading">
              {moisture}
              <span className="text-sm font-normal text-muted-foreground ml-1">idx</span>
            </span>
            <input
              type="number"
              min={0}
              max={100}
              value={moisture}
              onChange={(e) => onChange('moisture', Number(e.target.value))}
              className="w-16 text-right px-2 py-1 text-xs rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <input
            type="range"
            min={5}
            max={90}
            value={moisture}
            onChange={(e) => onChange('moisture', Number(e.target.value))}
            className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>Dry</span>
            <span>Moderate</span>
            <span>Wet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
