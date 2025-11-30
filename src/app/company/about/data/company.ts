import { Brain, Target, Users, Sparkles, Code, Trophy, Rocket, Star } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
}

export interface Value {
  icon: any;
  title: string;
  description: string;
}

export const companyStats = [
  {
    icon: Users,
    label: "Active Users",
    value: "50K+",
  },
  {
    icon: Trophy,
    label: "Success Rate",
    value: "96%",
  },
  {
    icon: Brain,
    label: "Mock Interviews",
    value: "100K+",
  },
  {
    icon: Star,
    label: "User Rating",
    value: "4.9/5",
  },
];

export const companyMilestones: Milestone[] = [
  {
    year: 2025,
    title: "Idea Inception",
    description: "The concept for InterviewExceler was born, aiming to simplify and modernize interview preparation for everyone.",
  },
  {
    year: 2025,
    title: "Team Formation",
    description: "A passionate team of founders and early members came together to bring the vision to life.",
  },
  {
    year: 2025,
    title: "MVP Development",
    description: "Developed and launched the first version of the platform, focusing on core interview practice features.",
  },
  {
    year: 2025,
    title: "First User Launch",
    description: "Welcomed our first users and began gathering feedback to improve the platform.",
  },
];

export const companyValues: Value[] = [
  {
    icon: Target,
    title: "Personalized Growth",
    description: "Empowering every user with tailored resources and support for their unique career goals.",
  },
  {
    icon: Code,
    title: "Technical Excellence",
    description: "Delivering comprehensive, up-to-date content and best practices for all technical domains.",
  },
  {
    icon: Rocket,
    title: "Career Acceleration",
    description: "Helping users fast-track their professional growth through expert guidance and practical tools.",
  },
  {
    icon: Users,
    title: "Inclusive Community",
    description: "Fostering a supportive, diverse, and collaborative environment for all learners and professionals.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Humesh Deshmukh",
    role: "Founder & CEO",
    description: "Visionary leader driving the mission of InterviewExceler.AI.",
  },
  {
    name: "Aisha Agrawal",
    role: "Co-Founder & COO",
    description: "Operational strategist ensuring seamless execution and growth.",
  },
  {
    name: "Srushti Soitkar",
    role: "Product Manager",
    description: "Focused on delivering user-centric and effective solutions.",
  },
  {
    name: "Shrish Deshmukh",
    role: "Lead Engineer",
    description: "Building robust and scalable technology for interview preparation.",
  },
];

export const companyDescription = {
  mission: "To make high-quality interview preparation accessible, effective, and empowering for everyone, everywhere.",
  vision: "To be the world's most trusted and inclusive platform for career advancement and interview success.",
  about: "InterviewExceler is a modern interview preparation platform combining expert-curated content, interactive practice, and a vibrant community. We offer mock interviews, real-time feedback, and comprehensive resources to help you succeed in your career journey.",
  features: [
    "Mock Interviews with Real-time Feedback",
    "Personalized Learning Paths and Progress Tracking",
    "Comprehensive Technical Interview Coverage",
    "Performance Analytics and Improvement Insights",
    "Industry-Standard Coding Challenges",
    "Behavioral Interview Preparation",
    "System Design Interview Practice",
    "Expert-Curated Question Bank",
  ],
};
