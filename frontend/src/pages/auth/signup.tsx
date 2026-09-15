import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signupReq } from "@/reqhandlers/auth/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { AuthLayout } from "@/pages/auth/common/auth-layout";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Tractor,
    GraduationCap,
    FlaskConical,
    Check
} from "lucide-react";

type UserRole = "grower" | "agronomist" | "researcher";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<UserRole>("grower");
    const [agreedToTerms, setAgreedToTerms] = useState(true);

    // Calculate password strength
    const getPasswordStrength = (pwd: string) => {
        if (!pwd) return { score: 0, label: "None", color: "bg-muted" };
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        if (score === 1) return { score: 1, label: "Weak", color: "bg-destructive" };
        if (score === 2) return { score: 2, label: "Fair", color: "bg-amber-500" };
        if (score === 3) return { score: 3, label: "Good", color: "bg-blue-500" };
        return { score: 4, label: "Strong", color: "bg-emerald-500" };
    };

    const strength = getPasswordStrength(password);

    const hasMinLength = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    const navigate = useNavigate();

    const { mutate: signup, isPending, error } = useMutation({
        mutationFn: signupReq,
        onSuccess: (data) => {
            console.log("Signup successful:", data);
            navigate("/signin");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signup({ username: name.replace(/\s+/g, "").toLowerCase() || name, email, password });
    };

    return (
        <AuthLayout
            title="Predict soil needs before you sow."
            description="Join forward-thinking farmers and agronomists optimizing yield curves through advanced biochemical telemetry."
            currentMode="signup"
        >
            <div className="w-full max-w-2xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Header */}
                <div className="space-y-1.5 text-left pb-6">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                        <Tractor className="w-3.5 h-3.5" />
                        <span>Agronomist & Grower Onboarding</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">
                        Create your account
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Start running predictive soil inferences with zero nitrogen runoff targeting.
                    </p>
                </div>

                {/* Form Fields */}
                <form className="space-y-3" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                            {error.message}
                        </div>
                    )}

                    {/* Full Name & Email Grid Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-6">
                        <div className="space-y-1 text-left">
                            <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Elena Rostova"
                                    required
                                    className="h-10 pl-9 bg-background/80 border-border focus-visible:ring-primary/40 text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 text-left">
                            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="elena@soil.org"
                                    required
                                    className="h-10 pl-9 bg-background/80 border-border focus-visible:ring-primary/40 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password */}
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
                                placeholder="Create a strong password"
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

                        {/* Interactive Password Strength Indicator */}
                        {password.length > 0 && (
                            <div className="pt-1.5 space-y-1.5 animate-in fade-in duration-200">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground text-[11px]">Strength:</span>
                                    <span className="font-semibold text-xs text-foreground">{strength.label}</span>
                                </div>
                                <div className="grid grid-cols-4 gap-1 h-1">
                                    {[1, 2, 3, 4].map((level) => (
                                        <div
                                            key={level}
                                            className={`rounded-full transition-all duration-300 ${level <= strength.score ? strength.color : "bg-muted"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground pt-0.5">
                                    <span className={`inline-flex items-center gap-1 ${hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}`}>
                                        {hasMinLength ? <Check className="w-3 h-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />}
                                        8+ chars
                                    </span>
                                    <span className={`inline-flex items-center gap-1 ${hasNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}`}>
                                        {hasNumber ? <Check className="w-3 h-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />}
                                        Number
                                    </span>
                                    <span className={`inline-flex items-center gap-1 ${hasSymbol ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}`}>
                                        {hasSymbol ? <Check className="w-3 h-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />}
                                        Symbol
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Terms Agreement Checkbox */}
                    <div className="pt-0.5">
                        <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="w-3.5 h-3.5 mt-0.5 rounded border-border text-primary accent-primary focus:ring-primary/40 cursor-pointer"
                                required
                            />
                            <span className="leading-tight text-[11px] sm:text-xs">
                                I agree to the{" "}
                                <a href="#" className="text-primary hover:underline underline-offset-2 font-medium">Terms</a>{" "}
                                and agricultural data telemetry policies.
                            </span>
                        </label>
                    </div>

                    {/* Submit CTA */}
                    <Button
                        type="submit"
                        disabled={isPending || !agreedToTerms}
                        className="w-full h-10 text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all gap-1.5 mt-1"
                    >
                        <span>{isPending ? "Creating Account..." : "Create Telemetry Account"}</span>
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
                                Or register with
                            </span>
                        </div>
                    </div>

                    {/* OAuth Buttons */}
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

                    {/* Mobile Switch Link */}
                    <p className="text-center text-xs text-muted-foreground pt-1">
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className="font-semibold text-foreground underline-offset-4 hover:underline hover:text-primary transition-colors"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
