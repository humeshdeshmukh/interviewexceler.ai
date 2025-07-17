import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface ConsultationOptionProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  icon: string;
  link: string;
  gradient: string;
}

export default function ConsultationOption({
  title,
  description,
  features,
  price,
  icon,
  link,
  gradient,
}: ConsultationOptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-lg ${gradient} p-8 hover:scale-[1.02] transition-all duration-300`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Icon and Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6">{description}</p>

      {/* Price */}
      <div className="mb-6">
        <span className="text-3xl font-bold text-white">{price}</span>
        {price !== 'Free' && <span className="text-gray-400 ml-2">/session</span>}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-gray-300">
            <svg
              className="w-5 h-5 text-[#fcba28]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link href={link}>
        <button className="w-full py-3 px-6 rounded-lg bg-white text-black font-semibold hover:bg-[#fcba28] transition-colors duration-200 flex items-center justify-center gap-2 group">
          Get Started
          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </Link>
    </motion.div>
  );
}
