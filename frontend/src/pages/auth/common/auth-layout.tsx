import { Sprout } from "lucide-react";
import React from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Left side - Image/Branding */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-muted/20 border-r border-border/50">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
                        alt="Agricultural field"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 mix-blend-overlay" />
                    {/* Gradient from bottom for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="relative z-10 flex items-center gap-2 text-white font-medium drop-shadow-md">
                    <Sprout className="w-8 h-8" />
                    <span className="text-2xl tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">AgriPredict</span>
                </div>

                <div className="relative z-10 text-white space-y-4 drop-shadow-md">
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight max-w-lg tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {title}
                    </h1>
                    <p className="text-lg opacity-90 max-w-md font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {description}
                    </p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative">
                <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2 text-foreground font-medium">
                    <Sprout className="w-6 h-6" />
                    <span className="text-xl tracking-tight">AgriPredict</span>
                </div>
                
                {children}
            </div>
        </div>
    );
}
