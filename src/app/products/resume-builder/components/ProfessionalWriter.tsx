"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaEnvelope, FaPhone, FaFileAlt } from "react-icons/fa";

interface WriterRequest {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  experience: string;
  requirements: string;
}

export default function ProfessionalWriter() {
  const [formData, setFormData] = useState<WriterRequest>({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    experience: "",
    requirements: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#fcba28]">
          Hire a Professional Resume Writer
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Get a professionally written resume that highlights your strengths and increases
          your chances of landing your dream job. Our expert writers have experience
          across various industries.
        </p>
      </motion.div>

      {!submitted ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-6 bg-white/5 p-8 rounded-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#fcba28]">
                <FaUser />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#fcba28] focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#fcba28]">
                <FaEnvelope />
                <span>Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#fcba28] focus:outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#fcba28]">
                <FaPhone />
                <span>Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#fcba28] focus:outline-none"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#fcba28]">
                <FaBriefcase />
                <span>Current/Target Job Title</span>
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#fcba28] focus:outline-none"
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[#fcba28]">
              <FaFileAlt />
              <span>Work Experience</span>
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#fcba28] focus:outline-none h-32"
              placeholder="Brief overview of your work experience..."
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[#fcba28]">
              <FaFileAlt />
              <span>Special Requirements</span>
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#fcba28] focus:outline-none h-32"
              placeholder="Any specific requirements or focus areas..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#fcba28] text-black font-semibold py-3 rounded-lg hover:bg-[#e29f1e] transition-colors"
          >
            Request Professional Writer
          </button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center bg-white/5 p-8 rounded-xl space-y-4"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <FaCheck className="text-2xl text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">Request Submitted!</h3>
          <p className="text-gray-300">
            Thank you for your interest! Our team will review your request and contact
            you within 24-48 hours with a custom quote and next steps.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[#fcba28] hover:underline"
          >
            Submit another request
          </button>
        </motion.div>
      )}
    </div>
  );
}
