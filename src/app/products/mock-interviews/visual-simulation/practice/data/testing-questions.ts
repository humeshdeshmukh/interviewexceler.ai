import { Question } from "./types";

export const testingQuestions: Question[] = [
  {
    id: 1,
    category: "Testing",
    text: "Explain different types of testing and when to use each",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Testing pyramid levels",
        "Test types and purposes",
        "Implementation strategies",
        "Tool selection"
      ],
      structure: {
        introduction: "Software testing involves different levels and types of tests, each serving a specific purpose in ensuring quality.",
        body: [
          "Unit tests: Test individual components",
          "Integration tests: Test component interactions",
          "E2E tests: Test complete user flows",
          "Performance tests: Verify system behavior under load"
        ],
        conclusion: "A comprehensive testing strategy combines different test types to ensure application quality and reliability."
      },
      tips: [
        "Discuss test pyramid",
        "Include testing tools",
        "Consider coverage",
        "Mention CI/CD integration"
      ],
      commonMistakes: [
        "Over-relying on one test type",
        "Missing integration tests",
        "Poor test maintenance",
        "Ignoring performance testing"
      ],
      keywords: [
        "Unit Testing",
        "Integration Testing",
        "E2E Testing",
        "Test Coverage",
        "CI/CD"
      ]
    }
  },
  {
    id: 2,
    category: "Testing",
    text: "How do you write effective unit tests?",
    difficulty: "medium",
    expectedDuration: "3-4 min",
    sampleAnswer: {
      mainPoints: [
        "Test structure",
        "Best practices",
        "Mocking strategies",
        "Coverage considerations"
      ],
      structure: {
        introduction: "Effective unit tests are essential for maintaining code quality and catching bugs early in development.",
        body: [
          "Follow AAA pattern (Arrange-Act-Assert)",
          "Test one thing per test",
          "Use meaningful test names",
          "Implement proper mocking"
        ],
        conclusion: "Good unit tests serve as documentation and catch regressions while being maintainable."
      },
      tips: [
        "Keep tests simple",
        "Use descriptive names",
        "Consider edge cases",
        "Maintain test independence"
      ],
      commonMistakes: [
        "Testing multiple things",
        "Brittle tests",
        "Missing edge cases",
        "Poor test naming"
      ],
      keywords: [
        "Unit Testing",
        "AAA Pattern",
        "Mocking",
        "Test Coverage",
        "Assertions"
      ]
    }
  }
];
