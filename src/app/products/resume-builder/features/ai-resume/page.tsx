"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  FileText,
  Download,
  Edit3,
  Layout,
  Share2,
  GraduationCap,
  Award,
  FileSignature,
  Globe,
  Trophy,
  Briefcase,
  Heart,
  AlertTriangle,
  Save,
  Upload,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeProvider, useResume } from "./context/ResumeContext";
import { PersonalInfoForm } from "./components/sections/PersonalInfoForm";
import { ExperienceForm } from "./components/sections/ExperienceForm";
import { EducationForm } from "./components/sections/EducationForm";
import { SkillsForm } from "./components/sections/SkillsForm";
import { ProjectsForm } from "./components/sections/ProjectsForm";
import { AchievementsForm } from "./components/sections/AchievementsForm";
import { CertificationsForm } from "./components/sections/CertificationsForm";
import { LanguagesForm } from "./components/sections/LanguagesForm";
import { VolunteerForm } from "./components/sections/VolunteerForm";
import { Declaration } from "./components/sections/Declaration";
import { ResumePreview } from "./components/preview/ResumePreview";
import { TemplateSelector } from "./components/templates/TemplateSelector";
import { ATSScoreCard } from "./components/ats/ATSScoreCard";

const ResumeBuilder = () => {
  const {
    resumeData,
    updatePersonalInfo,
    updateExperiences,
    updateEducation,
    updateSkills,
    updateProjects,
    updateAchievements,
    updateCertifications,
    updateLanguages,
    updateVolunteerWork,
    updateTemplateId,
    analyzeResume,
    saveResume,
    loadResume,
    parseResume,
    isSaving,
    isAnalyzing,
    dataVersion
  } = useResume();

  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  useEffect(() => {
    if (resumeId) {
      loadResume(resumeId);
    }
  }, [resumeId]);

  const steps = [
    { id: 1, title: "Personal Info", icon: Edit3 },
    { id: 2, title: "Experience", icon: Briefcase },
    { id: 3, title: "Education", icon: GraduationCap },
    { id: 4, title: "Skills", icon: Award },
    { id: 5, title: "Projects", icon: FileText },
    { id: 6, title: "Achievements", icon: Trophy },
    { id: 7, title: "Certifications", icon: Award },
    { id: 8, title: "Languages", icon: Globe },
    { id: 9, title: "Volunteer", icon: Heart },
    { id: 10, title: "Declaration", icon: FileSignature },
    { id: 11, title: "Preview", icon: Download },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleAnalyzeResume = async () => {
    try {
      await analyzeResume();
    } catch (error) {
      console.error("Error analyzing resume:", error);
    }
  };

  const handleSave = async () => {
    await saveResume();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await parseResume(file);
    } catch (error) {
      console.error("Error parsing resume:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(resumeData, null, 2)], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "resume.json";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen bg-background relative pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 backdrop-blur-sm mb-4">
                <Sparkles className="w-5 h-5 text-[#fcba28]" />
                <span className="text-sm font-medium">AI-Powered Resume Builder</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">Create Your Professional Resume</h1>
              <p className="text-muted-foreground max-w-2xl">
                Build a standout resume with our AI-powered platform. Get personalized suggestions
                and ATS optimization.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => window.location.href = '/products/resume-builder/dashboard'}>
                <Layout className="w-4 h-4 mr-2" />
                Dashboard
              </Button>

              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                id="resume-upload"
                onChange={handleFileUpload}
              />
              <label htmlFor="resume-upload">
                <Button variant="outline" className="cursor-pointer" asChild disabled={isUploading}>
                  <span>
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                    Import
                  </span>
                </Button>
              </label>

              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Save
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              // @ts-expect-error className is valid on motion.div
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: step.id * 0.1 }}
                className={`flex items-center ${step.id < currentStep
                  ? "text-[#fcba28]"
                  : step.id === currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                  }`}
              >
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{step.title}</span>
                </button>
                {step.id !== steps.length && (
                  <div className="w-4 h-px bg-white/10 mx-2" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto" key={dataVersion}>
          {currentStep === 1 && (
            <PersonalInfoForm
              initialData={resumeData.personalInfo}
              onSave={(data) => {
                updatePersonalInfo(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 2 && (
            <ExperienceForm
              initialData={resumeData.experiences}
              onSave={(data) => {
                updateExperiences(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 3 && (
            <EducationForm
              initialData={resumeData.education}
              onSave={(data) => {
                updateEducation(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 4 && (
            <SkillsForm
              initialData={resumeData.skills}
              onSave={(data) => {
                updateSkills(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 5 && (
            <ProjectsForm
              initialData={resumeData.projects}
              onSave={(data) => {
                updateProjects(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 6 && (
            <AchievementsForm
              initialData={resumeData.achievements}
              onSave={(data) => {
                updateAchievements(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 7 && (
            <CertificationsForm
              initialData={resumeData.certifications}
              onSave={(data) => {
                updateCertifications(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 8 && (
            <LanguagesForm
              initialData={resumeData.languages}
              onSave={(data) => {
                updateLanguages(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 9 && (
            <VolunteerForm
              initialData={resumeData.volunteer}
              onSave={(data) => {
                updateVolunteerWork(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 10 && <Declaration onNext={handleNext} />}
          {currentStep === 11 && (
            <div className="space-y-8">
              <ResumePreview />
            </div>
          )}
        </div>

        {/* Navigation */}
        {currentStep > 1 && currentStep < steps.length && (
          <div className="flex justify-between mt-8">
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ResumeBuilderWrapper = () => (
  <ResumeProvider>
    <ResumeBuilder />
  </ResumeProvider>
);

export default ResumeBuilderWrapper;
