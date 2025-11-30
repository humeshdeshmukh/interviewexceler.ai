'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  relatedLinks?: {
    text: string;
    url: string;
  }[];
}

interface FAQCardProps {
  faq: FAQ;
  isExpanded: boolean;
  onToggle: () => void;
}

export function FAQCard({ faq, isExpanded, onToggle }: FAQCardProps) {
  return (
    <motion.div
      layout
      className="overflow-hidden"
    >
      <motion.div
        className={`p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 transition-colors duration-300 ${
          isExpanded ? 'bg-white/10' : 'hover:bg-white/[0.07]'
        }`}
      >
        {/* Question Header */}
        <button
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-4 text-left"
        >
          <motion.h3
            layout="position"
            className="text-lg font-medium text-white/90"
          >
            {faq.question}
          </motion.h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={`flex-shrink-0 mt-1 text-[#fcba28] transition-colors duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <FaChevronDown />
          </motion.div>
        </button>

        {/* Answer Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                className="pt-4 space-y-4"
              >
                {/* Answer Text */}
                <p className="text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>

                {/* Related Links */}
                {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                  <div className="pt-4 space-y-2">
                    <p className="text-sm font-medium text-white/80">Related Resources:</p>
                    <div className="flex flex-wrap gap-2">
                      {faq.relatedLinks.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.url}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-[#fcba28] transition-colors duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {link.text}
                          <FaExternalLinkAlt className="w-3 h-3" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
