"use client";

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function PasswordReset() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });
            if (error) throw error;
            setSent(true);
            toast.success('Password reset email sent');
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="text-center p-4">
                <h3 className="text-lg font-semibold mb-2">Check your email</h3>
                <p className="text-muted-foreground">
                    We've sent a password reset link to {email}
                </p>
                <Button
                    variant="link"
                    onClick={() => setSent(false)}
                    className="mt-4"
                >
                    Try another email
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleReset} className="space-y-4 w-full max-w-sm">
            <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
        </form>
    );
}
