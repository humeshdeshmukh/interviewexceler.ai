export const accentureNumericalQuestions = [
  {
    id: 'accenture_num_1',
    question: 'A sum of money becomes Rs. 13,380 after 3 years and Rs. 14,580 after 4 years at simple interest. What is the principal?',
    options: [
      'a) Rs. 10,000',
      'b) Rs. 10,500',
      'c) Rs. 11,000',
      'd) Rs. 11,500'
    ],
    correctAnswer: 'c',
    explanation: 'Let P be principal and R be rate\nP(1 + 3R/100) = 13380\nP(1 + 4R/100) = 14580\nSolving these equations:\nPR/100 = 1200\nP = 11000',
    category: 'Simple Interest',
    difficulty: 'Hard'
  },
  {
    id: 'accenture_num_2',
    question: 'What is the HCF of 336 and 54?',
    options: [
      'a) 6',
      'b) 12',
      'c) 18',
      'd) 24'
    ],
    correctAnswer: 'a',
    explanation: '336 = 2⁴ × 3 × 7\n54 = 2 × 3³\nHCF = 2 × 3 = 6',
    category: 'HCF and LCM',
    difficulty: 'Medium'
  },
  {
    id: 'accenture_num_3',
    question: 'If 3x + 4y = 25 and 5x + 2y = 23, find the value of x + y.',
    options: [
      'a) 7',
      'b) 8',
      'c) 9',
      'd) 10'
    ],
    correctAnswer: 'a',
    explanation: 'Solving equations:\n3x + 4y = 25 ... (1)\n5x + 2y = 23 ... (2)\nMultiply (1) by 5 and (2) by 3:\n15x + 20y = 125\n15x + 6y = 69\nSubtracting: 14y = 56\ny = 4\nSubstituting in (1): 3x + 16 = 25\nx = 3\nx + y = 7',
    category: 'Linear Equations',
    difficulty: 'Medium'
  },
  {
    id: 'accenture_num_4',
    question: 'A circular track has a circumference of 800m. Two persons start walking simultaneously from the same point in the same direction at speeds of 2m/s and 3m/s. After how many seconds will they meet again at the starting point?',
    options: [
      'a) 800',
      'b) 600',
      'c) 400',
      'd) 500'
    ],
    correctAnswer: 'a',
    explanation: 'Relative speed = 3 - 2 = 1 m/s\nDistance to cover = 800m\nTime = Distance/Speed = 800/1 = 800 seconds',
    category: 'Time and Distance',
    difficulty: 'Easy'
  },
  {
    id: 'accenture_num_5',
    question: 'If cos θ = 3/5, then the value of (1 + tan² θ) is:',
    options: [
      'a) 25/9',
      'b) 9/25',
      'c) 25/16',
      'd) 16/25'
    ],
    correctAnswer: 'a',
    explanation: 'If cos θ = 3/5\nsin θ = 4/5 (using Pythagorean identity)\ntan θ = sin θ/cos θ = 4/3\n1 + tan² θ = 1 + 16/9 = 25/9',
    category: 'Trigonometry',
    difficulty: 'Hard'
  }
];
