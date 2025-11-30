"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGripLines, FaPlus, FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { nanoid } from 'nanoid';

type SectionType = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'interests';

interface Section {
  id: string;
  type: SectionType;
  title: string;
  content: Record<string, string | number | string[]>;
  order: number;
}

interface SectionEditorProps {
  sections: Section[];
  onUpdate: (sections: Section[]) => void;
}

export default function SectionEditor({ sections, onUpdate }: SectionEditorProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedSection(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedSection || draggedSection === targetId) return;

    const updatedSections = [...sections];
    const draggedIndex = sections.findIndex(s => s.id === draggedSection);
    const targetIndex = sections.findIndex(s => s.id === targetId);

    const [draggedItem] = updatedSections.splice(draggedIndex, 1);
    updatedSections.splice(targetIndex, 0, draggedItem);

    updatedSections.forEach((section, index) => {
      section.order = index;
    });

    onUpdate(updatedSections);
    setDraggedSection(null);
  };

  const addSection = (type: SectionType) => {
    const newSection: Section = {
      id: nanoid(),
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: createEmptyContent(type),
      order: sections.length
    };

    onUpdate([...sections, newSection]);
  };

  const deleteSection = (id: string) => {
    const updatedSections = sections.filter(s => s.id !== id);
    updatedSections.forEach((section, index) => {
      section.order = index;
    });
    onUpdate(updatedSections);
  };

  const updateSectionContent = (id: string, content: { [key: string]: string | number | string[] }) => {
    const updatedSections = sections.map(section =>
      section.id === id ? { ...section, content } : section
    );
    onUpdate(updatedSections);
  };

  return (
    <div className="space-y-4 p-4">
      {/* Section List */}
      <AnimatePresence>
        {sections.sort((a, b) => a.order - b.order).map(section => (
          <motion.div
            key={section.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 rounded-lg p-4"
            draggable
            onDragStart={() => handleDragStart(section.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(section.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaGripLines className="text-gray-400 cursor-move" />
                <h3 className="font-medium">{section.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                  className="p-2 hover:bg-white/10 rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="p-2 hover:bg-red-500/10 text-red-400 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Section Content */}
            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4"
                >
                  <SectionContent
                    type={section.type}
                    content={section.content}
                    onChange={(content) => updateSectionContent(section.id, content)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Section Button */}
      <div className="flex justify-center">
        <div className="relative group">
          <button
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            onClick={() => addSection('experience')}
          >
            <FaPlus />
          </button>
          <div className="absolute top-full mt-2 p-2 bg-white/5 rounded invisible group-hover:visible">
            <div className="grid grid-cols-2 gap-2">
              {['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'interests'].map(type => (
                <button
                  key={type}
                  onClick={() => addSection(type as SectionType)}
                  className="p-2 hover:bg-white/10 rounded text-left"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function createEmptyContent(type: SectionType) {
  switch (type) {
    case 'personal':
      return {
        name: '',
        email: '',
        phone: '',
        location: ''
      };
    case 'summary':
      return {
        text: ''
      };
    case 'experience':
      return {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      };
    case 'education':
      return {
        school: '',
        degree: '',
        field: '',
        graduationDate: ''
      };
    case 'skills':
      return {
        name: '',
        level: 3,
        category: ''
      };
    case 'projects':
      return {
        name: '',
        description: '',
        technologies: [],
        link: ''
      };
    case 'certifications':
      return {
        name: '',
        organization: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        link: ''
      };
    case 'languages':
      return {
        language: '',
        proficiency: 'Beginner'
      };
    case 'interests':
      return {
        name: '',
        description: ''
      };
    default:
      return {};
  }
}

function SectionContent({ type, content, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...content, [name]: value });
  };

  switch (type) {
    case 'personal':
      return (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={content.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="email"
            name="email"
            value={content.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="phone"
            value={content.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="location"
            value={content.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 rounded bg-white/10"
          />
        </div>
      );
    case 'summary':
      return (
        <textarea
          name="text"
          value={content.text}
          onChange={handleChange}
          placeholder="Summary"
          className="w-full p-2 rounded bg-white/10"
        />
      );
    case 'experience':
      return (
        <div className="space-y-4">
          <input
            type="text"
            name="company"
            value={content.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="position"
            value={content.position}
            onChange={handleChange}
            placeholder="Position"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="startDate"
            value={content.startDate}
            onChange={handleChange}
            placeholder="Start Date"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="endDate"
            value={content.endDate}
            onChange={handleChange}
            placeholder="End Date"
            className="w-full p-2 rounded bg-white/10"
          />
          <textarea
            name="description"
            value={content.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-white/10"
          />
        </div>
      );
    case 'education':
      return (
        <div className="space-y-4">
          <input
            type="text"
            name="school"
            value={content.school}
            onChange={handleChange}
            placeholder="School"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="degree"
            value={content.degree}
            onChange={handleChange}
            placeholder="Degree"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="field"
            value={content.field}
            onChange={handleChange}
            placeholder="Field of Study"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="graduationDate"
            value={content.graduationDate}
            onChange={handleChange}
            placeholder="Graduation Date"
            className="w-full p-2 rounded bg-white/10"
          />
        </div>
      );
    case 'skills':
      return (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={content.name}
            onChange={handleChange}
            placeholder="Skill Name"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="category"
            value={content.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="number"
            name="level"
            value={content.level}
            onChange={handleChange}
            placeholder="Skill Level (1-5)"
            className="w-full p-2 rounded bg-white/10"
          />
        </div>
      );
    case 'projects':
      return (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={content.name}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full p-2 rounded bg-white/10"
          />
          <textarea
            name="description"
            value={content.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="technologies"
            value={content.technologies.join(', ')}
            onChange={(e) => onChange({ ...content, technologies: e.target.value.split(', ') })}
            placeholder="Technologies (comma separated)"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="link"
            value={content.link}
            onChange={handleChange}
            placeholder="Project Link"
            className="w-full p-2 rounded bg-white/10"
          />
        </div>
      );
    case 'certifications':
      return (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={content.name}
            onChange={handleChange}
            placeholder="Certification Name"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="organization"
            value={content.organization}
            onChange={handleChange}
            placeholder="Organization"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="issueDate"
            value={content.issueDate}
            onChange={handleChange}
            placeholder="Issue Date"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="expiryDate"
            value={content.expiryDate}
            onChange={handleChange}
            placeholder="Expiry Date"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="credentialId"
            value={content.credentialId}
            onChange={handleChange}
            placeholder="Credential ID"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="link"
            value={content.link}
            onChange={handleChange}
            placeholder="Certification Link"
            className="w-full p-2 rounded bg-white/10"
          />
        </div>
      );
    case 'languages':
      return (
        <div className="space-y-4">
          <input
            type="text"
            name="language"
            value={content.language}
            onChange={handleChange}
            placeholder="Language"
            className="w-full p-2 rounded bg-white/10"
          />
          <input
            type="text"
            name="proficiency"
            value={content.proficiency}
            onChange={handleChange}
            placeholder="Proficiency"
            className="w-full p-2 rounded bg-white/10"
          />
        </div>
      );
    case 'interests':
      return (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={content.name}
            onChange={handleChange}
            placeholder="Interest Name"
            className="w-full p-2 rounded bg-white/10"
          />
          <textarea
            name="description"
            value={content.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-white/10"
          />
        </div>
      );
    default:
      return null;
  }
}
