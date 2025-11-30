"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    isGuest: boolean;
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, full_name: string) => Promise<void>;
    signOut: () => Promise<void>;
    continueAsGuest: () => void;
    isAuthModalOpen: boolean;
    setAuthModalOpen: (isOpen: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isGuest, setIsGuest] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        // Check local storage for guest status
        const userStatus = localStorage.getItem('userStatus');
        if (userStatus === 'guest') {
            setIsGuest(true);
        }

        // Check for existing auth session
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);

                const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                    setUser(session?.user ?? null);
                    if (session?.user) {
                        setIsGuest(false);
                        localStorage.removeItem('userStatus');
                        setAuthModalOpen(false);
                    }
                    setLoading(false);
                });

                return () => subscription.unsubscribe();
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [supabase.auth]);

    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            setAuthModalOpen(false);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Sign in failed:', error);
            throw error;
        }
    };

    const signUp = async (email: string, password: string, full_name: string) => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                    data: {
                        full_name,
                    },
                },
            });
            if (error) throw error;
            setAuthModalOpen(false);
        } catch (error) {
            console.error('Sign up failed:', error);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error('Google sign in failed:', error);
            throw error;
        }
    };

    const signInWithGithub = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error('Github sign in failed:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            setIsGuest(false);
            localStorage.removeItem('userStatus');
            router.push('/');
        } catch (error) {
            console.error('Sign out failed:', error);
            throw error;
        }
    };

    const continueAsGuest = () => {
        setIsGuest(true);
        localStorage.setItem('userStatus', 'guest');
        setAuthModalOpen(false);
    };

    const value = {
        isAuthenticated: !!user,
        isGuest,
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithGithub,
        signOut,
        continueAsGuest,
        isAuthModalOpen,
        setAuthModalOpen,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
