import { Question } from './common';

export const infosysQuestions: Question[] = [
  // Sentence Arrangement (20 questions)
  {
    id: "vr_infosys_arrange_1",
    company: "Infosys",
    question: `Arrange the following sentences in a logical order:

1. The team began implementing the new system
2. Requirements were gathered from stakeholders
3. The project was initiated after careful planning
4. Testing revealed several critical issues
5. The system was finally deployed to production

Choose the correct sequence:`,
    options: [
      "3, 2, 1, 4, 5",
      "2, 3, 1, 4, 5",
      "3, 1, 2, 4, 5",
      "2, 1, 3, 4, 5"
    ],
    answer: "3, 2, 1, 4, 5",
    explanation: "The logical sequence is: project initiation (3), requirements gathering (2), implementation (1), testing (4), and deployment (5).",
    difficulty: "Medium",
    category: "Sentence Arrangement",
    hints: [
      "Look for the natural flow of a project lifecycle",
      "Consider what must happen before what"
    ]
  },
  // ... more sentence arrangement

  // Critical Reasoning (20 questions)
  {
    id: "vr_infosys_critical_1",
    company: "Infosys",
    question: `In a certain company, 85% of employees who received training in new technology showed improved performance. The company concludes that training in new technology leads to improved performance.

Which of the following statements, if true, most weakens the company's conclusion?`,
    options: [
      "Employees who didn't receive training also showed similar improvement",
      "Some trained employees didn't improve at all",
      "The training was very expensive",
      "Other companies have different training programs"
    ],
    answer: "Employees who didn't receive training also showed similar improvement",
    explanation: "If untrained employees showed similar improvement, it suggests that factors other than the training might be responsible for the improved performance.",
    difficulty: "Hard",
    category: "Critical Reasoning",
    hints: [
      "Look for alternative explanations",
      "Consider what would break the cause-effect relationship"
    ]
  },
  // ... more critical reasoning

  // Vocabulary in Context (20 questions)
  {
    id: "vr_infosys_vocab_1",
    company: "Infosys",
    question: `Choose the word that best fits the context:

The archaeological discovery was so _______ that it challenged existing theories about ancient civilizations.`,
    options: ["Mundane", "Groundbreaking", "Typical", "Regular"],
    answer: "Groundbreaking",
    explanation: "The context suggests that the discovery was significant enough to challenge existing theories, making 'groundbreaking' (innovative and important) the most appropriate choice.",
    difficulty: "Medium",
    category: "Vocabulary in Context",
    hints: [
      "Consider the impact described in the sentence",
      "Look for words that match the magnitude of the effect"
    ]
  },
  // ... more vocabulary

  // Verbal Deduction (20 questions)
  {
    id: "vr_infosys_deduction_1",
    company: "Infosys",
    question: `If:
1. All software developers at XYZ Corp know Python
2. John works at XYZ Corp
3. John knows Java

Which conclusion must be true?`,
    options: [
      "John is a software developer",
      "John doesn't know Python",
      "All software developers at XYZ Corp know Java",
      "None of the above"
    ],
    answer: "None of the above",
    explanation: "The statements don't provide enough information to determine if John is a developer, and knowing Java doesn't tell us anything about his Python knowledge or role.",
    difficulty: "Hard",
    category: "Verbal Deduction",
    hints: [
      "Consider only what logically follows from the given statements",
      "Don't make assumptions beyond the given information"
    ]
  },
  // ... more deduction

  // Reading Comprehension (20 questions)
  {
    id: "vr_infosys_rc_1",
    company: "Infosys",
    question: `Read the passage:

Cloud computing has transformed how businesses operate, offering scalability, cost-effectiveness, and improved collaboration. However, it also presents challenges in data security, privacy, and compliance. Organizations must carefully balance the benefits against potential risks when moving to cloud-based solutions.

What is the main theme of the passage?`,
    options: [
      "The definition of cloud computing",
      "The advantages and challenges of cloud computing",
      "Data security in modern businesses",
      "Cost management in IT"
    ],
    answer: "The advantages and challenges of cloud computing",
    explanation: "The passage discusses both the benefits (scalability, cost-effectiveness, collaboration) and challenges (security, privacy, compliance) of cloud computing.",
    difficulty: "Medium",
    category: "Reading Comprehension",
    hints: [
      "Look for the overall message",
      "Consider both positive and negative aspects discussed"
    ]
  }
  // ... more reading comprehension
];
