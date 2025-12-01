"use client";
import { useState } from "react";
import { AuthFlow } from "@/features/auth/lib/types";
import { useAuth } from "@/features/auth/context/AuthContext";
import { TriangleAlert, Eye, EyeOff } from "lucide-react";
import { X } from "lucide-react";
import { EmailConfirmationModal } from "./EmailConfirmationModal";

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

interface SignUpCardProps {
  setState: (state: AuthFlow) => void;
  onClose?: () => void;
}

export const SignUpCard = ({ setState, onClose }: SignUpCardProps) => {
  const { signUp } = useAuth();
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!account.name || !account.email || !account.password) {
      setError("All fields are required");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(account.email)) {
      setError("Please enter a valid email address (e.g., user@example.com)");
      return;
    }

    if (account.password !== account.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Client-side password validation
    if (account.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setPending(true);
    setError(null);
    try {
      await signUp(account.email, account.password, account.name);
      // If we reach here, account was created successfully
      setError(null);
      setState("signIn");
    } catch (err: any) {
      // Handle specific error cases
      if (err.message === 'CONFIRM_EMAIL') {
        // This is expected behavior - show modal instead of error message
        setShowConfirmationModal(true);
        setError(null);
        return;
      }

      // Log actual errors (not the expected CONFIRM_EMAIL)
      console.error("Signup error:", err);

      // Show specific Supabase error messages
      const errorMessage = err.message || "Failed to create account. Please try again.";

      // Make common errors more user-friendly
      if (errorMessage.includes('already registered')) {
        setError("This email is already registered. Please sign in instead.");
      } else if (errorMessage.includes('Invalid email')) {
        setError("Please enter a valid email address.");
      } else if (errorMessage.includes('Password')) {
        setError(errorMessage);
      } else {
        setError(errorMessage);
      }
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
        <CardTitle className="text-xl font-semibold text-center">Create an account</CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          Enter your details to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className={`flex items-start gap-2 p-3 text-sm rounded-lg border ${error.startsWith('✅')
            ? 'text-green-500/90 bg-green-500/10 border-green-500/20'
            : 'text-red-500/90 bg-red-500/10 border-red-500/20'
            }`}>
            <TriangleAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-3">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Full name"
              value={account.name}
              onChange={(e) => setAccount({ ...account, name: e.target.value })}
              className="h-10 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300"
            />
            <Input
              type="email"
              placeholder="Email address"
              value={account.email}
              onChange={(e) => setAccount({ ...account, email: e.target.value })}
              className="h-10 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300"
            />

            {/* Password Field with Toggle */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={account.password}
                onChange={(e) => setAccount({ ...account, password: e.target.value })}
                className="h-10 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Confirm Password Field with Toggle */}
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={account.confirmPassword}
                onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })}
                className="h-10 text-sm bg-white/5 border-white/10 focus:border-[#fcba28]/50 focus:ring-[#fcba28]/30 transition-all duration-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="w-full h-10 text-sm bg-[#fcba28] hover:bg-[#fcba28]/90 text-background font-medium transition-all duration-300"
          >
            {pending ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setState("signIn")}
              className="text-[#fcba28] hover:text-[#fcba28]/80 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>

      {/* Email Confirmation Modal */}
      <EmailConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => {
          setShowConfirmationModal(false);
          setState("signIn");
        }}
        email={account.email}
      />
    </Card>
  );
};