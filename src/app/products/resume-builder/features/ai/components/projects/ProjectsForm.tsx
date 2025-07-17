"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Sparkles,
  Link,
  Github,
  Globe,
  Tag,
} from "lucide-react";
import { useResume } from "../../context/ResumeContext";

interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  highlights: string[];
}

interface ProjectsFormProps {
  onSave: (data: Project[]) => void;
  initialData?: Project[];
}

const popularTechnologies = [
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "AWS",
  "Docker",
  "Kubernetes",
  "MongoDB",
  "PostgreSQL",
  "GraphQL",
  "Next.js",
  "TensorFlow",
];

export const ProjectsForm = ({ onSave, initialData = [] }: ProjectsFormProps) => {
  const [projects, setProjects] = useState<Project[]>(initialData);
  const [newTechnology, setNewTechnology] = useState("");
  const { generateAISuggestions } = useResume();

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      highlights: [],
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  const handleAISuggestion = async (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    const prompt = `Generate a description for a ${project.role} role in ${project.name} project using ${project.technologies.join(
      ", "
    )}`;
    const suggestion = await generateAISuggestions("project", prompt);
    updateProject(id, "description", suggestion);
  };

  const addTechnology = (id: string, tech: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project || project.technologies.includes(tech)) return;

    updateProject(id, "technologies", [...project.technologies, tech]);
    setNewTechnology("");
  };

  const removeTechnology = (id: string, tech: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    updateProject(
      id,
      "technologies",
      project.technologies.filter((t) => t !== tech)
    );
  };

  const addHighlight = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    updateProject(id, "highlights", [...project.highlights, ""]);
  };

  const updateHighlight = (id: string, index: number, value: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    const newHighlights = [...project.highlights];
    newHighlights[index] = value;
    updateProject(id, "highlights", newHighlights);
  };

  const removeHighlight = (id: string, index: number) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    updateProject(
      id,
      "highlights",
      project.highlights.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
        >
          {/* Drag Handle */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 cursor-move text-white/40">
            <GripVertical className="w-5 h-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-8">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  updateProject(project.id, "name", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. E-commerce Platform"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-2">Your Role</label>
              <input
                type="text"
                value={project.role}
                onChange={(e) =>
                  updateProject(project.id, "role", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Lead Developer"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) =>
                    updateProject(project.id, "startDate", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) =>
                    updateProject(project.id, "endDate", e.target.value)
                  }
                  disabled={project.current}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {/* Current Project Checkbox */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={project.current}
                  onChange={(e) =>
                    updateProject(project.id, "current", e.target.checked)
                  }
                  className="rounded border-white/10 bg-white/5 text-[#fcba28] focus:ring-[#fcba28]"
                />
                <span className="text-sm">This is a current project</span>
              </label>
            </div>

            {/* URLs */}
            <div>
              <label className="block text-sm font-medium mb-2">
                GitHub URL
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="url"
                  value={project.githubUrl}
                  onChange={(e) =>
                    updateProject(project.id, "githubUrl", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Live URL</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="url"
                  value={project.liveUrl}
                  onChange={(e) =>
                    updateProject(project.id, "liveUrl", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Technologies */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Technologies Used
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#fcba28]/10 text-[#fcba28] rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(project.id, tech)}
                        className="hover:text-[#fcba28]/80 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newTechnology) {
                          e.preventDefault();
                          addTechnology(project.id, newTechnology);
                        }
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                      placeholder="Add technology..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (newTechnology) {
                        addTechnology(project.id, newTechnology);
                      }
                    }}
                    className="px-4 py-2 bg-[#fcba28]/10 border border-[#fcba28]/20 rounded-lg text-[#fcba28] hover:bg-[#fcba28]/20 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTechnologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => addTechnology(project.id, tech)}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                  placeholder="Describe the project and your role..."
                />
                <button
                  type="button"
                  onClick={() => handleAISuggestion(project.id)}
                  className="absolute right-3 top-3 p-2 rounded-lg bg-[#fcba28]/10 hover:bg-[#fcba28]/20 text-[#fcba28] transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="col-span-full">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">
                  Key Highlights
                </label>
                <button
                  type="button"
                  onClick={() => addHighlight(project.id)}
                  className="text-sm text-[#fcba28] hover:text-[#fcba28]/80 transition-colors"
                >
                  Add Highlight
                </button>
              </div>
              <div className="space-y-2">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) =>
                        updateHighlight(project.id, i, e.target.value)
                      }
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                      placeholder="e.g. Increased performance by 50%"
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(project.id, i)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Remove Project Button */}
          <button
            type="button"
            onClick={() => removeProject(project.id)}
            className="absolute top-3 right-3 p-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </motion.div>
      ))}

      {/* Add Project Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: projects.length * 0.1 }}
        type="button"
        onClick={addProject}
        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-white/60 hover:text-white/80 hover:border-white/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Project
      </motion.button>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: projects.length * 0.1 + 0.1 }}
        className="flex justify-end"
      >
        <button
          type="button"
          onClick={() => onSave(projects)}
          className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors"
        >
          Save & Continue
        </button>
      </motion.div>
    </div>
  );
};
