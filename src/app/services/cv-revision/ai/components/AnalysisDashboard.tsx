import { motion } from 'framer-motion';
import { AnalysisResult } from '../lib/gemini';
import { ScoreCard } from './ScoreCard';
import { CheckCircle, AlertTriangle, Info, TrendingUp, Award, Briefcase } from 'lucide-react';

interface AnalysisDashboardProps {
    result: AnalysisResult;
}

export const AnalysisDashboard = ({ result }: AnalysisDashboardProps) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Overall Score Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-4">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Award className="w-6 h-6 text-[#fcba28]" />
                        ATS Analysis Scores
                    </h2>
                </div>
                <ScoreCard
                    title="Overall Score"
                    score={result.atsScores.overall.score}
                    feedback={result.atsScores.overall.feedback}
                    improvements={result.atsScores.overall.improvements}
                />
                <ScoreCard
                    title="Format & Structure"
                    score={result.atsScores.format.score}
                    feedback={result.atsScores.format.feedback}
                    improvements={result.atsScores.format.improvements}
                    delay={0.1}
                />
                <ScoreCard
                    title="Keywords & SEO"
                    score={result.atsScores.keyword.score}
                    feedback={result.atsScores.keyword.feedback}
                    improvements={result.atsScores.keyword.improvements}
                    delay={0.2}
                />
                <ScoreCard
                    title="Content Impact"
                    score={result.atsScores.relevance.score}
                    feedback={result.atsScores.relevance.feedback}
                    improvements={result.atsScores.relevance.improvements}
                    delay={0.3}
                />
            </div>

            {/* Priority Improvements */}
            <motion.div variants={item} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-[#fcba28]" />
                    Priority Improvements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Critical */}
                    <div className="space-y-4">
                        <h3 className="text-red-400 font-semibold flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Critical
                        </h3>
                        {result.improvements.critical.map((imp, idx) => (
                            <div key={idx} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                <p className="text-gray-200 font-medium mb-2">{imp.point}</p>
                                <p className="text-sm text-gray-400">💡 {imp.solution}</p>
                            </div>
                        ))}
                    </div>

                    {/* Important */}
                    <div className="space-y-4">
                        <h3 className="text-yellow-400 font-semibold flex items-center gap-2">
                            <Info className="w-4 h-4" /> Important
                        </h3>
                        {result.improvements.important.map((imp, idx) => (
                            <div key={idx} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                                <p className="text-gray-200 font-medium mb-2">{imp.point}</p>
                                <p className="text-sm text-gray-400">💡 {imp.solution}</p>
                            </div>
                        ))}
                    </div>

                    {/* Recommended */}
                    <div className="space-y-4">
                        <h3 className="text-blue-400 font-semibold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Recommended
                        </h3>
                        {result.improvements.recommended.map((imp, idx) => (
                            <div key={idx} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                <p className="text-gray-200 font-medium mb-2">{imp.point}</p>
                                <p className="text-sm text-gray-400">💡 {imp.solution}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Market Insights & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div variants={item} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-[#fcba28]" />
                        Market Insights
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-3">Industry Trends</h3>
                            <ul className="space-y-2">
                                {result.marketInsights.trends.map((trend, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-400">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#fcba28] flex-shrink-0" />
                                        {trend}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-3">Top Keywords Found</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.marketInsights.keywords.map((kw, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/5">
                                        {kw.word} <span className="text-[#fcba28] ml-1">({kw.count})</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-[#fcba28]" />
                        Experience Analysis
                    </h2>
                    <div className="space-y-6">
                        {result.experience.map((exp, idx) => (
                            <div key={idx} className="border-l-2 border-[#fcba28]/30 pl-4 pb-4 last:pb-0">
                                <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                                <p className="text-[#fcba28] text-sm mb-2">{exp.company} • {exp.duration}</p>
                                <ul className="space-y-2">
                                    {exp.achievements.slice(0, 2).map((ach, aIdx) => (
                                        <li key={aIdx} className="text-sm text-gray-400 flex items-start gap-2">
                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 flex-shrink-0" />
                                            {ach}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
