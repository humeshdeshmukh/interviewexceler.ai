'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { ResumeUpload } from '../ResumeUpload';

interface SkillsStepProps {
    formData: {
        skills: string[];
        certifications: string[];
        languages: string[];
        resumeAnalysis: any;
    };
    onChange: (field: string, value: any) => void;
}

export function SkillsStep({ formData, onChange }: SkillsStepProps) {
    const [skillInput, setSkillInput] = useState('');
    const [certInput, setCertInput] = useState('');
    const [languageInput, setLanguageInput] = useState('');

    const addItem = (field: 'skills' | 'certifications' | 'languages', value: string, setter: (val: string) => void) => {
        if (value && !formData[field].includes(value)) {
            onChange(field, [...formData[field], value]);
            setter('');
        }
    };

    const removeItem = (field: 'skills' | 'certifications' | 'languages', item: string) => {
        onChange(field, formData[field].filter(i => i !== item));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            <div>
                <h3 className="text-2xl font-bold text-[#fcba28] mb-2">Skills & Qualifications</h3>
                <p className="text-[#f9f4da]/70">Optional but helps improve accuracy</p>
            </div>

            {/* Resume Upload */}
            <div className="space-y-3">
                <Label className="text-[#f9f4da]/90 font-medium">Quick Fill with Resume</Label>
                <p className="text-sm text-[#f9f4da]/60">Upload your resume to automatically extract skills and certifications</p>
                <ResumeUpload
                    onUpload={(resumeData) => {
                        onChange('resumeAnalysis', resumeData);
                        // Auto-fill from resume
                        if (resumeData.skills) {
                            onChange('skills', [...new Set([...formData.skills, ...(resumeData.skills || [])])]);
                        }
                        if (resumeData.certifications) {
                            onChange('certifications', [...new Set([...formData.certifications, ...(resumeData.certifications || [])])]);
                        }
                    }}
                />
            </div>

            {/* Skills */}
            <div className="space-y-3">
                <Label className="text-[#f9f4da]/90 font-medium">Skills</Label>
                <div className="flex gap-2">
                    <Input
                        placeholder="Add a skill (e.g. React, Python)"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skills', skillInput, setSkillInput))}
                        className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] placeholder:text-[#f9f4da]/40 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]/50 rounded-xl h-11 transition-all"
                    />
                    <Button
                        type="button"
                        onClick={() => addItem('skills', skillInput, setSkillInput)}
                        className="bg-[#fcba28] hover:bg-[#fcba28]/80 text-[#1a1a1a] font-medium rounded-xl px-4"
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
                {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {formData.skills.map((skill) => (
                            <motion.span
                                key={skill}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-[#fcba28]/10 text-[#fcba28] border border-[#fcba28]/20"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeItem('skills', skill)}
                                    className="ml-2 hover:text-[#fcba28]/70 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.span>
                        ))}
                    </div>
                )}
            </div>

            {/* Certifications */}
            <div className="space-y-3">
                <Label className="text-[#f9f4da]/90 font-medium">Certifications</Label>
                <div className="flex gap-2">
                    <Input
                        placeholder="Add a certification (e.g. AWS Certified)"
                        value={certInput}
                        onChange={(e) => setCertInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('certifications', certInput, setCertInput))}
                        className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] placeholder:text-[#f9f4da]/40 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]/50 rounded-xl h-11 transition-all"
                    />
                    <Button
                        type="button"
                        onClick={() => addItem('certifications', certInput, setCertInput)}
                        className="bg-[#fcba28] hover:bg-[#fcba28]/80 text-[#1a1a1a] font-medium rounded-xl px-4"
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
                {formData.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {formData.certifications.map((cert) => (
                            <motion.span
                                key={cert}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-[#fcba28]/10 text-[#fcba28] border border-[#fcba28]/20"
                            >
                                {cert}
                                <button
                                    type="button"
                                    onClick={() => removeItem('certifications', cert)}
                                    className="ml-2 hover:text-[#fcba28]/70 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.span>
                        ))}
                    </div>
                )}
            </div>

            {/* Languages */}
            <div className="space-y-3">
                <Label className="text-[#f9f4da]/90 font-medium">Languages</Label>
                <div className="flex gap-2">
                    <Input
                        placeholder="Add a language (e.g. English, Spanish)"
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('languages', languageInput, setLanguageInput))}
                        className="bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] placeholder:text-[#f9f4da]/40 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]/50 rounded-xl h-11 transition-all"
                    />
                    <Button
                        type="button"
                        onClick={() => addItem('languages', languageInput, setLanguageInput)}
                        className="bg-[#fcba28] hover:bg-[#fcba28]/80 text-[#1a1a1a] font-medium rounded-xl px-4"
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
                {formData.languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {formData.languages.map((lang) => (
                            <motion.span
                                key={lang}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-[#fcba28]/10 text-[#fcba28] border border-[#fcba28]/20"
                            >
                                {lang}
                                <button
                                    type="button"
                                    onClick={() => removeItem('languages', lang)}
                                    className="ml-2 hover:text-[#fcba28]/70 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.span>
                        ))}
                    </div>
                )}
            </div>

            <p className="text-sm text-[#f9f4da]/50 italic flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fcba28]" />
                Tip: More details lead to more accurate salary predictions
            </p>
        </motion.div>
    );
}
