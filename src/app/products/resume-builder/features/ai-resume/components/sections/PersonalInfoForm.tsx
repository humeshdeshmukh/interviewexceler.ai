"use client";

import { useState } from "react";
import { PersonalInfo } from "../../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface PersonalInfoFormProps {
  initialData: PersonalInfo;
  onSave: (data: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ initialData, onSave }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<PersonalInfo>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="p-6 bg-background text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <p className="text-muted-foreground">
            Tell us about yourself. This information will appear at the top of your resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name *
            </label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone *
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location *
            </label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="linkedin" className="text-sm font-medium">
              LinkedIn Profile
            </label>
            <Input
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="portfolio" className="text-sm font-medium">
              Portfolio Website
            </label>
            <Input
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://johndoe.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="summary" className="text-sm font-medium">
            Professional Summary *
          </label>
          <Textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Write a brief summary of your professional background and career goals..."
            required
            className="h-32"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};
