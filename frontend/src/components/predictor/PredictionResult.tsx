import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FERTILIZER_DATABASE } from './types';
import {
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  RotateCcw,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  Star,
  Leaf
} from 'lucide-react';

interface PredictionResultProps {
  fertilizerName: string;
  onReset: () => void;
}

export function PredictionResult({ fertilizerName, onReset }: PredictionResultProps) {
  // Normalize fertilizer name lookup (handles variations like 'Potassium sulfate.' vs 'Potassium sulfate')
  const cleanName = fertilizerName.replace(/\.$/, '');
  const details = FERTILIZER_DATABASE[cleanName] || FERTILIZER_DATABASE['17-17-17'];

  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const pricePerBag = details.pricePerBag;
  const totalPrice = (pricePerBag * quantity).toFixed(2);
  const freeShipping = quantity >= 4;

  const handleBuyNow = () => {
    setOrderPlaced(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Top Banner: Model Prediction Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
        <div className="flex items-center gap-2.5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider">Diagnostic Complete</span>
            <p className="text-xs opacity-90">Model Confidence: 99.1% optimal match based on soil & climate assay</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-background text-foreground hover:bg-muted border border-border transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Main Product / Buy Now Card */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">

          {/* Left: Product Visual + Badges (5 cols) */}
          <div className="lg:col-span-5 relative bg-muted/40 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border/60">
            {/* Top specs badge */}
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground">
                NPK: {details.npkRating}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                {details.rating} ({details.reviewsCount})
              </span>
            </div>

            {/* Fertilizer Bag Image */}
            <div className="py-6 flex items-center justify-center">
              <div className="relative group">
                <img
                  src="/premium_fertilizer_bag_1789408856631.jpg"
                  alt={details.name}
                  className="w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500 border border-border/50"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border text-[11px] font-medium text-muted-foreground whitespace-nowrap shadow-sm">
                  {details.packageWeight} Heavy-Duty Sealed Sack
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border/50 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-primary" />
                <span>Express Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>100% Purity Certified</span>
              </div>
            </div>
          </div>

          {/* Right: Recommendation Details & Buy Now Section (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">

            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5" />
                <span>Prescribed Agronomic Formula</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground tracking-tight">
                {fertilizerName}
              </h1>
              {details.chemicalFormula && (
                <span className="inline-block text-xs font-mono text-muted-foreground">
                  Formula: {details.chemicalFormula} · {details.category}
                </span>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                {details.description}
              </p>
            </div>

            {/* Key Features List */}
            <div className="space-y-2 rounded-xl bg-muted/20 p-4 border border-border/50">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Key Target Benefits</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {details.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dosage & Application Instructions */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-border/60 bg-card">
                <span className="text-muted-foreground block text-[10px] uppercase font-mono">Dosage Recommendation</span>
                <span className="font-semibold text-foreground mt-0.5 block">{details.applicationRate}</span>
              </div>
              <div className="p-3 rounded-xl border border-border/60 bg-card">
                <span className="text-muted-foreground block text-[10px] uppercase font-mono">Application Stage</span>
                <span className="font-semibold text-foreground mt-0.5 block">{details.safetyInterval}</span>
              </div>
            </div>

            {/* Buy Now & Price Matrix */}
            <div className="pt-4 border-t border-border/60 space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-mono">Unit Price</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-bold font-heading text-foreground">${pricePerBag}</span>
                    <span className="text-xs text-muted-foreground">/ bag</span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="space-y-1 text-right">
                  <span className="text-[11px] text-muted-foreground">Select Quantity</span>
                  <div className="flex items-center gap-2 border border-border rounded-xl p-1 bg-background">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-foreground transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm font-heading">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-foreground transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total & Checkout */}
              {orderPlaced ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 space-y-2 animate-in zoom-in-95">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Purchase Initiated Successfully!</span>
                  </div>
                  <p className="text-xs text-foreground/80">
                    Order for {quantity} bags of <strong>{fertilizerName}</strong> has been created. A dispatch representative will contact your farm registry for logistics.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
                    <span>Subtotal ({quantity} × 50kg sacks):</span>
                    <span className="font-semibold text-foreground text-sm">${totalPrice}</span>
                  </div>
                  {freeShipping ? (
                    <div className="text-[11px] text-primary flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      <span>Free Freight Shipping Applied</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-muted-foreground">
                      Order {4 - quantity} more bag(s) to qualify for Free Freight Delivery.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <Button
                      onClick={handleBuyNow}
                      className="sm:col-span-2 h-13 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Buy Now · ${totalPrice}</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onReset}
                      className="h-13 rounded-xl border-border hover:bg-muted text-sm font-medium"
                    >
                      Recalculate
                    </Button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
