"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Download, Share2, Eye } from 'lucide-react';
import { Button } from '../components/ui';
import { SectionManager } from '../features/ai/components/SectionManager';
import { ResumePreview } from '../features/ai/components/ResumePreview';
import type { ResumeSection, ResumeTemplate, AIAssistResponse } from '../features/ai/types';

const defaultTemplate: ResumeTemplate = {
  id: 'modern-professional',
  name: 'Modern Professional',
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
  color: {
    primary: '#fcba28',
    secondary: '#2a2a2a',
    accent: '#ffffff'
  },
  spacing: {
    sectionGap: '2rem',
    itemGap: '1rem'
  }
};

const defaultSections: ResumeSection[] = [
  {
    id: 'personal',
    type: 'personal',
    title: 'Personal Information',
    content: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: ''
    },
    order: 0,
    isVisible: true,
    aiAssisted: false
  },
  {
    id: 'summary',
    type: 'summary',
    title: 'Professional Summary',
    content: '',
    order: 1,
    isVisible: true,
    aiAssisted: false
  },
  {
    id: 'experience',
    type: 'experience',
    title: 'Work Experience',
    content: [],
    order: 2,
    isVisible: true,
    aiAssisted: false
  }
];

export const ResumeBuilder = () => {
  const [sections, setSections] = useState<ResumeSection[]>(defaultSections);
  const [template, setTemplate] = useState<ResumeTemplate>(defaultTemplate);
  const [previewScale, setPreviewScale] = useState(0.8);
  const [showSettings, setShowSettings] = useState(false);
  const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleAIAssist = async (sectionId: string): Promise<AIAssistResponse> => {
    // This would be replaced with actual API call to AI service
    const section = sections.find(s => s.id === sectionId);
    if (!section) throw new Error('Section not found');

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          suggestions: [
            {
              type: 'improvement',
              content: 'Consider adding more quantifiable achievements to highlight your impact.',
              examples: [
                'Increased team productivity by 35% through implementation of agile methodologies',
                'Led cross-functional team of 8 engineers to deliver project 2 weeks ahead of schedule'
              ]
            },
            {
              type: 'language',
              content: 'Use more action verbs to make your experiences more dynamic.',
              examples: [
                'Spearheaded the development of...',
                'Orchestrated the implementation of...'
              ]
            }
          ],
          analysis: {
            impact: 0.8,
            clarity: 0.9,
            relevance: 0.85,
            atsScore: 0.75
          },
          recommendations: [
            'Add more specific technical skills',
            'Include measurable outcomes',
            'Use industry-specific keywords'
          ]
        });
      }, 1000);
    });
  };

  const handleExport = (format: 'pdf' | 'docx' | 'txt') => {
    // Implementation for exporting resume
    console.log(`Exporting resume as ${format}`);
  };

  const handleShare = () => {
    // Implementation for sharing resume
    console.log('Sharing resume');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Resume Builder</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setActiveView(activeView === 'edit' ? 'preview' : 'edit')}
              >
                <Eye className="w-4 h-4" />
                {activeView === 'edit' ? 'Preview' : 'Edit'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleExport('pdf')}
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                variant="secondary"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={activeView === 'edit' ? 'block' : 'hidden lg:block'}
          >
            <div className="space-y-6">
              <SectionManager
                sections={sections}
                onUpdate={setSections}
                onAIAssist={handleAIAssist}
              />
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              activeView === 'preview' ? 'block' : 'hidden lg:block'
            } lg:sticky lg:top-24`}
          >
            <ResumePreview
              sections={sections}
              template={template}
              scale={previewScale}
              onExport={handleExport}
              onShare={handleShare}
              onPrint={handlePrint}
              onTemplateSettings={() => setShowSettings(true)}
            />
          </motion.div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Template Settings</h2>
            <div className="space-y-4">
              {/* Font Settings */}
              <div>
                <label className="block text-sm font-medium mb-2">Heading Font</label>
                <select
                  value={template.fonts.heading}
                  onChange={(e) => setTemplate({
                    ...template,
                    fonts: { ...template.fonts, heading: e.target.value }
                  })}
                  className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Body Font</label>
                <select
                  value={template.fonts.body}
                  onChange={(e) => setTemplate({
                    ...template,
                    fonts: { ...template.fonts, body: e.target.value }
                  })}
                  className="w-full bg-white/5 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                </select>
              </div>

              {/* Color Settings */}
              <div>
                <label className="block text-sm font-medium mb-2">Primary Color</label>
                <input
                  type="color"
                  value={template.color.primary}
                  onChange={(e) => setTemplate({
                    ...template,
                    color: { ...template.color, primary: e.target.value }
                  })}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Secondary Color</label>
                <input
                  type="color"
                  value={template.color.secondary}
                  onChange={(e) => setTemplate({
                    ...template,
                    color: { ...template.color, secondary: e.target.value }
                  })}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Accent Color</label>
                <input
                  type="color"
                  value={template.color.accent}
                  onChange={(e) => setTemplate({
                    ...template,
                    color: { ...template.color, accent: e.target.value }
                  })}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Preview Scale */}
              <div>
                <label className="block text-sm font-medium mb-2">Preview Scale</label>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.1"
                  value={previewScale}
                  onChange={(e) => setPreviewScale(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowSettings(false)}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
