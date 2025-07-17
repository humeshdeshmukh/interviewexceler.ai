export const infosysQuantitativeQuestions = [
  {
    id: 'infosys_q1',
    question: 'In how many different ways can the letters of the word INFOSYS be arranged?',
    options: [
      'a) 5040',
      'b) 2520',
      'c) 1260',
      'd) 630'
    ],
    correctAnswer: 'a',
    explanation: 'Total letters = 7\nRepeating letter: S (2 times)\nArrangements = 7!/(2!) = 5040',
    category: 'Permutation and Combination',
    difficulty: 'Medium'
  },
  {
    id: 'infosys_q2',
    question: 'A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, what fraction of work is left?',
    options: [
      'a) 1/3',
      'b) 8/15',
      'c) 7/15',
      'd) 11/15'
    ],
    correctAnswer: 'b',
    explanation: 'A\'s work per day = 1/15\nB\'s work per day = 1/20\nWork done in 1 day = 7/60\nWork done in 4 days = 7/15\nWork left = 1 - 7/15 = 8/15',
    category: 'Time and Work',
    difficulty: 'Medium'
  },
  {
    id: 'infosys_q3',
    question: 'The compound interest on Rs. 30,000 at 7% per annum for 2 years, compounded annually is:',
    options: [
      'a) Rs. 4,347',
      'b) Rs. 4,375',
      'c) Rs. 4,402',
      'd) Rs. 4,431'
    ],
    correctAnswer: 'b',
    explanation: 'CI = P(1 + r/100)^t - P\n= 30000(1 + 7/100)^2 - 30000\n= 30000(1.1449) - 30000\n= 4,375',
    category: 'Compound Interest',
    difficulty: 'Medium'
  },
  {
    id: 'infosys_q4',
    question: 'A mixture contains milk and water in the ratio 4:1. If 10 liters of water is added, the ratio becomes 4:3. Find the initial quantity of milk.',
    options: [
      'a) 20 liters',
      'b) 24 liters',
      'c) 28 liters',
      'd) 32 liters'
    ],
    correctAnswer: 'a',
    explanation: 'Let initial milk = x liters\nInitial water = x/4 liters\nAfter adding 10L water: x/(x/4 + 10) = 4/3\nSolving gives x = 20',
    category: 'Ratio and Proportion',
    difficulty: 'Hard'
  },
  {
    id: 'infosys_q5',
    question: 'What is the value of √3 + √12 + √27 + √48?',
    options: [
      'a) 10√3',
      'b) 11√3',
      'c) 12√3',
      'd) 13√3'
    ],
    correctAnswer: 'b',
    explanation: '√12 = 2√3\n√27 = 3√3\n√48 = 4√3\nTotal = √3 + 2√3 + 3√3 + 4√3 = 11√3',
    category: 'Simplification',
    difficulty: 'Hard'
  }
];
