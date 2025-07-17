import { Question } from "./types";

export const frontendQuestions: Question[] = [
  {
    id: 1,
    category: "Frontend",
    text: "Explain React's Virtual DOM and its benefits",
    difficulty: "medium",
    expectedDuration: "3-4 min",
    sampleAnswer: {
      mainPoints: [
        "Virtual DOM concept",
        "Reconciliation process",
        "Performance benefits",
        "Real-world applications"
      ],
      structure: {
        introduction: "The Virtual DOM is React's lightweight copy of the actual DOM that helps optimize rendering performance.",
        body: [
          "Virtual DOM is a JavaScript representation of the actual DOM",
          "React performs diffing between Virtual DOM versions",
          "Only necessary updates are applied to the real DOM",
          "This minimizes expensive DOM operations"
        ],
        conclusion: "This approach significantly improves performance in dynamic web applications by reducing direct DOM manipulations."
      },
      tips: [
        "Use simple analogies to explain",
        "Provide concrete examples",
        "Mention performance implications",
        "Discuss when it's most beneficial"
      ],
      commonMistakes: [
        "Oversimplifying the concept",
        "Not explaining reconciliation",
        "Missing performance context",
        "Ignoring limitations"
      ],
      keywords: [
        "Virtual DOM",
        "Reconciliation",
        "Performance",
        "Diffing",
        "React"
      ]
    }
  },
  {
    id: 2,
    category: "Frontend",
    text: "How do you handle state management in large React applications?",
    difficulty: "hard",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "State management solutions",
        "When to use each approach",
        "Best practices",
        "Performance considerations"
      ],
      structure: {
        introduction: "State management in large React applications requires a strategic approach combining different solutions based on specific needs.",
        body: [
          "Use local state for component-specific data",
          "Context API for shared state across components",
          "Redux/Zustand for complex global state",
          "Consider performance with selectors and memoization"
        ],
        conclusion: "The key is choosing the right tool for each use case while maintaining code maintainability and performance."
      },
      tips: [
        "Compare different solutions",
        "Discuss trade-offs",
        "Mention real-world scenarios",
        "Address scalability"
      ],
      commonMistakes: [
        "Over-using global state",
        "Ignoring Context API",
        "Not considering performance",
        "Missing error handling"
      ],
      keywords: [
        "Redux",
        "Context API",
        "State Management",
        "Performance",
        "Scalability"
      ]
    }
  }
];
