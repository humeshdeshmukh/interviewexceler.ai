"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

// Types
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  summary: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Achievement {
  title: string;
  description: string;
  date?: string;
}

export interface VolunteerWork {
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  id?: string;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  volunteer: VolunteerWork[];
  declaration?: string;
  templateId: number;
  atsScore?: number;
  improvements?: string[];
}

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSkills: (skills: string[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateLanguages: (languages: Language[]) => void;
  updateAchievements: (achievements: Achievement[]) => void;
  updateVolunteerWork: (volunteerWork: VolunteerWork[]) => void;
  updateTemplateId: (id: number) => void;
  updateDeclaration: (declaration: string) => void;
  analyzeResume: () => Promise<any>;
  saveResume: () => Promise<void>;
  loadResume: (id: string) => Promise<void>;
  parseResume: (file: File) => Promise<void>;
  improveContent: (text: string, type: string, context?: string) => Promise<string>;
  isSaving: boolean;
  isAnalyzing: boolean;
  dataVersion: number;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
  volunteer: [],
  templateId: 1,
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setResumeData((prev) => ({ ...prev, experiences }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData((prev) => ({ ...prev, education }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData((prev) => ({ ...prev, projects }));
  };

  const updateCertifications = (certifications: Certification[]) => {
    setResumeData((prev) => ({ ...prev, certifications }));
  };

  const updateLanguages = (languages: Language[]) => {
    setResumeData((prev) => ({ ...prev, languages }));
  };

  const updateAchievements = (achievements: Achievement[]) => {
    setResumeData((prev) => ({ ...prev, achievements }));
  };

  const updateVolunteerWork = (volunteerWork: VolunteerWork[]) => {
    setResumeData((prev) => ({ ...prev, volunteer: volunteerWork }));
  };

  const updateTemplateId = (id: number) => {
    setResumeData((prev) => ({ ...prev, templateId: id }));
  };

  const updateDeclaration = (declaration: string) => {
    setResumeData((prev) => ({ ...prev, declaration }));
  };

  const analyzeResume = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const analysis = await response.json();

      setResumeData(prev => ({
        ...prev,
        atsScore: analysis.score,
        improvements: analysis.improvements
      }));

      return analysis;
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error("Failed to analyze resume");
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveResume = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/resumes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: resumeData.id,
          resumeData,
          atsScore: resumeData.atsScore
        }),
      });

      if (!response.ok) throw new Error('Save failed');

      const savedData = await response.json();
      setResumeData(prev => ({ ...prev, id: savedData.id }));
      toast.success("Resume saved successfully");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  const loadResume = async (id: string) => {
    try {
      const response = await fetch('/api/resumes/list');
      if (!response.ok) throw new Error('Failed to load resumes');
      const resumes = await response.json();
      const resume = resumes.find((r: any) => r.id === id);

      if (resume) {
        setResumeData({ ...resume.content, id: resume.id, atsScore: resume.ats_score });
        setDataVersion(v => v + 1);
      }
    } catch (error) {
      console.error("Error loading resume:", error);
      toast.error("Failed to load resume");
    }
  };

  const parseResume = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/ai/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Parsing failed');
      }

      const parsedData = await response.json();
      console.log('Parsed resume data:', parsedData);

      setResumeData(prev => ({
        ...prev,
        ...parsedData,
        id: prev.id
      }));
      setDataVersion(v => v + 1);
      toast.success("Resume parsed successfully");
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast.error(`Failed to parse resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const improveContent = async (text: string, type: string, context?: string) => {
    try {
      const response = await fetch('/api/ai/improve-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type, context }),
      });

      if (!response.ok) throw new Error('Improvement failed');

      const data = await response.json();
      return data.improvedText;
    } catch (error) {
      console.error("Error improving content:", error);
      toast.error("Failed to improve content");
      return text;
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        updateExperiences,
        updateEducation,
        updateSkills,
        updateProjects,
        updateCertifications,
        updateLanguages,
        updateAchievements,
        updateVolunteerWork,
        updateTemplateId,
        updateDeclaration,
        analyzeResume,
        saveResume,
        loadResume,
        parseResume,
        improveContent,
        isSaving,
        isAnalyzing,
        dataVersion,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
