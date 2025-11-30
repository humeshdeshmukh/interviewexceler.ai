"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Trash2, GripVertical, Sparkles, Award } from "lucide-react";
import { useResume } from "../../context/ResumeContext";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  description: string;
}

interface CertificationsFormProps {
  onSave: (data: Certification[]) => void;
  initialData?: Certification[];
}

const popularCertifications = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional",
  "Microsoft Azure Administrator",
  "CompTIA Security+",
  "PMP Certification",
  "Scrum Master",
  "CISSP",
  "Cisco CCNA",
];

export const CertificationsForm = ({
  onSave,
  initialData,
}: CertificationsFormProps) => {
  const [certifications, setCertifications] = useState<Certification[]>(
    initialData || []
  );
  const { generateAISuggestions } = useResume();

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
      description: "",
    };
    setCertifications([...certifications, newCertification]);
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const handleAISuggestion = async (id: string) => {
    const cert = certifications.find((c) => c.id === id);
    if (!cert) return;

    const prompt = `Generate a description for ${cert.name} certification from ${cert.issuer}`;
    const suggestion = await generateAISuggestions("certification", prompt);
    updateCertification(id, "description", suggestion);
  };

  const handleQuickAdd = (certName: string) => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: certName,
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
      description: "",
    };
    setCertifications([...certifications, newCertification]);
  };

  return (
    <div className="space-y-6">
      {/* Quick Add Popular Certifications */}
      <div>
        <h3 className="text-lg font-medium mb-4">Popular Certifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {popularCertifications.map((cert) => (
            <button
              key={cert}
              onClick={() => handleQuickAdd(cert)}
              className="p-2 text-sm text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-[#fcba28]" />
              <span className="truncate">{cert}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Certifications List */}
      {certifications.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
        >
          {/* Drag Handle */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 cursor-move text-white/40">
            <GripVertical className="w-5 h-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-8">
            {/* Certification Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Certification Name
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) =>
                  updateCertification(cert.id, "name", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. AWS Certified Solutions Architect"
              />
            </div>

            {/* Issuing Organization */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Issuing Organization
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) =>
                  updateCertification(cert.id, "issuer", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Amazon Web Services"
              />
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Issue Date
              </label>
              <input
                type="month"
                value={cert.issueDate}
                onChange={(e) =>
                  updateCertification(cert.id, "issueDate", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Expiry Date
              </label>
              <input
                type="month"
                value={cert.expiryDate}
                onChange={(e) =>
                  updateCertification(cert.id, "expiryDate", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
              />
            </div>

            {/* Credential ID */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Credential ID
              </label>
              <input
                type="text"
                value={cert.credentialId}
                onChange={(e) =>
                  updateCertification(cert.id, "credentialId", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. AWS-ASA-123456"
              />
            </div>

            {/* Credential URL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Credential URL
              </label>
              <input
                type="url"
                value={cert.credentialUrl}
                onChange={(e) =>
                  updateCertification(cert.id, "credentialUrl", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="https://..."
              />
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  value={cert.description}
                  onChange={(e) =>
                    updateCertification(cert.id, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                  placeholder="Describe what you learned and achieved..."
                />
                <button
                  type="button"
                  onClick={() => handleAISuggestion(cert.id)}
                  className="absolute right-3 top-3 p-2 rounded-lg bg-[#fcba28]/10 hover:bg-[#fcba28]/20 text-[#fcba28] transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Remove Certification Button */}
          <button
            type="button"
            onClick={() => removeCertification(cert.id)}
            className="absolute top-3 right-3 p-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </motion.div>
      ))}

      {/* Add Certification Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: certifications.length * 0.1 }}
        type="button"
        onClick={addCertification}
        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-white/60 hover:text-white/80 hover:border-white/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Certification
      </motion.button>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: certifications.length * 0.1 + 0.1 }}
        className="flex justify-end"
      >
        <button
          type="button"
          onClick={() => onSave(certifications)}
          className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors"
        >
          Save & Continue
        </button>
      </motion.div>
    </div>
  );
};
