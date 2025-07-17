'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterSectionProps {
  categories: FilterOption[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterSection({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: FilterSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="relative z-10">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 text-white"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            <FaFilter className="text-[#fcba28]" />
            <span>Filter FAQs</span>
          </span>
          <motion.div
            animate={{ rotate: isFilterOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isFilterOpen ? <FaTimes /> : <FaFilter />}
          </motion.div>
        </motion.button>
      </div>

      {/* Filter Content */}
      <motion.div
        className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid lg:grid-cols-[1fr,auto] gap-6 items-start">
          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#fcba28] text-black shadow-lg shadow-[#fcba28]/25'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-shrink-0 w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-11 pr-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 focus:border-[#fcba28] transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-sm text-gray-400"
          >
            <span>Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#fcba28]/10 text-[#fcba28] rounded-lg"
                >
                  {categories.find(c => c.id === selectedCategory)?.label}
                  <button
                    onClick={() => onCategoryChange('all')}
                    className="ml-1 hover:text-white transition-colors"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </motion.span>
              )}
              {searchQuery && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 text-white/70 rounded-lg"
                >
                  Search: "{searchQuery}"
                  <button
                    onClick={() => onSearchChange('')}
                    className="ml-1 hover:text-white transition-colors"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
