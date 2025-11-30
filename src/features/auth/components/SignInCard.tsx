"use client";
import { useState } from "react";
import { AuthFlow } from "@/features/auth/lib/types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { TriangleAlert } from "lucide-react";
import { X } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SignInCardProps {
    setState: (state: AuthFlow) => void;
    onClose?: () => void;
}

export const SignInCard = ({ setState, onClose }: SignInCardProps) => {
    const { signIn } = useAuth();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!credentials.email || !credentials.password) {
            setError("Please fill in all fields");
            return;
        }
        setPending(true);
        setError(null);
        try {
            await signIn(credentials.email, credentials.password);
            setError(null);
            onClose?.();
        } catch (err: any) {
            console.error("Sign in error:", err);
            const errorMessage = err?.message || err?.error_description || "Invalid credentials. Please try again.";
            setError(errorMessage);
        } finally {
            setPending(false);
        }
    };

    return (
        <Card className="w-full max-w-md border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm">
            <CardHeader className="relative space-y-1 pb-4">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/5 transition-colors"
                    >
                        <X className="h-4 w-4 text-muted-foreground hover:text-white" />
                    </button>
                )}
                <div className="flex items-center justify-center mb-2">
                    <Logo className="h-8" />
                </div>
                <CardTitle className="text-xl font-semibold text-center">Welcome back</CardTitle>
                <CardDescription className="text-center text-sm text-muted-foreground">
                    Sign in to your account to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {error && (
                    <div className="flex items-start gap-2 p-3 text-sm text-red-500/90 bg-red-500/10 rounded-lg border border-red-500/20">
                        <TriangleAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-3">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email address"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            className="h-10 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            className="h-10 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={pending}
                        className="w-full h-10 text-sm bg-[#fcba28] hover:bg-[#fcba28]/90 text-background font-medium transition-all duration-300"
                    >
                        {pending ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setState("signUp")}
                            className="text-[#fcba28] hover:text-[#fcba28]/80 font-medium transition-colors"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};