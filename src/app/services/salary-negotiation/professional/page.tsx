"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FormData, PackageType } from '@/app/types/salary-negotiation';
import { validateForm } from '@/app/utils/form-validation';
import {
  PackageSelection,
  NegotiationForm,
  Confirmation,
  ProgressSteps,
  LoadingOverlay
} from '@/app/components/salary-negotiation';
import { INITIAL_FORM_DATA, PACKAGES } from '@/app/constants/salary-negotiation';

export default function ProfessionalConsultation() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePackageSelect = (packageType: PackageType) => {
    setSelectedPackage(packageType);
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Transform form data to match API expectations
      const apiRequestData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        package: selectedPackage ? PACKAGES[selectedPackage].name : '',
        experience: formData.yearsOfExperience,
        currentRole: formData.currentRole,
        targetRole: formData.targetRole,
        currentSalary: formData.currentSalary,
        targetSalary: formData.targetSalary,
        company: formData.currentCompany,
        offerStage: formData.offerStatus,
        linkedin: formData.linkedin,
        message: `Additional Notes: ${formData.additionalNotes || 'None'}\nPreferred Date: ${formData.preferredDate}\nPreferred Time: ${formData.preferredTime}\nCommunication Preference: ${formData.communicationPreference}`
      };

      const response = await fetch('/api/send-salary-negotiation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      handleNextStep();
      toast.success('Your consultation has been scheduled successfully!');
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to submit form. Please try again.');
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      </div>

      <Toaster position="top-center" />
      {isSubmitting && <LoadingOverlay />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/services/salary-negotiation" className="text-gray-400 hover:text-white transition-colors">
            <FaArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold ml-4">Professional Consultation</h1>
        </div>

        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} />

        {/* Steps Content */}
        {currentStep === 1 && (
          <PackageSelection
            selectedPackage={selectedPackage}
            onPackageSelect={handlePackageSelect}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 2 && selectedPackage && (
          <NegotiationForm
            formData={formData}
            selectedPackage={selectedPackage}
            onFormChange={handleFormChange}
            onBack={handlePreviousStep}
            onSubmit={handleSubmit}
            error={error}
          />
        )}

        {currentStep === 3 && selectedPackage && (
          <Confirmation
            formData={formData}
            selectedPackage={selectedPackage}
          />
        )}
      </div>
    </div>
  );
}
