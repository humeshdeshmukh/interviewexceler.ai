export const commonLogicalQuestions = [
  {
    id: 'common_log_1',
    question: 'If in a certain language, MADRAS is coded as NBESBT, how is BOMBAY coded in that language?',
    options: [
      'a) CPNCBX',
      'b) CPNCBZ',
      'c) CPOCBZ',
      'd) CQOCBZ'
    ],
    correctAnswer: 'b',
    explanation: 'Pattern: Each letter is replaced by next letter\nM → N, A → B, D → E, R → S, A → B, S → T\nTherefore:\nB → C, O → P, M → N, B → C, A → B, Y → Z',
    category: 'Coding-Decoding',
    difficulty: 'Easy'
  },
  {
    id: 'common_log_2',
    question: 'A man said to a lady, "Your mother\'s husband\'s sister is my aunt." How is the lady related to the man?',
    options: [
      'a) Daughter',
      'b) Cousin',
      'c) Mother',
      'd) Sister'
    ],
    correctAnswer: 'b',
    explanation: 'Lady\'s mother\'s husband = Lady\'s father\nLady\'s father\'s sister = Man\'s aunt\nTherefore, the lady is man\'s cousin',
    category: 'Blood Relations',
    difficulty: 'Medium'
  },
  {
    id: 'common_log_3',
    question: 'Statement: All mangoes are fruits. Some fruits are sweet.\nConclusions:\nI. Some mangoes are sweet.\nII. All fruits are mangoes.',
    options: [
      'a) Only I follows',
      'b) Only II follows',
      'c) Both follow',
      'd) Neither follows'
    ],
    correctAnswer: 'd',
    explanation: 'All mangoes are fruits (given)\nSome fruits are sweet (given)\nWe cannot conclude some mangoes are sweet\nWe cannot conclude all fruits are mangoes',
    category: 'Syllogisms',
    difficulty: 'Medium'
  },
  {
    id: 'common_log_4',
    question: 'Find the missing number: 7, 12, 19, 28, 39, ?',
    options: [
      'a) 52',
      'b) 51',
      'c) 50',
      'd) 49'
    ],
    correctAnswer: 'a',
    explanation: 'Pattern: Add consecutive numbers starting from 5\n7 + 5 = 12\n12 + 7 = 19\n19 + 9 = 28\n28 + 11 = 39\n39 + 13 = 52',
    category: 'Number Series',
    difficulty: 'Easy'
  },
  {
    id: 'common_log_5',
    question: 'Six persons A, B, C, D, E and F are standing in a circle. B is between F and C, A is between E and D, F is to the right of D. Who is between A and B?',
    options: [
      'a) F',
      'b) E',
      'c) C',
      'd) D'
    ],
    correctAnswer: 'a',
    explanation: 'Following the conditions:\nB is between F and C\nA is between E and D\nF is to right of D\nArrangement: A-E-B-C-D-F\nTherefore, F is between A and B',
    category: 'Circular Arrangement',
    difficulty: 'Hard'
  }
];
