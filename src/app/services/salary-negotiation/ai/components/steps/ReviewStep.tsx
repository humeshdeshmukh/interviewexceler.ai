'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewStepProps {
    formData: any;
    onEdit: (step: number) => void;
}

export function ReviewStep({ formData, onEdit }: ReviewStepProps) {
    const sections = [
        {
            title: 'Basic Information',
            step: 0,
            items: [
                { label: 'Role', value: formData.role },
                { label: 'Industry', value: formData.industry },
                { label: 'Company Size', value: formData.companySize },
                { label: 'Work Mode', value: formData.workMode },
            ]
        },
        {
            title: 'Experience & Education',
            step: 1,
            items: [
                { label: 'Experience', value: `${formData.experience} years` },
                { label: 'Education', value: formData.education },
                { label: 'Management Level', value: formData.managementLevel || 'Not specified' },
                { label: 'Current Salary', value: formData.currentSalary || 'Not disclosed' },
            ]
        },
        {
            title: 'Location & Company',
            step: 2,
            items: [
                { label: 'Location', value: formData.location },
                { label: 'Target Company', value: formData.targetCompany?.name || 'Not specified' },
            ]
        },
        {
            title: 'Skills & Qualifications',
            step: 3,
            items: [
                { label: 'Skills', value: formData.skills.length > 0 ? formData.skills.join(', ') : 'Not specified' },
                { label: 'Certifications', value: formData.certifications.length > 0 ? formData.certifications.join(', ') : 'None' },
                { label: 'Languages', value: formData.languages.length > 0 ? formData.languages.join(', ') : 'Not specified' },
            ]
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fcba28]/20 mb-4 shadow-[0_0_20px_rgba(252,186,40,0.2)]">
                    <CheckCircle className="w-8 h-8 text-[#fcba28]" />
                </div>
                <h3 className="text-2xl font-bold text-[#fcba28] mb-2">Review Your Information</h3>
                <p className="text-[#f9f4da]/70">Make sure everything looks good before getting your results</p>
            </div>

            <div className="space-y-4">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-[#1a1a1a]/50 rounded-xl p-6 border border-[#fcba28]/20 hover:border-[#fcba28]/40 transition-colors"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold text-[#f9f4da]">{section.title}</h4>
                            <Button
                                type="button"
                                onClick={() => onEdit(section.step)}
                                variant="ghost"
                                size="sm"
                                className="text-[#fcba28] hover:text-[#fcba28]/80 hover:bg-[#fcba28]/10"
                            >
                                <Edit2 className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="space-y-1">
                                    <div className="text-sm text-[#f9f4da]/50">{item.label}</div>
                                    <div className="text-[#f9f4da] font-medium">{item.value || 'Not provided'}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-[#fcba28]/10 border border-[#fcba28]/30 rounded-xl p-4 mt-6">
                <p className="text-sm text-[#f9f4da]/80 text-center">
                    <strong className="text-[#fcba28]">Ready?</strong> Click "Get Salary Insights" to receive your personalized salary analysis powered by AI.
                </p>
            </div>
        </motion.div>
    );
}
