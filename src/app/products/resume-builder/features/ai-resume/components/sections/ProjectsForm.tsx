"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Project } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface ProjectsFormProps {
  initialData: Project[];
  onSave: (data: Project[]) => void;
}

export const ProjectsForm = ({ initialData, onSave }: ProjectsFormProps) => {
  const [projects, setProjects] = useState<Project[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            name: "",
            description: "",
            technologies: [],
            link: "",
          },
        ]
  );

  const handleAddProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        name: "",
        description: "",
        technologies: [],
        link: "",
      },
    ]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    setProjects((prev) =>
      prev.map((project, i) =>
        i === index
          ? {
              ...project,
              [field]:
                field === "technologies" && typeof value === "string"
                  ? value.split(",").map((t) => t.trim())
                  : value,
            }
          : project
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(projects);
  };

  return (
    <Card className="p-6 bg-main-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            Add your notable projects, including personal projects, open source
            contributions, or academic work.
          </p>
        </div>

        {projects.map((project, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Project {index + 1}</h3>
              {projects.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveProject(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name *</label>
                <Input
                  value={project.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="Project name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Project Link</label>
                <Input
                  value={project.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  placeholder="https://github.com/username/project"
                  type="url"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Technologies Used *</label>
              <Input
                value={project.technologies.join(", ")}
                onChange={(e) =>
                  handleChange(index, "technologies", e.target.value)
                }
                placeholder="React, Node.js, MongoDB, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Project Description *</label>
              <Textarea
                value={project.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Describe the project, your role, and its impact..."
                required
                className="h-32"
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="primary"
          className="bg-[#fcba28] text-white hover:bg-[#e0a829]"
          onClick={handleAddProject}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
