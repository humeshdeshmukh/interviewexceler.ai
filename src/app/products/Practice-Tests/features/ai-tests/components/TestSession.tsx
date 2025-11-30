import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaCheckCircle, FaArrowRight, FaArrowLeft, FaFlag, FaLightbulb } from 'react-icons/fa';
import CodeEditor from './CodeEditor';
import { gradeCode } from '../services/gemini';
import { useTestSession } from '../hooks/useTestSession';

interface TestSessionProps {
    test: any;
    onComplete: (results: any) => void;
    onExit: () => void;
}

export default function TestSession({ test, onComplete, onExit }: TestSessionProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [gradingResults, setGradingResults] = useState<Record<string, any>>({});

    // Use the custom hook for session management
    // We use a generated ID or timestamp from the test metadata if available, otherwise fallback to a simple hash
    // For this implementation, we'll assume test has an ID or use a combination of topic and timestamp
    const testId = test.id || `test_${test.metadata.timestamp}`;

    const {
        answers,
        flags,
        currentQuestionIndex,
        timeRemaining,
        setAnswer,
        toggleFlag,
        setCurrentQuestionIndex,
        completeTest,
        clearSession
    } = useTestSession({
        testId,
        durationMinutes: test.metadata.timeLimit,
        onTimeUp: () => handleSubmitTest()
    });

    const currentQuestion = test.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === test.questions.length - 1;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleNext = () => {
        if (currentQuestionIndex < test.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleCodeSubmit = async (code: string) => {
        if (!code) return;

        // Optimistic update
        setAnswer(currentQuestion.id, { code });

        try {
            const result = await gradeCode(
                code,
                currentQuestion.language,
                currentQuestion.question,
                currentQuestion.testCases
            );

            setGradingResults(prev => ({
                ...prev,
                [currentQuestion.id]: result
            }));

            setAnswer(currentQuestion.id, {
                code,
                passed: result.passed,
                score: result.score
            });
        } catch (error) {
            console.error('Grading failed:', error);
            alert('Failed to grade code. Please try again.');
        }
    };

    const handleSubmitTest = () => {
        setIsSubmitting(true);
        completeTest();

        // Calculate final results
        const results = {
            answers,
            gradingResults,
            timeSpent: test.metadata.timeLimit * 60 - timeRemaining,
            totalQuestions: test.questions.length,
            timestamp: new Date().toISOString()
        };

        clearSession(); // Clear storage after submission
        onComplete(results);
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 p-4 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onExit}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Exit Test
                    </button>
                    <div className="h-6 w-px bg-gray-700" />
                    <div className="text-[#fcba28] font-medium">
                        Question {currentQuestionIndex + 1} <span className="text-gray-500">/ {test.questions.length}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 font-mono text-lg ${timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-[#fcba28]'
                        }`}>
                        <FaClock />
                        {formatTime(timeRemaining)}
                    </div>
                    <button
                        onClick={handleSubmitTest}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Test'}
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-gray-800 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-[#fcba28]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / test.questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Question Area */}
                <div className="lg:col-span-3 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8 rounded-2xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#fcba28]/10 text-[#fcba28] border border-[#fcba28]/20">
                                        {currentQuestion.type}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                                        {currentQuestion.difficulty}
                                    </span>
                                </div>
                                <button
                                    onClick={() => toggleFlag(currentQuestion.id)}
                                    className={`p-2 rounded-lg transition-colors ${flags[currentQuestion.id] ? 'text-red-500 bg-red-500/10' : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    <FaFlag />
                                </button>
                            </div>

                            <h2 className="text-xl font-medium text-white mb-6 leading-relaxed">
                                {currentQuestion.question}
                            </h2>

                            {currentQuestion.type === 'multiple-choice' && (
                                <div className="space-y-3">
                                    {currentQuestion.options.map((option: string, idx: number) => {
                                        const letter = String.fromCharCode(65 + idx);
                                        const isSelected = answers[currentQuestion.id] === letter;

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setAnswer(currentQuestion.id, letter)}
                                                className={`w-full p-4 rounded-xl text-left transition-all border ${isSelected
                                                        ? 'bg-[#fcba28]/10 border-[#fcba28] text-[#fcba28]'
                                                        : 'bg-black/20 border-white/5 text-gray-300 hover:bg-white/5'
                                                    }`}
                                            >
                                                <span className="font-mono mr-4 opacity-50">{letter}.</span>
                                                {option.replace(/^[A-D]\)\s*/, '')}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {currentQuestion.type === 'coding' && (
                                <div className="space-y-4">
                                    <CodeEditor
                                        question={currentQuestion}
                                        value={answers[currentQuestion.id]?.code || ''}
                                        onChange={(code) => setAnswer(currentQuestion.id, { ...answers[currentQuestion.id], code })}
                                        onTestResult={(passed) => {
                                            // This is handled by the "Run Code" button in CodeEditor
                                        }}
                                        onGrade={() => handleCodeSubmit(answers[currentQuestion.id]?.code)}
                                        isGrading={false} // We could add a loading state for specific question grading if needed
                                    />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentQuestionIndex === 0
                                    ? 'opacity-0 pointer-events-none'
                                    : 'bg-black/20 text-white hover:bg-white/10'
                                }`}
                        >
                            <FaArrowLeft /> Previous
                        </button>

                        {isLastQuestion ? (
                            <button
                                onClick={handleSubmitTest}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-[#fcba28] text-black hover:bg-[#fcba28]/90 transition-all shadow-lg shadow-[#fcba28]/20 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Finish Test'} <FaCheckCircle />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-white text-black hover:bg-gray-100 transition-all"
                            >
                                Next Question <FaArrowRight />
                            </button>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="p-6 rounded-2xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                        <h3 className="text-[#fcba28] font-medium mb-4 flex items-center gap-2">
                            <FaLightbulb /> Question Map
                        </h3>
                        <div className="grid grid-cols-5 gap-2">
                            {test.questions.map((_: any, idx: number) => {
                                const isCurrent = idx === currentQuestionIndex;
                                const isAnswered = !!answers[test.questions[idx].id];
                                const isFlagged = !!flags[test.questions[idx].id];

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentQuestionIndex(idx)}
                                        className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all border ${isCurrent
                                                ? 'bg-[#fcba28] text-black border-[#fcba28]'
                                                : isFlagged
                                                    ? 'bg-red-500/20 text-red-500 border-red-500/50'
                                                    : isAnswered
                                                        ? 'bg-green-500/20 text-green-500 border-green-500/50'
                                                        : 'bg-black/40 text-gray-500 border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        {isFlagged ? <FaFlag className="w-3 h-3" /> : idx + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-6 space-y-2 text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-[#fcba28]" /> Current
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/50" /> Answered
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/50" /> Flagged
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
