import { Question } from "./types";

export const backendQuestions: Question[] = [
  {
    id: 1,
    category: "Backend",
    text: "Explain the differences between REST and GraphQL APIs",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Data fetching approach",
        "Request/Response structure",
        "Performance implications",
        "Use case scenarios"
      ],
      structure: {
        introduction: "REST and GraphQL are two different approaches to building APIs, each with their own strengths and ideal use cases.",
        body: [
          "REST uses multiple endpoints for different resources",
          "GraphQL has a single endpoint with flexible queries",
          "REST may over/under fetch data",
          "GraphQL allows precise data selection"
        ],
        conclusion: "The choice between REST and GraphQL depends on factors like client needs, team expertise, and project requirements."
      },
      tips: [
        "Use concrete examples",
        "Compare real scenarios",
        "Discuss trade-offs",
        "Mention implementation considerations"
      ],
      commonMistakes: [
        "Oversimplifying differences",
        "Not discussing trade-offs",
        "Ignoring caching considerations",
        "Missing security aspects"
      ],
      keywords: [
        "REST",
        "GraphQL",
        "API Design",
        "Performance",
        "Data Fetching"
      ]
    }
  },
  {
    id: 2,
    category: "Backend",
    text: "How do you handle database scaling in high-traffic applications?",
    difficulty: "hard",
    expectedDuration: "5-6 min",
    sampleAnswer: {
      mainPoints: [
        "Scaling strategies",
        "Replication and sharding",
        "Caching implementation",
        "Performance monitoring"
      ],
      structure: {
        introduction: "Database scaling requires a combination of vertical and horizontal scaling strategies along with proper monitoring and optimization.",
        body: [
          "Implement read replicas for query distribution",
          "Use sharding for data partitioning",
          "Add caching layers with Redis/Memcached",
          "Monitor and optimize query performance"
        ],
        conclusion: "A successful scaling strategy combines multiple approaches and requires continuous monitoring and adjustment."
      },
      tips: [
        "Discuss both scaling approaches",
        "Include monitoring strategies",
        "Address common bottlenecks",
        "Consider cost implications"
      ],
      commonMistakes: [
        "Focusing only on one approach",
        "Ignoring monitoring",
        "Missing backup strategies",
        "Not considering costs"
      ],
      keywords: [
        "Scaling",
        "Replication",
        "Sharding",
        "Caching",
        "Performance"
      ]
    }
  }
];
