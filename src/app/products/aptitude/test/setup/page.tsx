'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { TestControlPanel } from '../../components/test/TestControlPanel';

export default function TestSetupPage() {
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
            <Brain className="w-4 h-4 text-[#fcba28]" />
            <span className="text-sm">AI-Powered Practice</span>
          </div>
          <h1 className="text-4xl font-bold">Practice with AI</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Customize your practice session with AI-generated questions tailored to your needs.
            Select topics, difficulty level, and get instant feedback.
          </p>
        </motion.div>

        {/* Control Panel */}
        <TestControlPanel />
      </MaxWidthWrapper>
    </div>
  );
}
