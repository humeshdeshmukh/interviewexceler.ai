"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'professional' | 'creative' | 'simple' | 'modern' | 'academic';
  popularityScore: number;
  suitableFor: string[];
}

const defaultTemplates: ResumeTemplate[] = [
  {
    id: 'professional-1',
    name: 'Executive Pro',
    description: 'Clean and professional template perfect for corporate positions',
    preview: '/templates/professional-1.png',
    category: 'professional',
    popularityScore: 4.8,
    suitableFor: ['Business', 'Finance', 'Management', 'Consulting']
  },
  {
    id: 'creative-1',
    name: 'Creative Edge',
    description: 'Modern and eye-catching design for creative professionals',
    preview: '/templates/creative-1.png',
    category: 'creative',
    popularityScore: 4.7,
    suitableFor: ['Design', 'Marketing', 'Art', 'Media']
  },
  {
    id: 'simple-1',
    name: 'Minimalist',
    description: 'Clean and straightforward layout that focuses on content',
    preview: '/templates/simple-1.png',
    category: 'simple',
    popularityScore: 4.6,
    suitableFor: ['Entry Level', 'Academic', 'Research']
  }
];

interface TemplateSelectorProps {
  onSelect: (template: ResumeTemplate) => void;
  selectedId?: string;
}

export default function TemplateSelector({ onSelect, selectedId }: TemplateSelectorProps) {
  const [filter, setFilter] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredTemplates = filter === 'all' 
    ? defaultTemplates 
    : defaultTemplates.filter(t => t.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#fcba28]">Choose Your Template</h2>
        <div className="flex gap-2">
          {['all', 'professional', 'creative', 'simple', 'modern'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === category
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${
              selectedId === template.id ? 'ring-4 ring-[#fcba28]' : ''
            }`}
            onHoverStart={() => setHoveredId(template.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => onSelect(template)}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-[400px] object-cover"
            />
            
            <motion.div
              className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredId === template.id || selectedId === template.id ? 1 : 0 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
              <p className="text-gray-300 mb-4">{template.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-white">{template.popularityScore}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {template.suitableFor.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm bg-white/20 rounded-full text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {selectedId === template.id && (
              <div className="absolute top-4 right-4 bg-[#fcba28] text-black px-3 py-1 rounded-full">
                Selected
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
