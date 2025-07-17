"use client";

import Link from 'next/link';
import { FaExternalLinkAlt, FaClock, FaUser, FaLink } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all border border-white/10"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2805_0%,transparent_65%)] blur-xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-sm bg-[#fcba28]/10 text-[#fcba28] rounded-full">
            {post.category}
          </span>
          <div className="flex items-center text-sm text-gray-400">
            <FaClock className="mr-2" />
            {post.readTime}
          </div>
        </div>

        <Link href={post.link} className="block group-hover:scale-[1.02] transition-transform">
          <h2 className="text-2xl font-bold text-white group-hover:text-[#fcba28] transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-400 mt-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center text-sm text-gray-400 mt-4">
          <FaUser className="mr-2" />
          {post.author}
        </div>

        {post.referralLinks && post.referralLinks.length > 0 && (
          <div className="pt-4 mt-4 border-t border-white/10">
            <h3 className="text-sm font-semibold text-[#fcba28] mb-3">Recommended Resources:</h3>
            <div className="space-y-2">
              {post.referralLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/link"
                >
                  <div className="flex items-center">
                    <FaLink className="mr-3 text-[#fcba28]" />
                    <div>
                      <p className="font-medium text-white group-hover/link:text-[#fcba28] transition-colors">
                        {link.title}
                      </p>
                      <p className="text-sm text-gray-400">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <FaExternalLinkAlt className="text-gray-400 group-hover/link:text-[#fcba28] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}

        <Link 
          href={post.link}
          className="inline-flex items-center text-[#fcba28] hover:text-[#fcba28]/70 font-medium mt-4"
        >
          Read more
          <FaExternalLinkAlt className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}
