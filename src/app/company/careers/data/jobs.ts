import { Code, Brain, Rocket, Users, Presentation, Globe } from "lucide-react";

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experience: string;
  icon: any;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const departments = [
  {
    name: "Engineering",
    icon: Code,
    description: "Build the future of interview preparation with cutting-edge AI technology",
  },
  {
    name: "AI/ML",
    icon: Brain,
    description: "Develop advanced algorithms for realistic interview simulations",
  },
  {
    name: "Product",
    icon: Rocket,
    description: "Shape the future of our platform and user experience",
  },
  {
    name: "Operations",
    icon: Users,
    description: "Scale our platform to help more developers succeed",
  },
  {
    name: "Content",
    icon: Presentation,
    description: "Create high-quality interview preparation content",
  },
  {
    name: "Business",
    icon: Globe,
    description: "Drive growth and expand our global reach",
  },
];

export const jobPostings: JobPosting[] = [
  {
    id: "swe-001",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
    experience: "4+ years",
    icon: Code,
    description: "Join our core engineering team to build and scale our AI-powered interview preparation platform.",
    responsibilities: [
      "Design and implement new features for our interview preparation platform",
      "Work with AI/ML team to integrate advanced interview simulation capabilities",
      "Optimize application performance and scalability",
      "Write clean, maintainable, and well-tested code",
      "Mentor junior developers and contribute to engineering best practices",
    ],
    requirements: [
      "4+ years of experience in full-stack development",
      "Strong proficiency in React, Next.js, and TypeScript",
      "Experience with Node.js and RESTful APIs",
      "Understanding of cloud services (AWS/GCP/Azure)",
      "Knowledge of AI/ML concepts is a plus",
    ],
    benefits: [
      "Competitive salary and equity",
      "Remote-first work culture",
      "Flexible working hours",
      "Learning and development budget",
      "Health insurance coverage",
      "Regular team events and meetups",
    ],
  },
  {
    id: "ai-001",
    title: "AI/ML Engineer",
    department: "AI/ML",
    location: "Remote (India)",
    type: "Full-time",
    experience: "3+ years",
    icon: Brain,
    description: "Help build the next generation of AI-powered interview simulation technology.",
    responsibilities: [
      "Develop and improve AI models for interview simulation",
      "Implement natural language processing solutions",
      "Optimize model performance and accuracy",
      "Work on real-time feedback systems",
      "Collaborate with the engineering team on AI integration",
    ],
    requirements: [
      "3+ years of experience in AI/ML development",
      "Strong background in NLP and deep learning",
      "Experience with Python and ML frameworks",
      "Understanding of modern AI architectures",
      "Research experience is a plus",
    ],
    benefits: [
      "Competitive salary and equity",
      "Remote-first work culture",
      "Flexible working hours",
      "Research and conference budget",
      "Health insurance coverage",
      "Regular team events and meetups",
    ],
  },
  {
    id: "pm-001",
    title: "Product Manager",
    department: "Product",
    location: "Remote (India)",
    type: "Full-time",
    experience: "3+ years",
    icon: Rocket,
    description: "Drive the product vision and strategy for our interview preparation platform.",
    responsibilities: [
      "Define product strategy and roadmap",
      "Gather and analyze user feedback",
      "Work with engineering and AI teams",
      "Prioritize features and improvements",
      "Track and measure product metrics",
    ],
    requirements: [
      "3+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Experience with AI/ML products is a plus",
      "Excellent communication skills",
      "Technical background preferred",
    ],
    benefits: [
      "Competitive salary and equity",
      "Remote-first work culture",
      "Flexible working hours",
      "Professional development budget",
      "Health insurance coverage",
      "Regular team events and meetups",
    ],
  },
];
