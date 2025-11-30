import * as PDFJS from 'pdfjs-dist';

// Configure PDF.js worker using local file
PDFJS.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export default PDFJS;
