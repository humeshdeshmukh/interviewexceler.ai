import { Newsletter } from '../data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BsClockFill } from 'react-icons/bs';
import { FaUserCircle, FaTag, FaExternalLinkAlt } from 'react-icons/fa';

interface NewsletterCardProps {
  newsletter: Newsletter;
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-[#fcba28]/50 transition-all duration-300"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Featured badge */}
      {newsletter.featured && (
        <div className="absolute top-4 right-4 bg-[#fcba28] text-black px-3 py-1 rounded-full text-sm font-medium">
          Featured
        </div>
      )}

      <div className="relative p-6 space-y-4">
        {/* Category */}
        <div className="flex items-center space-x-2">
          <FaTag className="w-4 h-4 text-[#fcba28]" />
          <span className="text-sm text-[#fcba28]">{newsletter.category}</span>
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-[#fcba28] transition-colors duration-200 mb-2">
            {newsletter.title}
          </h3>
          <p className="text-gray-400 line-clamp-2">{newsletter.description}</p>
        </div>

        {/* Meta information */}
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <BsClockFill />
            <span>{newsletter.readTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTag />
            <span>{newsletter.tags.slice(0, 2).join(', ')}</span>
          </div>
        </div>

        {/* Author */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <FaUserCircle className="w-10 h-10 text-gray-400" />
            <div>
              <p className="text-white font-medium">{newsletter.author.name}</p>
              <p className="text-sm text-gray-400">
                {newsletter.author.role} at {newsletter.author.company}
              </p>
            </div>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          {/* External Link */}
          <a
            href={newsletter.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200"
          >
            Visit Resource
            <FaExternalLinkAlt className="w-3 h-3" />
          </a>

          {/* Referral Links */}
          {newsletter.referralLinks?.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
              title={link.description}
            >
              {link.title}
              <FaExternalLinkAlt className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
