export const wiproDataQuestions = [
  {
    id: 'wipro_data_1',
    question: `Study the following table showing the percentage profit earned by two companies over years.

[Table:
Year    Company A    Company B
2018      15%         18%
2019      20%         16%
2020      18%         22%
2021      25%         20%]

In which year was the combined percentage profit maximum?`,
    options: [
      'a) 2018',
      'b) 2019',
      'c) 2020',
      'd) 2021'
    ],
    correctAnswer: 'd',
    explanation: 'Combined profit:\n2018: 33%\n2019: 36%\n2020: 40%\n2021: 45%\nMaximum in 2021',
    category: 'Table',
    difficulty: 'Medium',
    imageUrl: '/images/aptitude/data/wipro/table1.png'
  },
  {
    id: 'wipro_data_2',
    question: `The pie chart shows the distribution of employees in different departments.

[Pie chart:
IT: 30%
HR: 15%
Finance: 20%
Operations: 25%
Others: 10%]

If there are 400 employees in total, how many more employees are there in IT compared to HR?`,
    options: [
      'a) 50',
      'b) 60',
      'c) 70',
      'd) 80'
    ],
    correctAnswer: 'b',
    explanation: 'IT employees = 30% of 400 = 120\nHR employees = 15% of 400 = 60\nDifference = 120 - 60 = 60',
    category: 'Pie Chart',
    difficulty: 'Easy',
    imageUrl: '/images/aptitude/data/wipro/pie1.png'
  },
  {
    id: 'wipro_data_3',
    question: `The line graph shows the temperature (in °C) of two cities over a week.

[Line graph:
Day       City X    City Y
Monday     25        28
Tuesday    27        26
Wednesday  24        25
Thursday   26        27
Friday     28        24
Saturday   25        26
Sunday     27        28]

On how many days was the temperature of City X higher than City Y?`,
    options: [
      'a) 2',
      'b) 3',
      'c) 4',
      'd) 5'
    ],
    correctAnswer: 'b',
    explanation: 'City X was higher on:\nTuesday (27>26)\nFriday (28>24)\nSunday (27>26)\nTotal = 3 days',
    category: 'Line Graph',
    difficulty: 'Medium',
    imageUrl: '/images/aptitude/data/wipro/line1.png'
  },
  {
    id: 'wipro_data_4',
    question: `Study the bar graph showing the number of students who passed and failed in different subjects.

[Bar graph:
Subject    Passed    Failed
Math        80        20
Science     75        25
English     85        15
History     70        30]

What is the overall pass percentage across all subjects?`,
    options: [
      'a) 75%',
      'b) 77.5%',
      'c) 80%',
      'd) 82.5%'
    ],
    correctAnswer: 'b',
    explanation: 'Total passed = 310\nTotal students = 400\nPass percentage = (310/400) × 100 = 77.5%',
    category: 'Bar Graph',
    difficulty: 'Medium',
    imageUrl: '/images/aptitude/data/wipro/bar1.png'
  },
  {
    id: 'wipro_data_5',
    question: `The table shows the sales of different products in two quarters.

[Table:
Product    Q1    Q2    
A         100   120
B         150   130
C         120   140
D         130   110]

Which product showed the highest percentage increase from Q1 to Q2?`,
    options: [
      'a) Product A',
      'b) Product B',
      'c) Product C',
      'd) Product D'
    ],
    correctAnswer: 'c',
    explanation: 'Percentage increase:\nA: 20%\nB: -13.33%\nC: 16.67%\nD: -15.38%\nProduct C showed highest increase',
    category: 'Table',
    difficulty: 'Hard',
    imageUrl: '/images/aptitude/data/wipro/table2.png'
  }
];
