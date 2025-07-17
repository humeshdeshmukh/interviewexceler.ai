"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  selectedTemplate: number;
  onSelect: (templateId: number) => void;
}

export const TemplateSelector = ({
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) => {
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and minimalist design with a modern touch",
      preview: "/templates/modern.png",
    },
    {
      id: 2,
      name: "Creative",
      description: "Stand out with a unique and creative layout",
      preview: "/templates/creative.png",
    },
    {
      id: 3,
      name: "Executive",
      description: "Professional template for senior positions",
      preview: "/templates/executive.png",
    },
    {
      id: 4,
      name: "Minimal",
      description: "Simple and elegant design",
      preview: "/templates/minimal.png",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Choose a Template</h2>
        <p className="text-muted-foreground">
          Select a template that best represents your professional style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "relative cursor-pointer transition-all hover:scale-105",
              selectedTemplate === template.id && "ring-2 ring-primary"
            )}
            onClick={() => onSelect(template.id)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
            )}
            <div className="p-4 space-y-2">
              <div className="aspect-[210/297] bg-muted rounded-lg mb-4">
                {/* Template Preview Image */}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg" />
              </div>
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
