"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface EmailVerificationProps {
    email: string;
    onResend?: () => void;
}

export function EmailVerification({ email, onResend }: EmailVerificationProps) {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Verify your email</h3>
            <p className="text-muted-foreground max-w-sm">
                We've sent a verification link to <span className="font-medium text-foreground">{email}</span>.
                Please check your inbox to continue.
            </p>
            {onResend && (
                <div className="text-sm text-muted-foreground">
                    Didn't receive the email?{' '}
                    <Button variant="link" className="p-0 h-auto" onClick={onResend}>
                        Click to resend
                    </Button>
                </div>
            )}
        </div>
    );
}
