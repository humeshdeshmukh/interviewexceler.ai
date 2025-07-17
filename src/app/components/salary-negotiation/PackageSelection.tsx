"use client";

import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { PackageType } from '@/app/types/salary-negotiation';
import { PACKAGES } from '@/app/constants/salary-negotiation';

interface PackageSelectionProps {
  selectedPackage: PackageType | null;
  onPackageSelect: (packageType: PackageType) => void;
  onNext: () => void;
}

export function PackageSelection({ selectedPackage, onPackageSelect, onNext }: PackageSelectionProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Package</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(PACKAGES).map(([key, pkg]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden group ${
              selectedPackage === key ? 'transform scale-[1.02] transition-transform duration-300' : ''
            }`}
          >
            <div
              className={`h-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer 
                ${selectedPackage === key
                  ? 'border-[#fcba28] shadow-lg shadow-[#fcba28]/20'
                  : 'border-white/10 hover:border-white/20'
                }
              `}
              onClick={() => onPackageSelect(key as PackageType)}
            >
              {key === 'premium' && (
                <div className="absolute -top-4 -right-12 bg-[#fcba28] text-black px-12 py-1 transform rotate-45">
                  Popular
                </div>
              )}
              
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#fcba28] mb-2">{pkg.name}</h3>
                    <p className="text-gray-400">
                      {key === 'standard' ? 'Essential negotiation support' : 'Comprehensive negotiation strategy'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#fcba28]">{pkg.price}</div>
                    <div className="text-gray-400">one-time</div>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <ul className="space-y-4">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <FaCheckCircle className="text-[#fcba28] mt-1 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => onPackageSelect(key as PackageType)}
                  className={`mt-8 w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2
                    ${selectedPackage === key
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}
                >
                  {selectedPackage === key ? (
                    <>
                      <FaCheckCircle />
                      Selected
                    </>
                  ) : (
                    <>
                      Select Package
                      <FaArrowRight className="text-sm" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mt-12"
      >
        <button
          onClick={onNext}
          disabled={!selectedPackage}
          className={`
            px-8 py-4 rounded-xl font-semibold transition-all duration-300 
            flex items-center justify-center gap-2 min-w-[200px]
            ${selectedPackage
              ? 'bg-[#fcba28] text-black hover:bg-[#fcd978]'
              : 'bg-white/10 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Continue to Form
          <FaArrowRight className={`text-sm transition-transform duration-300 ${selectedPackage ? 'group-hover:translate-x-1' : ''}`} />
        </button>
      </motion.div>
    </motion.div>
  );
}
