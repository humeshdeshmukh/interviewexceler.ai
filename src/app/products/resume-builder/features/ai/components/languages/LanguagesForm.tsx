"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Trash2, GripVertical, Globe, Check } from "lucide-react";

interface Language {
  id: string;
  name: string;
  proficiency: "Native" | "Fluent" | "Advanced" | "Intermediate" | "Basic";
  certifications: string[];
  details: string;
}

interface LanguagesFormProps {
  onSave: (data: Language[]) => void;
  initialData?: Language[];
}

const proficiencyLevels = [
  { value: "Native", label: "Native", description: "Mother tongue proficiency" },
  { value: "Fluent", label: "Fluent (C2/C1)", description: "Professional working proficiency" },
  { value: "Advanced", label: "Advanced (B2)", description: "Upper intermediate proficiency" },
  { value: "Intermediate", label: "Intermediate (B1)", description: "Limited working proficiency" },
  { value: "Basic", label: "Basic (A2/A1)", description: "Elementary proficiency" },
];

const popularLanguages = [
  "English",
  "Spanish",
  "Mandarin",
  "Hindi",
  "Arabic",
  "French",
  "German",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian",
  "Italian",
];

const languageCertifications = {
  English: ["TOEFL", "IELTS", "Cambridge CPE", "Cambridge CAE", "TOEIC"],
  Spanish: ["DELE", "SIELE"],
  French: ["DELF", "DALF", "TCF"],
  German: ["Goethe-Zertifikat", "TestDaF", "DSH"],
  Japanese: ["JLPT N1", "JLPT N2", "JLPT N3", "JLPT N4", "JLPT N5"],
  Mandarin: ["HSK 6", "HSK 5", "HSK 4", "HSK 3", "HSK 2", "HSK 1"],
};

export const LanguagesForm = ({ onSave, initialData }: LanguagesFormProps) => {
  const [languages, setLanguages] = useState<Language[]>(initialData || []);
  const [newCertification, setNewCertification] = useState("");

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "Intermediate",
      certifications: [],
      details: "",
    };
    setLanguages([...languages, newLanguage]);
  };

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const addCertification = (id: string) => {
    if (!newCertification) return;
    const language = languages.find((l) => l.id === id);
    if (!language || language.certifications.includes(newCertification)) return;

    updateLanguage(id, "certifications", [...language.certifications, newCertification]);
    setNewCertification("");
  };

  const removeCertification = (id: string, cert: string) => {
    const language = languages.find((l) => l.id === id);
    if (!language) return;

    updateLanguage(
      id,
      "certifications",
      language.certifications.filter((c) => c !== cert)
    );
  };

  const handleQuickAdd = (langName: string) => {
    if (languages.some((l) => l.name === langName)) return;

    const newLanguage: Language = {
      id: Date.now().toString(),
      name: langName,
      proficiency: "Intermediate",
      certifications: [],
      details: "",
    };
    setLanguages([...languages, newLanguage]);
  };

  return (
    <div className="space-y-6">
      {/* Quick Add Popular Languages */}
      <div>
        <h3 className="text-lg font-medium mb-4">Popular Languages</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {popularLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleQuickAdd(lang)}
              disabled={languages.some((l) => l.name === lang)}
              className={`p-2 text-sm text-left rounded-lg transition-colors flex items-center gap-2 ${
                languages.some((l) => l.name === lang)
                  ? "bg-white/5 text-white/40 cursor-not-allowed"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              <Globe className="w-4 h-4" />
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Languages List */}
      {languages.map((language, index) => (
        <motion.div
          key={language.id}
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
            {/* Language Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Language Name
              </label>
              <input
                type="text"
                value={language.name}
                onChange={(e) =>
                  updateLanguage(language.id, "name", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. English"
              />
            </div>

            {/* Proficiency Level */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Proficiency Level
              </label>
              <select
                value={language.proficiency}
                onChange={(e) =>
                  updateLanguage(language.id, "proficiency", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
              >
                {proficiencyLevels.map(({ value, label, description }) => (
                  <option key={value} value={value}>
                    {label} - {description}
                  </option>
                ))}
              </select>
            </div>

            {/* Certifications */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Certifications
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {language.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1 bg-[#fcba28]/10 text-[#fcba28] rounded-full text-sm flex items-center gap-2"
                    >
                      {cert}
                      <button
                        onClick={() => removeCertification(language.id, cert)}
                        className="hover:text-[#fcba28]/80 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newCertification) {
                        e.preventDefault();
                        addCertification(language.id);
                      }
                    }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                    placeholder="Add certification..."
                  />
                  <button
                    type="button"
                    onClick={() => addCertification(language.id)}
                    className="px-4 py-2 bg-[#fcba28]/10 border border-[#fcba28]/20 rounded-lg text-[#fcba28] hover:bg-[#fcba28]/20 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {/* Popular Certifications for Selected Language */}
                {language.name && languageCertifications[language.name as keyof typeof languageCertifications] && (
                  <div className="flex flex-wrap gap-2">
                    {languageCertifications[language.name as keyof typeof languageCertifications].map((cert) => (
                      <button
                        key={cert}
                        onClick={() => {
                          setNewCertification(cert);
                          addCertification(language.id);
                        }}
                        className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                      >
                        {cert}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Details */}
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-2">
                Additional Details
              </label>
              <textarea
                value={language.details}
                onChange={(e) =>
                  updateLanguage(language.id, "details", e.target.value)
                }
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28] backdrop-blur-sm transition-colors"
                placeholder="e.g. Lived in Spain for 2 years, Daily business communication..."
              />
            </div>
          </div>

          {/* Remove Language Button */}
          <button
            type="button"
            onClick={() => removeLanguage(language.id)}
            className="absolute top-3 right-3 p-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </motion.div>
      ))}

      {/* Add Language Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: languages.length * 0.1 }}
        type="button"
        onClick={addLanguage}
        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-white/60 hover:text-white/80 hover:border-white/20 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Language
      </motion.button>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: languages.length * 0.1 + 0.1 }}
        className="flex justify-end"
      >
        <button
          type="button"
          onClick={() => onSave(languages)}
          className="px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors"
        >
          Save & Continue
        </button>
      </motion.div>
    </div>
  );
};
