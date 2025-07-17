"use client"

import { useState, useMemo } from 'react';
import { BlogCard } from './components/BlogCard';
import { BlogFilter } from './components/BlogFilter';
import { Pagination } from './components/Pagination';
import { blogPosts, POSTS_PER_PAGE } from './data/posts';
import { BlogFilterState } from './types/blog';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaChartLine, FaBook, FaUsers } from 'react-icons/fa';

export default function BlogPage() {
  const [filter, setFilter] = useState<BlogFilterState>({
    search: '',
    category: 'All',
    page: 1,
  });

  // Filter and paginate posts
  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter((post) => {
        const matchesSearch = 
          post.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(filter.search.toLowerCase()) ||
          post.author.toLowerCase().includes(filter.search.toLowerCase());
        const matchesCategory = filter.category === 'All' || post.category === filter.category;
        return matchesSearch && matchesCategory;
      });
  }, [filter.search, filter.category]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (filter.page - 1) * POSTS_PER_PAGE,
    filter.page * POSTS_PER_PAGE
  );

  const handleFilterChange = (newFilter: Partial<BlogFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilter((prev) => ({ ...prev, page }));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text"
          >
            Tech Career Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Expert insights, practical tips, and comprehensive guides to help you advance your tech career
          </motion.p>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: FaBook, label: 'Articles', value: blogPosts.length },
            { icon: FaUsers, label: 'Monthly Readers', value: '50K+' },
            { icon: FaGraduationCap, label: 'Success Stories', value: '1000+' },
            { icon: FaChartLine, label: 'Career Growth', value: '95%' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg"
            > */}
              {/* Background effects */}
              {/* <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div> */}

              {/* Content */}
              {/* <div className="relative">
                <stat.icon className="w-8 h-8 text-[#fcba28] mb-4" />
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div> */}

        {/* Filters */}
        <BlogFilter filter={filter} onFilterChange={handleFilterChange} />

        {/* Blog Posts */}
        <AnimatePresence mode="wait">
          {currentPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-400">No posts found matching your criteria</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 md:grid-cols-2 mb-12"
            >
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={filter.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
