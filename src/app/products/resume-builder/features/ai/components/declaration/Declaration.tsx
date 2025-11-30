"use client";

import { useResume } from "../../context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileSignature, ArrowRight } from "lucide-react";

interface DeclarationProps {
  onNext?: () => void;
}

export function Declaration({ onNext }: DeclarationProps) {
  const { resumeData, updateDeclaration } = useResume();
  const [declaration, setDeclaration] = useState(resumeData.declaration || "");

  const handleSave = () => {
    updateDeclaration(declaration);
    if (onNext) {
      onNext();
    }
  };

  const handleDeclarationChange = (value: string) => {
    setDeclaration(value);
    // Debounced save
    const timeoutId = setTimeout(() => {
      updateDeclaration(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const sampleDeclarations = [
    {
      title: "Professional Standard",
      text: "I hereby declare that all the information stated above is true and correct to the best of my knowledge and belief. I understand that any willful misstatement described herein may lead to disqualification or dismissal."
    },
    {
      title: "Detailed Version",
      text: "I declare that the information provided in this resume is accurate and truthful. I am aware that any false statements may result in the rejection of my application or termination of employment if discovered after hiring."
    },
    {
      title: "Simple Version",
      text: "I confirm that all information presented in this resume is true and accurate to the best of my knowledge. I understand the importance of honesty in the application process."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="bg-white/5 border-white/10 text-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSignature className="w-5 h-5" />
            Declaration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Your Declaration</Label>
            <Textarea
              placeholder="Write your declaration..."
              className="mt-2 h-32 bg-white/5 border-white/10"
              value={declaration}
              onChange={(e) => handleDeclarationChange(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Sample Declarations</Label>
            <div className="grid gap-4">
              {sampleDeclarations.map((sample, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => handleDeclarationChange(sample.text)}
                >
                  <CardHeader>
                    <CardTitle className="text-sm">{sample.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{sample.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#fcba28] text-black hover:bg-[#fcba28]/90"
        >
          Save & Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
