import { Question } from "./types";

export const architectureQuestions: Question[] = [
  {
    id: 1,
    category: "Architecture",
    text: "Compare monolithic vs microservices architecture",
    difficulty: "hard",
    expectedDuration: "5-6 min",
    sampleAnswer: {
      mainPoints: [
        "Architectural differences",
        "Trade-offs and benefits",
        "Implementation considerations",
        "Migration strategies"
      ],
      structure: {
        introduction: "The choice between monolithic and microservices architecture significantly impacts development, deployment, and maintenance.",
        body: [
          "Monolithic: Single codebase, simpler development",
          "Microservices: Distributed, independent services",
          "Consider team size and project complexity",
          "Evaluate operational overhead"
        ],
        conclusion: "The choice depends on factors like team size, project scale, and organizational capabilities."
      },
      tips: [
        "Compare scalability aspects",
        "Discuss maintenance",
        "Include real examples",
        "Address team impact"
      ],
      commonMistakes: [
        "Oversimplifying trade-offs",
        "Ignoring team factors",
        "Missing deployment complexity",
        "Overlooking monitoring needs"
      ],
      keywords: [
        "Monolithic",
        "Microservices",
        "Scalability",
        "Architecture",
        "DevOps"
      ]
    }
  },
  {
    id: 2,
    category: "Architecture",
    text: "Explain event-driven architecture and its use cases",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Event-driven concepts",
        "Implementation patterns",
        "Use case scenarios",
        "Design considerations"
      ],
      structure: {
        introduction: "Event-driven architecture enables loose coupling and scalability through asynchronous event processing.",
        body: [
          "Events represent state changes",
          "Publishers emit events to topics/queues",
          "Subscribers process events independently",
          "Enables real-time processing and scaling"
        ],
        conclusion: "Event-driven architecture is particularly useful for real-time processing and decoupled systems."
      },
      tips: [
        "Explain event flow",
        "Discuss scalability",
        "Include error handling",
        "Address consistency"
      ],
      commonMistakes: [
        "Missing error handling",
        "Poor event design",
        "Ignoring ordering",
        "Overlooking monitoring"
      ],
      keywords: [
        "Event-Driven",
        "Asynchronous",
        "Pub/Sub",
        "Scalability",
        "Integration"
      ]
    }
  }
];
