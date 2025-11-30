import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  icon = false,
}: ButtonProps) => {
  const baseStyles = `
    px-6 py-3 rounded-lg font-medium transition-all duration-200
    flex items-center gap-2 hover:transform hover:scale-[1.02]
    ${variant === 'primary'
      ? 'bg-[#fcba28] text-black hover:bg-[#fcc541] shadow-lg shadow-[#fcba28]/20'
      : 'bg-white/10 text-white hover:bg-white/20'
    }
    ${className}
  `;

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseStyles}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
