'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { FaLinkedin, FaXTwitter, FaGithub, FaDiscord } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";

const footerLinks = {
    products: [
        { name: "Resume Builder", href: "/products/resume-builder" },
        { name: "Mock Interviews", href: "/products/mock-interviews" },
        { name: "Aptitude Practice", href: "/products/aptitude-ai" },
        { name: "Practice Tests", href: "/products/Practice-Tests" }
    ],
    services: [
        { name: "Career Consultation", href: "/services/consultation" },
        { name: "CV Revision", href: "/services/cv-revision" },
        { name: "Salary Negotiation", href: "/services/salary-negotiation" }
    ],
    resources: [
        { name: "Blog", href: "/resources/blog" },
        { name: "FAQ", href: "/resources/faq" },
        { name: "Newsletters", href: "/resources/newsletters" }
    ],
    company: [
        { name: "About Us", href: "/company/about" },
        { name: "Careers", href: "/company/careers" },
        { name: "Contact", href: "/company/contact" }
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms", href: "/terms" },
        { name: "Disclosure", href: "/disclosure" }
    ],
    social: [
        { name: "Twitter", href: "https://twitter.com/", icon: FaXTwitter },
        { name: "LinkedIn", href: "https://linkedin.com/", icon: FaLinkedin },
        { name: "GitHub", href: "https://github.com/", icon: FaGithub },
        { name: "Discord", href: "https://discord.gg/", icon: FaDiscord }
    ]
};

export function Footer() {
    const year = new Date().getFullYear();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) return null;

    return (
        <footer className="mt-auto border-t border-border bg-background text-foreground">
            <MaxWidthWrapper>
                <div className="py-16 md:py-24">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Logo and Description */}
                        {/* @ts-expect-error className is valid on motion.div */}
                        <motion.div
                          className="col-span-2 lg:col-span-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Logo className="mb-6" />
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                              Your AI-powered interview companion. Master your interview skills, build confidence, and accelerate your career growth with personalized feedback and expert guidance.
                          </p>
                          <div className="flex items-center gap-4">
                              {footerLinks.social.map((link) => (
                                  <motion.div
                                      key={link.name}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                  >
                                      <Link
                                          href={link.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-muted-foreground hover:text-purple-400 transition-all duration-200"
                                          aria-label={link.name}
                                      >
                                          <link.icon className="w-5 h-5" />
                                      </Link>
                                  </motion.div>
                              ))}
                          </div>
                        </motion.div>

                        {/* Links Sections */}
                        <AnimatePresence>
                            {Object.entries(footerLinks).map(([category, links], index) => (
                                category !== 'social' && (
                                    // @ts-expect-error className is valid on motion.div
                                    <motion.div
                                        key={category}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex flex-col space-y-4"
                                    >
                                        <h3 className="font-semibold text-foreground capitalize">
                                            {category}
                                        </h3>
                                        <ul className="space-y-3">
                                            {links.map((link: any) => (
                                                <motion.li
                                                    key={link.name}
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        className="text-sm text-muted-foreground hover:text-purple-400 transition-all duration-200"
                                                        {...(link.href.startsWith('http') ? {
                                                            target: "_blank",
                                                            rel: "noopener noreferrer"
                                                        } : {})}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Section */}
                    {/* @ts-expect-error className is valid on motion.div */}
                    <motion.div
                        className="mt-16 pt-8 border-t border-border"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* @ts-expect-error className is valid on motion.p */}
                            <motion.p
                                className="text-sm text-muted-foreground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                {year} InterviewExceler.Ai. All rights reserved.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
}
