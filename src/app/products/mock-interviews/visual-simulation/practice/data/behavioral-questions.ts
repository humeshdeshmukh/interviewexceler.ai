import { Question } from "./types";

export const behavioralQuestions: Question[] = [
  {
    id: 1,
    category: "Behavioral",
    text: "Tell me about a time when you had to deal with a difficult team member.",
    difficulty: "medium",
    expectedDuration: "3-4 min",
    sampleAnswer: {
      mainPoints: [
        "Describe the specific situation and the team member's behavior",
        "Explain your approach to addressing the issue",
        "Detail the actions you took to resolve the conflict",
        "Share the positive outcome and lessons learned"
      ],
      structure: {
        introduction: "I encountered this situation during a critical project where a team member was consistently missing deadlines and not communicating effectively.",
        body: [
          "First, I scheduled a private meeting to understand their perspective",
          "Discovered they were overwhelmed with multiple project responsibilities",
          "Worked together to create a manageable timeline and task list",
          "Set up regular check-ins to track progress and address concerns early"
        ],
        conclusion: "Through open communication and collaboration, we improved team dynamics and successfully completed the project on time."
      },
      tips: [
        "Focus on the resolution, not the conflict",
        "Show empathy and understanding",
        "Emphasize professional growth and learning",
        "Highlight positive outcomes"
      ],
      commonMistakes: [
        "Speaking negatively about the team member",
        "Focusing too much on the problem",
        "Not sharing specific actions taken",
        "Failing to mention lessons learned"
      ],
      keywords: [
        "Conflict Resolution",
        "Communication",
        "Collaboration",
        "Team Dynamics",
        "Problem-Solving"
      ]
    }
  },
  {
    id: 2,
    category: "Behavioral",
    text: "Describe a project that failed and what you learned from it.",
    difficulty: "hard",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Brief overview of the project and its goals",
        "Specific reasons for the failure",
        "Your role and responsibilities",
        "Key lessons learned and subsequent improvements"
      ],
      structure: {
        introduction: "I led a mobile app development project that failed to meet user adoption goals despite meeting technical requirements.",
        body: [
          "Project initially focused too much on technical features",
          "Insufficient user research and feedback integration",
          "Team realized issues too late in development cycle",
          "Implemented changes but missed market window"
        ],
        conclusion: "This experience taught me the importance of user-centric design and early feedback integration in product development."
      },
      tips: [
        "Be honest about the failure",
        "Focus on learning and growth",
        "Show how you applied lessons learned",
        "Maintain a positive perspective"
      ],
      commonMistakes: [
        "Blaming others for the failure",
        "Not taking responsibility",
        "Focusing only on technical aspects",
        "Avoiding discussion of personal growth"
      ],
      keywords: [
        "Learning Experience",
        "Accountability",
        "User-Centric Design",
        "Project Management",
        "Adaptability"
      ]
    }
  },
  {
    id: 3,
    category: "Behavioral",
    text: "Give an example of a time you showed leadership skills.",
    difficulty: "medium",
    expectedDuration: "3-4 min",
    sampleAnswer: {
      mainPoints: [
        "Context of the leadership opportunity",
        "Challenges faced and decisions made",
        "Actions taken to guide the team",
        "Results and impact achieved"
      ],
      structure: {
        introduction: "During a critical system migration project, I stepped up to lead a cross-functional team when our project manager unexpectedly left.",
        body: [
          "Quickly assessed project status and team concerns",
          "Reorganized tasks and created clear communication channels",
          "Implemented daily stand-ups and progress tracking",
          "Motivated team through challenges and tight deadlines"
        ],
        conclusion: "Successfully completed the migration ahead of schedule, improving system performance by 40% and team morale."
      },
      tips: [
        "Focus on specific actions taken",
        "Highlight team motivation techniques",
        "Include measurable results",
        "Show decision-making process"
      ],
      commonMistakes: [
        "Being too vague about leadership role",
        "Not mentioning team impact",
        "Focusing only on personal achievements",
        "Neglecting to mention challenges overcome"
      ],
      keywords: [
        "Leadership",
        "Team Management",
        "Decision Making",
        "Communication",
        "Results-Driven"
      ]
    }
  },
  {
    id: 4,
    category: "Behavioral",
    text: "Tell me about a time you had to work under pressure to meet a tight deadline.",
    difficulty: "medium",
    expectedDuration: "3-4 min",
    sampleAnswer: {
      mainPoints: [
        "Situation and deadline context",
        "Pressure management strategy",
        "Actions taken to meet deadline",
        "Outcome and lessons learned"
      ],
      structure: {
        introduction: "We had to deliver a critical client presentation with significant changes requested just 48 hours before the deadline.",
        body: [
          "Immediately prioritized tasks and identified critical path",
          "Coordinated with team members to divide work efficiently",
          "Implemented focused work sessions with regular breaks",
          "Maintained quality checks despite time pressure"
        ],
        conclusion: "Delivered the presentation on time with all requested changes, receiving positive client feedback and securing the contract."
      },
      tips: [
        "Emphasize time management skills",
        "Show ability to maintain quality under pressure",
        "Highlight prioritization methods",
        "Include stress management techniques"
      ],
      commonMistakes: [
        "Showing poor planning skills",
        "Focusing too much on the stress",
        "Not mentioning quality maintenance",
        "Failing to describe specific strategies"
      ],
      keywords: [
        "Time Management",
        "Prioritization",
        "Stress Management",
        "Quality Control",
        "Deadline-Driven"
      ]
    }
  },
  {
    id: 5,
    category: "Behavioral",
    text: "Describe a situation where you had to learn a new technology quickly.",
    difficulty: "medium",
    expectedDuration: "3-4 min",
    sampleAnswer: {
      mainPoints: [
        "Context requiring new technology",
        "Learning approach and resources used",
        "Implementation process",
        "Results and knowledge sharing"
      ],
      structure: {
        introduction: "Our team needed to implement a new cloud technology stack within a month to meet changing project requirements.",
        body: [
          "Created structured learning plan with daily goals",
          "Utilized online courses, documentation, and community resources",
          "Built small proof-of-concept projects to practice",
          "Collaborated with experienced peers for guidance"
        ],
        conclusion: "Successfully implemented the new technology stack, improving system scalability and reducing costs by 30%."
      },
      tips: [
        "Show systematic learning approach",
        "Emphasize self-motivation",
        "Include practical application",
        "Demonstrate knowledge sharing"
      ],
      commonMistakes: [
        "Not showing structured learning method",
        "Focusing only on technical details",
        "Neglecting to mention challenges",
        "Forgetting to include results"
      ],
      keywords: [
        "Quick Learning",
        "Adaptability",
        "Self-Development",
        "Technical Skills",
        "Knowledge Sharing"
      ]
    }
  },
  {
    id: 6,
    category: "Behavioral",
    text: "How do you handle working under tight deadlines and pressure?",
    difficulty: "medium",
    expectedDuration: "3-4 min",
    sampleAnswer: {
      mainPoints: [
        "Prioritization strategy",
        "Time management approach",
        "Stress management techniques",
        "Communication with stakeholders"
      ],
      structure: {
        introduction: "Working under pressure requires a systematic approach to prioritization and effective stress management.",
        body: [
          "Break down tasks into manageable chunks",
          "Prioritize based on impact and urgency",
          "Maintain open communication with team",
          "Use time management techniques like Pomodoro"
        ],
        conclusion: "By staying organized and maintaining clear communication, I can effectively deliver results under pressure."
      },
      tips: [
        "Show specific techniques",
        "Emphasize calm demeanor",
        "Include real examples",
        "Discuss work-life balance"
      ],
      commonMistakes: [
        "Showing poor time management",
        "Not asking for help",
        "Sacrificing quality",
        "Ignoring team resources"
      ],
      keywords: [
        "Time Management",
        "Prioritization",
        "Stress Management",
        "Communication",
        "Organization"
      ]
    }
  },
  {
    id: 7,
    category: "Behavioral",
    text: "Describe a time when you had to give difficult feedback to a colleague",
    difficulty: "hard",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Situation context",
        "Feedback approach",
        "Communication strategy",
        "Outcome and learning"
      ],
      structure: {
        introduction: "I needed to provide constructive feedback to a team member about their communication style affecting team dynamics.",
        body: [
          "Scheduled private meeting in neutral setting",
          "Used specific examples to illustrate impact",
          "Focused on behavior, not personality",
          "Collaborated on improvement plan"
        ],
        conclusion: "The feedback was well-received, leading to improved team communication and stronger working relationships."
      },
      tips: [
        "Be specific and objective",
        "Show empathy",
        "Focus on improvement",
        "Follow up appropriately"
      ],
      commonMistakes: [
        "Being too vague",
        "Making it personal",
        "Poor timing/setting",
        "Missing follow-up"
      ],
      keywords: [
        "Feedback",
        "Communication",
        "Leadership",
        "Empathy",
        "Professional Development"
      ]
    }
  },
  {
    id: 8,
    category: "Behavioral",
    text: "Tell me about a time you had to adapt to a significant change at work",
    difficulty: "medium",
    expectedDuration: "3-4 min",
    sampleAnswer: {
      mainPoints: [
        "Change context",
        "Initial challenges",
        "Adaptation strategy",
        "Results and learning"
      ],
      structure: {
        introduction: "When our company transitioned to a remote-first work environment, I had to adapt my work style and team collaboration approach.",
        body: [
          "Established new communication protocols",
          "Adopted digital collaboration tools",
          "Created virtual team building activities",
          "Developed new productivity routines"
        ],
        conclusion: "The adaptation led to improved work-life balance and increased team productivity in the remote environment."
      },
      tips: [
        "Show flexibility",
        "Emphasize positive attitude",
        "Include measurable results",
        "Demonstrate learning"
      ],
      commonMistakes: [
        "Resisting change",
        "Focusing on negatives",
        "Not showing initiative",
        "Missing team perspective"
      ],
      keywords: [
        "Adaptability",
        "Change Management",
        "Initiative",
        "Remote Work",
        "Collaboration"
      ]
    }
  },
  {
    id: 9,
    category: "Behavioral",
    text: "Describe a situation where you had to resolve a conflict between team members",
    difficulty: "hard",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Conflict situation",
        "Mediation approach",
        "Resolution process",
        "Team impact"
      ],
      structure: {
        introduction: "Two senior developers had different approaches to a critical architecture decision, causing team tension.",
        body: [
          "Organized mediation meeting",
          "Facilitated structured discussion",
          "Found common ground in requirements",
          "Documented agreed solution"
        ],
        conclusion: "The resolution process strengthened team decision-making and established better conflict resolution practices."
      },
      tips: [
        "Stay neutral",
        "Focus on facts",
        "Encourage dialogue",
        "Document agreements"
      ],
      commonMistakes: [
        "Taking sides",
        "Avoiding conflict",
        "Missing root cause",
        "Poor follow-up"
      ],
      keywords: [
        "Conflict Resolution",
        "Mediation",
        "Leadership",
        "Communication",
        "Team Building"
      ]
    }
  },
  {
    id: 10,
    category: "Behavioral",
    text: "Share an example of a time you showed initiative at work",
    difficulty: "medium",
    expectedDuration: "3-4 min",
    sampleAnswer: {
      mainPoints: [
        "Opportunity identification",
        "Action planning",
        "Implementation process",
        "Results achieved"
      ],
      structure: {
        introduction: "I identified an opportunity to improve our team's code review process which was causing deployment delays.",
        body: [
          "Analyzed current process bottlenecks",
          "Researched best practices",
          "Proposed automated review checks",
          "Implemented new workflow"
        ],
        conclusion: "The initiative reduced our code review time by 40% and improved code quality metrics."
      },
      tips: [
        "Show proactivity",
        "Include metrics",
        "Demonstrate leadership",
        "Highlight impact"
      ],
      commonMistakes: [
        "Being too passive",
        "Missing metrics",
        "Not involving others",
        "Poor planning"
      ],
      keywords: [
        "Initiative",
        "Leadership",
        "Process Improvement",
        "Innovation",
        "Results-Driven"
      ]
    }
  }
];
