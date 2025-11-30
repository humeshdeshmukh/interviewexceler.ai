"use client";

import { useState } from "react";
import { useResume } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface DeclarationProps {
  onNext: () => void;
}

export const Declaration = ({ onNext }: DeclarationProps) => {
  const { resumeData, updateDeclaration } = useResume();
  const [declaration, setDeclaration] = useState(resumeData.declaration || "");

  const defaultDeclaration = `I hereby declare that all the information provided above is true to the best of my knowledge and belief.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDeclaration(declaration);
    onNext();
  };

  return (
    <Card className="p-6 bg-main-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Declaration</h2>
          <p className="text-muted-foreground">
            Add a declaration statement to your resume. This is optional but can add
            a professional touch to your resume.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Declaration Statement</label>
            <Textarea
              value={declaration}
              onChange={(e) => setDeclaration(e.target.value)}
              placeholder={defaultDeclaration}
              className="h-32"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeclaration(defaultDeclaration)}
            >
              Use Default Declaration
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeclaration("")}
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
