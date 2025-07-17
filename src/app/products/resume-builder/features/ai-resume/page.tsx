"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
  AlertTriangle
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
    analyzeResume
  } = useResume();

  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const steps = [
    { id: 1, title: "Choose Template", icon: Layout },
    { id: 2, title: "Personal Info", icon: Edit3 },
    { id: 3, title: "Experience", icon: Briefcase },
    { id: 4, title: "Education", icon: GraduationCap },
    { id: 5, title: "Skills", icon: Award },
    { id: 6, title: "Projects", icon: FileText },
    { id: 7, title: "Achievements", icon: Trophy },
    { id: 8, title: "Certifications", icon: Award },
    { id: 9, title: "Languages", icon: Globe },
    { id: 10, title: "Volunteer", icon: Heart },
    { id: 11, title: "Declaration", icon: FileSignature },
    { id: 12, title: "Preview & ATS", icon: Download },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleAnalyzeResume = async () => {
    setIsAnalyzing(true);
    try {
      await analyzeResume();
    } catch (error) {
      console.error("Error analyzing resume:", error);
    } finally {
      setIsAnalyzing(false);
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
    <div className="min-h-screen bg-background relative">
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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-5 h-5 text-[#fcba28]" />
            <span className="text-sm font-medium">AI-Powered Resume Builder</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Create Your Professional Resume</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Build a standout resume with our AI-powered platform. Get personalized suggestions
            and ATS optimization to increase your chances of landing that dream job.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: step.id * 0.1 }}
                className={`flex items-center ${
                  step.id < currentStep
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
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <TemplateSelector
              selectedTemplate={resumeData.templateId}
              onSelect={(id) => {
                updateTemplateId(id);
                handleNext();
              }}
            />
          )}
          {currentStep === 2 && (
            <PersonalInfoForm
              initialData={resumeData.personalInfo}
              onSave={(data) => {
                updatePersonalInfo(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 3 && (
            <ExperienceForm
              initialData={resumeData.experiences}
              onSave={(data) => {
                updateExperiences(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 4 && (
            <EducationForm
              initialData={resumeData.education}
              onSave={(data) => {
                updateEducation(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 5 && (
            <SkillsForm
              initialData={resumeData.skills}
              onSave={(data) => {
                updateSkills(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 6 && (
            <ProjectsForm
              initialData={resumeData.projects}
              onSave={(data) => {
                updateProjects(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 7 && (
            <AchievementsForm
              initialData={resumeData.achievements}
              onSave={(data) => {
                updateAchievements(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 8 && (
            <CertificationsForm
              initialData={resumeData.certifications}
              onSave={(data) => {
                updateCertifications(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 9 && (
            <LanguagesForm
              initialData={resumeData.languages}
              onSave={(data) => {
                updateLanguages(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 10 && (
            <VolunteerForm
              initialData={resumeData.volunteer}
              onSave={(data) => {
                updateVolunteerWork(data);
                handleNext();
              }}
            />
          )}
          {currentStep === 11 && <Declaration onNext={handleNext} />}
          {currentStep === 12 && (
            <div className="space-y-8">
              <ResumePreview />
              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleAnalyzeResume}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    "Analyzing..."
                  ) : (
                    <>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Analyze Resume with AI
                    </>
                  )}
                </Button>
                <Button onClick={handleDownload} className="w-full">
                  Download Resume
                </Button>
                {resumeData.atsScore !== undefined && (
                  <ATSScoreCard
                    score={resumeData.atsScore}
                    improvements={resumeData.improvements || []}
                  />
                )}
              </div>
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
