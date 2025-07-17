"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { generateQuestion, generatePersonalizedFeedback, generateHint } from './utils/gemini';
import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import TopicSelector from "./components/TopicSelector";
import QuestionCard from "./components/QuestionCard";
import FeedbackPanel from "./components/FeedbackPanel";
import HeroAnimation from "./components/HeroAnimation";
import { FaBrain, FaRobot, FaChartLine, FaClock } from "react-icons/fa6";
import ProgressDashboard from "./components/ProgressDashboard";
import LearningPath from "./components/LearningPath";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  timeEstimate: number;
  topic: string;
  skillsTested: string[];
  category?: string;
  subTopic?: string;
}

interface PerformanceMetrics {
  accuracy: number;
  averageTimePerQuestion: number;
  totalQuestionsAttempted: number;
  topicWisePerformance: Record<string, { correct: number; total: number }>;
  skillWisePerformance: Record<string, { score: number; count: number }>;
  streaks: { current: number; best: number };
}

interface PerformanceAnalysis {
  overallScore: string;
  strengths: string[];
  weaknesses: string[];
  recommendedTopics: string[];
  recommendedDifficulty: string;
  detailedFeedback: string;
  suggestedResources?: string[];
  nextSteps?: string[];
}

export default function PersonalizedAptitudePage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    accuracy: 0,
    averageTimePerQuestion: 0,
    totalQuestionsAttempted: 0,
    topicWisePerformance: {},
    skillWisePerformance: {},
    streaks: { current: 0, best: 0 }
  });

  const [userPreferences, setUserPreferences] = useState({
    preferredTopics: [] as string[],
    dailyGoal: 10,
    studyReminders: false,
    difficultyPreference: 'adaptive'
  });

  const [view, setView] = useState<'practice' | 'progress' | 'path'>('practice');
  const [dailyProgress, setDailyProgress] = useState<{
    date: string;
    accuracy: number;
    questionsAttempted: number;
  }[]>([]);
  const [learningStyle, setLearningStyle] = useState({
    visual: 30,
    verbal: 25,
    logical: 25,
    mathematical: 20
  });
  const [achievements, setAchievements] = useState([
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Maintain a streak of 7 days',
      earned: false,
      progress: 3,
      maxProgress: 7
    },
    {
      id: 'speed_demon',
      name: 'Speed Demon',
      description: 'Complete 10 questions under time limit',
      earned: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: 'perfect_score',
      name: 'Perfect Score',
      description: 'Get 100% in any topic',
      earned: false,
      progress: 90,
      maxProgress: 100
    }
  ]);
  const [learningPath, setLearningPath] = useState({
    currentLevel: 2,
    pathProgress: [
      {
        level: 1,
        name: 'Fundamentals',
        description: 'Master the basics',
        completed: true,
        unlocked: true,
        topics: [
          {
            id: 'basic_math',
            name: 'Basic Mathematics',
            status: 'completed' as const,
            score: 95,
            requiredScore: 80
          },
          {
            id: 'logical_basics',
            name: 'Logical Reasoning Basics',
            status: 'completed' as const,
            score: 88,
            requiredScore: 80
          }
        ]
      },
      {
        level: 2,
        name: 'Intermediate',
        description: 'Advanced concepts and applications',
        completed: false,
        unlocked: true,
        topics: [
          {
            id: 'advanced_math',
            name: 'Advanced Mathematics',
            status: 'available' as const,
            score: 45,
            requiredScore: 80
          },
          {
            id: 'data_interpretation',
            name: 'Data Interpretation',
            status: 'available' as const,
            score: 0,
            requiredScore: 80
          }
        ]
      },
      {
        level: 3,
        name: 'Expert',
        description: 'Complex problem solving',
        completed: false,
        unlocked: false,
        topics: [
          {
            id: 'expert_math',
            name: 'Expert Mathematics',
            status: 'locked' as const,
            requiredScore: 90
          }
        ]
      }
    ]
  });

  const handleTopicSelect = async (topic: string) => {
    try {
      // Reset states
      setSelectedTopic(topic);
      setCurrentQuestion(null);
      setSelectedOption(null);
      setShowExplanation(false);
      setFeedback(null);
      setIsLoading(true);

      // Generate question using Gemini AI
      const prompt = `Generate a ${difficulty} level aptitude question for the topic "${topic}" in the following JSON format:
      {
        "question": "The actual question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option",
        "explanation": "Detailed explanation of the solution",
        "skillsTested": ["Skill 1", "Skill 2"],
        "difficulty": "${difficulty}",
        "topic": "${topic}",
        "subtopic": "Relevant subtopic"
      }
      
      Make sure the question is challenging but solvable, with clear and concise language.
      The explanation should be detailed and educational.
      The options should be plausible but only one should be correct.`;

      const response = await generateQuestion(prompt);
      let questionData;
      
      try {
        questionData = JSON.parse(response);
      } catch (error) {
        console.error('Error parsing Gemini response:', error);
        throw new Error('Invalid question format');
      }

      const newQuestion = {
        id: '1',
        ...questionData
      };

      setCurrentQuestion(newQuestion);
    } catch (error) {
      console.error('Error loading question:', error);
      // Show error in UI
      setFeedback('Error loading question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion || showExplanation) return;

    setSelectedOption(answer);
    setShowExplanation(true);
    setIsLoading(true);

    try {
      // Generate personalized feedback using Gemini AI
      const prompt = `Given this question:
      "${currentQuestion.question}"
      
      The user selected: "${answer}"
      The correct answer is: "${currentQuestion.correctAnswer}"
      
      Generate personalized feedback in this format:
      {
        "isCorrect": boolean,
        "feedback": "Encouraging and educational feedback",
        "conceptualExplanation": "Explanation of the core concept",
        "commonMistakes": "If incorrect, explain common mistakes",
        "studyTips": "Personalized tips for improvement"
      }`;

      const response = await generatePersonalizedFeedback(prompt);
      let feedbackData;

      try {
        feedbackData = JSON.parse(response);
      } catch (error) {
        console.error('Error parsing Gemini feedback:', error);
        throw new Error('Invalid feedback format');
      }

      setFeedback(feedbackData.feedback);
    } catch (error) {
      console.error('Error generating feedback:', error);
      setFeedback('Great attempt! Let\'s move on to the next question.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    setShowExplanation(false);
    setSelectedOption(null);
    setIsLoading(true);

    try {
      // Generate next question using Gemini AI
      const prompt = `Generate a ${difficulty} level aptitude question for the topic "${selectedTopic}" in the following JSON format:
      {
        "question": "The actual question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option",
        "explanation": "Detailed explanation of the solution",
        "skillsTested": ["Skill 1", "Skill 2"],
        "difficulty": "${difficulty}",
        "topic": "${selectedTopic}",
        "subtopic": "Relevant subtopic"
      }
      
      Make sure the question is:
      1. Different from the previous question
      2. Challenging but solvable
      3. Clear and concise
      4. Tests similar concepts but in a different way`;

      const response = await generateQuestion(prompt);
      let questionData;
      
      try {
        questionData = JSON.parse(response);
      } catch (error) {
        console.error('Error parsing Gemini response:', error);
        throw new Error('Invalid question format');
      }

      const newQuestion = {
        id: String(parseInt(currentQuestion?.id || '0') + 1),
        ...questionData
      };

      setCurrentQuestion(newQuestion);
    } catch (error) {
      console.error('Error loading next question:', error);
      setFeedback('Error loading question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Main content renderer
  const renderMainContent = () => {
    switch (view) {
      case 'progress':
        return (
          <ProgressDashboard
            performanceMetrics={performanceMetrics}
            dailyProgress={dailyProgress}
            learningStyle={learningStyle}
            achievements={achievements}
          />
        );
      case 'path':
        return (
          <LearningPath
            currentLevel={learningPath.currentLevel}
            pathProgress={learningPath.pathProgress}
            onSelectTopic={(topicId) => {
              const topic = learningPath.pathProgress
                .flatMap(level => level.topics)
                .find(t => t.id === topicId);
              if (topic) {
                setSelectedTopic(topic.name);
                setView('practice');
              }
            }}
          />
        );
      default:
        return (
          <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Content */}
            <div className="flex flex-col items-start text-left space-y-8">
              {!selectedTopic ? (
                <TopicSelector onSelectTopic={handleTopicSelect} />
              ) : (
                <div className="w-full space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#fcba28]">{selectedTopic}</h2>
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="text-gray-400 hover:text-[#fcba28] transition-colors"
                    >
                      Change Topic
                    </button>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fcba28]"></div>
                    </div>
                  ) : currentQuestion ? (
                    <>
                      <QuestionCard
                        question={currentQuestion}
                        selectedOption={selectedOption}
                        onSelectOption={handleAnswer}
                        showExplanation={showExplanation}
                        isCorrect={selectedOption === currentQuestion.correctAnswer}
                      />
                      {showExplanation && (
                        <FeedbackPanel
                          isCorrect={selectedOption === currentQuestion.correctAnswer}
                          explanation={currentQuestion.explanation}
                          onNext={handleNext}
                          feedback={feedback}
                        />
                      )}
                    </>
                  ) : null}
                </div>
              )}
            </div>

            {/* Right Side - Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="sticky top-8 hidden lg:block"
            >
              <HeroAnimation />
              {currentQuestion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-6 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-3xl font-bold text-[#fcba28]">
                      Question {currentQuestion.id}
                    </div>
                    <div className="text-gray-200">
                      {selectedTopic}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden" ref={targetRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
        />
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        />
      </div>

      <div className="relative z-10">
        <MaxWidthWrapper>
          {/* Navigation */}
          <div className="pt-12 pb-8 px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0">
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl font-bold text-[#fcba28]">
                Personalized Aptitude Training
              </h1>
              <p className="text-gray-400 text-lg">
                Master your skills with AI-powered adaptive learning
              </p>
            </div>
            <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-lg rounded-xl p-1.5">
              <Button
                variant="ghost"
                onClick={() => setView('practice')}
                className={`relative px-6 py-2.5 group ${
                  view === 'practice'
                    ? 'text-[#fcba28]'
                    : 'text-gray-400 hover:text-[#fcba28]'
                }`}
              >
                {view === 'practice' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20"
                  />
                )}
                <span className="relative">Practice</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView('progress')}
                className={`relative px-6 py-2.5 group ${
                  view === 'progress'
                    ? 'text-[#fcba28]'
                    : 'text-gray-400 hover:text-[#fcba28]'
                }`}
              >
                {view === 'progress' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20"
                  />
                )}
                <span className="relative">Progress</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView('path')}
                className={`relative px-6 py-2.5 group ${
                  view === 'path'
                    ? 'text-[#fcba28]'
                    : 'text-gray-400 hover:text-[#fcba28]'
                }`}
              >
                {view === 'path' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20"
                  />
                )}
                <span className="relative">Learning Path</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="py-8 px-4 md:px-8">
            {renderMainContent()}
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
