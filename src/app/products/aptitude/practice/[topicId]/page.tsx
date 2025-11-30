'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Brain, 
  Calculator, 
  ChartBar, 
  Puzzle, 
  Sigma, 
  Lightbulb,
  ArrowRight,
  Clock,
  CheckCircle,
  Home,
  RefreshCw 
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

// Expanded Mock Questions Database
const topicQuestions = {
  'numerical': [
    {
      id: 1,
      question: 'If 5x + 3 = 28, what is the value of x?',
      options: ['4', '5', '6', '7'],
      correctAnswer: '5'
    },
    {
      id: 2,
      question: 'What is 15% of 200?',
      options: ['20', '25', '30', '35'],
      correctAnswer: '30'
    },
    {
      id: 3,
      question: 'If a number is increased by 20%, it becomes 72. What was the original number?',
      options: ['50', '55', '60', '65'],
      correctAnswer: '60'
    },
    {
      id: 4,
      question: 'What is the average of 10, 20, 30, and 40?',
      options: ['20', '25', '30', '35'],
      correctAnswer: '25'
    },
    {
      id: 5,
      question: 'If 3x = 36, what is the value of x?',
      options: ['10', '12', '14', '16'],
      correctAnswer: '12'
    }
  ],
  'logical': [
    {
      id: 1,
      question: 'If all cats are mammals and some mammals are pets, what can be concluded?',
      options: [
        'All cats are pets', 
        'Some cats are pets', 
        'No cats are pets', 
        'Cannot be determined'
      ],
      correctAnswer: 'Some cats are pets'
    },
    {
      id: 2,
      question: 'A is taller than B. B is taller than C. Which statement is true?',
      options: [
        'A is shorter than C', 
        'A is taller than C', 
        'B is the tallest', 
        'Cannot be determined'
      ],
      correctAnswer: 'A is taller than C'
    },
    {
      id: 3,
      question: 'If all roses are flowers and some flowers fade, what can be concluded?',
      options: [
        'All roses fade', 
        'Some roses fade', 
        'No roses fade', 
        'Cannot be determined'
      ],
      correctAnswer: 'Some roses fade'
    },
    {
      id: 4,
      question: 'Which word does NOT belong with the others?',
      options: ['Read', 'Write', 'Speak', 'Jump'],
      correctAnswer: 'Jump'
    },
    {
      id: 5,
      question: 'If all programmers are logical and John is a programmer, what can be concluded?',
      options: [
        'John is not logical', 
        'John is logical', 
        'Some programmers are not logical', 
        'Cannot be determined'
      ],
      correctAnswer: 'John is logical'
    }
  ],
  'verbal': [
    {
      id: 1,
      question: 'Choose the synonym of "Eloquent"',
      options: ['Quiet', 'Articulate', 'Shy', 'Confused'],
      correctAnswer: 'Articulate'
    },
    {
      id: 2,
      question: 'Which word is the opposite of "Generous"?',
      options: ['Kind', 'Stingy', 'Helpful', 'Caring'],
      correctAnswer: 'Stingy'
    },
    {
      id: 3,
      question: 'Complete the sentence: "She was ______ about her recent achievement."',
      options: ['Modest', 'Boastful', 'Shy', 'Quiet'],
      correctAnswer: 'Boastful'
    },
    {
      id: 4,
      question: 'Identify the correctly spelled word:',
      options: ['Recieve', 'Receive', 'Recive', 'Receeve'],
      correctAnswer: 'Receive'
    },
    {
      id: 5,
      question: 'What is the plural of "Criterion"?',
      options: ['Criterions', 'Criteria', 'Criterias', 'Criterium'],
      correctAnswer: 'Criteria'
    }
  ],
  'data-interpretation': [
    {
      id: 1,
      question: 'From a bar graph showing sales, which month had the highest sales?',
      options: ['January', 'February', 'March', 'April'],
      correctAnswer: 'March'
    },
    {
      id: 2,
      question: 'If a pie chart shows 25% of a budget is spent on rent, what fraction is this?',
      options: ['1/2', '1/4', '1/3', '1/5'],
      correctAnswer: '1/4'
    },
    {
      id: 3,
      question: 'A line graph shows temperature changes. What is the trend?',
      options: ['Increasing', 'Decreasing', 'Stable', 'Fluctuating'],
      correctAnswer: 'Increasing'
    },
    {
      id: 4,
      question: 'What percentage does 15 represent in a pie chart?',
      options: ['10%', '15%', '20%', '25%'],
      correctAnswer: '15%'
    },
    {
      id: 5,
      question: 'In a scatter plot, what does a positive correlation indicate?',
      options: [
        'Variables move in opposite directions', 
        'No relationship between variables', 
        'Variables move in same direction', 
        'One variable is constant'
      ],
      correctAnswer: 'Variables move in same direction'
    }
  ],
  'quantitative': [
    {
      id: 1,
      question: 'Solve: 3² + 4² = ?',
      options: ['25', '9', '16', '49'],
      correctAnswer: '25'
    },
    {
      id: 2,
      question: 'What is the square root of 144?',
      options: ['10', '12', '14', '16'],
      correctAnswer: '12'
    },
    {
      id: 3,
      question: 'If x + y = 10 and x - y = 4, what is the value of x?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '7'
    },
    {
      id: 4,
      question: 'What is 2/3 of 90?',
      options: ['50', '55', '60', '65'],
      correctAnswer: '60'
    },
    {
      id: 5,
      question: 'Simplify: (3 × 4) + (6 ÷ 2)',
      options: ['14', '15', '16', '17'],
      correctAnswer: '14'
    }
  ],
  'puzzles': [
    {
      id: 1,
      question: 'If you have 3 apples and double them 4 times, how many apples do you have?',
      options: ['24', '48', '96', '192'],
      correctAnswer: '48'
    },
    {
      id: 2,
      question: 'A bat and a ball cost $1.10. The bat costs $1 more than the ball. How much does the ball cost?',
      options: ['$0.05', '$0.10', '$0.15', '$0.20'],
      correctAnswer: '$0.05'
    },
    {
      id: 3,
      question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
      options: ['5 minutes', '10 minutes', '15 minutes', '20 minutes'],
      correctAnswer: '5 minutes'
    },
    {
      id: 4,
      question: 'You are in a dark room with a candle, a wood stove, and a gas lamp. You only have one match. What do you light first?',
      options: ['Candle', 'Wood Stove', 'Gas Lamp', 'The Match'],
      correctAnswer: 'The Match'
    },
    {
      id: 5,
      question: 'A farmer has 17 sheep, and all but 9 die. How many sheep are left?',
      options: ['8', '9', '17', '0'],
      correctAnswer: '9'
    }
  ]
};

const topicIcons = {
  'numerical': Calculator,
  'logical': Brain,
  'verbal': Lightbulb,
  'data-interpretation': ChartBar,
  'quantitative': Sigma,
  'puzzles': Puzzle
};

const topicColors = {
  'numerical': 'bg-blue-500/10 text-blue-400',
  'logical': 'bg-purple-500/10 text-purple-400',
  'verbal': 'bg-yellow-500/10 text-yellow-400',
  'data-interpretation': 'bg-green-500/10 text-green-400',
  'quantitative': 'bg-red-500/10 text-red-400',
  'puzzles': 'bg-orange-500/10 text-orange-400'
};

export default function TopicPracticePage() {
  const router = useRouter();
  const params = useParams();
  const topicId = params.topicId as string;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * topicQuestions[topicId].length); // 30 seconds per question

  const questions = topicQuestions[topicId] || [];
  const Icon = topicIcons[topicId] || Brain;
  const color = topicColors[topicId] || 'bg-blue-500/10 text-blue-400';

  // Timer Logic
  useEffect(() => {
    if (!showResult && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      // Auto-submit if time runs out
      if (timeRemaining === 0) {
        setShowResult(true);
      }

      return () => clearInterval(timer);
    }
  }, [timeRemaining, showResult]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background flex items-center justify-center"
      >
        <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 max-w-md w-full">
          <CheckCircle className="mx-auto w-24 h-24 text-green-500 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Practice Complete!</h2>
          <p className="text-xl mb-6">
            Your Score: {score} / {questions.length}
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/products/aptitude"
              className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 flex items-center"
            >
              <Home className="mr-2 w-5 h-5" /> Back to Topics
            </Link>
            <button 
              onClick={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setShowResult(false);
                setSelectedAnswer(null);
                setTimeRemaining(30 * questions.length);
              }}
              className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcba28]/90 flex items-center"
            >
              <RefreshCw className="mr-2 w-5 h-5" /> Retry
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className={`p-4 rounded-xl ${color} mr-4`}>
              <Icon className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold">{topicId.replace('-', ' ').toUpperCase()} Practice</h1>
          </div>
          <Link 
            href="/products/aptitude"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            title="Back to Topics"
          >
            <Home className="w-6 h-6" />
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#fcba28]" />
              <span>Time: {formatTime(timeRemaining)}</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerSelect(option)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedAnswer === option 
                    ? 'border-[#fcba28] bg-[#fcba28]/10' 
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className={`w-full py-3 rounded-xl flex items-center justify-center ${
            selectedAnswer 
              ? 'bg-[#fcba28] text-black hover:bg-[#fcba28]/90' 
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          Next Question
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
