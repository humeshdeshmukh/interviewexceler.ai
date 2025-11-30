"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaNewspaper, FaUsers, FaBookReader, FaSearch } from "react-icons/fa";
import { newsletters, newsletterCategories, Newsletter } from "./data";
import NewsletterCard from "./components/NewsletterCard";

const ITEMS_PER_PAGE = 9;

export default function Newsletters() {
  const [filter, setFilter] = useState({
    search: "",
    category: "all",
    page: 1,
  });

  // Filter and paginate newsletters
  const filteredNewsletters = useMemo(() => {
    return newsletters.filter((newsletter) => {
      const matchesSearch =
        newsletter.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        newsletter.description.toLowerCase().includes(filter.search.toLowerCase()) ||
        newsletter.author.name.toLowerCase().includes(filter.search.toLowerCase());
      const matchesCategory =
        filter.category === "all" || newsletter.category === filter.category;
      return matchesSearch && matchesCategory;
    });
  }, [filter.search, filter.category]);

  const totalPages = Math.ceil(filteredNewsletters.length / ITEMS_PER_PAGE);
  const currentNewsletters = filteredNewsletters.slice(
    (filter.page - 1) * ITEMS_PER_PAGE,
    filter.page * ITEMS_PER_PAGE
  );

  const stats = [
    { icon: FaNewspaper, label: "Newsletters", value: newsletters.length },
    { icon: FaUsers, label: "Subscribers", value: "15K+" },
    { icon: FaBookReader, label: "Expert Authors", value: "50+" },
  ];

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
            Expert Newsletters
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Stay ahead with curated insights from industry experts, delivered straight to your inbox
          </motion.p>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
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

        {/* Search and Filter Section */}
        <div className="space-y-6 mb-12">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FaSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search newsletters..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fcba28] text-white placeholder-gray-400 backdrop-blur-lg"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value, page: 1 })}
            />
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setFilter({ ...filter, category: "all", page: 1 })}
              className={`relative overflow-hidden group p-4 rounded-lg border transition-all ${
                filter.category === "all"
                  ? "border-[#fcba28] bg-[#fcba28]/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="relative">
                <h3 className="font-medium text-white mb-1">All</h3>
                <p className="text-sm text-gray-400">Browse all newsletters</p>
              </div>
            </button>
            {newsletterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter({ ...filter, category, page: 1 })}
                className={`relative overflow-hidden group p-4 rounded-lg border transition-all ${
                  filter.category === category
                    ? "border-[#fcba28] bg-[#fcba28]/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative">
                  <h3 className="font-medium text-white mb-1">{category}</h3>
                  <p className="text-sm text-gray-400">Browse {category.toLowerCase()}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        {filter.category === "all" && filter.search === "" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Newsletters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsletters
                .filter((n) => n.featured)
                .map((newsletter) => (
                  <NewsletterCard key={newsletter.id} newsletter={newsletter} />
                ))}
            </div>
          </div>
        )}

        {/* All Newsletters */}
        <AnimatePresence mode="wait">
          {currentNewsletters.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-400">No newsletters found matching your criteria</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentNewsletters.map((newsletter) => (
                <NewsletterCard key={newsletter.id} newsletter={newsletter} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFilter({ ...filter, page: i + 1 })}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter.page === i + 1
                      ? "bg-[#fcba28] text-black"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
