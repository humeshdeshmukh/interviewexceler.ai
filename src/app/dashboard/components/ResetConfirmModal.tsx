'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2, Loader2 } from 'lucide-react';

interface ResetConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    sessionCount: number;
}

export function ResetConfirmModal({ isOpen, onClose, onConfirm, sessionCount }: ResetConfirmModalProps) {
    const [confirmText, setConfirmText] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isConfirmValid = confirmText.toUpperCase() === 'RESET';

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setConfirmText('');
            setIsResetting(false);
            setError(null);
        }
    }, [isOpen]);

    const handleConfirm = async () => {
        if (!isConfirmValid) return;

        setIsResetting(true);
        setError(null);

        try {
            await onConfirm();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to reset performance data');
            setIsResetting(false);
        }
    };

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !isResetting) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isResetting, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={isResetting ? undefined : onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    >
                        <div className="bg-zinc-900 border border-red-500/30 rounded-2xl max-w-md w-full shadow-2xl shadow-red-500/10">
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-500/10 rounded-lg">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-white">Reset All Progress</h2>
                                </div>
                                {!isResetting && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-4">
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <p className="text-red-400 text-sm font-medium">
                                        ⚠️ This action is permanent and cannot be undone!
                                    </p>
                                </div>

                                <p className="text-gray-300 text-sm">
                                    You are about to delete <span className="text-white font-semibold">{sessionCount} interview session{sessionCount !== 1 ? 's' : ''}</span> and all associated performance data, including:
                                </p>

                                <ul className="text-gray-400 text-sm space-y-1 pl-4">
                                    <li>• All session histories</li>
                                    <li>• All question responses and feedback</li>
                                    <li>• All scores and performance metrics</li>
                                    <li>• Your current streak progress</li>
                                </ul>

                                <div className="pt-2">
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Type <span className="text-red-400 font-mono font-bold">RESET</span> to confirm:
                                    </label>
                                    <input
                                        type="text"
                                        value={confirmText}
                                        onChange={(e) => setConfirmText(e.target.value)}
                                        disabled={isResetting}
                                        placeholder="Type RESET here..."
                                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all disabled:opacity-50"
                                        autoComplete="off"
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex gap-3 p-5 border-t border-zinc-800">
                                <button
                                    onClick={onClose}
                                    disabled={isResetting}
                                    className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={!isConfirmValid || isResetting}
                                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 disabled:text-gray-500 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                                >
                                    {isResetting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Resetting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            Reset Everything
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
