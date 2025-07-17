import { Question } from "./types";

export const securityQuestions: Question[] = [
  {
    id: 1,
    category: "Security",
    text: "Explain common web security vulnerabilities and how to prevent them",
    difficulty: "hard",
    expectedDuration: "5-6 min",
    sampleAnswer: {
      mainPoints: [
        "Common vulnerabilities",
        "Prevention techniques",
        "Security best practices",
        "Implementation examples"
      ],
      structure: {
        introduction: "Web security vulnerabilities can significantly impact applications, so it's crucial to understand and prevent common attack vectors.",
        body: [
          "XSS: Sanitize input, use CSP headers",
          "CSRF: Implement tokens, SameSite cookies",
          "SQL Injection: Use parameterized queries",
          "Authentication: Implement proper session management"
        ],
        conclusion: "Security should be considered at every stage of development with regular security audits and updates."
      },
      tips: [
        "Provide real examples",
        "Discuss defense in depth",
        "Mention security headers",
        "Cover authentication best practices"
      ],
      commonMistakes: [
        "Overlooking input validation",
        "Weak password policies",
        "Insecure session management",
        "Missing security headers"
      ],
      keywords: [
        "XSS",
        "CSRF",
        "SQL Injection",
        "Authentication",
        "Security Headers"
      ]
    }
  },
  {
    id: 2,
    category: "Security",
    text: "How do you implement secure authentication in a web application?",
    difficulty: "medium",
    expectedDuration: "4-5 min",
    sampleAnswer: {
      mainPoints: [
        "Authentication methods",
        "Password security",
        "Session management",
        "OAuth implementation"
      ],
      structure: {
        introduction: "Secure authentication requires multiple layers of security and proper implementation of industry standards.",
        body: [
          "Use secure password hashing (bcrypt/Argon2)",
          "Implement MFA where possible",
          "Secure session management with JWT",
          "Consider OAuth for third-party auth"
        ],
        conclusion: "A robust authentication system combines multiple security measures while maintaining good user experience."
      },
      tips: [
        "Discuss password policies",
        "Explain token security",
        "Cover session management",
        "Address common attacks"
      ],
      commonMistakes: [
        "Plain text passwords",
        "Weak session management",
        "Missing rate limiting",
        "Insecure token storage"
      ],
      keywords: [
        "Authentication",
        "Password Hashing",
        "JWT",
        "OAuth",
        "Security"
      ]
    }
  }
];
