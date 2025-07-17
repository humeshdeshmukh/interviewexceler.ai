'use client';

import { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResumeUploadProps {
  onUpload: (resumeData: any) => void;
}

export function ResumeUpload({ onUpload }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'application/msword' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      await processFile(droppedFile);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await processFile(selectedFile);
    }
  };

  const processFile = async (file: File) => {
    setFile(file);
    setAnalyzing(true);
    
    try {
      // Create FormData and append file
      const formData = new FormData();
      formData.append('resume', file);

      // Upload and analyze the resume
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const analysisResult = await response.json();
      onUpload(analysisResult);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      // Handle error appropriately
    } finally {
      setAnalyzing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-[#fcba28] bg-[#fcba28]/10'
            : 'border-[#fcba28]/20 hover:border-[#fcba28]/40'
        }`}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="h-10 w-10 text-[#fcba28]" />
          </div>
          <div className="space-y-2">
            <p className="text-white text-lg font-medium">
              Drop your resume here or click to upload
            </p>
            <p className="text-gray-400 text-sm">
              Supports PDF, DOC, DOCX (Max 10MB)
            </p>
          </div>
        </div>
      </div>

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-[#fcba28]/20"
        >
          <div className="flex items-center space-x-3">
            <File className="h-5 w-5 text-[#fcba28]" />
            <span className="text-white">{file.name}</span>
          </div>
          <button
            onClick={removeFile}
            className="p-1 hover:bg-[#fcba28]/10 rounded-full"
          >
            <X className="h-5 w-5 text-[#fcba28]" />
          </button>
        </motion.div>
      )}

      {analyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[#fcba28]"
        >
          Analyzing resume...
        </motion.div>
      )}
    </div>
  );
}
