import { introductionQuestions } from "./introduction-questions";
import { behavioralQuestions } from "./behavioral-questions";
import { technicalQuestions } from "./technical-questions";
import { systemDesignQuestions } from "./system-design-questions";
import { frontendQuestions } from "./frontend-questions";
import { backendQuestions } from "./backend-questions";
import { dsaQuestions } from "./dsa-questions";
import { securityQuestions } from "./security-questions";
import { cloudQuestions } from "./cloud-questions";
import { testingQuestions } from "./testing-questions";
import { devopsQuestions } from "./devops-questions";
import { architectureQuestions } from "./architecture-questions";
import { databaseQuestions } from "./database-questions";
import { Question } from "./types";

export const allQuestions: Question[] = [
  ...introductionQuestions,
  ...behavioralQuestions,
  ...technicalQuestions,
  ...systemDesignQuestions,
  ...frontendQuestions,
  ...backendQuestions,
  ...dsaQuestions,
  ...securityQuestions,
  ...cloudQuestions,
  ...testingQuestions,
  ...devopsQuestions,
  ...architectureQuestions,
  ...databaseQuestions,
];

export const categories = [
  "Introduction",
  "Behavioral",
  "Technical",
  "System Design",
  "Frontend",
  "Backend",
  "DSA",
  "Security",
  "Cloud",
  "Testing",
  "DevOps",
  "Architecture",
  "Database"
] as const;
