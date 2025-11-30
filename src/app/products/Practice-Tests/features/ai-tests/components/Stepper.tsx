import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

interface Step {
    id: number;
    label: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
    const progressPercentage = Math.round(((currentStep + 1) / steps.length) * 100);

    return (
        <div className="w-full mb-8">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-[#fcba28]">Step {currentStep + 1} of {steps.length}</span>
                    <span className="text-xs font-medium text-gray-400">{progressPercentage}%</span>
                </div>
                <div className="relative h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#fcba28] to-[#fcd978] rounded-full shadow-[0_0_10px_rgba(252,186,40,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Steps */}
            <div className="flex justify-between items-center relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-0 w-full h-0.5 bg-[#2a2a2a] -z-10" />

                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isUpcoming = index > currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1 relative">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.1 : 1,
                                    backgroundColor: isCompleted || isCurrent ? '#fcba28' : '#1a1a1a',
                                    borderColor: isCompleted || isCurrent ? '#fcba28' : '#2a2a2a',
                                }}
                                className={cn(
                                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 z-10',
                                    isCompleted || isCurrent ? 'text-black shadow-[0_0_15px_rgba(252,186,40,0.4)]' : 'text-gray-500'
                                )}
                            >
                                {isCompleted ? <FaCheck className="w-3 h-3" /> : step.id}
                            </motion.div>

                            <motion.span
                                animate={{
                                    color: isCurrent ? '#fcba28' : isCompleted ? '#fcba28' : '#6b7280',
                                    y: isCurrent ? 0 : 0
                                }}
                                className={cn(
                                    "mt-3 text-[10px] uppercase tracking-wider font-semibold text-center absolute top-8 w-32",
                                    isCurrent ? "text-[#fcba28]" : "text-gray-500"
                                )}
                            >
                                {step.label}
                            </motion.span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
