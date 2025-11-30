import { motion } from 'framer-motion';
import { FaLock, FaCheck, FaPlay, FaStar } from 'react-icons/fa';

interface LearningPathProps {
  currentLevel: number;
  pathProgress: {
    level: number;
    name: string;
    description: string;
    topics: {
      id: string;
      name: string;
      status: 'locked' | 'available' | 'completed';
      score?: number;
      requiredScore: number;
    }[];
    unlocked: boolean;
    completed: boolean;
  }[];
  onSelectTopic: (topicId: string) => void;
}

export default function LearningPath({
  currentLevel,
  pathProgress,
  onSelectTopic
}: LearningPathProps) {
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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#fcba28]">Your Learning Path</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Current Level:</span>
            <span className="text-[#fcba28] font-bold">{currentLevel}</span>
          </div>
        </div>

        <div className="space-y-12">
          {pathProgress.map((level, index) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${index !== pathProgress.length - 1 ? 'pb-12' : ''}`}
            >
              {/* Connecting Line */}
              {index !== pathProgress.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#fcba28]/50 to-transparent" />
              )}

              {/* Level Header */}
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  whileHover={level.unlocked ? { scale: 1.1 } : {}}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                    level.completed
                      ? 'bg-[#fcba28] border-[#fcba28] text-black'
                      : level.unlocked
                      ? 'bg-[#fcba28]/10 border-[#fcba28] text-[#fcba28]'
                      : 'bg-black/20 border-gray-700 text-gray-500'
                  }`}
                >
                  {level.completed ? (
                    <FaCheck className="text-xl" />
                  ) : level.unlocked ? (
                    <span className="text-lg font-bold">{level.level}</span>
                  ) : (
                    <FaLock className="text-lg" />
                  )}
                </motion.div>
                <div>
                  <h3 className={`text-lg font-medium ${
                    level.unlocked ? 'text-[#fcba28]' : 'text-gray-500'
                  }`}>
                    {level.name}
                  </h3>
                  <p className={`text-sm ${
                    level.unlocked ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {level.description}
                  </p>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-16">
                {level.topics.map((topic) => (
                  <motion.button
                    key={topic.id}
                    whileHover={topic.status !== 'locked' ? { scale: 1.02 } : {}}
                    onClick={() => topic.status === 'available' && onSelectTopic(topic.id)}
                    className={`relative overflow-hidden rounded-lg border p-4 ${
                      topic.status === 'completed'
                        ? 'border-[#fcba28] bg-[#fcba28]/10'
                        : topic.status === 'available'
                        ? 'border-[#fcba28]/50 bg-black/40 hover:border-[#fcba28]'
                        : 'border-gray-800 bg-black/20'
                    } transition-all group`}
                    disabled={topic.status === 'locked'}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-medium ${
                          topic.status === 'locked'
                            ? 'text-gray-500'
                            : 'text-[#fcba28]'
                        }`}>
                          {topic.name}
                        </span>
                        {topic.status === 'locked' ? (
                          <FaLock className="text-gray-600" />
                        ) : topic.status === 'completed' ? (
                          <div className="flex items-center space-x-1">
                            <FaStar className="text-[#fcba28]" />
                            <span className="text-[#fcba28]">{topic.score}</span>
                          </div>
                        ) : (
                          <FaPlay className="text-[#fcba28]" />
                        )}
                      </div>
                      
                      {topic.status !== 'locked' && (
                        <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: topic.status === 'completed'
                                ? '100%'
                                : `${(topic.score || 0) / topic.requiredScore * 100}%`
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#fcba28] to-[#ffd700]"
                          />
                        </div>
                      )}
                      {topic.status === 'available' && (
                        <p className="text-xs text-gray-500 mt-2">
                          Required Score: {topic.requiredScore}%
                        </p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
