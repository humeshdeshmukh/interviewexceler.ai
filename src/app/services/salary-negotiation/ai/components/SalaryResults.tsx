import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { DollarSign, TrendingUp, Lightbulb, Gift } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

interface SalaryResultsProps {
  result: {
    salaryRange: {
      min: number;
      average: number;
      max: number;
    };
    currency: string;
    keyFactors: string[];
    marketInsights: string[];
    negotiationTips: string[];
    benefitsAnalysis: string[];
  };
}

export const SalaryResults = ({ result }: SalaryResultsProps) => {
  const { salaryRange, currency, keyFactors, marketInsights, negotiationTips, benefitsAnalysis } = result;

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const renderSalaryCard = (title: string, amount: number, delay: number) => (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, delay }}
      className="flex-1"
    >
      <Card className="p-6 bg-gray-900/50 border-[#fcba28]/20 hover:border-[#fcba28]/40 transition-colors backdrop-blur-lg">
        <h3 className="text-gray-400 mb-2 text-sm font-medium">{title}</h3>
        <p className="text-2xl md:text-3xl font-bold text-white">
          {formatCurrency(amount, currency)}
        </p>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Salary Range */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderSalaryCard('Minimum', salaryRange.min, 0)}
        {renderSalaryCard('Average', salaryRange.average, 0.2)}
        {renderSalaryCard('Maximum', salaryRange.max, 0.4)}
      </div>

      {/* Key Factors */}
      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6 bg-gray-900/50 border-[#fcba28]/20 backdrop-blur-lg">
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 text-[#fcba28] mr-2" />
            <h3 className="text-lg font-semibold text-white">Key Factors</h3>
          </div>
          <ul className="space-y-2">
            {keyFactors.map((factor, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-gray-300"
              >
                • {factor}
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Market Insights */}
      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="p-6 bg-gray-900/50 border-[#fcba28]/20 backdrop-blur-lg">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-[#fcba28] mr-2" />
            <h3 className="text-lg font-semibold text-white">Market Insights</h3>
          </div>
          <ul className="space-y-2">
            {marketInsights.map((insight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-gray-300"
              >
                • {insight}
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Negotiation Tips */}
      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="p-6 bg-gray-900/50 border-[#fcba28]/20 backdrop-blur-lg">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-5 h-5 text-[#fcba28] mr-2" />
            <h3 className="text-lg font-semibold text-white">Negotiation Tips</h3>
          </div>
          <ul className="space-y-2">
            {negotiationTips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-gray-300"
              >
                • {tip}
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Benefits Analysis */}
      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="p-6 bg-gray-900/50 border-[#fcba28]/20 backdrop-blur-lg">
          <div className="flex items-center mb-4">
            <Gift className="w-5 h-5 text-[#fcba28] mr-2" />
            <h3 className="text-lg font-semibold text-white">Benefits Analysis</h3>
          </div>
          <ul className="space-y-2">
            {benefitsAnalysis.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-gray-300"
              >
                • {benefit}
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  );
};
