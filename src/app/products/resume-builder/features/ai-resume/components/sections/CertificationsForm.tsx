"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Certification } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface CertificationsFormProps {
  initialData: Certification[];
  onSave: (data: Certification[]) => void;
}

export const CertificationsForm = ({
  initialData,
  onSave,
}: CertificationsFormProps) => {
  const [certifications, setCertifications] = useState<Certification[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            name: "",
            issuer: "",
            date: "",
            link: "",
          },
        ]
  );

  const handleAddCertification = () => {
    setCertifications((prev) => [
      ...prev,
      {
        name: "",
        issuer: "",
        date: "",
        link: "",
      },
    ]);
  };

  const handleRemoveCertification = (index: number) => {
    setCertifications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Certification,
    value: string
  ) => {
    setCertifications((prev) =>
      prev.map((cert, i) =>
        i === index
          ? {
              ...cert,
              [field]: value,
            }
          : cert
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(certifications);
  };

  return (
    <Card className="p-6 bg-main-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Certifications</h2>
          <p className="text-muted-foreground">
            Add your professional certifications and licenses.
          </p>
        </div>

        {certifications.map((certification, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Certification {index + 1}</h3>
              {certifications.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveCertification(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Certification Name *</label>
                <Input
                  value={certification.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Issuing Organization *</label>
                <Input
                  value={certification.issuer}
                  onChange={(e) => handleChange(index, "issuer", e.target.value)}
                  placeholder="e.g., Amazon Web Services"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Earned *</label>
                <Input
                  type="month"
                  value={certification.date}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Credential URL</label>
                <Input
                  type="url"
                  value={certification.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  placeholder="https://www.credential.net/..."
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="primary"
          className="bg-[#fcba28] text-white hover:bg-[#e0a829]"
          onClick={handleAddCertification}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
