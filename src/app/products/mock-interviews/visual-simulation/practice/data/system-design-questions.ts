import { Question } from "./types";

export const systemDesignQuestions: Question[] = [
  {
    id: 1,
    category: "System Design",
    text: "Design a real-time chat application like Slack",
    difficulty: "hard",
    expectedDuration: "5-6 min",
    sampleAnswer: {
      mainPoints: [
        "System requirements and scale",
        "High-level architecture",
        "Data model and storage",
        "Real-time messaging implementation"
      ],
      structure: {
        introduction: "Let's design a scalable real-time chat system that supports multiple users and channels with message persistence.",
        body: [
          "Requirements: Real-time messaging, user presence, message history, file sharing",
          "Architecture: WebSocket servers, message queue, database clusters",
          "Data Model: Users, channels, messages, attachments",
          "Technologies: WebSocket, Redis for presence, Cassandra for messages"
        ],
        conclusion: "This architecture ensures low latency, high availability, and horizontal scalability."
      },
      tips: [
        "Start with requirements gathering",
        "Consider scalability from the start",
        "Discuss trade-offs in your design",
        "Address potential bottlenecks"
      ],
      commonMistakes: [
        "Skipping requirements gathering",
        "Not considering scale",
        "Ignoring edge cases",
        "Missing important features"
      ],
      keywords: [
        "WebSocket",
        "Scalability",
        "Real-time",
        "Message Queue",
        "Database Sharding"
      ]
    }
  },
  {
    id: 2,
    category: "System Design",
    text: "Design a URL shortening service like bit.ly",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "URL shortening algorithm",
        "Data storage and caching",
        "API design",
        "Analytics tracking"
      ],
      structure: {
        introduction: "We'll design a URL shortening service that generates unique short URLs and handles redirections efficiently.",
        body: [
          "Use base62 encoding for short URL generation",
          "Store URL mappings in distributed database",
          "Implement caching layer with Redis",
          "Track clicks and analytics in separate database"
        ],
        conclusion: "This design provides fast URL generation and redirection while supporting analytics."
      },
      tips: [
        "Discuss collision handling",
        "Consider URL expiration",
        "Address security concerns",
        "Think about analytics requirements"
      ],
      commonMistakes: [
        "Using simple incremental IDs",
        "Ignoring cache invalidation",
        "Not handling duplicate URLs",
        "Missing rate limiting"
      ],
      keywords: [
        "Base62",
        "Caching",
        "Load Balancing",
        "NoSQL",
        "Analytics"
      ]
    }
  },
  {
    id: 3,
    category: "System Design",
    text: "Design a distributed job scheduling system",
    difficulty: "hard",
    expectedDuration: "5-6 min",
    sampleAnswer: {
      mainPoints: [
        "System requirements",
        "Architecture components",
        "Scheduling algorithms",
        "Fault tolerance"
      ],
      structure: {
        introduction: "A distributed job scheduler needs to handle task scheduling, execution, and monitoring across multiple nodes reliably.",
        body: [
          "Use master-worker architecture for job distribution",
          "Implement priority queue for task scheduling",
          "Add heartbeat mechanism for worker health",
          "Include job retry and failure handling"
        ],
        conclusion: "This design ensures reliable job execution with fault tolerance and scalability."
      },
      tips: [
        "Consider failure scenarios",
        "Discuss monitoring",
        "Address scalability",
        "Include retry strategies"
      ],
      commonMistakes: [
        "Missing failure handling",
        "Poor monitoring",
        "Ignoring scalability",
        "Weak consistency model"
      ],
      keywords: [
        "Distributed Systems",
        "Job Scheduling",
        "Fault Tolerance",
        "Scalability",
        "Monitoring"
      ]
    }
  },
  {
    id: 4,
    category: "System Design",
    text: "Design a content delivery network (CDN)",
    difficulty: "hard",
    expectedDuration: "5-6 min",
    sampleAnswer: {
      mainPoints: [
        "CDN architecture",
        "Caching strategy",
        "Request routing",
        "Content invalidation"
      ],
      structure: {
        introduction: "A CDN improves content delivery speed by caching content at edge locations closer to users.",
        body: [
          "Implement edge server network",
          "Use DNS-based request routing",
          "Apply hierarchical caching",
          "Handle cache invalidation"
        ],
        conclusion: "This CDN design optimizes content delivery while maintaining consistency and reliability."
      },
      tips: [
        "Discuss edge cases",
        "Consider geography",
        "Address latency",
        "Include metrics"
      ],
      commonMistakes: [
        "Ignoring cache consistency",
        "Missing invalidation",
        "Poor routing strategy",
        "Weak monitoring"
      ],
      keywords: [
        "CDN",
        "Caching",
        "Edge Computing",
        "DNS",
        "Content Delivery"
      ]
    }
  },
  {
    id: 5,
    category: "System Design",
    text: "Design a rate limiting system",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Rate limiting algorithms",
        "Storage considerations",
        "Distributed coordination",
        "Client communication"
      ],
      structure: {
        introduction: "A rate limiting system protects services from excessive use while ensuring fair resource allocation.",
        body: [
          "Use token bucket algorithm",
          "Store counters in Redis",
          "Implement distributed locking",
          "Return proper HTTP headers"
        ],
        conclusion: "This design provides effective rate limiting while maintaining system performance."
      },
      tips: [
        "Compare algorithms",
        "Discuss storage options",
        "Address race conditions",
        "Include headers"
      ],
      commonMistakes: [
        "Single point of failure",
        "Race conditions",
        "Poor error handling",
        "Missing monitoring"
      ],
      keywords: [
        "Rate Limiting",
        "Token Bucket",
        "Redis",
        "Distributed Systems",
        "API Design"
      ]
    }
  }
];
