export const commonNumericalQuestions = [
  {
    id: 'common_num_1',
    question: 'A shopkeeper marks his goods at 40% above cost price and allows a discount of 25%. His profit percentage is:',
    options: [
      'a) 5%',
      'b) 15%',
      'c) 10%',
      'd) 20%'
    ],
    correctAnswer: 'a',
    explanation: 'Marked price = 140% of CP\nSelling price after 25% discount = 75% of 140% of CP\n= 105% of CP\nProfit = 5%',
    category: 'Profit and Loss',
    difficulty: 'Medium'
  },
  {
    id: 'common_num_2',
    question: 'The probability of getting a sum of 8 when two dice are thrown is:',
    options: [
      'a) 5/36',
      'b) 1/6',
      'c) 7/36',
      'd) 1/4'
    ],
    correctAnswer: 'a',
    explanation: 'Favorable outcomes: (2,6), (3,5), (4,4), (5,3), (6,2)\nTotal outcomes: 36\nProbability = 5/36',
    category: 'Probability',
    difficulty: 'Easy'
  },
  {
    id: 'common_num_3',
    question: 'A train 200m long is running at 60 km/hr. How long will it take to cross a platform 300m long?',
    options: [
      'a) 30 seconds',
      'b) 25 seconds',
      'c) 20 seconds',
      'd) 15 seconds'
    ],
    correctAnswer: 'a',
    explanation: 'Total distance = 200 + 300 = 500m\nSpeed = 60 km/hr = 16.67 m/s\nTime = Distance/Speed = 500/16.67 = 30 seconds',
    category: 'Time and Distance',
    difficulty: 'Medium'
  },
  {
    id: 'common_num_4',
    question: 'If x% of y is z, then z% of y is:',
    options: [
      'a) x',
      'b) y',
      'c) (xz/100)',
      'd) (x²/100)'
    ],
    correctAnswer: 'c',
    explanation: 'If x% of y = z\n(x/100)y = z\nz% of y = (z/100)y = ((x/100)y × y)/100 = (xz/100)',
    category: 'Percentages',
    difficulty: 'Hard'
  },
  {
    id: 'common_num_5',
    question: 'The area of a rectangle is 48 sq units and its perimeter is 28 units. Find its length.',
    options: [
      'a) 6 units',
      'b) 8 units',
      'c) 10 units',
      'd) 12 units'
    ],
    correctAnswer: 'b',
    explanation: 'Let length = l and breadth = b\nl × b = 48 ... (1)\n2(l + b) = 28\nl + b = 14 ... (2)\nFrom (1): b = 48/l\nSubstituting in (2): l + 48/l = 14\nl² - 14l + 48 = 0\nl = 8 or 6\nSince area is 48, l = 8',
    category: 'Geometry',
    difficulty: 'Medium'
  }
];
