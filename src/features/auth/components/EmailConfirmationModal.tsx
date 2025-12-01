"use client";

import { Mail, CheckCircle, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EmailConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

export const EmailConfirmationModal = ({
    isOpen,
    onClose,
    email
}: EmailConfirmationModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md border-white/10 bg-black/90 backdrop-blur-xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-green-500/10 p-3">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                            </div>
                            <DialogTitle className="text-xl font-semibold">
                                Account Created!
                            </DialogTitle>
                        </div>
                    </div>
                    <DialogDescription className="sr-only">
                        Email confirmation required
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Email Icon Section */}
                    <div className="flex justify-center">
                        <div className="rounded-full bg-[#fcba28]/10 p-6">
                            <Mail className="h-12 w-12 text-[#fcba28]" />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-medium text-white">
                            Check Your Email
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            We've sent a confirmation email to:
                        </p>
                        <p className="text-sm font-medium text-[#fcba28] break-all px-4">
                            {email}
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-white/5 rounded-lg p-4 space-y-3">
                        <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-white">Next steps:</span>
                        </p>
                        <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                            <li>Check your inbox (and spam folder)</li>
                            <li>Click the confirmation link in the email</li>
                            <li>Return here to sign in</li>
                        </ol>
                    </div>

                    {/* Resend Info */}
                    <p className="text-xs text-center text-muted-foreground">
                        Didn't receive the email? Check your spam folder or try signing up again.
                    </p>
                </div>

                {/* Action Button */}
                <div className="flex justify-center pt-2">
                    <Button
                        onClick={onClose}
                        className="w-full bg-[#fcba28] hover:bg-[#fcba28]/90 text-background font-medium transition-all duration-300"
                    >
                        Got it, thanks!
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
