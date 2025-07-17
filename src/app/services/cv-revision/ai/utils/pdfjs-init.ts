import * as PDFJS from 'pdfjs-dist';

// Initialize PDF.js worker
if (typeof window !== 'undefined') {
  PDFJS.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export default PDFJS;
