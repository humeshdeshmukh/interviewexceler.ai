"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Achievement } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface AchievementsFormProps {
  initialData: Achievement[];
  onSave: (data: Achievement[]) => void;
}

export const AchievementsForm = ({
  initialData,
  onSave,
}: AchievementsFormProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            title: "",
            description: "",
            date: "",
          },
        ]
  );

  const handleAddAchievement = () => {
    setAchievements((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        date: "",
      },
    ]);
  };

  const handleRemoveAchievement = (index: number) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Achievement,
    value: string
  ) => {
    setAchievements((prev) =>
      prev.map((achievement, i) =>
        i === index
          ? {
              ...achievement,
              [field]: value,
            }
          : achievement
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(achievements);
  };

  return (
    <Card className="p-6 bg-main-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <p className="text-muted-foreground">
            Add your notable achievements, awards, and recognition.
          </p>
        </div>

        {achievements.map((achievement, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Achievement {index + 1}</h3>
              {achievements.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveAchievement(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Achievement Title *</label>
                <Input
                  value={achievement.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  placeholder="e.g., First Place in Hackathon"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="month"
                  value={achievement.date}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                value={achievement.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Describe your achievement and its significance..."
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
          onClick={handleAddAchievement}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </Button>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
