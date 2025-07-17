export const tcsQuantitativeQuestions = [
  {
    id: 'tcs_q1',
    question: 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?',
    options: [
      'a) 120 meters',
      'b) 150 meters',
      'c) 180 meters',
      'd) 200 meters'
    ],
    correctAnswer: 'b',
    explanation: 'Speed = 60 km/hr = 16.67 m/s\nTime = 9 seconds\nLength = Speed × Time = 16.67 × 9 = 150 meters',
    category: 'Time and Distance',
    difficulty: 'Medium'
  },
  {
    id: 'tcs_q2',
    question: 'If a sum of money doubles itself in 5 years at simple interest, what is the rate of interest?',
    options: [
      'a) 10%',
      'b) 15%',
      'c) 20%',
      'd) 25%'
    ],
    correctAnswer: 'c',
    explanation: 'Using SI formula: SI = (P × R × T)/100\nIf sum doubles, SI = Principal\nP = P × R × 5/100\n1 = R × 5/100\nR = 20%',
    category: 'Simple Interest',
    difficulty: 'Medium'
  },
  {
    id: 'tcs_q3',
    question: 'The average of first 50 natural numbers is:',
    options: [
      'a) 25',
      'b) 25.5',
      'c) 25.30',
      'd) 25.45'
    ],
    correctAnswer: 'b',
    explanation: 'Sum of first n natural numbers = n(n+1)/2\nFor n=50, sum = 50×51/2 = 1275\nAverage = 1275/50 = 25.5',
    category: 'Average',
    difficulty: 'Easy'
  },
  {
    id: 'tcs_q4',
    question: 'A shopkeeper sells an article at 10% profit. If he had bought it at 10% less and sold it for Re 1 less, he would have gained 25%. The cost price of the article is:',
    options: [
      'a) Rs. 20',
      'b) Rs. 25',
      'c) Rs. 40',
      'd) Rs. 50'
    ],
    correctAnswer: 'c',
    explanation: 'Let CP = x\nSP1 = 1.1x (10% profit)\nCP2 = 0.9x (10% less)\nSP2 = 1.1x - 1\nProfit% = (SP2 - CP2)/CP2 × 100 = 25\nSolving this equation gives x = 40',
    category: 'Profit and Loss',
    difficulty: 'Hard'
  },
  {
    id: 'tcs_q5',
    question: 'What is the probability of getting a sum 9 from two throws of a dice?',
    options: [
      'a) 1/6',
      'b) 1/9',
      'c) 1/12',
      'd) 1/8'
    ],
    correctAnswer: 'b',
    explanation: 'Favorable outcomes: (3,6), (4,5), (5,4), (6,3)\nTotal outcomes: 36\nProbability = 4/36 = 1/9',
    category: 'Probability',
    difficulty: 'Medium'
  }
];
