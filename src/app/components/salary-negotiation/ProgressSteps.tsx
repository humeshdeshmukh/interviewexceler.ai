"use client";

interface ProgressStepsProps {
  currentStep: number;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = ['Package Details', 'Schedule', 'Confirmation'];

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`text-sm ${currentStep > index + 1 ? 'text-[#fcba28]' : 'text-gray-400'}`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#fcba28] transition-all duration-500"
          style={{ width: `${(currentStep - 1) * 50}%` }}
        />
      </div>
    </div>
  );
}
