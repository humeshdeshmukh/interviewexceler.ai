"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Experience } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface ExperienceFormProps {
  initialData: Experience[];
  onSave: (data: Experience[]) => void;
}

export const ExperienceForm = ({ initialData, onSave }: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            current: false,
            description: [""],
            technologies: [],
          },
        ]
  );

  const handleAddExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: [""],
        technologies: [],
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Experience,
    value: string | boolean | string[]
  ) => {
    setExperiences((prev) =>
      prev.map((exp, i) =>
        i === index
          ? {
              ...exp,
              [field]: value,
            }
          : exp
      )
    );
  };

  const handleAddBulletPoint = (experienceIndex: number) => {
    setExperiences((prev) =>
      prev.map((exp, i) =>
        i === experienceIndex
          ? { ...exp, description: [...exp.description, ""] }
          : exp
      )
    );
  };

  const handleRemoveBulletPoint = (experienceIndex: number, bulletIndex: number) => {
    setExperiences((prev) =>
      prev.map((exp, i) =>
        i === experienceIndex
          ? {
              ...exp,
              description: exp.description.filter((_, j) => j !== bulletIndex),
            }
          : exp
      )
    );
  };

  const handleBulletChange = (
    experienceIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    setExperiences((prev) =>
      prev.map((exp, i) =>
        i === experienceIndex
          ? {
              ...exp,
              description: exp.description.map((bullet, j) =>
                j === bulletIndex ? value : bullet
              ),
            }
          : exp
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(experiences);
  };

  return (
    <Card className="p-6 bg-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-muted-foreground">
            Add your relevant work experience, starting with the most recent position.
          </p>
        </div>

        {experiences.map((experience, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
              {experiences.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveExperience(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company *</label>
                <Input
                  value={experience.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  placeholder="Company name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Position *</label>
                <Input
                  value={experience.position}
                  onChange={(e) => handleChange(index, "position", e.target.value)}
                  placeholder="Job title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date *</label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleChange(index, "startDate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                  disabled={experience.current}
                  required={!experience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={experience.current}
                onCheckedChange={(checked) =>
                  handleChange(index, "current", checked)
                }
              />
              <label className="text-sm font-medium">I currently work here</label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Technologies Used</label>
              <Input
                value={experience.technologies?.join(", ")}
                onChange={(e) =>
                  handleChange(
                    index,
                    "technologies",
                    e.target.value.split(",").map((t) => t.trim())
                  )
                }
                placeholder="React, TypeScript, Node.js, etc."
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Responsibilities & Achievements</label>
                <Button 
                  type="button" 
                  variant="primary" 
                  className="bg-[#fcba28] text-white hover:bg-[#e0a829]"
                  onClick={() => handleAddBulletPoint(index)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bullet Point
                </Button>
              </div>

              {experience.description.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2">
                  <Textarea
                    value={bullet}
                    onChange={(e) =>
                      handleBulletChange(index, bulletIndex, e.target.value)
                    }
                    placeholder="Describe your responsibilities and achievements..."
                    required
                  />
                  {experience.description.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveBulletPoint(index, bulletIndex)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="primary" 
          className="bg-[#fcba28] text-white hover:bg-[#e0a829]"
          onClick={handleAddExperience}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Experience
        </Button>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
