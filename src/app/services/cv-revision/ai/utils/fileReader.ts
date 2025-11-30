import { Document } from 'docx';
import mammoth from 'mammoth';
import { createWorker } from 'tesseract.js';

// Supported file types
const SUPPORTED_TYPES = {
  // Documents
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.oasis.opendocument.text': 'odt',
  'application/rtf': 'rtf',
  'text/plain': 'txt',
  'text/csv': 'csv',
  'text/markdown': 'md',
  // Images
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/tiff': 'tiff',
  'image/bmp': 'bmp'
};

export const isFileSupported = (file: File): boolean => {
  return Object.keys(SUPPORTED_TYPES).includes(file.type);
};

export const readFileContent = async (file: File): Promise<string> => {
  try {
    // Check if file is supported
    if (!isFileSupported(file)) {
      throw new Error('Unsupported file type. Please upload a PDF, DOC, DOCX, ODT, RTF, TXT, CSV, MD, or common image formats.');
    }

    // Check file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > MAX_SIZE) {
      throw new Error('File size too large. Maximum size is 10MB.');
    }

    // Handle different file types
    if (file.type === 'application/pdf') {
      return await readPdfContent(file);
    } else if (
      file.type === 'application/msword' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return await readDocContent(file);
    } else if (file.type.startsWith('image/')) {
      return await readImageContent(file);
    } else if (
      file.type === 'application/rtf' ||
      file.type === 'application/vnd.oasis.opendocument.text'
    ) {
      return await readTextContent(file);
    } else {
      return await readTextContent(file);
    }
  } catch (error: any) {
    console.error('Error reading file:', error);
    throw new Error(error.message || 'Failed to read file content');
  }
};

const readPdfContent = async (file: File): Promise<string> => {
  if (typeof window === 'undefined') {
    throw new Error('PDF reading is only supported in the browser.');
  }
  try {
    // Dynamically import PDFJS only on the client
    const PDFJS = (await import('./pdfjs-init')).default;
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    const cleaned = cleanText(fullText);
    if (!cleaned) {
      // Optionally, you could add OCR fallback here using tesseract.js
      throw new Error('No readable text found in PDF. If this is a scanned or image-based document, please use a text-based PDF.');
    }
    return cleaned;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Error reading PDF file. Please make sure the file is not corrupted or is not a scanned image.');
  }
};

const readDocContent = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    // First try mammoth for DOCX
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      if (result.value.trim()) {
        return cleanText(result.value);
      }
    } catch (mammothError) {
      console.log('Mammoth failed, falling back to plain text:', mammothError);
    }
    // If mammoth fails, try simple text extraction
    return await readTextContent(file);
  } catch (error) {
    console.error('Document parsing error:', error);
    throw new Error('Error reading document file. Please make sure the file is not corrupted or password protected.');
  }
};

const readImageContent = async (file: File): Promise<string> => {
  try {
    const worker = await createWorker();
    await worker.load();
    if (typeof worker.loadLanguage === 'function') {
      await worker.loadLanguage('eng');
    }
    if (typeof worker.initialize === 'function') {
      await worker.initialize('eng');
    }
    
    const imageUrl = URL.createObjectURL(file);
    const { data: { text } } = await worker.recognize(imageUrl);
    await worker.terminate();
    URL.revokeObjectURL(imageUrl);
    
    return cleanText(text);
  } catch (error) {
    throw new Error('Error reading image file. Please make sure the image contains clear text.');
  }
};

const readTextContent = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        resolve(cleanText(text));
      } catch (error) {
        reject(new Error('Error reading text file. Please make sure the file is properly encoded.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read text file.'));
    reader.readAsText(file);
  });
};

const cleanText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/[\r\n]+/g, '\n') // Normalize line endings
    .replace(/\s+/g, ' ') // Normalize spaces
    .replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII characters
    .trim();
};
