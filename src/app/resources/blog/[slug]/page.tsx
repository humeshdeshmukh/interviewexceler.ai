'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Tag, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getRelatedPosts } from '../data/posts';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;

    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(slug, post.category);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fcba28]/10 to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Back Link */}
                        <Link
                            href="/resources/blog"
                            className="inline-flex items-center gap-2 text-[#fcba28] hover:text-[#fcba28]/80 mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        {/* Category Badge */}
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#fcba28]/20 text-[#fcba28] mb-4">
                            {post.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-6 text-gray-400 text-sm mb-8">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {post.excerpt}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                            {/* Main Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="lg:col-span-3 prose prose-invert prose-lg max-w-none
                  prose-headings:text-white 
                  prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
                  prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-[#fcba28]
                  prose-h3:text-xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:text-gray-300 prose-li:mb-2
                  prose-ol:text-gray-300
                  prose-strong:text-white
                  prose-a:text-[#fcba28] prose-a:no-underline hover:prose-a:underline
                  prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700"
                            >
                                <ReactMarkdown>
                                    {post.content || ''}
                                </ReactMarkdown>
                            </motion.div>

                            {/* Sidebar */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="lg:col-span-1"
                            >
                                {/* Keywords/Tags */}
                                {post.keywords && post.keywords.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-[#fcba28]" />
                                            Topics
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {post.keywords.map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Referral Links */}
                                {post.referralLinks && post.referralLinks.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                            <ExternalLink className="w-4 h-4 text-[#fcba28]" />
                                            Resources
                                        </h3>
                                        <div className="space-y-3">
                                            {post.referralLinks.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-[#fcba28]/50 transition-colors"
                                                >
                                                    <div className="font-medium text-white text-sm">{link.title}</div>
                                                    <div className="text-xs text-gray-400 mt-1">{link.description}</div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-12 border-t border-gray-800">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        href={relatedPost.link}
                                        className="block p-4 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-[#fcba28]/50 transition-all hover:-translate-y-1"
                                    >
                                        <span className="text-xs text-[#fcba28] font-medium">{relatedPost.category}</span>
                                        <h3 className="text-lg font-semibold text-white mt-2 line-clamp-2">{relatedPost.title}</h3>
                                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{relatedPost.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 border-t border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Level Up Your Interview Skills?
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Practice with our AI-powered mock interviews and get personalized feedback.
                        </p>
                        <Link
                            href="/products/mock-interviews"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#fcba28] text-black font-semibold rounded-lg hover:bg-[#fcba28]/90 transition-colors"
                        >
                            Start Free Mock Interview
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
