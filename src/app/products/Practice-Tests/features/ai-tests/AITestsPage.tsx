'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, FaCode, FaLightbulb, FaArrowLeft, FaClock, 
  FaList, FaBrain, FaCheckCircle, FaTimesCircle, FaRocket 
} from 'react-icons/fa';
import AITestForm from './components/AITestForm';
import CodeEditor from './components/CodeEditor';
import { generateTest } from './services/gemini';
import type { TestFormData } from './services/gemini';

const BackgroundGradient = () => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden">
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
    </motion.div>
  );
};

const GridPattern = () => {
  return (
    <motion.div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#fcba2815,transparent)]" />
    </motion.div>
  );
};

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-[#fcba28]/20 backdrop-blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-lg border border-[#fcba28]/20 backdrop-blur-3xl rotate-12"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-1/3 left-1/3 w-32 h-32 rounded-lg border border-[#fcba28]/20 backdrop-blur-3xl -rotate-45"
      />
    </div>
  );
};

interface TestPerformance {
  correctAnswers: number;
  totalQuestions: number;
  topics: Record<string, number>;
}

export default function AITestsPage() {
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [formState, setFormState] = useState<TestFormData | null>(null);
  const [performance, setPerformance] = useState<TestPerformance>({
    correctAnswers: 0,
    totalQuestions: 0,
    topics: {}
  });

  const handleFormSubmit = (formData: TestFormData) => {
    // Just store the form data without generating test
    setFormState(formData);
    setShowForm(false);
  };

  const handleGenerateTest = async () => {
    if (!formState || isGenerating) return;
    setIsGenerating(true);
    setLoading(true);
    
    try {
      const test = await generateTest(formState);
      if (!test || !test.questions || test.questions.length === 0) {
        throw new Error('No test questions were generated');
      }
      
      setGeneratedTest(test);
      setSelectedAnswers({});
      setShowFeedback({});
      setTestSubmitted(false);
      setTimeRemaining(null);
      setIsTestStarted(false);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate test';
      alert(`Error: ${errorMessage}. Please try again.`);
      setShowForm(true);
      setFormState(null);
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const handleStartTest = () => {
    if (!generatedTest || !generatedTest.questions || generatedTest.questions.length === 0) {
      alert('No test questions available. Please generate a new test.');
      handleBackToForm();
      return;
    }
    
    if (isTestStarted) return;
    setIsTestStarted(true);
    setTimeRemaining(generatedTest.metadata.timeLimit * 60);
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setGeneratedTest(null);
    setSelectedAnswers({});
    setShowFeedback({});
    setTestSubmitted(false);
    setTimeRemaining(null);
    setIsTestStarted(false);
    setFormState(null);
    setIsGenerating(false);
  };

  // Timer only starts after user clicks start
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeRemaining !== null && timeRemaining > 0 && !testSubmitted && isTestStarted) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining, testSubmitted, isTestStarted]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTestSubmit = () => {
    setTestSubmitted(true);
    const allFeedback: Record<string, boolean> = {};
    generatedTest.questions.forEach((q: any) => {
      allFeedback[q.id] = true;
    });
    setShowFeedback(allFeedback);
  };

  const handleAnswerSelect = (questionId: string, answer: string, topic: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    const question = generatedTest.questions.find((q: any) => q.id === questionId);
    if (question) {
      const isCorrect = answer === question.correctAnswer;
      setPerformance(prev => {
        const topicPerformance = prev.topics[topic] || 0;
        const topicQuestions = generatedTest.questions.filter((q: any) => q.topic === topic).length;
        
        return {
          correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
          totalQuestions: prev.totalQuestions + 1,
          topics: {
            ...prev.topics,
            [topic]: (topicPerformance * (topicQuestions - 1) + (isCorrect ? 1 : 0)) / topicQuestions
          }
        };
      });
    }
  };

  const handleCodeResult = (questionId: string, passed: boolean, topic: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: passed ? 'correct' : 'incorrect' }));
    setShowFeedback(prev => ({ ...prev, [questionId]: true }));
    
    setPerformance(prev => {
      const topicPerformance = prev.topics[topic] || 0;
      const topicQuestions = generatedTest.questions.filter((q: any) => q.topic === topic).length;
      
      return {
        correctAnswers: passed ? prev.correctAnswers + 1 : prev.correctAnswers,
        totalQuestions: prev.totalQuestions + 1,
        topics: {
          ...prev.topics,
          [topic]: (topicPerformance * (topicQuestions - 1) + (passed ? 1 : 0)) / topicQuestions
        }
      };
    });
  };

  const toggleFeedback = (questionId: string) => {
    setShowFeedback(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <BackgroundGradient />
      <GridPattern />
      <FloatingShapes />

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-[#fcba28]/10 to-[#fcd978]/10 backdrop-blur-sm mb-6">
              <FaRobot className="w-12 h-12 text-[#fcba28]" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-[#fcba28]">AI Interview Test Generator</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Generate customized technical interview tests powered by AI. Practice with real-world questions and get instant feedback.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-4xl mx-auto"
              >
                <AITestForm 
                  onSubmit={handleFormSubmit}
                  loading={loading}
                  previousPerformance={performance.totalQuestions > 0 ? performance : undefined}
                />
              </motion.div>
            ) : !generatedTest ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto text-center space-y-8"
              >
                <div className="p-8 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white mb-4">Ready to Generate Your Test?</h2>
                  {formState ? (
                    <>
                      <div className="space-y-4 text-left mb-8">
                        <h3 className="text-[#fcba28] font-medium">Test Configuration:</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Topics: {formState.topics.join(', ')}</li>
                          <li>• Difficulty: {formState.difficulty}</li>
                          <li>• Questions: {formState.questionCount}</li>
                          <li>• Time Limit: {formState.timeLimit} minutes</li>
                          <li>• Question Types: {formState.questionTypes.join(', ')}</li>
                        </ul>
                      </div>
                      <div className="flex justify-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleBackToForm}
                          disabled={loading || isGenerating}
                          className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium disabled:opacity-50"
                        >
                          Edit Configuration
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleGenerateTest}
                          disabled={loading || isGenerating}
                          className={`px-8 py-3 rounded-lg font-medium flex items-center gap-2 ${
                            loading || isGenerating
                              ? 'bg-gray-600 cursor-not-allowed'
                              : 'bg-[#fcba28] text-black hover:bg-[#fcba28]/90'
                          }`}
                        >
                          {loading || isGenerating ? (
                            <>
                              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <FaRobot className="w-5 h-5" />
                              Generate Test
                            </>
                          )}
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <p className="text-red-500 mb-4">Error: Test configuration not found</p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBackToForm}
                        className="px-6 py-3 bg-[#fcba28] text-black rounded-lg font-medium"
                      >
                        Back to Form
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="test"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBackToForm}
                    className="flex items-center gap-2 text-[#fcba28] hover:text-[#fcd978] transition-colors"
                  >
                    <FaArrowLeft />
                    Back to Form
                  </motion.button>
                  {generatedTest?.metadata && (
                    <div className="flex gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-[#fcba28]" />
                        <span className={timeRemaining !== null && timeRemaining <= 300 ? 'text-red-500' : ''}>
                          {timeRemaining !== null ? formatTime(timeRemaining) : `${generatedTest.metadata.timeLimit} minutes`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaList className="text-[#fcba28]" />
                        <span>{generatedTest.metadata.questionCount} questions</span>
                      </div>
                      {generatedTest.metadata.adaptiveMode && (
                        <div className="flex items-center gap-2">
                          <FaBrain className="text-[#fcba28]" />
                          <span>Adaptive</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Performance Summary */}
                {performance.totalQuestions > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#fcba28] font-medium">Performance Summary</h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>Success Rate:</span>
                        <span className={`font-medium ${
                          (performance.correctAnswers / performance.totalQuestions) >= 0.7
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}>
                          {((performance.correctAnswers / performance.totalQuestions) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {Object.entries(performance.topics).map(([topic, rate]) => (
                        <motion.div
                          key={topic}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20"
                        >
                          <div className="text-sm text-gray-400 mb-2">{topic}</div>
                          <div className={`text-lg font-medium ${
                            rate >= 0.7 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {(rate * 100).toFixed(0)}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {!showForm && generatedTest && (
                  <div className="space-y-8">
                    {!isTestStarted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                      >
                        <h2 className="text-2xl font-bold text-white">Test Ready</h2>
                        <div className="space-y-4">
                          <p className="text-white/80">
                            Your test has been generated. Click the button below when you're ready to start.
                            The timer will begin once you start the test.
                          </p>
                          <ul className="text-white/70 space-y-2">
                            <li>• Time Limit: {generatedTest.metadata.timeLimit} minutes</li>
                            <li>• Questions: {generatedTest.questions.length}</li>
                            <li>• Topics: {generatedTest.metadata.topics.join(', ')}</li>
                          </ul>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleStartTest}
                            className="px-8 py-3 bg-[#fcba28] text-black rounded-lg font-medium flex items-center gap-2 mx-auto"
                          >
                            <FaRocket className="w-5 h-5" />
                            Start Test
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                      >
                        {/* Test Statistics */}
                        {showStats && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm"
                          >
                            <button
                              onClick={() => setShowStats(false)}
                              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                            >
                              ×
                            </button>
                            <h3 className="text-[#fcba28] font-medium mb-4">Test Statistics</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
                                <div className="text-sm text-gray-400 mb-1">Questions</div>
                                <div className="text-xl font-medium text-[#fcba28]">
                                  {generatedTest.metadata.questionCount}
                                </div>
                              </div>
                              <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
                                <div className="text-sm text-gray-400 mb-1">Time Limit</div>
                                <div className="text-xl font-medium text-[#fcba28]">
                                  {generatedTest.metadata.timeLimit}m
                                </div>
                              </div>
                              <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
                                <div className="text-sm text-gray-400 mb-1">Completed</div>
                                <div className="text-xl font-medium text-[#fcba28]">
                                  {Object.keys(selectedAnswers).length}/{generatedTest.questions.length}
                                </div>
                              </div>
                              <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
                                <div className="text-sm text-gray-400 mb-1">Time Left</div>
                                <div className="text-xl font-medium text-[#fcba28]">
                                  {timeRemaining !== null ? formatTime(timeRemaining) : '--:--'}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <div className="flex justify-between items-center mb-4">
                          <button
                            onClick={() => setShowStats(!showStats)}
                            className="text-[#fcba28] hover:text-[#fcd978] transition-colors"
                          >
                            {showStats ? 'Hide Statistics' : 'Show Statistics'}
                          </button>
                          <div className="flex items-center gap-2 text-gray-400">
                            <span>Progress:</span>
                            <span className="font-medium">
                              {Object.keys(selectedAnswers).length}/{generatedTest.questions.length}
                            </span>
                          </div>
                        </div>

                        <div className="grid gap-6">
                          {generatedTest.questions.map((question: any, index: number) => (
                            <motion.div
                              key={question.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-[#fcba28]/20 space-y-6"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 text-[#fcba28] mb-2">
                                    <span className="text-sm font-medium">Question {index + 1}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20">
                                      {question.topic}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#fcba28]/10 border border-[#fcba28]/20">
                                      {question.difficulty}
                                    </span>
                                  </div>
                                  <p className="text-white">{question.question}</p>
                                </div>
                              </div>

                              {question.type === 'multiple-choice' ? (
                                <div className="grid gap-3">
                                  {question.options.map((option: string, optIndex: number) => {
                                    const optionLetter = String.fromCharCode(65 + optIndex);
                                    const isSelected = selectedAnswers[question.id] === optionLetter;
                                    const showingFeedback = showFeedback[question.id];
                                    const isCorrect = question.correctAnswer === optionLetter;

                                    return (
                                      <motion.button
                                        key={optIndex}
                                        onClick={() => {
                                          handleAnswerSelect(question.id, optionLetter, question.topic);
                                          if (!showFeedback[question.id]) {
                                            toggleFeedback(question.id);
                                          }
                                        }}
                                        className={`p-4 rounded-lg text-left transition-all flex items-center gap-3
                                          ${isSelected 
                                            ? showingFeedback
                                              ? isCorrect
                                                ? 'bg-green-500/20 border-green-500/40'
                                                : 'bg-red-500/20 border-red-500/40'
                                              : 'bg-[#fcba28] text-black'
                                            : 'bg-black/20 hover:bg-[#fcba28]/10 text-white border border-[#fcba28]/20'
                                          }
                                        `}
                                      >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                          ${isSelected
                                            ? showingFeedback
                                              ? isCorrect
                                                ? 'border-green-500 text-green-500'
                                                : 'border-red-500 text-red-500'
                                              : 'border-black text-black'
                                            : 'border-[#fcba28]/50 text-[#fcba28]'
                                          }
                                        `}>
                                          {optionLetter}
                                        </div>
                                        <span className={isSelected && !showingFeedback ? 'text-black' : 'text-gray-300'}>
                                          {option.replace(/^[A-D]\)\s*/, '')}
                                        </span>
                                        {showingFeedback && isSelected && (
                                          <span className="ml-auto">
                                            {isCorrect 
                                              ? <FaCheckCircle className="w-5 h-5 text-green-500" />
                                              : <FaTimesCircle className="w-5 h-5 text-red-500" />
                                            }
                                          </span>
                                        )}
                                      </motion.button>
                                    );
                                  })}
                                </div>
                              ) : question.type === 'coding' ? (
                                <CodeEditor
                                  question={{
                                    id: question.id,
                                    language: question.language || 'javascript',
                                    starterCode: question.starterCode || '// Your code here',
                                    testCases: question.testCases || [
                                      {
                                        input: 'Example input',
                                        expectedOutput: 'Example output'
                                      }
                                    ]
                                  }}
                                  onTestResult={(passed) => handleCodeResult(question.id, passed, question.topic)}
                                />
                              ) : (
                                <div className="space-y-4">
                                  <textarea
                                    placeholder="Type your answer here..."
                                    className="w-full h-32 p-4 rounded-lg bg-black/20 border border-[#fcba28]/20 text-white placeholder-gray-400 focus:border-[#fcba28]/40 focus:ring-1 focus:ring-[#fcba28]/40"
                                    onChange={(e) => {
                                      handleAnswerSelect(question.id, e.target.value, question.topic);
                                      if (!showFeedback[question.id]) {
                                        toggleFeedback(question.id);
                                      }
                                    }}
                                  />
                                </div>
                              )}

                              {showFeedback[question.id] && question.explanation && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="p-4 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20"
                                >
                                  <div className="flex items-center gap-2 text-[#fcba28] mb-2">
                                    <FaLightbulb className="w-4 h-4" />
                                    <span className="font-medium">Explanation</span>
                                  </div>
                                  <p className="text-gray-300">{question.explanation}</p>
                                </motion.div>
                              )}

                              {showFeedback[question.id] && question.practiceQuestion && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20"
                                >
                                  <div className="flex items-center gap-2 text-[#fcba28] mb-2">
                                    <FaCode className="w-4 h-4" />
                                    <span className="font-medium">Practice Question</span>
                                  </div>
                                  <p className="text-gray-300 mb-4">{question.practiceQuestion.question}</p>
                                  <div className="p-4 rounded-lg bg-[#fcba28]/10 border border-[#fcba28]/20">
                                    <div className="text-[#fcba28] mb-2 font-medium">Solution</div>
                                    <p className="text-gray-300">{question.practiceQuestion.answer}</p>
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        {/* Submit Test Button */}
                        {!testSubmitted && Object.keys(selectedAnswers).length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8"
                          >
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleTestSubmit}
                              className="w-full py-4 rounded-xl text-lg font-medium bg-[#fcba28] text-black hover:bg-[#fcba28]/90 transition-all"
                            >
                              Submit Test
                            </motion.button>
                            <p className="text-center text-sm text-gray-400 mt-2">
                              You've completed {Object.keys(selectedAnswers).length} out of {generatedTest.questions.length} questions
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Score Modal */}
          <AnimatePresence>
            {testSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="relative bg-background p-8 rounded-2xl max-w-lg w-full mx-4 border border-[#fcba28]/20"
                >
                  <button
                    onClick={() => setTestSubmitted(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                  
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#fcba28]/10 mb-4">
                      {(performance.correctAnswers / performance.totalQuestions) >= 0.7 ? (
                        <FaCheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <FaTimesCircle className="w-8 h-8 text-red-500" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-[#fcba28] mb-2">Test Complete!</h3>
                    <p className="text-gray-400">
                      You scored {((performance.correctAnswers / performance.totalQuestions) * 100).toFixed(1)}%
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
                      <div className="text-sm text-gray-400 mb-1">Correct Answers</div>
                      <div className="text-xl font-medium text-green-500">{performance.correctAnswers}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-black/20 border border-[#fcba28]/20">
                      <div className="text-sm text-gray-400 mb-1">Total Questions</div>
                      <div className="text-xl font-medium text-[#fcba28]">{performance.totalQuestions}</div>
                    </div>
                  </div>

                  {/* Topic Performance */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-sm text-gray-400">Performance by Topic</h4>
                    {Object.entries(performance.topics).map(([topic, rate]) => (
                      <div key={topic} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{topic}</span>
                        <span className={`text-sm font-medium ${
                          rate >= 0.7 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {(rate * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowForm(true)}
                      className="flex-1 py-3 rounded-xl bg-[#fcba28] text-black font-medium hover:bg-[#fcba28]/90 transition-all"
                    >
                      Generate New Test
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTestSubmitted(false)}
                      className="flex-1 py-3 rounded-xl bg-black/20 text-[#fcba28] font-medium hover:bg-black/30 transition-all"
                    >
                      Review Answers
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
