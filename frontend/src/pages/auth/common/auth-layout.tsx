import { Sprout, ArrowLeft, Activity, ShieldCheck } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    currentMode?: "signin" | "signup";
}

export function AuthLayout({ children, title, description, currentMode = "signin" }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            {/* Left side - Rich Agronomic Telemetry Showcase */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-8 xl:p-12 2xl:p-14 bg-muted/30 border-r border-border/60">
                {/* Visual Imagery & Gradient Backdrops */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
                        alt="Agricultural Precision Field"
                        className="w-full h-full object-cover scale-105 transform transition-transform duration-1000 ease-out"
                    />
                    {/* Sophisticated dark/tinted gradient overlays */}
                    <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Top Branding & Live Telemetry Pill */}
                <div className="relative z-10 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="p-2 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/30 text-white group-hover:bg-primary transition-all duration-300">
                            <Sprout className="w-5 h-5" />
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-white drop-shadow-md">
                            AgriPredict
                        </span>
                    </Link>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>ML Model Active</span>
                    </div>
                </div>

                {/* Middle: Title & Quick Stat Highlights */}
                <div className="relative z-10 space-y-6">
                    <div className="space-y-3 max-w-xl">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
                            <Activity className="w-3.5 h-3.5" />
                            <span>Precision Soil Analysis</span>
                        </div>
                        <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold font-heading text-white leading-tight tracking-tight drop-shadow-md">
                            {title}
                        </h1>
                        <p className="text-base xl:text-lg text-white/80 font-normal leading-relaxed max-w-lg drop-shadow-sm">
                            {description}
                        </p>
                    </div>

                    {/* Quick Stat Highlights */}
                    <div className="grid grid-cols-3 gap-4 max-w-lg pt-2">
                        <div className="border-l-2 border-primary/80 pl-3">
                            <span className="text-2xl font-bold text-white font-heading">14</span>
                            <span className="block text-xs text-white/70 mt-0.5">Verified Fertilizers</span>
                        </div>
                        <div className="border-l-2 border-emerald-400/80 pl-3">
                            <span className="text-2xl font-bold text-white font-heading">99.1%</span>
                            <span className="block text-xs text-white/70 mt-0.5">Inference Precision</span>
                        </div>
                        <div className="border-l-2 border-teal-400/80 pl-3">
                            <span className="text-2xl font-bold text-white font-heading">0.0%</span>
                            <span className="block text-xs text-white/70 mt-0.5">Target Runoff Waste</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Testimonial / Credibility Tag */}
                <div className="relative z-10 pt-4 border-t border-white/15 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-xs font-bold text-white">
                        MV
                    </div>
                    <div className="text-xs text-white/80">
                        <p className="italic font-light">"Calibrated soil chemistry across 1,200 acres with zero excess nitrate waste."</p>
                        <p className="font-semibold text-white/95 mt-0.5">— Marcus Vance, Senior Field Agronomist</p>
                    </div>
                </div>
            </div>

            {/* Right side - Form Area with Clean Non-Overflowing Proportions */}
            <div className="flex-1 flex flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-10 lg:py-6 xl:px-14 xl:py-8 2xl:px-20 relative overflow-y-auto">
                {/* Top Header Navigation */}
                <div className="w-full flex items-center justify-between pb-4 z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back to AgriPredict</span>
                    </Link>

                    {/* Mobile Brand Link */}
                    <Link to="/" className="lg:hidden flex items-center gap-2 font-heading font-bold text-foreground">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                            <Sprout className="w-4 h-4" />
                        </div>
                        <span>AgriPredict</span>
                    </Link>

                    {/* Switch Mode Prompt */}
                    <div className="text-sm text-muted-foreground hidden sm:block">
                        {currentMode === "signin" ? (
                            <span>
                                New grower?{" "}
                                <Link to="/signup" className="font-semibold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                                    Create account
                                </Link>
                            </span>
                        ) : (
                            <span>
                                Have an account?{" "}
                                <Link to="/signin" className="font-semibold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                                    Sign in
                                </Link>
                            </span>
                        )}
                    </div>
                </div>

                {/* Main Form Center Slot */}
                <div className="my-auto py-2 flex justify-center z-10">
                    {children}
                </div>

                {/* Footer Trust Bar */}
                <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        <span>256-bit SSL encrypted • Agricultural analysis platform</span>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground/80">
                        <Link to="/" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link to="/" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link to="/predictor" className="hover:text-foreground transition-colors">Launch Predictor</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
