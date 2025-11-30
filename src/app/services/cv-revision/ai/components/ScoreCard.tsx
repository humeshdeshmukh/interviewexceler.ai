import { motion } from 'framer-motion';

interface ScoreCardProps {
    title: string;
    score: number;
    feedback: string;
    improvements: string[];
    delay?: number;
}

export const ScoreCard = ({ title, score, feedback, improvements, delay = 0 }: ScoreCardProps) => {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'bg-green-500/20';
        if (score >= 60) return 'bg-yellow-500/20';
        return 'bg-red-500/20';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/50 transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getScoreBg(score)}`}>
                    <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
                </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 min-h-[40px]">{feedback}</p>

            {improvements.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Improvements</p>
                    <ul className="space-y-2">
                        {improvements.slice(0, 3).map((imp, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-500 flex-shrink-0" />
                                <span>{imp}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.div>
    );
};
