import {
    Brain,
    Calculator,
    ChartBar,
    Puzzle,
    Sigma,
    Lightbulb,
} from 'lucide-react';

export const topics = {
    numerical: {
        title: 'Numerical Ability',
        icon: Calculator,
        color: 'bg-blue-500/10 text-blue-400',
        description: 'Master mathematical concepts and problem-solving techniques',
    },
    logical: {
        title: 'Logical Reasoning',
        icon: Brain,
        color: 'bg-purple-500/10 text-purple-400',
        description: 'Enhance your analytical and critical thinking skills',
    },
    verbal: {
        title: 'Verbal Ability',
        icon: Lightbulb,
        color: 'bg-yellow-500/10 text-yellow-400',
        description: 'Improve your language and communication skills',
    },
    'data-interpretation': {
        title: 'Data Interpretation',
        icon: ChartBar,
        color: 'bg-green-500/10 text-green-400',
        description: 'Learn to analyze and interpret complex data sets',
    },
    quantitative: {
        title: 'Quantitative Aptitude',
        icon: Sigma,
        color: 'bg-red-500/10 text-red-400',
        description: 'Practice advanced mathematical problem solving',
    },
    puzzles: {
        title: 'Puzzles',
        icon: Puzzle,
        color: 'bg-orange-500/10 text-orange-400',
        description: 'Solve challenging puzzles and brain teasers',
    },
};

export const mockQuestions = [
    {
        id: 1,
        title: 'Time and Work',
        difficulty: 'Easy',
        timeLimit: '5 min',
        questions: 5,
        completed: true,
        score: 80,
    },
    {
        id: 2,
        title: 'Profit and Loss',
        difficulty: 'Medium',
        timeLimit: '8 min',
        questions: 8,
        completed: true,
        score: 75,
    },
    {
        id: 3,
        title: 'Simple Interest',
        difficulty: 'Medium',
        timeLimit: '6 min',
        questions: 6,
        completed: false,
    },
    {
        id: 4,
        title: 'Compound Interest',
        difficulty: 'Hard',
        timeLimit: '10 min',
        questions: 10,
        completed: false,
    },
];
