import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaChartPie, FaClock, FaTrophy, FaRedo, FaHome } from 'react-icons/fa';

interface ResultSummaryProps {
    results: {
        answers: Record<string, any>;
        gradingResults: Record<string, any>;
        timeSpent: number;
        totalQuestions: number;
        timestamp: string;
    };
    test: any;
    onRetry: () => void;
    onHome: () => void;
}

export default function ResultSummary({ results, test, onRetry, onHome }: ResultSummaryProps) {
    // Calculate stats
    let correctCount = 0;
    let totalScore = 0;
    const topicScores: Record<string, { total: number; correct: number }> = {};

    test.questions.forEach((q: any) => {
        const answer = results.answers[q.id];
        const grading = results.gradingResults[q.id];
        let isCorrect = false;

        if (q.type === 'coding') {
            isCorrect = grading?.passed || false;
            if (isCorrect) totalScore += 100; // Assuming 100 points per coding question
        } else {
            isCorrect = answer === q.correctAnswer;
            if (isCorrect) totalScore += 10; // Assuming 10 points per MC question
        }

        if (isCorrect) correctCount++;

        // Topic breakdown
        if (!topicScores[q.topic]) {
            topicScores[q.topic] = { total: 0, correct: 0 };
        }
        topicScores[q.topic].total++;
        if (isCorrect) topicScores[q.topic].correct++;
    });

    const percentage = Math.round((correctCount / test.questions.length) * 100);
    const passed = percentage >= 70;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="inline-flex items-center justify-center p-6 rounded-full bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm mb-4">
                    {passed ? (
                        <FaTrophy className="w-16 h-16 text-[#fcba28]" />
                    ) : (
                        <FaChartPie className="w-16 h-16 text-gray-400" />
                    )}
                </div>
                <h1 className="text-4xl font-bold text-white">
                    {passed ? 'Great Job!' : 'Keep Practicing!'}
                </h1>
                <p className="text-xl text-gray-400">
                    You scored <span className={passed ? 'text-green-500' : 'text-red-500'}>{percentage}%</span>
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm text-center">
                    <div className="text-gray-400 mb-2 flex items-center justify-center gap-2">
                        <FaCheckCircle /> Correct Answers
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {correctCount} <span className="text-lg text-gray-500">/ {test.questions.length}</span>
                    </div>
                </div>
                <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm text-center">
                    <div className="text-gray-400 mb-2 flex items-center justify-center gap-2">
                        <FaClock /> Time Taken
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {formatTime(results.timeSpent)}
                    </div>
                </div>
                <div className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm text-center">
                    <div className="text-gray-400 mb-2 flex items-center justify-center gap-2">
                        <FaTrophy /> Total Score
                    </div>
                    <div className="text-3xl font-bold text-[#fcba28]">
                        {totalScore}
                    </div>
                </div>
            </div>

            {/* Topic Breakdown */}
            <div className="p-8 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                <h3 className="text-xl font-medium text-white mb-6">Topic Breakdown</h3>
                <div className="space-y-6">
                    {Object.entries(topicScores).map(([topic, score]) => {
                        const topicPercentage = Math.round((score.correct / score.total) * 100);
                        return (
                            <div key={topic} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">{topic}</span>
                                    <span className={topicPercentage >= 70 ? 'text-green-500' : 'text-red-500'}>
                                        {topicPercentage}% ({score.correct}/{score.total})
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${topicPercentage}%` }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className={`h-full ${topicPercentage >= 70 ? 'bg-green-500' : 'bg-red-500'}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Detailed Review */}
            <div className="space-y-4">
                <h3 className="text-xl font-medium text-white">Detailed Review</h3>
                {test.questions.map((q: any, idx: number) => {
                    const answer = results.answers[q.id];
                    const grading = results.gradingResults[q.id];
                    let isCorrect = false;
                    let feedback = '';

                    if (q.type === 'coding') {
                        isCorrect = grading?.passed || false;
                        feedback = grading?.feedback || 'No feedback available';
                    } else {
                        isCorrect = answer === q.correctAnswer;
                    }

                    return (
                        <div key={q.id} className="p-6 rounded-xl bg-black/20 border border-[#fcba28]/20 backdrop-blur-sm">
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                    {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between">
                                        <h4 className="font-medium text-white">Question {idx + 1}</h4>
                                        <span className="text-sm text-gray-400">{q.type}</span>
                                    </div>
                                    <p className="text-gray-300">{q.question}</p>

                                    {q.type === 'multiple-choice' && (
                                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200">
                                                <span className="font-medium block mb-1">Your Answer:</span>
                                                {answer || 'Not answered'}
                                            </div>
                                            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-200">
                                                <span className="font-medium block mb-1">Correct Answer:</span>
                                                {q.correctAnswer}
                                            </div>
                                        </div>
                                    )}

                                    {q.type === 'coding' && (
                                        <div className="mt-4 space-y-2">
                                            <div className="p-3 rounded-lg bg-black/40 border border-[#fcba28]/20 font-mono text-sm text-gray-300">
                                                {answer?.code || 'No code submitted'}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                <span className="text-[#fcba28]">AI Feedback:</span> {feedback}
                                            </div>
                                        </div>
                                    )}

                                    {q.explanation && (
                                        <div className="mt-4 p-4 rounded-lg bg-[#fcba28]/5 border border-[#fcba28]/10 text-sm text-gray-300">
                                            <span className="text-[#fcba28] font-medium block mb-1">Explanation:</span>
                                            {q.explanation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-4 pt-8">
                <button
                    onClick={onHome}
                    className="flex-1 py-4 rounded-xl bg-black/20 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                    <FaHome /> Back to Home
                </button>
                <button
                    onClick={onRetry}
                    className="flex-1 py-4 rounded-xl bg-[#fcba28] text-black font-medium hover:bg-[#fcba28]/90 transition-all flex items-center justify-center gap-2"
                >
                    <FaRedo /> Generate New Test
                </button>
            </div>
        </div>
    );
}
