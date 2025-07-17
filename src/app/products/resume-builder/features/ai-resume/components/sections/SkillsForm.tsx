"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillsFormProps {
  initialData: string[];
  onSave: (data: string[]) => void;
}

export const SkillsForm = ({ initialData, onSave }: SkillsFormProps) => {
  const [skills, setSkills] = useState<string[]>(initialData);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills((prev) => [...prev, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      onSave([...skills, currentSkill.trim()]);
    } else {
      onSave(skills);
    }
  };

  const suggestedSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "Git",
    "AWS",
    "Docker",
  ];

  const handleAddSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
    }
  };

  return (
    <Card className="p-6 bg-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-muted-foreground">
            Add your technical skills, tools, and technologies you're proficient in.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="Add a skill (e.g., JavaScript)"
              className="flex-1"
            />
            <Button
              type="button"
              variant="primary"
              className="bg-[#fcba28] text-white hover:bg-[#e0a829]"
              onClick={handleAddSkill}
              disabled={!currentSkill.trim()}
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1 flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          {skills.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No skills added yet. Start by typing a skill and clicking Add.
            </p>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Suggested Skills</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills
                .filter((skill) => !skills.includes(skill))
                .map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleAddSuggestedSkill(skill)}
                  >
                    + {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
