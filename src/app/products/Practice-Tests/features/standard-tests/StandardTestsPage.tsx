"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSearch, FaFilter, FaClock, FaChartBar, FaLightbulb, FaCode, FaUsers, FaBriefcase } from 'react-icons/fa';
import { useTest } from '../../context/TestContext';
import { TestLoader } from '../../utils/testLoader';
import LoadingSpinner from '../../components/LoadingSpinner';
import TestView from './components/TestView';
import { Test, Category } from '../../utils/types';

interface StandardTestsPageProps {
  onBack: () => void;
}

const categoryIcons: { [key: string]: any } = {
  technical: FaCode,
  behavioral: FaUsers,
  'non-technical': FaBriefcase
};

export default function StandardTestsPage({ onBack }: StandardTestsPageProps) {
  const { state, dispatch } = useTest();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    duration: 'all'
  });

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      setLoading(true);
      const testLoader = TestLoader.getInstance();
      const categories = await testLoader.getCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
      const tests = await testLoader.getAllTests();
      dispatch({ type: 'SET_TESTS', payload: tests });
    } catch (error) {
      console.error('Error loading tests:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load tests' });
    } finally {
      setLoading(false);
    }
  };

  const handleTestSelect = (test: Test) => {
    dispatch({ type: 'SET_SELECTED_TEST', payload: test });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const filteredTests = state.tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || test.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || test.subcategory === selectedSubcategory;
    const matchesDifficulty = filters.difficulty === 'all' || test.difficulty === filters.difficulty;
    const matchesDuration = filters.duration === 'all' ||
      (filters.duration === '30' && test.timeLimit <= 30) ||
      (filters.duration === '60' && test.timeLimit <= 60) ||
      (filters.duration === '90' && test.timeLimit <= 90);

    return matchesSearch && matchesCategory && matchesSubcategory && matchesDifficulty && matchesDuration;
  });

  if (state.selectedTest) {
    return <TestView test={state.selectedTest} onBack={() => dispatch({ type: 'CLEAR_SELECTED_TEST' })} />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <FaArrowLeft className="mr-2" />
          Back to Options
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Practice Tests Library
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our comprehensive collection of interview practice tests across various categories
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative mb-4">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#fcba28] text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10 flex items-center gap-2"
            >
              <FaFilter className="w-4 h-4" />
              {view === 'grid' ? 'Grid View' : 'List View'}
            </button>

            <select
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={filters.duration}
              onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10"
            >
              <option value="all">All Durations</option>
              <option value="30">30 mins or less</option>
              <option value="60">60 mins or less</option>
              <option value="90">90 mins or less</option>
            </select>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {state.categories.map((category) => {
              const Icon = categoryIcons[category.id] || FaLightbulb;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`p-6 rounded-xl text-left transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-gray-900'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  } border border-white/10`}
                >
                  <Icon className="w-8 h-8 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-80">{category.subcategories.length} subcategories</p>
                </motion.button>
              );
            })}
          </div>

          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {state.categories
                .find(c => c.id === selectedCategory)
                ?.subcategories.map((subcategory) => (
                  <motion.button
                    key={subcategory.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubcategorySelect(subcategory.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-[#fcba28] text-gray-900'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    } border border-white/10`}
                  >
                    {subcategory.name}
                  </motion.button>
                ))}
            </motion.div>
          )}
        </motion.div>

        {/* Tests Grid/List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${
              view === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }`}
          >
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleTestSelect(test)}
                  className="cursor-pointer"
                >
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{test.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        test.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                        test.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {test.difficulty}
                      </span>
                      
                      <span className="flex items-center gap-2 text-gray-400 text-sm">
                        <FaChartBar className="w-4 h-4" />
                        {test.totalQuestions} questions
                      </span>
                      
                      <span className="flex items-center gap-2 text-gray-400 text-sm">
                        <FaClock className="w-4 h-4" />
                        {test.timeLimit} mins
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FaSearch className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tests found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
