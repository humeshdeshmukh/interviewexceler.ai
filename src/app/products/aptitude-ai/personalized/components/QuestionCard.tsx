import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  topic: string;
  subtopic: string;
}

interface QuestionCardProps {
  question: Question | null;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  showExplanation: boolean;
  isCorrect: boolean;
}

export default function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  showExplanation,
  isCorrect
}: QuestionCardProps) {
  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
      {/* Question */}
      <div className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm px-3 py-1 rounded-full ${
              question.difficulty === 'easy'
                ? 'bg-green-500/20 text-green-400'
                : question.difficulty === 'medium'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </span>
            <span className="text-sm text-gray-400">{question.subtopic}</span>
          </div>
          <p className="text-lg text-white mb-2">{question.question}</p>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrectAnswer = showExplanation && option === question.correctAnswer;
          const isWrongAnswer = showExplanation && isSelected && option !== question.correctAnswer;

          return (
            <Button
              key={index}
              onClick={() => !showExplanation && onSelectOption(option)}
              disabled={showExplanation}
              className={`relative overflow-hidden w-full p-4 text-left transition-all ${
                isSelected
                  ? isCorrectAnswer
                    ? 'bg-green-500/20 text-green-400 border-green-500'
                    : isWrongAnswer
                    ? 'bg-red-500/20 text-red-400 border-red-500'
                    : 'bg-[#fcba28]/20 text-[#fcba28] border-[#fcba28]'
                  : isCorrectAnswer
                  ? 'bg-green-500/20 text-green-400 border-green-500'
                  : 'bg-black/40 text-gray-200 hover:text-[#fcba28] border-[#fcba28]/20'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <span className="text-sm font-medium">{String.fromCharCode(65 + index)}. </span>
                {option}
              </div>
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
}
