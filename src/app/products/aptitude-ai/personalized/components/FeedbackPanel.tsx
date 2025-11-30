import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface FeedbackPanelProps {
  isCorrect: boolean;
  explanation: string;
  feedback: string | null;
  onNext: () => void;
}

export default function FeedbackPanel({
  isCorrect,
  explanation,
  feedback,
  onNext
}: FeedbackPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6"
    >
      <div className="relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-lg border border-[#fcba28]/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative space-y-4">
          <div className="flex items-center space-x-3">
            {isCorrect ? (
              <>
                <FaCheckCircle className="text-2xl text-green-400" />
                <h3 className="text-xl font-medium text-green-400">Correct!</h3>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-2xl text-red-400" />
                <h3 className="text-xl font-medium text-red-400">Incorrect</h3>
              </>
            )}
          </div>

          {feedback && (
            <div className="text-gray-200">
              {feedback}
            </div>
          )}

          <div className="text-gray-200">
            <h4 className="font-medium text-[#fcba28] mb-2">Explanation:</h4>
            <p>{explanation}</p>
          </div>

          <div className="pt-4">
            <Button
              onClick={onNext}
              className="w-full bg-[#fcba28] hover:bg-[#fcba28]/90 text-black"
            >
              Next Question
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
