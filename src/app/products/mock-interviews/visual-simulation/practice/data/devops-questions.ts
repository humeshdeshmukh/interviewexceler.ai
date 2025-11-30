import { Question } from "./types";

export const devopsQuestions: Question[] = [
  {
    id: 1,
    category: "DevOps",
    text: "Explain the CI/CD pipeline and its importance",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "CI/CD concepts",
        "Pipeline stages",
        "Implementation tools",
        "Best practices"
      ],
      structure: {
        introduction: "CI/CD is a set of practices that automate the software delivery process, ensuring quality and reducing deployment risks.",
        body: [
          "CI: Automated building and testing of code changes",
          "CD: Automated deployment to staging/production",
          "Pipeline stages: build, test, deploy, monitor",
          "Tools: Jenkins, GitHub Actions, GitLab CI"
        ],
        conclusion: "CI/CD enables faster, more reliable software delivery while maintaining quality standards."
      },
      tips: [
        "Explain each stage",
        "Discuss automation benefits",
        "Include real tools",
        "Address quality gates"
      ],
      commonMistakes: [
        "Missing test automation",
        "Poor error handling",
        "Inadequate monitoring",
        "Skipping security checks"
      ],
      keywords: [
        "CI/CD",
        "Automation",
        "Pipeline",
        "Deployment",
        "Testing"
      ]
    }
  },
  {
    id: 2,
    category: "DevOps",
    text: "How do you implement container orchestration with Kubernetes?",
    difficulty: "hard",
    expectedDuration: "5-6 min",
    sampleAnswer: {
      mainPoints: [
        "Kubernetes architecture",
        "Core concepts",
        "Deployment strategies",
        "Management practices"
      ],
      structure: {
        introduction: "Kubernetes is a container orchestration platform that automates deployment, scaling, and management of containerized applications.",
        body: [
          "Core components: Pods, Services, Deployments",
          "Implement rolling updates and rollbacks",
          "Configure resource limits and requests",
          "Set up monitoring and logging"
        ],
        conclusion: "Effective Kubernetes implementation requires understanding of both containers and orchestration concepts."
      },
      tips: [
        "Explain core concepts",
        "Discuss scaling strategies",
        "Include security practices",
        "Address monitoring"
      ],
      commonMistakes: [
        "Poor resource management",
        "Missing health checks",
        "Inadequate monitoring",
        "Security oversights"
      ],
      keywords: [
        "Kubernetes",
        "Containers",
        "Orchestration",
        "Scaling",
        "DevOps"
      ]
    }
  }
];
