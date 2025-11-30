'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaBars,
  FaTimes,
  FaFile,
  FaUserTie,
  FaRobot,
  FaChartLine,
  FaCircleQuestion,
  FaClipboard,
  FaComments,
  FaPen,
  FaListCheck,
  FaChalkboard,
  FaCircleUser,
  FaHandshake,
  FaBook,
  FaNewspaper,
  FaVideo,
  FaDesktop,
  FaEnvelope,
  FaUsers,
  FaCalendar,
  FaUserGraduate,
  FaTrophy,
  FaCode,
  FaBuilding,
  FaInfo,
  FaBriefcase,
  FaCube,
  FaGear,
  FaBrain
} from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

// Social Links and navigationMenus arrays remain the same...
// Social Links
const socialLinks = [
  { href: 'https://x.com/InterviewExceler', icon: FaTwitter, label: 'Twitter' },
  { href: 'https://linkedin.com/company/InterviewExceler', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://facebook.com/InterviewExceler', icon: FaFacebook, label: 'Facebook' },
  { href: 'https://instagram.com/InterviewExceler', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://github.com/InterviewExceler', icon: FaGithub, label: 'GitHub' },
];

// Navigation Menus with icons
const navigationMenus = [
  {
    title: 'Products',
    icon: FaCube,
    links: [
      { href: '/products/resume-builder', label: 'Resume Builder', icon: FaFile, description: 'Create professional resumes with AI assistance' },
      { href: '/products/mock-interviews', label: 'Mock Interviews', icon: FaUserTie, description: 'Practice with AI-powered interview simulations' },
      // { href: '/products/ai-feedback', label: 'AI Feedback', icon: FaRobot, description: 'Get instant feedback on your interview responses' },
      // { href: '/products/coding-practice', label: 'Coding Practice', icon: FaCode, description: 'Improve your coding skills with practice problems' },
      { href: '/products/aptitude', label: 'Aptitude Practice', icon: FaBrain, description: 'Enhance your logical and numerical abilities' },
      // { href: '/products/interview-questions', label: 'Interview Questions', icon: FaCircleQuestion, description: 'Access curated interview questions' },
      { href: '/products/Practice-Tests', label: 'Practice Tests', icon: FaClipboard, description: 'Take industry-specific practice tests' },
    ],
  },
  {
    title: 'Services',
    icon: FaGear,
    links: [
      { href: '/services/consultation', label: 'Career Consultation', icon: FaComments, description: 'Get expert career guidance' },
      { href: '/services/cv-revision', label: 'CV Revision', icon: FaPen, description: 'Professional CV review and optimization' },
      // { href: '/services/mock-tests', label: 'Mock Tests', icon: FaListCheck, description: 'Practice with real interview scenarios' },
      // { href: '/services/interview-coaching', label: 'Interview Coaching', icon: FaChalkboard, description: 'One-on-one interview preparation' },
      // { href: '/services/personal-branding', label: 'Personal Branding', icon: FaCircleUser, description: 'Build your professional brand' },
      // { href: '/services/salary-negotiation', label: 'Salary Negotiation', icon: FaHandshake, description: 'Learn effective negotiation strategies' },
    ],
  },
  {
    title: 'Resources',
    icon: FaBook,
    links: [
      { href: '/resources/blog', label: 'Blog', icon: FaNewspaper, description: 'Latest articles and insights' },
      { href: '/resources/faq', label: 'FAQ', icon: FaCircleQuestion, description: 'Frequently asked questions' },
      // { href: '/resources/ebooks', label: 'Ebooks & Guides', icon: FaBook, description: 'In-depth learning materials' },
      // { href: '/resources/tutorials', label: 'Tutorials', icon: FaVideo, description: 'Step-by-step video guides' },
      // { href: '/resources/webinars', label: 'Webinars', icon: FaDesktop, description: 'Live and recorded sessions' },
      { href: '/resources/newsletters', label: 'Newsletters', icon: FaEnvelope, description: 'Stay updated with our newsletter' },
    ],
  },
  // {
  //   title: 'Community',
  //   icon: FaUsers,
  //   links: [
  //     { href: '/community/forums', label: 'Forums', icon: FaComments, description: 'Join the discussion' },
  //     { href: '/community/events', label: 'Events', icon: FaCalendar, description: 'Upcoming community events' },
  //     { href: '/community/mentorship', label: 'Mentorship', icon: FaUserGraduate, description: 'Connect with mentors' },
  //     { href: '/community/success-stories', label: 'Success Stories', icon: FaTrophy, description: 'Community achievements' },
  //     { href: '/community/meetups', label: 'Meetups', icon: FaHandshake, description: 'Local community gatherings' },
  //     { href: '/community/hackathons', label: 'Hackathons', icon: FaCode, description: 'Coding competitions' },
  //   ],
  // },
  {
    title: 'Company',
    icon: FaBuilding,
    links: [
      { href: '/company/about', label: 'About Us', icon: FaInfo, description: 'Our story and mission' },
      { href: '/company/careers', label: 'Careers', icon: FaBriefcase, description: 'Join our team' },
      // { href: '/company/partners', label: 'Partners', icon: FaHandshake, description: 'Our trusted partners' },
      { href: '/company/contact', label: 'Contact Us', icon: FaEnvelope, description: 'Get in touch' },
      // { href: '/company/press', label: 'Press', icon: FaNewspaper, description: 'Media coverage' },
      // { href: '/company/investors', label: 'Investors', icon: FaChartLine, description: 'Investment opportunities' },
    ],
  },
];

// Mobile Menu Component
export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('MobileMenu mounted');
    setMounted(true);
    return () => {
      console.log('MobileMenu unmounted');
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    console.log('MobileMenu open state changed:', isOpen);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        console.log('Clicked outside, closing menu');
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const menuContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={cn(
            'fixed top-0 left-0 w-3/4 h-full bg-background p-6 z-50 shadow-lg',
            'flex flex-col gap-6 overflow-y-auto transition-all duration-300'
          )}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 transition-all duration-300"
          >
            <FaTimes size={24} />
          </Button>

          {/* Navigation Links */}
          <div className="flex flex-col gap-6 mt-12">
            {navigationMenus.map((menu, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-foreground transition-all duration-300">
                  <menu.icon className="inline-block mr-2 h-5 w-5" />
                  {menu.title}
                </h2>
                {menu.links.map((link, linkIdx) => (
                  <Link
                    key={linkIdx}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="flex justify-between gap-4 mt-auto">
            {socialLinks.map((social, idx) => (
              <Link 
                key={idx} 
                href={social.href} 
                target="_blank" 
                aria-label={social.label}
                onClick={() => setIsOpen(false)}
              >
                <social.icon
                  className="text-foreground hover:text-primary transition-all duration-300"
                  size={20}
                />
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        className="text-foreground transition-all duration-300"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </Button>

      {mounted && createPortal(menuContent, document.body)}
    </div>
  );
};
