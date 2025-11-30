"use client";

import React, { createContext, useContext, useState } from "react";

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

interface Project {
  id: string;
  name: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  highlights: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  name: string;
}

interface Achievement {
  name: string;
}

interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
  impact: string;
  causes: string[];
  skills: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  volunteerWork: VolunteerWork[];
  templateId: number;
  declaration: string;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with a passion for building innovative solutions.",
  },
  experiences: [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      startDate: "2020-01",
      endDate: "2023-12",
      current: false,
      description: "Led development of core platform features and mentored junior developers.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      startDate: "2016-09",
      endDate: "2020-05",
      current: false,
      description: "Graduated with honors. Focus on software engineering and AI.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
  ],
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      role: "Lead Developer",
      description: "Built a scalable e-commerce platform with modern technologies",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      startDate: "2023-01",
      endDate: "2023-12",
      current: false,
      githubUrl: "",
      liveUrl: "",
      highlights: [
        "Implemented responsive design using Tailwind CSS",
        "Set up CI/CD pipeline with GitHub Actions",
        "Integrated payment processing with Stripe"
      ]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-06",
    },
  ],
  languages: [],
  achievements: [],
  volunteerWork: [
    {
      id: "1",
      organization: "Local Food Bank",
      role: "Volunteer Coordinator",
      startDate: "2023-01",
      endDate: "2023-12",
      current: false,
      location: "San Francisco, CA",
      description: "Coordinated food distribution events and managed volunteer teams",
      impact: "Helped serve over 1000 families in need",
      causes: ["Food Security", "Poverty Alleviation"],
      skills: ["Leadership", "Event Planning", "Community Outreach"]
    }
  ],
  templateId: 0,
  declaration: "",
};

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
  generateAISuggestions: (type: string, prompt: string) => Promise<string>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

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
    setResumeData((prev) => ({ ...prev, volunteerWork }));
  };

  const updateTemplateId = (id: number) => {
    setResumeData((prev) => ({ ...prev, templateId: id }));
  };

  const updateDeclaration = (declaration: string) => {
    setResumeData((prev) => ({ ...prev, declaration }));
  };

  const generateAISuggestions = async (type: string, prompt: string): Promise<string> => {
    // For now, return some default suggestions based on type
    switch (type) {
      case "skills":
        return "TypeScript, React, Next.js, Node.js, Express, MongoDB, AWS, Docker, Git, CI/CD";
      case "summary":
        return "Experienced software engineer with a proven track record of building scalable web applications. Strong expertise in modern JavaScript frameworks and cloud technologies.";
      case "experience":
        return "Led development of core features, Mentored junior developers, Improved system performance by 50%, Implemented CI/CD pipeline";
      case "volunteer":
        return "Led and coordinated volunteer teams, organized community events, and developed new programs. Improved operational efficiency and expanded community reach.";
      default:
        return "";
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
        generateAISuggestions,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
