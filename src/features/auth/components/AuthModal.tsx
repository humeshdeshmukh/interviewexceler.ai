"use client";

import { useRouter } from "next/navigation";
import { SignInCard } from "./SignInCard";
import { SignUpCard } from "./SignUpCard";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/features/auth/context/AuthContext";
import { X } from "lucide-react";

export function AuthModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const router = useRouter();
    const { continueAsGuest } = useAuth();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleContinueAsGuest = useCallback(() => {
        continueAsGuest();
        handleClose();
        router.push('/');
    }, [continueAsGuest, handleClose, router]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl shadow-xl max-w-md w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute -top-4 -right-4 p-2 bg-gray-800 text-gray-400 rounded-full hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {isSignIn ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {isSignIn
                                ? "Sign in to access all features"
                                : "Join us to get started"}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isSignIn ? "signin" : "signup"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isSignIn ? (
                                <SignInCard onToggle={() => setIsSignIn(false)} />
                            ) : (
                                <SignUpCard onToggle={() => setIsSignIn(true)} />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-black text-gray-400">Or</span>
                            </div>
                        </div>

                        <button
                            onClick={handleContinueAsGuest}
                            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#fcba28] hover:bg-[#fcba28]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fcba28] transition-colors"
                        >
                            Continue as Guest
                        </button>

                        <p className="mt-2 text-xs text-center text-gray-500">
                            You can sign in later to save your progress
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
