'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles, Save } from 'lucide-react';
import { Stepper } from './Stepper';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { ExperienceEducationStep } from './steps/ExperienceEducationStep';
import { LocationCompanyStep } from './steps/LocationCompanyStep';
import { SkillsStep } from './steps/SkillsStep';
import { ReviewStep } from './steps/ReviewStep';

const STEPS = [
    { id: 1, label: 'Basics', description: 'Role & Industry' },
    { id: 2, label: 'Experience', description: 'Career Level' },
    { id: 3, label: 'Location', description: 'Where to Work' },
    { id: 4, label: 'Skills', description: 'Qualifications' },
    { id: 5, label: 'Review', description: 'Confirm & Submit' },
];

interface SalaryFormWizardProps {
    onSubmit: (data: any) => void;
}

export function SalaryFormWizard({ onSubmit }: SalaryFormWizardProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        role: '',
        industry: '',
        location: '',
        experience: '',
        education: '',
        skills: [] as string[],
        companySize: '',
        workMode: 'onsite',
        employmentType: 'full-time',
        currentSalary: '',
        benefits: [] as string[],
        certifications: [] as string[],
        languages: [] as string[],
        managementLevel: '',
        projectCount: '',
        teamSize: '',
        targetCompany: null as any,
        resumeAnalysis: null as any
    });

    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('salary-form-draft');
        if (savedData) {
            try {
                setFormData(JSON.parse(savedData));
            } catch (error) {
                console.error('Error loading saved form data:', error);
            }
        }
    }, []);

    // Save to localStorage whenever formData changes
    useEffect(() => {
        localStorage.setItem('salary-form-draft', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateStep = (step: number): { valid: boolean; message?: string } => {
        switch (step) {
            case 0:
                if (!formData.role) return { valid: false, message: 'Please enter your role' };
                if (!formData.industry) return { valid: false, message: 'Please enter your industry' };
                return { valid: true };
            case 1:
                if (!formData.experience) return { valid: false, message: 'Please enter years of experience' };
                if (!formData.education) return { valid: false, message: 'Please select your education level' };
                return { valid: true };
            case 2:
                if (!formData.location) return { valid: false, message: 'Please enter your location' };
                return { valid: true };
            case 3:
            case 4:
                return { valid: true }; // These steps are optional
            default:
                return { valid: true };
        }
    };

    const handleNext = () => {
        const validation = validateStep(currentStep);
        if (!validation.valid) {
            alert(validation.message);
            return;
        }

        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validation = validateStep(currentStep);
        if (!validation.valid) {
            alert(validation.message);
            return;
        }

        // Clear saved draft
        localStorage.removeItem('salary-form-draft');
        onSubmit(formData);
    };

    const handleEdit = (step: number) => {
        setCurrentStep(step);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <BasicInfoStep formData={formData} onChange={handleChange} />;
            case 1:
                return <ExperienceEducationStep formData={formData} onChange={handleChange} />;
            case 2:
                return <LocationCompanyStep formData={formData} onChange={handleChange} />;
            case 3:
                return <SkillsStep formData={formData} onChange={handleChange} />;
            case 4:
                return <ReviewStep formData={formData} onEdit={handleEdit} />;
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
            {/* Stepper */}
            <Stepper steps={STEPS} currentStep={currentStep} />

            {/* Step Content - Changed overflow-hidden to overflow-visible */}
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-[#fcba28]/20 rounded-2xl shadow-[0_4px_24px_rgba(252,186,40,0.08)] p-6 sm:p-8 min-h-[500px] relative overflow-visible">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#fcba28]/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fcba28]/5 rounded-full blur-3xl -z-10" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="border-[#fcba28]/30 text-[#fcba28] hover:bg-[#fcba28]/10 hover:border-[#fcba28] disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-xl px-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                </Button>

                <div className="flex items-center gap-2 text-sm text-[#f9f4da]/60">
                    <Save className="w-4 h-4" />
                    <span>Auto-saved</span>
                </div>

                {currentStep < STEPS.length - 1 ? (
                    <Button
                        type="button"
                        onClick={handleNext}
                        className="bg-gradient-to-br from-[#fcba28] to-[#e9aa22] hover:shadow-[0_4px_16px_rgba(252,186,40,0.4)] hover:-translate-y-0.5 text-[#1a1a1a] font-semibold px-6 rounded-xl transition-all"
                    >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        className="bg-gradient-to-br from-[#fcba28] to-[#e9aa22] hover:shadow-[0_6px_20px_rgba(252,186,40,0.5)] hover:-translate-y-0.5 text-[#1a1a1a] font-bold px-8 rounded-xl transition-all"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Salary Insights
                    </Button>
                )}
            </div>

            {/* Helper Text */}
            <p className="text-center text-sm text-[#f9f4da]/50 mt-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Your progress is automatically saved
            </p>
        </form>
    );
}
