"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    isGuest: boolean;
    user: any | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [isGuest, setIsGuest] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user status
        const userStatus = localStorage.getItem('userStatus');
        if (userStatus === 'guest') {
            setIsGuest(true);
        }
        
        // Check for existing auth session
        const checkAuth = async () => {
            try {
                // Add your auth check logic here
                const session = localStorage.getItem('session');
                if (session) {
                    setUser(JSON.parse(session));
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            // Add your sign in logic here
            // For now, we'll just simulate a successful sign in
            const mockUser = { email, id: '1', name: 'User' };
            setUser(mockUser);
            localStorage.setItem('session', JSON.stringify(mockUser));
            localStorage.removeItem('userStatus'); // Remove guest status if exists
            setIsGuest(false);
        } catch (error) {
            console.error('Sign in failed:', error);
            throw error;
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            // Add your sign up logic here
            // For now, we'll just simulate a successful sign up
            const mockUser = { email, id: '1', name: 'User' };
            setUser(mockUser);
            localStorage.setItem('session', JSON.stringify(mockUser));
            localStorage.removeItem('userStatus'); // Remove guest status if exists
            setIsGuest(false);
        } catch (error) {
            console.error('Sign up failed:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            // Add your sign out logic here
            setUser(null);
            setIsGuest(false);
            localStorage.removeItem('session');
            localStorage.removeItem('userStatus');
        } catch (error) {
            console.error('Sign out failed:', error);
            throw error;
        }
    };

    const continueAsGuest = () => {
        setIsGuest(true);
        localStorage.setItem('userStatus', 'guest');
    };

    const value = {
        isAuthenticated: !!user,
        isGuest,
        user,
        loading,
        signIn,
        signUp,
        signOut,
        continueAsGuest,
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
