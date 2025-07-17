"use client";

import { motion } from 'framer-motion';
import { Star, Clock, Award, CheckCircle2, Languages } from 'lucide-react';
import { Button } from '../../../components/ui';
import type { Writer } from '../types';

interface WriterProfileProps {
  writer: Writer;
  onSchedule: (writer: Writer) => void;
}

export const WriterProfile = ({ writer, onSchedule }: WriterProfileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-xl p-6 space-y-6"
    >
      {/* Writer Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{writer.name}</h3>
          <p className="text-[#fcba28] text-sm">{writer.title}</p>
        </div>
        <span className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${writer.availability === 'Available' ? 'bg-green-500/20 text-green-500' :
            writer.availability === 'Limited' ? 'bg-yellow-500/20 text-yellow-500' :
            'bg-red-500/20 text-red-500'}
        `}>
          {writer.availability}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-[#fcba28]" />
          <div>
            <span className="font-medium">{writer.rating}</span>
            <span className="text-sm text-white/60"> ({writer.reviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#fcba28]" />
          <span className="text-sm">{writer.experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-[#fcba28]" />
          <span className="text-sm">{writer.languages.length} languages</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/80">{writer.description}</p>

      {/* Specialties */}
      <div>
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#fcba28]" />
          Specialties
        </h4>
        <div className="flex flex-wrap gap-2">
          {writer.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-2 py-1 bg-white/10 rounded-full text-xs"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h4 className="font-medium mb-2">Certifications</h4>
        <ul className="space-y-1">
          {writer.certifications.map((cert) => (
            <li key={cert} className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircle2 className="w-4 h-4 text-[#fcba28]" />
              {cert}
            </li>
          ))}
        </ul>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(writer.packages).map(([key, pkg]) => (
          <div
            key={key}
            className={`p-4 rounded-lg relative ${
              pkg.isPopular ? 'bg-[#fcba28]/20' : 'bg-white/5'
            }`}
          >
            {pkg.isPopular && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-[#fcba28] text-black px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}
            <div className="text-center">
              <h5 className="font-medium mb-1">{pkg.name}</h5>
              <p className="text-2xl font-bold mb-1">${pkg.price}</p>
              <p className="text-xs text-white/60">{pkg.turnaround}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button
        variant="primary"
        className="w-full"
        onClick={() => onSchedule(writer)}
      >
        Schedule Consultation
      </Button>
    </motion.div>
  );
};
