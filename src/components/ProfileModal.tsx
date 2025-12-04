import React, { useState, useEffect } from 'react';
import { X, Save, User, Briefcase, FileText, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabaseService } from '@/app/products/mock-interviews/visual-simulation/simulation/services/supabaseService';
import { useAuth } from '@/features/auth/context/AuthContext';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [targetRole, setTargetRole] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('Entry Level');
    const [resumeText, setResumeText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (isOpen && user) {
            loadProfile();
        }
    }, [isOpen, user]);

    const loadProfile = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const profile = await supabaseService.getUserProfile(user.id);
            if (profile) {
                setTargetRole(profile.target_role || '');
                setExperienceLevel(profile.experience_level || 'Entry Level');
                // Check if resume text is stored in preferences
                if (profile.preferences && profile.preferences.resume_text) {
                    setResumeText(profile.preferences.resume_text);
                }
                // Name might come from auth metadata or profile if we added it there, 
                // but for now let's assume it's in auth metadata or just use what we have
                if (user.user_metadata?.full_name) {
                    setName(user.user_metadata.full_name);
                }
            }
        } catch (err) {
            console.error('Error loading profile:', err);
            setError('Failed to load profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setIsSaving(true);
        setError('');
        setSuccessMessage('');

        try {
            await supabaseService.updateUserProfile(user.id, {
                target_role: targetRole,
                experience_level: experienceLevel,
                preferences: {
                    resume_text: resumeText,
                    updated_at: new Date().toISOString()
                }
            });
            setSuccessMessage('Profile saved successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 1500);
        } catch (err: any) {
            console.error('Error saving profile:', err);
            setError(err.message || 'Failed to save profile');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#fcba28]/10 rounded-lg">
                                    <User className="w-5 h-5 text-[#fcba28]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Your Profile</h2>
                                    <p className="text-sm text-gray-400">Manage your details for personalized AI analysis</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            {isLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-8 h-8 border-2 border-[#fcba28] border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <>
                                    {error && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                                            <AlertCircle className="w-5 h-5" />
                                            <span className="text-sm">{error}</span>
                                        </div>
                                    )}

                                    {successMessage && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400">
                                            <Check className="w-5 h-5" />
                                            <span className="text-sm">{successMessage}</span>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#fcba28]/50 focus:ring-1 focus:ring-[#fcba28]/50 transition-all outline-none"
                                                    placeholder="John Doe"
                                                    disabled // Read-only from auth for now
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Target Role</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <input
                                                    type="text"
                                                    value={targetRole}
                                                    onChange={(e) => setTargetRole(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#fcba28]/50 focus:ring-1 focus:ring-[#fcba28]/50 transition-all outline-none"
                                                    placeholder="e.g. Senior Software Engineer"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Experience Level</label>
                                        <select
                                            value={experienceLevel}
                                            onChange={(e) => setExperienceLevel(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#fcba28]/50 focus:ring-1 focus:ring-[#fcba28]/50 transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="Entry Level">Entry Level (0-2 years)</option>
                                            <option value="Mid Level">Mid Level (3-5 years)</option>
                                            <option value="Senior Level">Senior Level (5-8 years)</option>
                                            <option value="Lead/Manager">Lead/Manager (8+ years)</option>
                                            <option value="Executive">Executive</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex justify-between">
                                            <span>Resume / Professional Summary</span>
                                            <span className="text-xs text-gray-500">Paste your resume text here</span>
                                        </label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                            <textarea
                                                value={resumeText}
                                                onChange={(e) => setResumeText(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#fcba28]/50 focus:ring-1 focus:ring-[#fcba28]/50 transition-all outline-none min-h-[150px] resize-y text-sm leading-relaxed"
                                                placeholder="Paste your resume content or a summary of your professional background here. This helps our AI provide personalized feedback."
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving || isLoading}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#fcba28] hover:bg-[#fcd978] text-black font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
