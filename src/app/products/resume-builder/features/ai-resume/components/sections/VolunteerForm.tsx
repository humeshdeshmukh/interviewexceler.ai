"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { VolunteerWork } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface VolunteerFormProps {
  initialData: VolunteerWork[];
  onSave: (data: VolunteerWork[]) => void;
}

export const VolunteerForm = ({ initialData, onSave }: VolunteerFormProps) => {
  const [volunteerWork, setVolunteerWork] = useState<VolunteerWork[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            organization: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
  );

  const handleAddVolunteer = () => {
    setVolunteerWork((prev) => [
      ...prev,
      {
        organization: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemoveVolunteer = (index: number) => {
    setVolunteerWork((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof VolunteerWork,
    value: string
  ) => {
    setVolunteerWork((prev) =>
      prev.map((work, i) =>
        i === index
          ? {
              ...work,
              [field]: value,
            }
          : work
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(volunteerWork);
  };

  return (
    <Card className="p-6 bg-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Volunteer Experience</h2>
          <p className="text-muted-foreground">
            Add your volunteer work and community service experience.
          </p>
        </div>

        {volunteerWork.map((work, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Volunteer Work {index + 1}</h3>
              {volunteerWork.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveVolunteer(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization *</label>
                <Input
                  value={work.organization}
                  onChange={(e) =>
                    handleChange(index, "organization", e.target.value)
                  }
                  placeholder="Organization name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Role *</label>
                <Input
                  value={work.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                  placeholder="Your role"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date *</label>
                <Input
                  type="month"
                  value={work.startDate}
                  onChange={(e) =>
                    handleChange(index, "startDate", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Date *</label>
                <Input
                  type="month"
                  value={work.endDate}
                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                value={work.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Describe your responsibilities and achievements..."
                required
                className="h-32"
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddVolunteer}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Volunteer Experience
        </Button>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
