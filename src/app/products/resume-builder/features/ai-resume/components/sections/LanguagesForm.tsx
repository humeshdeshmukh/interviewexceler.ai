"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Language } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface LanguagesFormProps {
  initialData: Language[];
  onSave: (data: Language[]) => void;
}

export const LanguagesForm = ({ initialData, onSave }: LanguagesFormProps) => {
  const [languages, setLanguages] = useState<Language[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            name: "",
            proficiency: "",
          },
        ]
  );

  const proficiencyLevels = [
    "Native",
    "Fluent",
    "Advanced",
    "Intermediate",
    "Basic",
  ];

  const handleAddLanguage = () => {
    setLanguages((prev) => [
      ...prev,
      {
        name: "",
        proficiency: "",
      },
    ]);
  };

  const handleRemoveLanguage = (index: number) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Language,
    value: string
  ) => {
    setLanguages((prev) =>
      prev.map((lang, i) =>
        i === index
          ? {
              ...lang,
              [field]: value,
            }
          : lang
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(languages);
  };

  return (
    <Card className="p-6 bg-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Languages</h2>
          <p className="text-muted-foreground">
            Add languages you can communicate in and your proficiency level.
          </p>
        </div>

        {languages.map((language, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Language {index + 1}</h3>
              {languages.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveLanguage(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language *</label>
                <Input
                  value={language.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="e.g., English"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Proficiency Level *</label>
                <Select
                  value={language.proficiency}
                  onValueChange={(value) =>
                    handleChange(index, "proficiency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select proficiency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="primary" 
          className="bg-[#fcba28] text-white hover:bg-[#e0a829]"
          onClick={handleAddLanguage}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Language
        </Button>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
