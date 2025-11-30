"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface EducationFormProps {
  initialData: Education[];
  onSave: (data: Education[]) => void;
}

export const EducationForm = ({ initialData, onSave }: EducationFormProps) => {
  const [educations, setEducations] = useState<Education[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            gpa: "",
          },
        ]
  );

  const handleAddEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    setEducations((prev) =>
      prev.map((edu, i) =>
        i === index
          ? {
              ...edu,
              [field]: value,
            }
          : edu
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(educations);
  };

  return (
    <Card className="p-6 bg-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-muted-foreground">
            Add your educational background, starting with the most recent degree.
          </p>
        </div>

        {educations.map((education, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Education {index + 1}</h3>
              {educations.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveEducation(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Institution *</label>
                <Input
                  value={education.institution}
                  onChange={(e) =>
                    handleChange(index, "institution", e.target.value)
                  }
                  placeholder="University/College name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Degree *</label>
                <Input
                  value={education.degree}
                  onChange={(e) => handleChange(index, "degree", e.target.value)}
                  placeholder="e.g., Bachelor's, Master's"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Field of Study *</label>
                <Input
                  value={education.field}
                  onChange={(e) => handleChange(index, "field", e.target.value)}
                  placeholder="e.g., Computer Science"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">GPA</label>
                <Input
                  value={education.gpa}
                  onChange={(e) => handleChange(index, "gpa", e.target.value)}
                  placeholder="e.g., 3.8/4.0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date *</label>
                <Input
                  type="month"
                  value={education.startDate}
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
                  value={education.endDate}
                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="primary"
          className="bg-[#fcba28] text-white hover:bg-[#e0a829]"
          onClick={handleAddEducation}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
