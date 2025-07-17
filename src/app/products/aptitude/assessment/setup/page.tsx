'use client';

import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { AssessmentControlPanel } from '../../components/assessment/AssessmentControlPanel';

export default function AssessmentSetupPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <MaxWidthWrapper>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Target className="w-4 h-4 text-[#fcba28]" />
            <span className="text-sm">AI Assessment</span>
          </div>
          <h1 className="text-4xl font-bold">Take an Assessment</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Test your skills with our AI-powered assessment system. Configure your assessment
            parameters and get detailed performance analytics.
          </p>
        </motion.div>

        {/* Control Panel */}
        <AssessmentControlPanel />
      </MaxWidthWrapper>
    </div>
  );
}
