"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User, Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

interface PersonalInfoFormProps {
  onSave: (data: PersonalInfo) => void;
  initialData?: PersonalInfo;
}

export const PersonalInfoForm = ({ onSave, initialData }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<PersonalInfo>(
    initialData || {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: "",
    }
  );

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputFields = [
    { icon: User, field: "fullName", label: "Full Name", type: "text" },
    { icon: Mail, field: "email", label: "Email", type: "email" },
    { icon: Phone, field: "phone", label: "Phone", type: "tel" },
    { icon: MapPin, field: "location", label: "Location", type: "text" },
    { icon: Globe, field: "website", label: "Website", type: "url" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inputFields.map((field, index) => {
          const Icon = field.icon;
          return (
            <motion.div
              key={field.field}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <label className="block text-sm font-medium mb-2">
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                  <Icon className="w-5 h-5" />
                </div>
                <input
                  type={field.type}
                  value={formData[field.field as keyof PersonalInfo]}
                  onChange={(e) =>
                    handleChange(field.field as keyof PersonalInfo, e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Professional Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="col-span-full"
      >
        <label className="block text-sm font-medium mb-2">
          Professional Summary
        </label>
        <div className="relative">
          <textarea
            value={formData.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
            placeholder="Write a professional summary..."
          />
          <button
            type="button"
            className="absolute right-3 top-3 p-2 rounded-lg bg-[#fcba28]/10 hover:bg-[#fcba28]/20 text-[#fcba28] transition-colors"
            onClick={() => {
              // AI suggestion functionality will be added here
            }}
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-end"
      >
        <button
          type="submit"
          className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors"
        >
          Save & Continue
        </button>
      </motion.div>
    </form>
  );
};
