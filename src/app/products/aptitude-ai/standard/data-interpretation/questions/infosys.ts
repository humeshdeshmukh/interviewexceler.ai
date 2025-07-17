export const infosysDataQuestions = [
  {
    id: 'infosys_data_1',
    question: `The pie chart shows the distribution of a company's expenses.

[Pie chart:
Salaries: 40%
Raw Materials: 25%
Marketing: 15%
R&D: 12%
Others: 8%]

If the total expenses are ₹50 lakhs, what is the difference between Salaries and Marketing expenses?`,
    options: [
      'a) ₹10.5 lakhs',
      'b) ₹12.5 lakhs',
      'c) ₹15.5 lakhs',
      'd) ₹17.5 lakhs'
    ],
    correctAnswer: 'b',
    explanation: 'Salaries = 40% of 50L = 20L\nMarketing = 15% of 50L = 7.5L\nDifference = 20L - 7.5L = 12.5L',
    category: 'Pie Chart',
    difficulty: 'Easy',
    imageUrl: '/images/aptitude/data/infosys/pie1.png'
  },
  {
    id: 'infosys_data_2',
    question: `Study the line graph showing the number of units sold by a company over 6 months.

[Line graph:
Month     Units (thousands)
Jan         50
Feb         45
Mar         60
Apr         55
May         65
Jun         70]

What is the percentage increase in sales from January to June?`,
    options: [
      'a) 30%',
      'b) 35%',
      'c) 40%',
      'd) 45%'
    ],
    correctAnswer: 'c',
    explanation: 'January sales: 50,000\nJune sales: 70,000\nIncrease = 20,000\nPercentage increase = (20,000/50,000) × 100 = 40%',
    category: 'Line Graph',
    difficulty: 'Medium',
    imageUrl: '/images/aptitude/data/infosys/line1.png'
  },
  {
    id: 'infosys_data_3',
    question: `The table shows the marks obtained by students in different subjects.

[Table:
Subject    Pass%  Distinction%
Math        75      15
Science     80      20
English     85      10
History     70      25]

What is the ratio of students who got distinction in Math to those who got distinction in History?`,
    options: [
      'a) 3:5',
      'b) 5:3',
      'c) 2:3',
      'd) 3:2'
    ],
    correctAnswer: 'a',
    explanation: 'Math distinction = 15%\nHistory distinction = 25%\nRatio = 15:25 = 3:5',
    category: 'Table',
    difficulty: 'Medium',
    imageUrl: '/images/aptitude/data/infosys/table1.png'
  },
  {
    id: 'infosys_data_4',
    question: `The bar graph shows the production of wheat (in tons) in different states.

[Bar graph:
State A: 500
State B: 750
State C: 600
State D: 450
State E: 700]

What is the average production of wheat across all states?`,
    options: [
      'a) 580 tons',
      'b) 600 tons',
      'c) 620 tons',
      'd) 640 tons'
    ],
    correctAnswer: 'b',
    explanation: 'Total production = 500 + 750 + 600 + 450 + 700 = 3000\nNumber of states = 5\nAverage = 3000/5 = 600 tons',
    category: 'Bar Graph',
    difficulty: 'Easy',
    imageUrl: '/images/aptitude/data/infosys/bar1.png'
  },
  {
    id: 'infosys_data_5',
    question: `Study the compound bar chart showing imports and exports (in million $) of a country.

[Compound bar chart:
Year    Imports    Exports
2019     200        150
2020     180        200
2021     220        180
2022     250        220]

In which year was the trade deficit (Imports - Exports) maximum?`,
    options: [
      'a) 2019',
      'b) 2020',
      'c) 2021',
      'd) 2022'
    ],
    correctAnswer: 'a',
    explanation: 'Trade deficit:\n2019: 200-150 = 50\n2020: 180-200 = -20\n2021: 220-180 = 40\n2022: 250-220 = 30\nMaximum deficit was in 2019',
    category: 'Bar Graph',
    difficulty: 'Hard',
    imageUrl: '/images/aptitude/data/infosys/bar2.png'
  }
];
