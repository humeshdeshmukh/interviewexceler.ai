export const tcsDataQuestions = [
  {
    id: 'tcs_data_1',
    question: `Study the following bar graph showing the production of cars (in thousands) by different companies in 2020 and 2021.

[Bar graph showing:
Company A: 2020 - 150, 2021 - 180
Company B: 2020 - 200, 2021 - 220
Company C: 2020 - 180, 2021 - 160
Company D: 2020 - 120, 2021 - 200]

What was the percentage increase in production of cars by Company D from 2020 to 2021?`,
    options: [
      'a) 56.67%',
      'b) 66.67%',
      'c) 76.67%',
      'd) 86.67%'
    ],
    correctAnswer: 'b',
    explanation: 'Company D production:\n2020: 120,000\n2021: 200,000\nIncrease = 80,000\nPercentage increase = (80,000/120,000) × 100 = 66.67%',
    category: 'Bar Graph',
    difficulty: 'Medium',
    imageUrl: '/images/aptitude/data/tcs/graph1.png'
  },
  {
    id: 'tcs_data_2',
    question: `The table shows the monthly expenditure of a family on different items.

[Table:
Item       Amount (₹)
Food       12,000
Rent       15,000
Education   8,000
Transport   5,000
Others      6,000]

What percentage of total expenditure is spent on Food and Education combined?`,
    options: [
      'a) 43.48%',
      'b) 45.65%',
      'c) 47.83%',
      'd) 50%'
    ],
    correctAnswer: 'a',
    explanation: 'Total expenditure = 46,000\nFood + Education = 20,000\nPercentage = (20,000/46,000) × 100 = 43.48%',
    category: 'Table',
    difficulty: 'Easy',
    imageUrl: '/images/aptitude/data/tcs/table1.png'
  },
  {
    id: 'tcs_data_3',
    question: `The pie chart shows the distribution of students in different courses in a college.

[Pie chart:
Engineering: 35%
Medicine: 25%
Commerce: 20%
Arts: 15%
Others: 5%]

If the total number of students is 4000, how many students are in Engineering and Medicine combined?`,
    options: [
      'a) 2000',
      'b) 2200',
      'c) 2400',
      'd) 2600'
    ],
    correctAnswer: 'c',
    explanation: 'Engineering = 35% of 4000 = 1400\nMedicine = 25% of 4000 = 1000\nTotal = 1400 + 1000 = 2400 students',
    category: 'Pie Chart',
    difficulty: 'Easy',
    imageUrl: '/images/aptitude/data/tcs/pie1.png'
  },
  {
    id: 'tcs_data_4',
    question: `The line graph shows the profit (in lakhs) of two companies over 5 years.

[Line graph:
Year     Company X    Company Y
2017        50           45
2018        55           60
2019        65           55
2020        60           70
2021        70           65]

In which year was the difference in profit between the two companies maximum?`,
    options: [
      'a) 2018',
      'b) 2019',
      'c) 2020',
      'd) 2021'
    ],
    correctAnswer: 'c',
    explanation: 'Differences:\n2017: 5L\n2018: 5L\n2019: 10L\n2020: 10L\n2021: 5L\nMaximum difference was in 2020',
    category: 'Line Graph',
    difficulty: 'Medium',
    imageUrl: '/images/aptitude/data/tcs/line1.png'
  },
  {
    id: 'tcs_data_5',
    question: `Study the following data about rainfall (in mm) in different cities:

[Table:
City      Jan  Feb  Mar  Apr
Delhi     20   25   15   10
Mumbai    5    8    12   15
Chennai   30   25   20   35
Kolkata   15   20   25   30]

What is the average rainfall in Chennai over these four months?`,
    options: [
      'a) 25 mm',
      'b) 27.5 mm',
      'c) 30 mm',
      'd) 32.5 mm'
    ],
    correctAnswer: 'b',
    explanation: 'Chennai rainfall: 30 + 25 + 20 + 35 = 110\nAverage = 110/4 = 27.5 mm',
    category: 'Table',
    difficulty: 'Easy',
    imageUrl: '/images/aptitude/data/tcs/table2.png'
  }
];
