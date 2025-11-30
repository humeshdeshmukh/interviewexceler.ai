"use client";

import React from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { Button } from '@/components/ui/button';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export function SignInWithOAuth() {
    const { signInWithGoogle, signInWithGithub } = useAuth();

    return (
        <div className="flex flex-col gap-4 w-full">
            <Button
                variant="outline"
                type="button"
                className="w-full flex items-center gap-2"
                onClick={signInWithGoogle}
            >
                <FaGoogle className="w-4 h-4" />
                Continue with Google
            </Button>
            <Button
                variant="outline"
                type="button"
                className="w-full flex items-center gap-2"
                onClick={signInWithGithub}
            >
                <FaGithub className="w-4 h-4" />
                Continue with GitHub
            </Button>
        </div>
    );
}
