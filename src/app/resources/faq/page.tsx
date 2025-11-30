"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqCategories } from './data/faq';
import { FAQCard } from './components/FAQCard';
import { CategoryCard } from './components/CategoryCard';
import { SearchBar } from './components/SearchBar';
import { BackgroundEffects } from './components/BackgroundEffects';
import { FaArrowRight, FaGraduationCap, FaBrain, FaRocket } from 'react-icons/fa';
import { FilterSection } from './components/FilterSection';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  const filteredCategories = useMemo(() => {
    return faqCategories.filter(category => {
      if (selectedCategory !== 'all' && category.id !== selectedCategory) {
        return false;
      }

      if (!searchQuery) return true;

      return category.faqs.some(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-white">
      <BackgroundEffects />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10"
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
                    Master Your Tech
                  </span>
                  <br />
                  Interview Journey
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-xl">
                  Get answers to common questions about our AI-powered interview preparation platform and start your journey to success.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="/demo"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black rounded-xl font-medium shadow-lg shadow-[#fcba28]/25 hover:shadow-[#fcba28]/40 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Try Demo <FaArrowRight className="ml-2" />
                  </motion.a>
                  <motion.a
                    href="/pricing"
                    className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-medium border border-white/10 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Pricing
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <FaGraduationCap className="w-8 h-8" />,
                  title: "AI-Powered Learning",
                  description: "Personalized interview preparation with advanced AI technology"
                },
                {
                  icon: <FaBrain className="w-8 h-8" />,
                  title: "Smart Feedback",
                  description: "Real-time analysis and improvement suggestions"
                },
                {
                  icon: <FaRocket className="w-8 h-8" />,
                  title: "Career Growth",
                  description: "Comprehensive resources for career advancement"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="text-[#fcba28] mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 px-4 md:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              How can we help?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400"
            >
              Search our knowledge base or browse by category
            </motion.p>
          </div>

          <FilterSection
            categories={[
              { id: 'all', label: 'All Categories' },
              ...faqCategories.map(cat => ({
                id: cat.id,
                label: cat.title
              }))
            ]}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </section>

      {/* FAQ List Section */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid gap-8">
            <AnimatePresence mode="wait">
              {filteredCategories.map(category => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Category Header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      {category.title}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#fcba28]/20 to-transparent" />
                  </motion.div>

                  {/* FAQ Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {category.faqs.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FAQCard
                          faq={faq}
                          isExpanded={expandedFAQs.includes(faq.id)}
                          onToggle={() => toggleFAQ(faq.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* No Results Message */}
            {filteredCategories.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="inline-block p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
                  <p className="text-xl text-gray-400">
                    {searchQuery
                      ? `No FAQs found matching "${searchQuery}"`
                      : 'No FAQs found in this category'}
                  </p>
                  <motion.button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-gray-400 mb-8">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black rounded-xl font-medium shadow-lg shadow-[#fcba28]/25 hover:shadow-[#fcba28]/40 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Support
              </motion.a>
              <motion.a
                href="/community"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-medium border border-white/10 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Community
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
