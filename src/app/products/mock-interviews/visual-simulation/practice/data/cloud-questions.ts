import { Question } from "./types";

export const cloudQuestions: Question[] = [
  {
    id: 1,
    category: "Cloud",
    text: "Explain the differences between IaaS, PaaS, and SaaS",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Service model differences",
        "Use case scenarios",
        "Management responsibilities",
        "Cost implications"
      ],
      structure: {
        introduction: "Cloud computing offers different service models that vary in terms of control, flexibility, and management overhead.",
        body: [
          "IaaS: Raw infrastructure, most control (e.g., AWS EC2)",
          "PaaS: Development platform, managed infrastructure (e.g., Heroku)",
          "SaaS: Complete application, least control (e.g., Gmail)",
          "Each model suits different business needs"
        ],
        conclusion: "Choosing the right service model depends on technical requirements, team expertise, and business goals."
      },
      tips: [
        "Use real examples",
        "Compare management overhead",
        "Discuss cost factors",
        "Consider scalability"
      ],
      commonMistakes: [
        "Confusing service levels",
        "Missing cost analysis",
        "Ignoring security aspects",
        "Overlooking vendor lock-in"
      ],
      keywords: [
        "IaaS",
        "PaaS",
        "SaaS",
        "Cloud Computing",
        "Service Models"
      ]
    }
  },
  {
    id: 2,
    category: "Cloud",
    text: "How do you design for high availability in cloud applications?",
    difficulty: "hard",
    expectedDuration: "5-6 min",
    sampleAnswer: {
      mainPoints: [
        "High availability concepts",
        "Design patterns",
        "Implementation strategies",
        "Monitoring and recovery"
      ],
      structure: {
        introduction: "High availability in cloud applications requires careful design considering redundancy, fault tolerance, and automated recovery.",
        body: [
          "Use multiple availability zones",
          "Implement auto-scaling groups",
          "Design for failure with circuit breakers",
          "Set up monitoring and automated recovery"
        ],
        conclusion: "Achieving high availability requires both architectural design and operational excellence."
      },
      tips: [
        "Discuss redundancy levels",
        "Include monitoring strategies",
        "Address disaster recovery",
        "Consider costs"
      ],
      commonMistakes: [
        "Single points of failure",
        "Missing monitoring",
        "Inadequate testing",
        "Cost oversight"
      ],
      keywords: [
        "High Availability",
        "Redundancy",
        "Auto-scaling",
        "Monitoring",
        "Disaster Recovery"
      ]
    }
  }
];
