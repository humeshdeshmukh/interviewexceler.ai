'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
    id: number;
    label: string;
    description: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
    const progressPercentage = Math.round(((currentStep + 1) / steps.length) * 100);

    return (
        <div className="w-full mb-8">
            {/* Modern Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-[#fcba28]">Step {currentStep + 1} of {steps.length}</span>
                    <span className="text-xs font-medium text-[#f9f4da]/70">{progressPercentage}%</span>
                </div>
                <div className="relative h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#fcba28] to-[#e9aa22] rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(252,186,40,0.5)]"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            {/* Step Labels */}
            <div className="flex justify-between items-center">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isUpcoming = index > currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1">
                            {/* Step Number/Check */}
                            <div
                                className={cn(
                                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 border-2 mb-2',
                                    isCompleted && 'bg-gradient-to-br from-[#fcba28] to-[#e9aa22] text-[#1a1a1a] border-[#fcba28]',
                                    isCurrent && 'bg-[#fcba28] text-[#1a1a1a] border-[#fcba28] scale-110 shadow-[0_0_12px_rgba(252,186,40,0.6)]',
                                    isUpcoming && 'bg-transparent text-[#f9f4da]/40 border-[#2a2a2a]'
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <span>{step.id}</span>
                                )}
                            </div>

                            {/* Label */}
                            <div className="text-center">
                                <div className={cn(
                                    'text-[10px] font-medium transition-colors duration-200',
                                    (isCompleted || isCurrent) ? 'text-[#fcba28]' : 'text-[#f9f4da]/30'
                                )}>
                                    {step.label}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
