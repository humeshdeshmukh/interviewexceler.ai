'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { readFileContent, isFileSupported } from '../utils/fileReader';

interface FileUploadProps {
  onFileContent: (content: string) => void;
  onError: (error: string) => void;
}

export const FileUpload = ({ onFileContent, onError }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    try {
      // Check file extension
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!extension) {
        throw new Error('Could not determine file type');
      }

      // Map common extensions to mime types
      const mimeTypeMap = {
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'odt': 'application/vnd.oasis.opendocument.text',
        'rtf': 'application/rtf',
        'txt': 'text/plain',
        'csv': 'text/csv',
        'md': 'text/markdown',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'webp': 'image/webp',
        'tiff': 'image/tiff',
        'bmp': 'image/bmp'
      };

      // Override file type if necessary
      const fileToProcess = extension in mimeTypeMap ? 
        new File([file], file.name, { type: mimeTypeMap[extension] }) : 
        file;

      if (!isFileSupported(fileToProcess)) {
        throw new Error('Unsupported file type. Please upload a PDF, DOC, DOCX, ODT, RTF, TXT, CSV, MD, or common image formats (JPG, PNG, etc.)');
      }

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (fileToProcess.size > maxSize) {
        throw new Error('File size too large. Maximum size is 10MB.');
      }

      setIsProcessing(true);
      const content = await readFileContent(fileToProcess);
      if (!content.trim()) {
        throw new Error('The file appears to be empty or contains no readable text');
      }
      onFileContent(content);
    } catch (err: any) {
      console.error('File processing error:', err);
      onError(err.message || 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileContent, onError]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  }, [handleFile]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  }, [handleFile]);

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
        isDragging
          ? 'border-[#fcba28] bg-[#fcba28]/10'
          : 'border-white/10 hover:border-[#fcba28]/50 hover:bg-[#fcba28]/5'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.txt,.rtf,.odt,.csv,.md,.jpg,.jpeg,.png,.webp,.tiff,.bmp"
        className="hidden"
        id="file-upload"
      />
      
      <Upload className="w-12 h-12 text-[#fcba28] mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Drop your CV here</h3>
      <p className="text-gray-400 mb-6">or</p>
      
      <Button
        onClick={() => document.getElementById('file-upload')?.click()}
        className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black font-semibold"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Browse Files'}
      </Button>
      
      <p className="text-sm text-gray-400 mt-4">
        Supported formats: PDF, DOC, DOCX, ODT, RTF, TXT, CSV, MD, and images (JPG, PNG, etc.)
      </p>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl"
        >
          <div className="text-[#fcba28] flex items-center space-x-2">
            <motion.div
              className="w-4 h-4 border-2 border-[#fcba28] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Processing your CV...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
