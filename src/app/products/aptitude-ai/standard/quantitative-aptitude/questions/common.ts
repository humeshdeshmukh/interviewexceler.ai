export const commonQuantitativeQuestions = [
  {
    id: 'common_q1',
    question: 'Find the odd one out: 2, 5, 10, 17, 26, 37, 50',
    options: [
      'a) 17',
      'b) 26',
      'c) 37',
      'd) 50'
    ],
    correctAnswer: 'd',
    explanation: 'The pattern is +3, +5, +7, +9, +11, +13\n50 breaks this pattern as it should be 51',
    category: 'Number Series',
    difficulty: 'Medium'
  },
  {
    id: 'common_q2',
    question: 'If log₁₀2 = 0.3010 and log₁₀3 = 0.4771, then find log₁₀6.',
    options: [
      'a) 0.7781',
      'b) 0.7782',
      'c) 0.7783',
      'd) 0.7784'
    ],
    correctAnswer: 'a',
    explanation: 'log₁₀6 = log₁₀(2×3)\n= log₁₀2 + log₁₀3\n= 0.3010 + 0.4771\n= 0.7781',
    category: 'Logarithms',
    difficulty: 'Medium'
  },
  {
    id: 'common_q3',
    question: 'The mean of 100 observations is 40. If one observation 40 is wrongly taken as 50, then the correct mean is:',
    options: [
      'a) 39.9',
      'b) 40.1',
      'c) 39.8',
      'd) 40.2'
    ],
    correctAnswer: 'a',
    explanation: 'Original sum = 40 × 100 = 4000\nWrong sum = 4000 + 10 = 4010\nCorrect sum = 4010 - 10 = 3990\nCorrect mean = 3990/100 = 39.9',
    category: 'Average',
    difficulty: 'Easy'
  },
  {
    id: 'common_q4',
    question: 'A square paper is folded twice and a circle of radius 7 cm is drawn. When the paper is unfolded, what will be the area of the smaller figure formed?',
    options: [
      'a) 38.5 sq cm',
      'b) 77 sq cm',
      'c) 154 sq cm',
      'd) 308 sq cm'
    ],
    correctAnswer: 'a',
    explanation: 'Area of circle = πr²\n= 22/7 × 7 × 7\n= 154 sq cm\nPaper folded twice means circle appears 4 times\nSmaller figure area = 154/4 = 38.5 sq cm',
    category: 'Geometry',
    difficulty: 'Hard'
  },
  {
    id: 'common_q5',
    question: 'The difference between simple interest and compound interest on a sum of money for 2 years at 10% per annum is Rs. 25. The sum is:',
    options: [
      'a) Rs. 2,500',
      'b) Rs. 2,000',
      'c) Rs. 2,400',
      'd) Rs. 2,600'
    ],
    correctAnswer: 'a',
    explanation: 'Let principal be P\nCI = P(1 + 10/100)² - P\nSI = P × 10/100 × 2\nCI - SI = 25\nP[(1.1)² - 1 - 0.2] = 25\nP × 0.01 = 25\nP = 2,500',
    category: 'Interest',
    difficulty: 'Hard'
  }
];
