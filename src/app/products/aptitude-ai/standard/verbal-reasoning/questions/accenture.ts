import { Question } from './common';

export const accentureQuestions: Question[] = [
  // Reading Analysis (20 questions)
  {
    id: "vr_accenture_reading_1",
    company: "Accenture",
    question: `Read the passage and answer:

Digital transformation is reshaping industries at an unprecedented pace. Organizations must adapt to remain competitive, but this adaptation goes beyond merely implementing new technologies. It requires a fundamental shift in organizational culture, business processes, and workforce skills. Success in digital transformation depends on balancing technological innovation with human factors.

What is the main argument of the passage?`,
    options: [
      "Digital transformation is only about technology",
      "Organizations must implement new technologies quickly",
      "Digital transformation requires comprehensive organizational change",
      "Human factors are more important than technology"
    ],
    answer: "Digital transformation requires comprehensive organizational change",
    explanation: "The passage emphasizes that digital transformation involves not just technology but also cultural, process, and workforce changes.",
    difficulty: "Hard",
    category: "Reading Analysis",
    hints: [
      "Look for the broader message beyond technology",
      "Consider all aspects mentioned in the passage"
    ]
  },
  // ... more reading analysis

  // Verbal Logic (20 questions)
  {
    id: "vr_accenture_logic_1",
    company: "Accenture",
    question: `If:
- All successful projects require good planning
- Some projects with good planning fail
- Project X has good planning

What can be concluded?`,
    options: [
      "Project X will succeed",
      "Project X will fail",
      "Project X may or may not succeed",
      "Project X has no chance of success"
    ],
    answer: "Project X may or may not succeed",
    explanation: "While good planning is necessary for success (first premise), it's not sufficient (second premise). Therefore, Project X's success cannot be guaranteed.",
    difficulty: "Hard",
    category: "Verbal Logic",
    hints: [
      "Consider both necessary and sufficient conditions",
      "Think about what can be logically concluded"
    ]
  },
  // ... more verbal logic

  // Technical Vocabulary (20 questions)
  {
    id: "vr_accenture_tech_1",
    company: "Accenture",
    question: "Which term best describes 'a software development approach where testing is done before implementation'?",
    options: [
      "Test-Driven Development",
      "Agile Development",
      "Waterfall Model",
      "Spiral Model"
    ],
    answer: "Test-Driven Development",
    explanation: "Test-Driven Development (TDD) is a software development approach where tests are written before the actual code implementation.",
    difficulty: "Medium",
    category: "Technical Vocabulary",
    hints: [
      "Think about development methodologies",
      "Focus on the timing of testing in the process"
    ]
  },
  // ... more technical vocabulary

  // Analytical Reasoning (20 questions)
  {
    id: "vr_accenture_analytical_1",
    company: "Accenture",
    question: `Consider the scenario:
Three developers (A, B, C) are working on three features (1, 2, 3). Each developer must work on exactly one feature.
- A cannot work on feature 1
- B prefers feature 2
- C has experience with feature 1

What is the most efficient assignment?`,
    options: [
      "A-2, B-3, C-1",
      "A-3, B-2, C-1",
      "A-1, B-2, C-3",
      "A-2, B-1, C-3"
    ],
    answer: "A-3, B-2, C-1",
    explanation: "This assignment satisfies all conditions: A avoids feature 1, B gets preferred feature 2, and C's experience with feature 1 is utilized.",
    difficulty: "Hard",
    category: "Analytical Reasoning",
    hints: [
      "List all constraints first",
      "Consider experience and preferences"
    ]
  },
  // ... more analytical reasoning

  // Communication Skills (20 questions)
  {
    id: "vr_accenture_comm_1",
    company: "Accenture",
    question: `Choose the most appropriate response to a client who says:
"We've noticed some inconsistencies in the system's performance."`,
    options: [
      "That's impossible, our system is perfect",
      "I understand your concern. Could you provide specific examples so we can investigate?",
      "You must be using it wrong",
      "Maybe you should try another system"
    ],
    answer: "I understand your concern. Could you provide specific examples so we can investigate?",
    explanation: "This response shows professionalism, acknowledges the client's concern, and seeks specific information to address the issue.",
    difficulty: "Medium",
    category: "Communication Skills",
    hints: [
      "Consider professional communication principles",
      "Think about customer service best practices"
    ]
  }
  // ... more communication skills
];
