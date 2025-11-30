import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FaTrophy, FaStopwatch, FaChartLine, FaBrain } from 'react-icons/fa';

interface ProgressDashboardProps {
  performanceMetrics: {
    accuracy: number;
    averageTimePerQuestion: number;
    totalQuestionsAttempted: number;
    topicWisePerformance: Record<string, { correct: number; total: number }>;
    skillWisePerformance: Record<string, { score: number; count: number }>;
    streaks: { current: number; best: number };
  };
  dailyProgress: {
    date: string;
    accuracy: number;
    questionsAttempted: number;
  }[];
  learningStyle?: {
    visual: number;
    verbal: number;
    logical: number;
    mathematical: number;
  };
  achievements: {
    id: string;
    name: string;
    description: string;
    earned: boolean;
    progress: number;
    maxProgress: number;
  }[];
}

const COLORS = ['#fcba28', '#45b7d1', '#4ecdc4', '#ff6b6b'];
const CHART_COLORS = {
  grid: '#2a2a2a',
  text: '#a0a0a0',
  line: '#fcba28',
  tooltip: {
    background: 'rgba(0, 0, 0, 0.8)',
    border: '#fcba28'
  }
};

export default function ProgressDashboard({
  performanceMetrics,
  dailyProgress,
  learningStyle,
  achievements
}: ProgressDashboardProps) {
  const topicPerformance = Object.entries(performanceMetrics.topicWisePerformance).map(
    ([topic, { correct, total }]) => ({
      topic,
      accuracy: (correct / total) * 100,
      completed: total
    })
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              title: 'Overall Accuracy',
              value: `${Math.round(performanceMetrics.accuracy * 100)}%`,
              icon: <FaChartLine className="text-2xl" />
            },
            {
              title: 'Best Streak',
              value: performanceMetrics.streaks.best.toString(),
              icon: <FaTrophy className="text-2xl" />
            },
            {
              title: 'Avg. Time per Question',
              value: `${Math.round(performanceMetrics.averageTimePerQuestion)}s`,
              icon: <FaStopwatch className="text-2xl" />
            },
            {
              title: 'Total Questions',
              value: performanceMetrics.totalQuestionsAttempted.toString(),
              icon: <FaBrain className="text-2xl" />
            }
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-6 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-gray-400 mb-1">{card.title}</p>
                  <h3 className="text-2xl font-bold text-[#fcba28]">
                    {card.value}
                  </h3>
                </div>
                <div className="text-[#fcba28]">{card.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-6"
          >
            <h3 className="text-lg font-medium text-[#fcba28] mb-4">Daily Progress</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyProgress}>
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fcba28" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#fcba28" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    stroke={CHART_COLORS.text}
                    tick={{ fill: CHART_COLORS.text }}
                  />
                  <YAxis
                    stroke={CHART_COLORS.text}
                    tick={{ fill: CHART_COLORS.text }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: CHART_COLORS.tooltip.background,
                      border: `1px solid ${CHART_COLORS.tooltip.border}`,
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke={CHART_COLORS.line}
                    strokeWidth={2}
                    dot={{ fill: CHART_COLORS.line }}
                    fill="url(#accuracyGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Learning Style Chart */}
          {learningStyle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-6"
            >
              <h3 className="text-lg font-medium text-[#fcba28] mb-4">Learning Style</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(learningStyle).map(([key, value]) => ({
                        name: key.charAt(0).toUpperCase() + key.slice(1),
                        value
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {Object.entries(learningStyle).map((entry, index) => (
                        <Cell
                          key={entry[0]}
                          fill={COLORS[index % COLORS.length]}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: CHART_COLORS.tooltip.background,
                        border: `1px solid ${CHART_COLORS.tooltip.border}`,
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {Object.entries(learningStyle).map(([key, value], index) => (
                    <div key={key} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm text-gray-400">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-6"
        >
          <h3 className="text-lg font-medium text-[#fcba28] mb-6">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-lg p-4 ${
                  achievement.earned
                    ? 'bg-[#fcba28]/10 border-[#fcba28]'
                    : 'bg-black/20 border-gray-800'
                } border group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <h4 className={`font-medium mb-1 ${
                    achievement.earned ? 'text-[#fcba28]' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#fcba28] to-[#ffd700]"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {achievement.progress} / {achievement.maxProgress}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
