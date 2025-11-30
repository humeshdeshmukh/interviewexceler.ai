/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/context/AuthContext';
import {
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

import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { MaxWidthWrapper } from './MaxWidthWrapper';
import { UserButton } from '../features/auth/components/UserButton';
import { UserButtonLoading } from '../features/auth/components/UserButtonLoading';
import { Switch } from './ui/switch';
import { FaSun, FaMoon, FaPalette } from 'react-icons/fa';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

const themeOptions = [
  {
    key: 'dark',
    label: 'Dark',
    icon: <FaMoon className="w-4 h-4 text-blue-400" />,
    class: 'dark',
    vars: {}, // handled by .dark class
  },
  {
    key: 'light',
    label: 'Light',
    icon: <FaSun className="w-4 h-4 text-yellow-400" />,
    class: '',
    vars: {}, // handled by :root
  },
  {
    key: 'grey',
    label: 'Grey',
    icon: <span className="inline-block w-4 h-4 rounded-full bg-gray-400 border border-gray-500" />,
    class: 'theme-grey',
    vars: {
      '--background': '0 0% 92%', // light grey
      '--foreground': '220 60% 30%', // deep blue
      '--primary': '220 60% 30%', // deep blue
      '--primary-foreground': '220 60% 30%', // deep blue
      '--secondary': '0 0% 85%', // mid grey
      '--secondary-foreground': '220 60% 30%', // deep blue
      '--muted': '0 0% 80%', // muted grey
      '--muted-foreground': '220 60% 30%', // deep blue
      '--accent': '220 60% 30%', // deep blue
      '--accent-foreground': '0 0% 92%', // light grey
      '--destructive': '0 0% 40%', // dark grey
      '--destructive-foreground': '220 60% 30%', // deep blue
      '--border': '0 0% 70%', // border grey
      '--input': '0 0% 95%', // very light grey
      '--ring': '220 60% 30%', // deep blue
      '--card': '0 0% 97%', // very light grey
      '--card-foreground': '220 60% 30%', // deep blue
      '--popover': '0 0% 97%', // very light grey
      '--popover-foreground': '220 60% 30%', // deep blue
    },
  },
];

function applyTheme(themeKey: string) {
  const theme = themeOptions.find(t => t.key === themeKey);
  if (!theme) return;
  // Remove all theme classes
  document.documentElement.classList.remove('dark', 'theme-monochrome', 'theme-grey');
  if (theme.key === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme.key === 'grey') {
    document.documentElement.classList.add('theme-grey');
  }
  // Set CSS vars for custom themes
  Object.entries(theme.vars).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
  // Reset vars for non-custom themes
  if (!theme.vars || Object.keys(theme.vars).length === 0) {
    document.documentElement.removeAttribute('style');
  }
}

//Social Links


// Navigation Menus with icons
const navigationMenus = [
  {
    title: 'Products',
    icon: FaCube,
    links: [
      { href: '/products/resume-builder/features/ai-resume', label: 'AI Resume Builder', icon: FaFile, description: 'Build ATS-friendly resumes instantly with AI' },
      { href: '/products/mock-interviews/visual-simulation/simulation', label: 'AI Mock Interviews', icon: FaUserTie, description: 'Real-time video interview practice with AI feedback' },
      { href: '/products/Practice-Tests?view=ai', label: 'AI Practice Tests', icon: FaClipboard, description: 'Master your domain with AI-generated tests' },
    ],
  },
  {
    title: 'Services',
    icon: FaGear,
    links: [
      { href: '/services/consultation/ai', label: 'AI Career Consultation', icon: FaComments, description: 'Get expert career guidance from AI' },
      { href: '/services/cv-revision/ai', label: 'AI CV Revision', icon: FaPen, description: 'Professional AI-powered CV review' },
      { href: '/services/salary-negotiation/ai', label: 'AI Salary Negotiation', icon: FaHandshake, description: 'Master negotiation strategies with AI' },
    ],
  },
  {
    title: 'Company',
    icon: FaBuilding,
    links: [
      { href: '/company/about', label: 'About Us', icon: FaInfo, description: 'Our story and mission' },
      { href: '/company/contact', label: 'Contact Us', icon: FaEnvelope, description: 'Get in touch with us' },
    ],
  },
];

const dropdownClasses = cn(
  'absolute hidden group-hover:flex flex-col mt-4 w-[480px] py-6 px-4 rounded-2xl shadow-2xl',
  'backdrop-blur-2xl bg-background/80 border border-border/10',
  'transition-all duration-400 transform scale-98 group-hover:scale-100 opacity-0 group-hover:opacity-100 z-50',
  'before:content-[""] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/5 before:to-white/5 before:backdrop-blur-xl before:-z-10',
  '[&.active]:flex [&.active]:opacity-100 [&.active]:scale-100'
);

const menuItemClasses = cn(
  'relative flex items-start gap-4 p-4 rounded-xl transition-all duration-400',
  'hover:bg-[#fcba28]/5 hover:backdrop-blur-lg',
  'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-[#fcba28]/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300',
  'hover:before:opacity-100'
);

export const Header = () => {
  const router = useRouter();
  const { setAuthModalOpen, isAuthenticated, loading } = useAuth();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedMenu, setClickedMenu] = useState<number | null>(null);
  const [theme, setTheme] = useState('dark');

  // Increased timeout duration for smoother interaction
  const HOVER_TIMEOUT = 200; // Opening delay
  const CLOSE_TIMEOUT = 1000; // Closing delay

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const valid = stored && typeof stored === 'string' && themeOptions.find(t => t.key === stored);
    if (valid && stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      setTheme('dark');
      applyTheme('dark');
    }
  }, []);

  const handleThemeChange = (key: string) => {
    setTheme(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', key);
      applyTheme(key);
    }
  };

  // Mount check
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => {
      setIsMounted(false);
      clearTimeout(timeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Click outside handler
  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMounted]);

  // Scroll listener
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!isMounted) return;
    const shouldBeScrolled = latest > 100;
    if (scrolled !== shouldBeScrolled) {
      setScrolled(shouldBeScrolled);
    }
  });

  // Enhanced menu hover handler with improved timing and click state
  const handleMenuHover = useCallback((index: number | null) => {
    if (!isMounted || isNavigating || clickedMenu !== null) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (index === null) {
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, CLOSE_TIMEOUT);
    } else {
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(index);
      }, HOVER_TIMEOUT);
    }
  }, [isMounted, isNavigating, clickedMenu, HOVER_TIMEOUT, CLOSE_TIMEOUT]);

  // Handle menu click
  const handleMenuClick = useCallback((index: number) => {
    if (clickedMenu === index) {
      setClickedMenu(null);
      setActiveMenu(null);
    } else {
      setClickedMenu(index);
      setActiveMenu(index);
    }
  }, [clickedMenu, setActiveMenu, setClickedMenu]);

  // Navigation handler
  const handleMenuClickNavigate = useCallback((href: string) => {
    if (isNavigating) return;

    setIsNavigating(true);
    setActiveMenu(null);

    try {
      router.push(href);
    } finally {
      // Reset navigation state after a short delay
      setTimeout(() => {
        setIsNavigating(false);
      }, 100);
    }
  }, [router, isNavigating, setActiveMenu, setIsNavigating]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, href?: string) => {
    if (!isMounted || isNavigating) return;

    if (event.key === 'Enter' && href) {
      handleMenuClickNavigate(href);
    } else if (event.key === 'Escape') {
      setActiveMenu(null);
    }
  }, [handleMenuClickNavigate, isMounted, isNavigating, setActiveMenu]);

  if (!isMounted) {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 py-4 md:py-6 bg-background">
        <MaxWidthWrapper>
          <nav className="flex items-center justify-between">
            <Logo className="flex-shrink-0" />
          </nav>
        </MaxWidthWrapper>
      </div>
    );
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: '-100%' }}
      animate={{ opacity: 1, y: '0%' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed left-0 right-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-2xl border-b border-border/10 shadow-lg'
          : 'bg-background'
      )}
    >
      {/* Theme Switcher: Desktop floating, Mobile inline */}
      <div>
        {/* Desktop floating theme switcher */}
        <div className="hidden md:block fixed top-4 right-4 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Select theme"
                className="rounded-full p-2 shadow bg-background border border-border/10 flex items-center justify-center transition-all duration-300 hover:bg-[#fcba28]/20 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                style={{ minWidth: 36, minHeight: 36 }}
              >
                <FaPalette className="w-5 h-5 text-[#fcba28]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {themeOptions.map(opt => (
                <DropdownMenuItem
                  key={opt.key}
                  onClick={() => handleThemeChange(opt.key)}
                  className="flex items-center gap-2"
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                  {theme === opt.key && <span className="ml-auto text-xs text-[#fcba28]">Selected</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* End Floating Multi-Theme Selector */}
      <MaxWidthWrapper>
        <nav className="flex items-center h-20 justify-between relative" role="navigation" ref={menuRef}>
          {/* Logo with hover effect */}
          <motion.div
            className="flex items-center md:mr-8 lg:mr-10 xl:mr-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo className="flex-shrink-0" />
          </motion.div>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ul className="flex items-center gap-8 lg:gap-10 xl:gap-12" role="menubar">
              {navigationMenus.map((menu, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => handleMenuHover(idx)}
                  onMouseLeave={() => handleMenuHover(null)}
                  role="menuitem"
                  onKeyDown={(e) => handleKeyDown(e)}
                  tabIndex={0}
                >
                  <motion.button
                    className="flex items-center gap-2 py-2 text-base text-muted-foreground hover:text-[#fcba28] font-medium transition-all duration-300 group"
                    aria-expanded={activeMenu === idx}
                    aria-haspopup="true"
                    aria-label={menu.title}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMenuClick(idx)}
                  >
                    {menu.icon && (
                      <menu.icon className="text-lg opacity-70 group-hover:opacity-100 group-hover:text-[#fcba28] transition-colors" />
                    )}
                    {menu.title}
                  </motion.button>

                  <AnimatePresence mode="wait">
                    {activeMenu === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={cn(dropdownClasses, activeMenu === idx && 'active')}
                        role="menu"
                      >
                        <div className="relative grid grid-cols-1 gap-1 px-2">
                          {menu.links.map((link, linkIdx) => (
                            <motion.div
                              key={linkIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: linkIdx * 0.05 }}
                              className="group/item"
                            >
                              <Link
                                href={link.href}
                                onClick={() => handleMenuClickNavigate(link.href)}
                                onKeyDown={(e) => handleKeyDown(e, link.href)}
                                className={menuItemClasses}
                                role="menuitem"
                                tabIndex={0}
                              >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fcba28]/5 group-hover/item:bg-[#fcba28]/10 text-[#fcba28] transition-colors">
                                  {link.icon && <link.icon className="h-5 w-5" />}
                                </span>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-white group-hover/item:text-[#fcba28] transition-colors mb-1">
                                    {link.label}
                                  </div>
                                  {link.description && (
                                    <div className="text-xs text-muted-foreground group-hover/item:text-white/70 transition-colors line-clamp-2">
                                      {link.description}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </ul>
          </div>

          {/* Desktop Social Links & User Actions - Right Aligned */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5 xl:gap-6 ml-auto">
            {loading ? (
              <UserButtonLoading />
            ) : isAuthenticated ? (
              <UserButton />
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !isNavigating && setAuthModalOpen(true)}
                className="px-4 py-1.5 text-sm rounded-md font-medium bg-[#fcba28] text-background hover:bg-[#fcba28]/90 transition-all duration-300 shadow-sm border border-[#fcba28]/30"
              >
                Sign in
              </motion.button>
            )}
          </div>
          {/* Mobile Menu & Actions */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            {/* Inline theme switcher for mobile */}
            <div className="flex md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label="Select theme"
                    className="rounded-full p-2 bg-background border border-border/20 flex items-center justify-center transition-all duration-300 hover:bg-[#fcba28]/20 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                  >
                    <FaPalette className="w-5 h-5 text-[#fcba28]" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {themeOptions.map(opt => (
                    <DropdownMenuItem
                      key={opt.key}
                      onClick={() => handleThemeChange(opt.key)}
                      className="flex items-center gap-2"
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                      {theme === opt.key && <span className="ml-auto text-xs text-[#fcba28]">Selected</span>}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {loading ? (
              <UserButtonLoading />
            ) : isAuthenticated ? (
              <UserButton />
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !isNavigating && setAuthModalOpen(true)}
                className="px-3 py-1 text-xs rounded-lg font-medium bg-[#fcba28] text-background hover:bg-[#fcba28]/90 transition-all duration-300"
              >
                Sign in
              </motion.button>
            )}

            <div className="h-5 w-px bg-border/10" />
            <MobileMenu />
          </div>
        </nav>
      </MaxWidthWrapper>
    </motion.header>
  );
};
