import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signinReq } from "@/reqhandlers/auth/signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { AuthLayout } from "@/pages/auth/common/auth-layout";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    KeyRound
} from "lucide-react";

export default function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { mutate: signin, isPending, error } = useMutation({
        mutationFn: signinReq,
        onSuccess: (data) => {
            console.log("Signin successful:", data);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/home");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signin({ email: email, password });
    };

    return (
        <AuthLayout
            title="Welcome back to your dashboard."
            description="Access real-time soil profiling, predictive nutrient modeling, and micro-climate field analytics."
            currentMode="signin"
        >
            <div className="w-full max-w-2xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Header with Agronomic Badge */}
                <div className="space-y-1.5 text-left pb-6">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Secure Access</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">
                        Sign in to AgriPredict
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Enter your credentials to manage field plots and run fertilizer inferences.
                    </p>
                </div>

                {/* Form Elements */}
                <form className="space-y-3.5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                            {error.message}
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="space-y-1 text-left pb-6">
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="agronomist@agripredict.org"
                                required
                                className="h-10 pl-9 bg-background/80 border-border focus-visible:ring-primary/40 text-sm"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1 text-left pb-6">
                        <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                required
                                className="h-10 pl-9 pr-9 bg-background/80 border-border focus-visible:ring-primary/40 text-sm font-mono tracking-wider"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-3.5 h-3.5" />
                                ) : (
                                    <Eye className="w-3.5 h-3.5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-10 text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all gap-1.5 mt-1"
                    >
                        <span>{isPending ? "Signing In..." : "Sign In"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                </form>

                {/* Social Login Separator */}
                <div className="space-y-3">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/80" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-background px-3 text-muted-foreground font-medium text-[11px]">
                                Or authenticate with
                            </span>
                        </div>
                    </div>

                    {/* OAuth Provider Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-9 text-xs font-medium hover:bg-muted/50 border-border/80 transition-colors"
                            disabled={true}
                        >
                            <svg className="w-3.5 h-3.5 mr-2 shrink-0" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span>Google</span>
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="h-9 text-xs font-medium hover:bg-muted/50 border-border/80 transition-colors"
                            disabled={true}
                        >
                            <svg className="w-3.5 h-3.5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span>GitHub</span>
                        </Button>
                    </div>

                    {/* Bottom Link for Mobile/Sm Screens */}
                    <p className="text-center text-xs text-muted-foreground pt-1">
                        Don't have an AgriPredict profile?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold text-foreground underline-offset-4 hover:underline hover:text-primary transition-colors"
                        >
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
