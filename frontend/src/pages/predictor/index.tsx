import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PredictionForm } from '@/components/predictor/PredictionForm';
import { PredictionResult } from '@/components/predictor/PredictionResult';
import type { PredictorFormData } from '@/components/predictor/types';
import { predictFertilizerReq } from '@/reqhandlers/predictor';
import { Sprout, Cpu, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export default function PredictorPage() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/signin");
    }
  }, [navigate]);

  const { mutate: predict, isPending, error, reset: resetMutation } = useMutation({
    mutationFn: predictFertilizerReq,
    onSuccess: (data) => {
      setPrediction(data.fertilizer);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  });

  const handlePredict = (data: PredictorFormData) => {
    predict(data);
  };

  const handleReset = () => {
    setPrediction(null);
    resetMutation();
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground flex flex-col">

      {/* Top Application Bar */}
      <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-1.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-foreground">
                AgriPredict
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span>/</span>
              <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">
                Fertilizer Decision Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Model  Online</span>
            </div>
            {prediction && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to inputs</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {!prediction ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Hero Header */}
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                <Cpu className="w-3.5 h-3.5" />
                <span>Agronomic Machine Learning Model</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight leading-tight">
                Fertilizer Prescriptor.
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Provide real-time soil analysis and micro-climate data to calculate the optimal N-P-K nutrient compound for maximum yield velocity.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">Prediction Failed</p>
                  <p className="text-xs opacity-90">{error.message}</p>
                </div>
              </div>
            )}

            {/* Modular Form Container */}
            <PredictionForm onSubmit={handlePredict} isLoading={isPending} />
          </div>
        ) : (
          <PredictionResult fertilizerName={prediction} onReset={handleReset} />
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AgriPredict Agronomy Engine · 14-Compound Classification Support</span>
          <span className="font-mono text-[11px]">Precision Soil Science Framework</span>
        </div>
      </footer>

    </div>
  );
}
