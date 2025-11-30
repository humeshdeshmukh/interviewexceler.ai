import { Question } from "./types";

export const databaseQuestions: Question[] = [
  {
    id: 1,
    category: "Database",
    text: "Compare SQL vs NoSQL databases and their use cases",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Database types and characteristics",
        "Use case scenarios",
        "Performance considerations",
        "Scaling approaches"
      ],
      structure: {
        introduction: "SQL and NoSQL databases serve different purposes and excel in different scenarios based on data structure and access patterns.",
        body: [
          "SQL: Structured data, ACID compliance",
          "NoSQL: Flexible schema, horizontal scaling",
          "SQL best for complex queries and transactions",
          "NoSQL ideal for rapid changes and scaling"
        ],
        conclusion: "The choice depends on data structure, consistency requirements, and scaling needs."
      },
      tips: [
        "Compare consistency models",
        "Discuss scaling options",
        "Include real examples",
        "Address performance"
      ],
      commonMistakes: [
        "Oversimplifying differences",
        "Ignoring use cases",
        "Missing scaling aspects",
        "Overlooking consistency"
      ],
      keywords: [
        "SQL",
        "NoSQL",
        "ACID",
        "Scaling",
        "Data Modeling"
      ]
    }
  },
  {
    id: 2,
    category: "Database",
    text: "Explain database normalization and when to denormalize",
    difficulty: "hard",
    expectedDuration: "5-6 min",
    sampleAnswer: {
      mainPoints: [
        "Normalization forms",
        "Benefits and trade-offs",
        "Denormalization scenarios",
        "Performance impact"
      ],
      structure: {
        introduction: "Database normalization organizes data to reduce redundancy, while denormalization optimizes for read performance.",
        body: [
          "1NF: Atomic values, no repeating groups",
          "2NF: Remove partial dependencies",
          "3NF: Remove transitive dependencies",
          "Denormalize for read performance"
        ],
        conclusion: "Balance between normalization and performance needs determines the optimal database design."
      },
      tips: [
        "Explain each form",
        "Discuss trade-offs",
        "Include examples",
        "Address performance"
      ],
      commonMistakes: [
        "Over-normalizing",
        "Ignoring performance",
        "Missing use cases",
        "Poor design choices"
      ],
      keywords: [
        "Normalization",
        "Denormalization",
        "Database Design",
        "Performance",
        "Data Integrity"
      ]
    }
  }
];
