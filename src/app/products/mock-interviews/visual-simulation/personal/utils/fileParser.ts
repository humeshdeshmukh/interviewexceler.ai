export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  
  try {
    switch (fileType) {
      case 'text/plain': {
        return await file.text();
      }
      
      case 'application/pdf': {
        if (typeof window === 'undefined') throw new Error('PDF reading only supported in browser');
        const PDFJS = (await import('@/app/services/cv-revision/ai/utils/pdfjs-init')).default;
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
        
        return fullText;
      }
      
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        // For DOC/DOCX files, we'll use a client-side approach
        // First, try to read as text
        try {
          const text = await file.text();
          if (text.trim()) {
            return text;
          }
        } catch (e) {
          console.log('Failed to read as text, trying blob approach');
        }

        // If text reading fails, try to extract text from the blob
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = async (e) => {
            try {
              const content = e.target?.result;
              if (typeof content === 'string') {
                // Clean up the content by removing special characters and normalizing spaces
                const cleanedContent = content
                  .replace(/[^\x20-\x7E\n]/g, ' ')  // Remove non-printable characters
                  .replace(/\s+/g, ' ')             // Normalize spaces
                  .trim();
                resolve(cleanedContent);
              } else {
                reject(new Error('Failed to read document content'));
              }
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsText(file);
        });
      }
      
      default:
        throw new Error(`Unsupported file type: ${fileType}. Please upload a .txt, .pdf, .doc, or .docx file.`);
    }
  } catch (error) {
    console.error('Error extracting text from file:', error);
    if (error instanceof Error) {
      // Clean up common error messages to be more user-friendly
      if (error.message.includes('Unsupported file type')) {
        throw error;
      } else if (error.message.includes('PDF')) {
        throw new Error('Failed to read PDF file. Please ensure the file is not corrupted or password protected.');
      } else if (error.message.includes('Failed to read document')) {
        throw new Error('Failed to read document. Please try converting to PDF or TXT format.');
      }
    }
    throw new Error('Failed to read file. Please try another file or format.');
  }
}

export function cleanResumeText(text: string): string {
  return text
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove special characters but keep basic punctuation
    .replace(/[^\w\s.,;:?!()\-'"]/g, ' ')
    // Normalize line endings
    .replace(/[\r\n]+/g, '\n')
    // Remove duplicate line endings
    .replace(/\n\s*\n/g, '\n')
    // Clean up common OCR artifacts
    .replace(/[|{}[\]<>]/g, ' ')
    // Remove multiple spaces
    .replace(/\s+/g, ' ')
    // Trim whitespace
    .trim();
}
