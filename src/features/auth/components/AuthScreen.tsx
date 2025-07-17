"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthFlow } from "@/features/auth/lib/types";
import { SignInCard } from "./SignInCard";
import { SignUpCard } from "./SignUpCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthScreenProps {
  onClose?: () => void;
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const AuthScreen = ({ onClose }: AuthScreenProps) => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>("signIn");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onClose]);

  const handleContinueWithoutLogin = () => {
    document.cookie = "bypass_auth=true; path=/; max-age=7200";
    if (onClose) onClose();
    router.push(callbackUrl);
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem('userStatus', 'guest');
    router.push('/');
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      {/* Auth Container */}
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {authFlow === "signIn" ? (
              <SignInCard key="signin" setState={setAuthFlow} onClose={onClose} />
            ) : (
              <SignUpCard key="signup" setState={setAuthFlow} onClose={onClose} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};