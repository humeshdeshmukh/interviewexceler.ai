"use client";

import { PageContainer, Card } from '../../components/ui';
import { LightbulbIcon, CheckCircle2, AlertTriangle, BookOpen, Target, List } from 'lucide-react';
import { motion } from 'framer-motion';

const tips = [
  {
    category: 'Content',
    icon: BookOpen,
    tips: [
      'Use action verbs to start bullet points',
      'Quantify achievements with numbers and metrics',
      'Focus on results and impact, not just responsibilities',
      'Keep sentences concise and clear',
      'Remove outdated or irrelevant experience'
    ]
  },
  {
    category: 'Formatting',
    icon: List,
    tips: [
      'Use consistent formatting throughout',
      'Choose a clean, professional font',
      'Maintain adequate white space',
      'Keep resume length to 1-2 pages',
      'Use bullet points for better readability'
    ]
  },
  {
    category: 'ATS Optimization',
    icon: Target,
    tips: [
      'Include relevant keywords from the job description',
      'Use standard section headings',
      'Avoid tables and complex formatting',
      'Submit in PDF format unless specified otherwise',
      'Include both acronyms and full terms'
    ]
  }
];

const commonMistakes = [
  'Using generic objectives',
  'Including personal information like age or marital status',
  'Having spelling and grammar errors',
  'Using unprofessional email addresses',
  'Including references on the resume'
];

export default function ResumeTipsPage() {
  return (
    <PageContainer
      badge={{
        icon: LightbulbIcon,
        text: "Resume Writing Tips"
      }}
      title={{
        main: "Expert",
        highlight: "Resume Tips",
        end: "& Best Practices"
      }}
      description="Learn how to create an effective resume that stands out to employers and passes ATS systems"
    >
      <div className="space-y-12">
        {/* Tips Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#fcba28]/20">
                    <section.icon className="w-5 h-5 text-[#fcba28]" />
                  </div>
                  <h3 className="text-xl font-semibold">{section.category}</h3>
                </div>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <motion.li
                      key={tipIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 + tipIndex * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#fcba28] shrink-0 mt-0.5" />
                      <span className="text-white/80">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Common Mistakes */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-center"
          >
            Common Mistakes to Avoid
          </motion.h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonMistakes.map((mistake, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-white/80">{mistake}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
